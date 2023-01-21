import React from 'react'

const Modal = ({closeModal, action, text}) => {
    return(
        <div type='button' onClick={closeModal} className='px-4 absolute backdrop-blur top-0 left-0 h-screen w-screen flex justify-center items-center'>
            <div type='button' onClick={(e)=>e.stopPropagation()} className='bg-slate-800 py-6 px-8 rounded-md flex flex-col items-center justify-center'>
                <div className='pb-4 text-center'>
                    {text}
                </div>
                <div className='flex gap-8'>
                    <button onClick={closeModal} className='border border-slate-500 px-4 py-1 rounded-md hover:opacity-60'>No</button>
                    <button onClick={action} className='bg-red-400 px-4 py-1 rounded-md hover:bg-transparent border border-red-400'>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default Modal