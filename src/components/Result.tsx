
const Result = ({ average, restart }: {average: number, restart: () => void}) => {
  return (
    <div className='w-full h-screen fixed top-0 left-0 bg-black bg-opacity-25 flex justify-center items-center'>
      <div className='w-[60%] max-w-3xl relative p-8 bg-neutral-800 text-center'>
        <h2>Average time per target:</h2>
        {average} ms
        <button onClick={restart} className='flex z-40'>Restart</button>
      </div>
    </div>
  )
}

export default Result