import React, { ReactNode } from 'react'

const GameLayout = ({ children, refProp }: {children: ReactNode, refProp?: React.MutableRefObject<null>}) => {
  return (
    <div className='h-full flex justify-center items-center p-16'>
      <div className='area' ref={refProp}>
        {children}
      </div>
    </div>
  )
}

export default GameLayout