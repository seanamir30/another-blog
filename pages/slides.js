import Carousel from 'nuka-carousel'
import React from 'react'
import Router from 'next/router'

const slides = () => {
  return (
      <div className="px-4 md:px-32 lg:px-[30rem] pt-16">
        <button onClick={()=>{Router.push('/')}} className="text-orange-400 pb-4">Go Back</button>
        <div className="bg-white p-2">
            <Carousel>
                <img
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                    alt="..."
                />
                <img
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                    alt="..."
                />
                <img
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                    alt="..."
                />
                <img
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(24).jpg"
                    alt="..."
                />
                <img
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(1).jpg"
                    alt="..."
                />
            </Carousel>
            <h2 className="text-5xl py-4">Here&apos;s a slide of random images</h2>
        </div>
    </div>
  )
}

export default slides