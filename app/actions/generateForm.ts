"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { saveForm } from "./mutateForm";
const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function generateForm(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    description: z.string().min(1),
  });
  const parse = schema.safeParse({
    description: formData.get("description"),
  });

  if (!parse.success) {
    return {
      status: "error",
      message: "Enter a valid description",
    };
  }
  const data = parse.data;

  try {
    const prompt = `${data.description} Based on the description, generate a survey object with 3 fields: name(string) for the form, description(string) of the form and a questions array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. And more importantly, questions should be only 2 in number. For example, for RadioGroup, and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const jsonString = text.replace(/^```json\s*([\s\S]*)\s*```$/g, "$1");
    const responseObject = JSON.parse(jsonString);
    console.log("responseObject is ", responseObject);
    const dbFormId = await saveForm({
      user_prompt: data.description,
      name: responseObject.name,
      description: responseObject.description,
      questions: responseObject.questions,
    });
    console.log("dbFormId is ", dbFormId);
    return {
      status: "success",
      message: "Form created Successfully.",
      data: { formId: dbFormId },
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to create form",
    };
  }
}
