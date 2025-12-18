
import MyEditorPage from '@/components/mainEditor';
import React from 'react'


export default function page () {
  return (
    <div className="flex flex-col gap-10  min-h-screen max-w-3xl mx-auto bg-white text-black ">
      <MyEditorPage/>
    </div>
  );
}
