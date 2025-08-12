import Image from "next/image";

export default function Home() {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <div className="text-5xl">Wellcome to journal app </div>
    <div className="text-2xl pt-2 text-slate-400">Get insights of you everyday journals </div>
    <div className="py-2 bg-sky-300 cursor-pointer mt-6 text-zinc-700 px-4 rounded-xl hover:bg-sky-700">Less Goo</div>
   </div>
  );
}
