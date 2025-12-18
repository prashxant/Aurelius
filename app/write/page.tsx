import Link from 'next/link'
import React from 'react'

export default function page () {
  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen min-w-screen bg-white text-black ">
      please write here
      <Link href="/">
        <button className="bg-slate-500 px-4 py-2 rounded-md shadow shadow-slate-500 border border-slate-500 cursor-pointer">
          HOME
        </button>
      </Link>
    </div>
  );
}
