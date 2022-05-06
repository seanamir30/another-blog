import React from 'react'

const Back = ({onClick}) => {
  return (
    <svg onClick={onClick} className="svg-icon cursor-pointer" style={{width: '2em', height: '2em', verticalAlign: 'middle', fill: 'white', overflow: 'hidden'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M64 512c0 247 201 448 448 448s448-201 448-448S759 64 512 64 64 265 64 512z m64 0c0-211.8 172.2-384 384-384s384 172.2 384 384-172.2 384-384 384-384-172.2-384-384z" fill="white" /><path d="M548.6 287.9L376.3 448H768v64H376.4l172.2 160.1-39 41.9-251.7-234.1L509.6 246z" fill="white" /></svg>
  )
}

export default Back