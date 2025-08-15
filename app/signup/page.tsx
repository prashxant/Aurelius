"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    if (res.ok) {
      // Auto login after signup
      await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password
      });
      router.push("/dashboard");
    } else {
      alert(data.error || "Signup failed");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2"
      />
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2">
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
