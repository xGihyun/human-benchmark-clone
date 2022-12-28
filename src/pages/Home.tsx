import React from 'react';
import { Link } from 'react-router-dom';
import { games } from '../constants/Items';

const Home = () => {
  return (
    <div className='w-full h-full flex justify-center items-center gap-4'>
      {games.map(game => (
        <Link to={game.path} key={game.data} data-game={game.data} className='p-4 bg-neutral-800 hover:bg-neutral-700'>
          {game.title}
        </Link>
      ))}
    </div>
  )
}

export default Home