'use client'
import React, {  useRef } from 'react'

function Write() {
  const inputRef = useRef<HTMLInputElement>(null)
  function handleSubmit(){
    const message = inputRef.current?.value
    alert(message)
    return
  }



  return (
    <div className='h-screen w-screen flex flex-col bg-blue-200 justify-center items-center'>

      <input ref={inputRef} className='size-32 text-black bg-amber-200'type="text" />




      <button onClick={handleSubmit}
      className='text-2xl mt-2 cursor-pointer rounded-md px-6 py-2 bg-blue-500 shadow-2xl text-black'>submit</button>
    </div>
  )
}

export default Write
