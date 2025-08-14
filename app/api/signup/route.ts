
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;


    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

 
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // In real apps, hash the password before saving
      },
    });

    return NextResponse.json({ message: "User created", user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
