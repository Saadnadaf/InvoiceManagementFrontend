import React from 'react'

function Navbar() {
  return (
    <nav className='bg-blue-400 text-white px-6 py-4 shadow-md'>
        <div className='container mx-auto flex justify-between items-center'>
            <h1 className='text-xl font-bold'>Invoice Management</h1>
            <ul className='flex space-x-6'>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar