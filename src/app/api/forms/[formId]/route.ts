import { connectMongoose } from "@/db/connectMongoose";
import Form from "@/db/models/Form";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { formId: string } }
) {
  const { formId } = params;

  try {
    if (!mongoose.isValidObjectId(formId)) {
      return NextResponse.json({ message: "Invalid form ID" }, { status: 400 });
    }

    await connectMongoose();

    const form = await Form.findById(formId);

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(form, { status: 200 });
  } catch (error) {
    console.log("Error fetching form:", error);
    return NextResponse.json(
      { message: "Failed to fetch form", error: error },
      { status: 500 }
    );
  }
}
