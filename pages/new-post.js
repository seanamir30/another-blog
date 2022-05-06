import Router from 'next/router'
import { useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const NewPost = () => {

    const postTitle = useRef(null)
    const postBody = useRef(null)

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }
      

    const handleSubmit = (e) => {
        e.preventDefault()
        const userPosts = JSON.parse(localStorage.getItem("post"))
        const storedPost = {
            id: uuid(),
            title: postTitle.current.value,
            body: postBody.current.value,
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString()
        }
        if (!userPosts?.length) {
            console.log(userPosts)
            userPosts = [storedPost]
            localStorage.setItem("post",JSON.stringify(userPosts))
        } else {
            userPosts.push(storedPost)
            localStorage.setItem("post",JSON.stringify(userPosts))
        }

        postBody.current.value = null
        postTitle.current.value = null

        Router.push('/home')
    }


  return (
    <div className="xl:px-[30rem] md:px-24 px-2 py-7 xl:py-16 text-white">
        <p className="font-bold mb-2">Create a post</p>
        <form onSubmit={handleSubmit}>
            <div className="w-full bg-slate-800 p-3 mb-2 rounded-md border-2 border-slate-700" >
                <input placeholder="Title" className="w-full outline-none bg-slate-700 p-1 rounded-md border-2 border-slate-600 hover:border-slate-400" ref={postTitle} required/>
            </div>
            <div className="w-full bg-slate-800 p-3 rounded-md border-2 border-slate-700" >
                <TextareaAutosize minRows={18} placeholder="Text (optional)" className="w-full h-96 outline-none bg-slate-700 p-1 rounded-md border-2 border-slate-600 hover:border-slate-400" ref={postBody}/>
            </div>
            <button className='bg-slate-700 hover:opacity-70 rounded-full p-2 px-4 h-10 m-2 cursor-pointer' onClick={()=>Router.push('/home')}>Cancel</button>
            <button className='bg-white text-slate-800 hover:opacity-70 rounded-full p-2 px-4 h-10 m-2 cursor-pointer' type="submit">Post</button>
        </form>
    </div>
  )
}

export default NewPost