import React, { useEffect, useState } from 'react'
import {Moon,Sun} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function  ToggleThem() {
 const { theme, setTheme } = useTheme()


const  changeTheme  = () =>setTheme(theme === "dark"?"light":"dark")

  return (

      <div className="">
        <button
        onClick={changeTheme}
        >
          {theme === "dark" ? (
        <Moon className="h-5 w-5 text-gray-300" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
        </button>

      </div>
  )
}
