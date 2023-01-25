import React from 'react'

const TooltipWrapper = ({children, text}) => {
  return (
    <div className='group relative flex justify-center items-center'>
        {children}
        <div className='opacity-0 group-hover:opacity-100 transition z-10 absolute pointer-events-none -top-2 -translate-y-full px-2 py-1 rounded-md text-xs bg-slate-700 text-white whitespace-nowrap'>
            {text}
        </div>
    </div>
  )
}

export default TooltipWrapper