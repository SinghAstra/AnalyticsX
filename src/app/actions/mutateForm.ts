"use server";

import { connectMongoose } from "@/db/connectMongoose";
import Form from "@/db/models/Form";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface QuestionOption {
  text: string;
  value: string;
}

interface Question {
  text: string;
  fieldType: "RadioGroup" | "Select" | "Input" | "Textarea" | "Switch";
  fieldOptions: QuestionOption[];
}

interface FormData {
  user_prompt: string;
  name: string;
  description: string;
  questions: Question[];
}

export async function saveForm(data: FormData) {
  try {
    await connectMongoose();

    const { name, description, questions, user_prompt } = data;
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const newForm = new Form({
      user_prompt,
      name,
      description,
      questions,
      userId: new mongoose.Types.ObjectId(userId),
      published: false,
    });

    console.log("newForm is ", newForm);

    const savedForm = await newForm.save();
    return savedForm._id;
  } catch (error) {
    console.log("error --saveForm is ", error);
  }
}
