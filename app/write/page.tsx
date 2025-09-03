import React from 'react'

export default function page() {
  return (
   <div className='min-h-screen bg-slate-800 text-white'>
     <div className="flex gap-2">
      <div className="mt-10 ml-10">
        <button className=' p-10 py-2 px-4 rounded-md bg-amber-400'>submit</button>
      </div>
      <div className='flex flex-col gap-10 p-4 mx-auto max-w-[66vw] '>
      <textarea className='bg-slate-600 p-10 rounded-md h-[70vh] ' />
      <textarea className='bg-slate-600 p-5 rounded-md h-[20vh]' />
    </div>
     </div>
   </div>
  )
}
