// app/dashboard/page.tsx
// This is a protected route that requires authentication.
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If the user is not authenticated, redirect them to the login page
  if (status === "unauthenticated") {
    router.push("/login");
    return null; // Don't render anything while redirecting
  }

  // If the user is authenticated, display the protected content
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl w-full p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Welcome, {session?.user?.name}!
        </h1>
        <p className="text-center text-gray-600">
          This is a protected dashboard page. You are authenticated.
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
