import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router';
import Trash from '../../components/Trash';
import Back from '../../components/Back';

const View = () => {
    const [post, setPost] = useState()
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
        localStorage.setItem("post", JSON.stringify(posts))
        Router.push("/home")
    }

  return (
    <div className="xl:px-[30rem] md:px-24 px-2 py-7 xl:py-16 text-white">
        <Back onClick={()=>Router.push('/home')}/>
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
                        <Trash className="cursor-pointer" onClick={deletePost}/>
                    </div>
                    <div className="whitespace-pre-line">
                        {post.body}
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default View