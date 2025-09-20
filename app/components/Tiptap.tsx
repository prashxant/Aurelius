'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

export default function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '<p>"Underliine"</p>',
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="">
      {/* Toolbar */}
      <div className="mb-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded'}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded'}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-gray-700 text-white px-2 py-1 rounded' : 'px-2 py-1 rounded'}
        >
          Underline
        </button>
      </div>


      <EditorContent
        editor={editor}
        className="  h-full w-[66vw]  mx-auto p-3  rounded "
      />
    </div>
  );
}
