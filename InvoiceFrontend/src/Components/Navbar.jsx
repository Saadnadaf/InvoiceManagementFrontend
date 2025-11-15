import React, { useState, useRef, useEffect } from 'react';
import { Menu , Moon , Sun} from 'lucide-react';
import {useTheme} from "../Context/ThemeContext";

function Navbar({ onLogout, onCreateInvoice }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {isDarkMode , toggleTheme} = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateInvoice = () => {
    setIsDropdownOpen(false);
    onCreateInvoice();
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    onLogout();
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gray-900 dark:to-gray-800  text-white px-6 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide dark : text-gray-100">InvoX</h1>
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 dark:bg-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-700/50 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Menu"
          >
            <Menu size={24} className="drop-shadow-sm" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                <button
                  onClick={handleCreateInvoice}
                  className="w-full text-left px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 dark:hover:from-green-900 dark:hover:to-green-800 hover:text-green-700 dark:hover:text-green-300 hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-3 font-medium group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="text-xl group-hover:scale-125 group-hover:rotate-90 transition-all duration-300 relative z-10">+</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Create Invoice</span>
                </button>
                
                <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>

                <button
                  onClick={toggleTheme}
                  className="w-full text-left px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-indigo-50 dark:hover:from-indigo-900 hover:to-indigo-100 dark:hover:to-indigo-800 hover:text-indigo-700 dark:hover:text-indigo-300 hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-3 font-medium group relative overflow-hidden"
                >
                  {isDarkMode ? (
                    <>
                      <Sun size={18} className="relative z-10" />
                      <span className="relative z-10">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={18} className="relative z-10" />
                      <span className="relative z-10">Dark Mode</span>
                    </>
                  )}
                </button>

                <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-red-50 dark:hover:from-red-900 hover:to-red-100 dark:hover:to-red-800 hover:text-red-600 dark:hover:text-red-300 hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-3 font-medium group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/20 to-red-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="text-lg group-hover:translate-x-2 transition-transform duration-300 relative z-10">→</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

