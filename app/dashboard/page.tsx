"use client";
import { useSession, signOut, SessionProvider } from "next-auth/react";


export default function Dashboard (){
return<SessionProvider>
  <Dashboard2></Dashboard2>
</SessionProvider>

}

 function Dashboard2() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not logged in</p>;

  return (
    <div className="p-4">
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <button onClick={() => signOut()} className="bg-red-500 text-white p-2">Sign Out</button>
    </div>
  );
}
