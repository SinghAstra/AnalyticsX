import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";
import User from "../../../models/User.js";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, age } = body;
    const person = new User({
      name: name,
      age: age,
    });
    await person.save();
    console.log("inside api", name, age);
    return NextResponse.json({ done: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err });
  }
}

export async function GET() {
  await connectDB();
  const users = await User.find({});
  return NextResponse.json(
    { message: "Hello there !", users },
    { status: 200 }
  );
}
