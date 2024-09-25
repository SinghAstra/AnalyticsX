import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";
import user from "../../../models/User.js";

export async function POST(req: NextRequest) {
  await connectDB();

  const { name, age } = req.body;
  const person = new user({
    name: name,
    age: age,
  });
  await person.save();
  console.log("inside api", name, age);
  NextResponse.json({ done: true }, { status: 200 });
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello there !" }, { status: 200 });
}
