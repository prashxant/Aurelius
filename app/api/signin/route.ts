import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


interface SignupTypes  {

  email: string,
  password : string

}


export async function POST(req: Request ){

   try {

    const body : SignupTypes = await req.json();

    const {email , password } = body;
    if (!email || !password){
      NextResponse.json({
        error: "Missing Fields"
      },
      {status:(404)}
      )
    }

  const user = await prisma.user.findUnique({
      where:{
        email,
        password
      }
  })

  if(!user){
    NextResponse.json({
      error:"login failed user doest ecixt"
    },
    {status : 404})
  }

 return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }


}
