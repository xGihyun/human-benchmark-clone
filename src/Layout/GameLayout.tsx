import { ReactNode, RefObject } from 'react'

const GameLayout = ({ children, refProp }: {children: ReactNode, refProp?: RefObject<HTMLDivElement>}) => {
  return (
    <div className='h-full flex justify-center items-center p-16'>
      <div className='area' ref={refProp}>
        {children}
      </div>
    </div>
  )
}

export default GameLayout