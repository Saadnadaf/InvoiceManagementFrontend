import React, { useState } from 'react';
import {Eye , EyeOff} from "lucide-react";

const PasswordInput = ({value , onChange , placeholder = "Password" , name , required = true}) => {
    const [showpassword , setShowPassword] = useState(false);
  return (
  <div className="relative">
  <input
     type= {showpassword ? "text" : "password"}
     name = {name}
     placeholder= {placeholder}
     value={value}
     onChange={onChange}
     required = {required}
     className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
    />
    <div
        className="absolute right-3 top-4 cursor-pointer text-gray-500"
        onClick = {() =>setShowPassword(!showpassword)}
    >
    {showpassword ? <EyeOff size={20} /> : <Eye size = {20} />}
    </div>
    </div>

  );
};

export default PasswordInput