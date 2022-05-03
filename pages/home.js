import React, { useEffect, useState, useRef } from 'react'
import Router from 'next/router'

const Home = () => {
    const [userName, setUserName] = useState(null)
    const [posts, setPosts] = useState(null)
    const blogInput = useRef(null)
    
    useEffect(() => {
        const storedName = localStorage.getItem("name")
        if(!storedName) Router.push("/")
        setUserName(storedName)
        setPosts(JSON.parse(localStorage.getItem("post")))
    }, []) 
    

    const handleSubmit = (e) => {
        console.log(posts)
        e.preventDefault()
        const userPosts = JSON.parse(localStorage.getItem("post"))
        const storedPost = {
            postText: blogInput.current.value,
            timestamp: Date().toLocaleString()
        }
        if (!userPosts?.length) {
            console.log(userPosts)
            userPosts = [storedPost]
            setPosts(userPosts)
            localStorage.setItem("post",JSON.stringify(userPosts))
        } else {
            userPosts.push(storedPost)
            localStorage.setItem("post",JSON.stringify(userPosts))
        }

        blogInput.current.value = null
        setPosts(JSON.parse(localStorage.getItem("post")))
    }

    return (
        <div>
            <div>Hi {userName}</div>
            <form onSubmit={handleSubmit}>
                <input ref={blogInput}/>
                <button type="submit">Post</button>
            </form>
            {posts && posts.map((post,i)=>{
                return(
                    <p key={i}>{post.postText} | {post.timestamp}</p>
                )
            })}
        </div>
    )
}

export default Home