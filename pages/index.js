import { useState, useEffect } from 'react';
import Router from 'next/router';

export default function Home() {
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name")
    if(storedName) Router.push('/home')
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name){
      localStorage.setItem("name",name)
      Router.push("/home")
    } else{
      setError('empty')
    }
  }

  return (
    <>
    <div className="h-screen flex items-center px-64  bg-slate-900 text-white">
      <div className="h-3/4 py-8 flex flex-col justify-evenly">
        <div>
          <h1 className="text-7xl">Definitely Another <br/> <span className="text-orange-400">Blog App</span></h1>
          <p className="text-lg font-light pt-9">Blogs posted from this device are only saved here, other users on other device can&apos;t see it</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input placeholder="What should we call you?" onChange={(e)=>{setName(e.target.value)}} type="text" className="bg-transparent w-full border-b text-6xl border-orange-900 focus:border-orange-400 mr-3 py-1 px-2 leading-tight focus:outline-none"/>
          {name ? <p className="absolute italic">Press enter to confirm</p> : error == "empty" ? <p className="absolute italic text-red-500">Please enter your name</p> : <></>}
        </form>
      </div>
    </div>
    </>
  )
}
