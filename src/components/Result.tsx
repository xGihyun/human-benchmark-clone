import React from "react";

const Result = ({ children, restart }: {children?: React.ReactNode, restart?: () => void}) => {
  return (
    <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-25 flex justify-center items-center'>
      <div className='w-[60%] max-w-3xl relative p-8 bg-neutral-800 text-center'>
        { children }
        <button onClick={restart} className='flex z-40'>Restart</button>
      </div>
    </div>
  )
}

export default Result