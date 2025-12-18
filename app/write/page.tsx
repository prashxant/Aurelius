
import MyEditorPage from '@/components/mainEditor';
import React from 'react'


export default function page () {
  return (
    <div className="flex  flex-col gap-10 bg-black min-h-screen max-w-3xl mx-auto rounded-xl m-10 text-white ">
      <MyEditorPage/>
    </div>
  );
}
