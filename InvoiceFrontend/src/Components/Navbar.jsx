import React from 'react'

function Navbar({onLogout}) {
  return (
    <nav className="bg-blue-400 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Invoice Management</h1>
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-semibold transition duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar