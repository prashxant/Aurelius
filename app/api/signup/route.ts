import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req:Request) {

  interface SignupProps{
    name:string,
    email:string,
    password:string
  }

   try{ const body  = await req.json();

    const {name , email , password }: SignupProps = body;

    const newUser = await prisma.user.create({
      data:{
        name,
        email,
        password //learn to hash password
      }
    })


    return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
  }
