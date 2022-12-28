import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='w-full h-screen bg-black text-white min-h-full'>
      <Outlet />
    </div>
  )
}

export default Layout