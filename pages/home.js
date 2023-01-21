import React, { useEffect, useState, useRef } from 'react'
import Router from 'next/router'
import Delete from '../components/Delete'
import Modal from '../components/Modal'

const Home = () => {
    const [isConfirmDeleteShown , setIsConfirmDeleteShown] = useState(false)
    const [userName, setUserName] = useState(null)
    const [posts, setPosts] = useState(null)
    
    useEffect(() => {
        const storedName = localStorage.getItem("name")
        if(!storedName) Router.push("/")
        setUserName(storedName)
        setPosts(JSON.parse(localStorage.getItem("post"))?.reverse())
    }, [])

    const handleConfirmDeleteModal = () => {
        setIsConfirmDeleteShown(!isConfirmDeleteShown)
    }

    const deleteUser = () => {
        localStorage.removeItem('name')
        localStorage.removeItem('post')
        Router.push('/')
    }
    console.log(posts)
    return (
        <div className="xl:px-[30rem] md:px-24 px-2 py-7 xl:py-16 text-white">
            <header className="flex justify-between items-start">
                <div className="text-xl font-extralight pb-7">Definitely a <span className="text-orange-400">blog</span> for <span className="text-orange-400 font-bold underline">{userName}</span></div>
                <Delete onClick={handleConfirmDeleteModal}/>
            </header>
            <div className="w-full bg-slate-800 p-3 mb-5 rounded-md border-2 border-slate-700">
                <input placeholder="Create Post" className="w-full outline-none bg-slate-700 p-1 rounded-md border-2 border-slate-600 hover:border-slate-400" onClick={()=>Router.push('/new-post')}/>
            </div>
            {posts && posts.length ? posts.map((post)=>{
                if (!post) return
                return(
                    <div onClick={()=>Router.push(`/view/${post.id}`)} className="relative cursor-pointer max-h-56 bg-slate-800 w-full text-white border-2 border-slate-700 hover:border-slate-400 outline-none mt-3 p-3 rounded-md" key={post.id}>
                        <div className="flex flex-col pb-2 overfloy-y-auto"><span className="text-xl capitalize">{post.title}</span><span className="italic font-extralight text-sm text-slate-400">{post.date}</span><span className="italic font-extralight text-sm text-slate-400">{post.time}</span></div>
                         <div className="max-h-24 overflow-hidden">{post.body}</div>
                         {post.body && <div className="bg-gradient-to-t from-slate-800 to-transparent absolute w-full h-20 bottom-0 left-0"></div>}
                    </div>
                )
            })
            : (
                <div className='text-slate-400'>
                    You should definitely start blogging
                </div>
            )}
            {isConfirmDeleteShown && <Modal closeModal={handleConfirmDeleteModal} text="Are you sure you want to delete your whole blog?" action={deleteUser}/>}
        </div>
    )
}

export default Home