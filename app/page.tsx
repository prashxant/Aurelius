'use client'
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";


export default function Home() {

  return (
 <SessionProvider>
  <MainHome/>
 </SessionProvider>
  )}

export function MainHome (){

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-300">

     <div onClick={()=>{alert("signup")}} className="cursor-pointer bg-sky-600 rounded-md py-2 px-4">
       Click me
     </div>
    </div>
  )
}
