import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router';
import Trash from '../../public/icons/trashcan.svg';
import LeftArrow from '../../public/icons/left-arrow.svg';
import Modal from '../../components/Modal';

const View = () => {
    const [post, setPost] = useState()
    const [isConfirmDeleteShown, setIsConfirmDeleteShown] = useState(false)
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        const storedName = localStorage.getItem("name")
        const storedPosts = JSON.parse(localStorage.getItem("post"))
        let obj = storedPosts.find(o => o?.id === id);
        if(!storedName) Router.push("/")
        if(!obj) Router.push("/")
        setPost(obj)
    }, []) 

    const deletePost = () => {
        const posts = JSON.parse(localStorage.getItem("post"))
        const index = posts.findIndex(object => {
            return object?.id === id;
        });
        delete posts[index]
        localStorage.setItem("post", JSON.stringify(posts.filter((post)=> post !== null)))
        Router.push("/home")
    }

    const closeModal = () => {
        setIsConfirmDeleteShown(!isConfirmDeleteShown)
    }

  return (
    <div className="xl:px-[30rem] md:px-24 px-2 py-7 xl:py-16 text-white">
        <button className='w-8 text-white' onClick={()=>Router.push('/home')}>
            <LeftArrow className='w-full h-full'/>
        </button>
        {post && (
            <div className="">
                <div className="bg-slate-800 w-full text-white border-2 border-slate-700 outline-none mt-3 p-3 rounded-md">
                    <div className="flex justify-between">
                    <div className="flex flex-col pb-2 overfloy-y-auto">
                        <span className="text-xl capitalize">
                            {post.title}
                        </span>
                        <span className="italic font-extralight text-sm text-slate-400">
                            {post.date}
                        </span>
                        <span className="italic font-extralight text-sm text-slate-400">
                            {post.time}
                        </span>
                        
                    </div>
                    <button className='h-6 text-white' onClick={()=>setIsConfirmDeleteShown(true)}>
                        <Trash className="w-full h-full"/>
                    </button>
                    </div>
                    <div className="whitespace-pre-line">
                        {post.body}
                    </div>
                </div>
            </div>
        )}
        {isConfirmDeleteShown &&
            <Modal text="Are you sure you want to delete this post?" action={deletePost} closeModal={closeModal}/>
        }
    </div>
  )
}

export default View