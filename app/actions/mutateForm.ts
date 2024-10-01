"use server";
import { auth } from "@/auth";
import { connectMongoose } from "@/db/connectMongoose";
import Form from "@/db/models/Form";
import { FormData } from "@/types/FormTypes";

export async function saveForm(data: FormData) {
  await connectMongoose();
  const { name, description, questions, user_prompt } = data;
  const session = await auth();
  const userId = session?.user?.id;

  const newForm = new Form({
    userId,
    name,
    description,
    questions,
    user_prompt,
  });
  try {
    const savedForm = await newForm.save();
    console.log("Form saved:", savedForm);
    return savedForm._id.toString();
  } catch (error) {
    console.log("Error saving form:", error);
    return null;
  }
}
