'use client'
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";


export default function Home() {

  return (
 <SessionProvider>
  <MainHome/>
 </SessionProvider>
  )}

export function MainHome (){
 const Session = useSession()
  return (
    <div>
      {Session.status == "authenticated" && <button onClick={()=>signOut()}>SignOut</button>}
      {Session.status == "unauthenticated" && <button onClick={()=>signIn()}>signIn</button>}
      {Session.status == "unauthenticated" && <button onClick={()=>signIn()}>signIn</button>}
    </div>
  )
}
