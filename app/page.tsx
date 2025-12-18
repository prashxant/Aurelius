import Link from "next/link";


export default function Home() {





  return (
    <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl"> Aurelius</h1>
      <Link href='/write'>
        <button className="bg-slate-500 px-4 py-2 rounded-md shadow shadow-slate-500 border border-slate-500 cursor-pointer">
          Write
        </button>
      </Link>
    </div>
  );
}
