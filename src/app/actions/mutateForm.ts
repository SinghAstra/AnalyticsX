"use server";

import NextAuth, { getServerSession } from "next-auth/next";
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
  const { name, description, questions, user_prompt } = data;
  const session = await getServerSession(authOptions);
  console.log("session --saveForm is ", session);
  // const userId = session?.user?.id;
  // const newForm = await db
  //   .insert(forms)
  //   .values({
  //     formID: uuidv4(),
  //     name,
  //     description,
  //     userId,
  //     user_prompt,
  //     published: false,
  //   })
  //   .returning({ insertedId: forms.id, newFormCreated: forms.formID });
  // const formId = newForm[0].insertedId;
  // console.log("formId created", formId);
  // console.log("formId created", newForm[0].newFormCreated);
  // const newQuestions = data.questions.map((question) => {
  //   return {
  //     text: question.text,
  //     fieldType: question.fieldType,
  //     fieldOptions: question.fieldOptions,
  //     formId,
  //   };
  // });
  // await db.transaction(async (tx) => {
  //   for (const question of newQuestions) {
  //     const [{ questionId }] = await tx
  //       .insert(dbQuestions)
  //       .values(question)
  //       .returning({ questionId: dbQuestions.id });
  //     if (question.fieldOptions && question.fieldOptions.length > 0) {
  //       await tx.insert(fieldOptions).values(
  //         question.fieldOptions.map((option) => ({
  //           text: option.text,
  //           value: option.value,
  //           questionId,
  //         }))
  //       );
  //     }
  //   }
  // });
  // return newForm[0].newFormCreated;
}
