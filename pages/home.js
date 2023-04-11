import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import SaveIcon from '../public/icons/save.svg'
import RemoveUserIcon from '../public/icons/remove-user.svg'
import UploadIcon from '../public/icons/upload.svg'
import Modal from '../components/Modal'
import TooltipWrapper from '../components/TooltipWrapper'
import AndroidIcon from '../public/icons/android.svg'
import DownloadIcon from '../public/icons/download.svg'
import clsx from 'clsx'
import axios from 'axios'

const Home = () => {
    const [isModalOpen , setIsModalOpen] = useState(false)
    const [errorOnImport, setErrorOnImport] = useState(null)
    const [userName, setUserName] = useState(null)
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const storedName = localStorage.getItem("name")
        if(!storedName) Router.push("/")
        setUserName(storedName)
        setPosts(JSON.parse(localStorage.getItem("post"))?.reverse())
    

        if((Math.floor(new Date().getTime()/1000) - JSON.parse(localStorage.getItem("last-analytics-save"))) > 3600) {
            axios.post(process.env.NEXT_PUBLIC_ANALYTICS_URL || '', {
                url: window.location.href,
                userAgent: window.navigator.userAgent
            }).then(()=>{
                localStorage.setItem("last-analytics-save", JSON.stringify(Math.floor(new Date().getTime()/1000)))
            })
        }
    }, [])

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
        setErrorOnImport()
    }

    const deleteUser = () => {
        localStorage.removeItem('name')
        localStorage.removeItem('post')
        Router.push('/')
    }

    const downloadAsJSON = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(posts)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `${userName}_posts_${new Date().toLocaleDateString()}.json`;

        link.click()
    }

    const handlePostsImport = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            try {
                const importedPosts = JSON.parse(e.target.result).map((importedPos)=>{
                    if(
                        'id' in importedPos
                        && 'title' in importedPos
                        && 'body' in importedPos
                        && 'date' in importedPos
                        && 'time' in importedPos
                    ) return importedPos
                    else throw new Error("Invalid JSON format")
                })
                const postsWithUniqueID = [...posts, ...importedPosts].filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
                localStorage.setItem('post', JSON.stringify(postsWithUniqueID))
                setPosts(postsWithUniqueID)
                setErrorOnImport()
                e.target.value = null;

            }
            catch {
                handleModal()
                setErrorOnImport('Oops! Please check if you uploaded the correct file.')
            }
        };
    }

    return (
        <>
        <div className={clsx("xl:px-[30rem] md:px-24 px-2 py-7 xl:py-16 text-white relative min-h-screen", {
            'overflow-hidden max-h-screen': isModalOpen
        })}>
            <header className="flex justify-between items-start">
                <div className="text-xl font-extralight pb-7">Definitely a <span className="text-orange-400">blog</span> for <span className="text-orange-400 font-bold underline">{userName}</span></div>
                <div className='flex gap-6'>
                    <TooltipWrapper text='Import posts'>
                        <div className='w-5 relative overflow-hidden'>
                                <label htmlFor='import-posts' className='cursor-pointer'>
                                    <UploadIcon className='h-full w-full'/>
                                </label>
                                <input id='import-posts' className='hidden' type='file' onChange={handlePostsImport}/>
                        </div>
                    </TooltipWrapper>
                    <TooltipWrapper text='Export posts'>
                        <button className='w-5' onClick={downloadAsJSON}>
                                <SaveIcon className='h-full w-full'/>
                        </button>
                    </TooltipWrapper>
                    <TooltipWrapper text='Delete account'>
                        <button className='w-6' onClick={handleModal}>
                                <RemoveUserIcon className='h-full w-full'/>
                        </button>   
                    </TooltipWrapper>
                </div>
            </header>
            <div className="w-full bg-slate-800 p-3 mb-5 rounded-md border-2 border-slate-700">
                <input placeholder="Create Post" className="w-full outline-none bg-slate-700 p-1 rounded-md border-2 border-slate-600 hover:border-slate-400" onClick={()=>Router.push('/new-post')}/>
            </div>
            {posts && posts.length ? posts.map((post)=>{
                if (!post) return
                return(
                    <div onClick={()=>Router.push(`/view/${post.id}`)} className="relative cursor-pointer max-h-56 bg-slate-800 w-full text-white border-2 border-slate-700 hover:border-slate-400 outline-none mt-3 p-3 rounded-md" key={post.id}>
                        <div className="flex flex-col pb-2 overfloy-y-auto"><span className="text-xl break-words">{post.title}</span><span className="italic font-extralight text-sm text-slate-400">{post.date}</span><span className="italic font-extralight text-sm text-slate-400">{post.time}</span></div>
                         <div className="max-h-24 overflow-hidden break-words">{post.body}</div>
                         {post.body && <div className="bg-gradient-to-t from-slate-800 to-transparent absolute w-full h-20 bottom-0 left-0"></div>}
                    </div>
                )
            })
            : (
                <div className='text-slate-400'>
                    You should definitely start blogging
                </div>
            )}
            {isModalOpen && <Modal closeModal={handleModal} type={errorOnImport ? 'error' : 'delete'} text={errorOnImport ? errorOnImport : "Are you sure you want to delete your whole blog?"} action={deleteUser}/>}
        </div>
        <div className="flex gap-2 sticky w-full bg-slate-700 text-white justify-center py-2 bottom-0 right-0">
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
        </>
    )
}

export default Home