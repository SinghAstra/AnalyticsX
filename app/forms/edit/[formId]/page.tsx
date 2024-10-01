import { auth } from "@/auth";
import { connectMongoose } from "@/db/connectMongoose";
import FormModel from "@/db/models/Form";
import { redirect } from "next/navigation";
import React from "react";
import Form from "../Form";

const page = async ({
  params,
}: {
  params: {
    formId: string;
  };
}) => {
  const formId = params.formId;

  if (!formId || formId == null) {
    return <div>Form not Found!</div>;
  }

  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const userId = session.user.id;
  await connectMongoose();

  try {
    const form = await FormModel.findOne({ _id: formId, userId });

    if (!form) {
      return <div>Form not found or you do not have access to it.</div>;
    }

    return <Form form={form} editMode={true} />;
  } catch (error) {
    console.log("Error fetching form:", error);
    redirect("/");
  }
};

export default page;
