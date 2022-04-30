import React, { useEffect, useState } from 'react'
import Router from 'next/router'

const home = () => {
    const [userName, setUserName] = useState(null)
    
    useEffect(() => {
        const storedName = localStorage.getItem("name")
        if(!storedName) Router.push("/")
        setUserName(storedName)
    }, []) 

    return (
        <div>Hi {userName}</div>
    )
}

export default home