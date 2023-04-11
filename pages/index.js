import { useState, useEffect } from 'react';
import Router from 'next/router';
import AndroidIcon from '../public/icons/android.svg'
import DownloadIcon from '../public/icons/download.svg'
import axios from 'axios';

export default function Home() {
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name")

    axios.post(process.env.NEXT_PUBLIC_ANALYTICS_URL || '', {
      url: window.location.href,
      userAgent: window.navigator.userAgent
    })

    if(storedName) Router.push('/home')
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name){
      localStorage.setItem("name",name)
      localStorage.setItem("post", '[]')
      Router.push("/home")
    } else{
      setError('empty')
    }
  }

  return (
    <div className="h-screen flex items-center xl:px-96 md:px-10 px-3 align-center bg-slate-900 text-white">
      <div className="h-3/4 md:h-1/2 py-8 flex flex-col y-evenly">
        <div className="flex gap-2">
          <p>Try out the android app!</p>
          <a href="https://firebasestorage.googleapis.com/v0/b/sean-portfolio-82686.appspot.com/o/another-blog-app.apk?alt=media&token=d47b24df-301e-44ca-8cca-3ff8985df70d" target="_blank" rel="noreferrer" className="flex bg-white hover:opacity-80 rounded-full items-center justify-center px-2 gap-2 z-10">
            <div className="w-4 h-4 relative">
              <AndroidIcon className="w-full h-full fill-[#32DE84]"/>
            </div>
            <div className='w-3 h-3 relative'>
              <DownloadIcon className="w-full h-full"/>
            </div>
          </a>
        </div>
        <div>
          <h1 className="text-7xl">Definitely Another <br/> <span className="text-orange-400">Blog App</span></h1>
          <p className="text-lg font-light pt-9">Blog posts from this device are only saved here, other users on other device can&apos;t see it</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input placeholder="What should we call you?" onChange={(e)=>{setName(e.target.value)}} type="text" className="bg-transparent w-full border-b text-2xl md:text-5xl xl:text-6xl border-orange-900 focus:border-orange-400 mr-3 py-1 px-2 leading-tight focus:outline-none"/>
          {name ? <p className="absolute italic">Press enter to confirm</p> : error == "empty" ? <p className="absolute italic text-red-500">Please enter your name</p> : <></>}
        </form>
      </div>
    </div>
  )
}
