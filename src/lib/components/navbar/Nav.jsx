import React from 'react'
import { LuSearch } from 'react-icons/lu';

export default function Nav({ value, onValueChange, onFormSubmit }) {


  const search = (event) => {
    event.preventDefault();

    onFormSubmit();
  };

  return (
    <>
      <nav className='flex items-center justify-center px-20 py-2'>
        <h3 className='text-2xl text-green-500 font-bold'>AfreeTech</h3>

        <form action="" onSubmit={search} className='flex items-center justify-between bg-gray-200 rounded-full mx-12 py-2 px-4 w-[400px]'>
          <input value={value} onChange={(e) => onValueChange(e.target.value)} placeholder='Search area...' className='h-4 bg-transparent focus:outline-none' />
          <button type='submit' className='h-[38px] w-[38px] rounded-full flex items-center justify-center bg-gray-100'>
            <LuSearch size={18} className='text-gray-400' />
          </button>
        </form>
      </nav>
    </>
  )
}
