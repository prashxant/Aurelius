"use client"
import React, { useState } from 'react'
import axios from 'axios';


export default function Signup(){
const [form , setForm] = useState({
  name: "",
  email:"",
  password:""
})
function handleChange(e){

 const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))

}


async function handleSignup(){
  try{
      const res = await axios.post("../api/signup",form)
      alert(`Signup successful: ${res.data.message}`)
  }catch(error){
    alert("signup faild")
  }

}

  return (
  <div className="flex  items-center justify-center min-h-screen">
    <div className="flex flex-col gap-2 ">
      <input name="name" placeholder='Name' value={form.name} onChange={handleChange} type="text" />
      <input name="email" placeholder='Email' value={form.email} onChange={handleChange} type="text" />
      <input name="password" placeholder='Password' value={form.password} onChange={handleChange} type="password" />
      <button onClick={handleSignup}>Signup</button>

    </div>
  </div>
  )
}
