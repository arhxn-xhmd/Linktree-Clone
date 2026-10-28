"use client"
import React, { Suspense, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';

const GenerateForm = () => {

  const searchParams = useSearchParams()

  const [handle, sethandle] = useState(searchParams.get('handle'))
  const [links, setLinks] = useState([{link: "", linktext: ""}])
  const [pic, setpic] = useState("")
  const [desc, setdesc] = useState("")

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks)=>{{
      return initialLinks.map((item, i)=>{
        if (i == index) {
          return {link, linktext}
        }
        else {
          return item
        }
      })
    }})
  }
  
  const addLink = () => {
    setLinks(links.concat([{link: "", linktext: ""}]))
  }
  

  const submitLinks = async () => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links,
      "handle": handle,
      "pic": pic,
      "desc": desc
    });

    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    }

    const r = await fetch("http://localhost:3000/api/add", requestOption)
    const result = await r.json()

    if (result.success) {
      toast.success(result.message)
      setLinks([{link: "", linktext: ""}])
      setpic("")
      sethandle("")
      setdesc("")
    }

    else {
      toast.error(result.message)
    }
  }

  return (
    <div className='bg-[#E9C0E9] min-h-screen grid grid-cols-2'>
      <div className='flex justify-center items-center flex-col text-gray-900'>
        <div className='flex flex-col gap-5 my-8'>
          <h1 className='font-bold text-4xl pt-20'>Create your Bittree</h1>
          <div>
            <h2 className='font-semibold text-2xl'>Step 1: Claim your Handle</h2>
            <div className="mx-4">
              <input value={handle} onChange={e => { sethandle(e.target.value) }} className='bg-white px-4 py-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Choose a handle' />
            </div>
          </div>
          <div>
            <h2 className='font-semibold text-2xl'>Step 2: Add Links</h2>
            {links && links.map((item, index)=> {
              return <div key={index} className="mx-4">
              <input value={item.linktext} onChange={e => { handleChange(index, item.link, e.target.value) }} className='bg-white px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link text' />  
              <input value={item.link} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='bg-white px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link' />            
            </div>
            })}
            
            <button onClick={()=>{addLink()}} className='p-5 py-2 mx-2 bg-slate-700 text-white font-bold rounded-3xl'>+ Add Link</button>
          </div>
          <div>
            <h2 className='font-semibold text-2xl'>Step 3: Add Picture and Description</h2>
            <div className="mx-4 flex flex-col">
              <input value={pic} onChange={e => { setpic(e.target.value) }} className='bg-white px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link to your Picture' />
              <input value={desc} onChange={e => { setdesc(e.target.value) }} className='bg-white px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full' type="text" placeholder='Enter description' />
              <button disabled={pic == "" || handle == "" || links[0].linktext == ""} onClick={()=>{submitLinks()}} className='disabled:bg-slate-500 p-5 py-2 mx-2 my-5 bg-slate-700 text-white font-bold rounded-3xl w-fit'>Create your BitTree</button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-screen bg-[#E9C0E9]'>
        <img className='h-full object-contain' src="/generate.png" alt="Generate your links" />
        
      </div>
    </div>
  )
}

const Generate = () => (
  <Suspense fallback={null}>
    <ToastContainer />
    <GenerateForm />
  </Suspense>
)

export default Generate
