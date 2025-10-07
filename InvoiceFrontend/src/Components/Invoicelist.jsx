import React, { useState , useEffect} from 'react'
import { getinvoices ,   deleteInvoice } from '../Services/InvoiceService';
import {FaEye,FaPen,FaTrash} from "react-icons/fa";

function Invoicelist({invoices,loading,error,onSelectInvoice,onDeleteInvoice}) 
{

    if (loading) return <p>Loading invoices...</p>
    if (error) return <p className='text-red-500'>{error}</p>
  return (
    <div className='bg-white mt-6 p-6 rounded-xl shadow-md'>
        <h2 className='text-lg font-semibold mb-4'>Invoices</h2>
        <table className='w-full border border-gray-300'>
            <thead>
                <tr className='bg-gray-100 text-left'>
                    <th className='p-3 border'>Invoice No</th>
                    <th className='p-3 border'>Customer</th>
                    <th className='p-3 border'>Date</th>
                    <th className='p-3 border'>Total Amount</th>
                    <th className='p-3 border'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((inv)=>(
                    <tr key={inv.id} className='hover:bg-gray-50'>
                    <td className='p-3 border'>{inv.InvoiceNumber}</td>
                    <td className='p-3 border'>{inv.CustomerName}</td>
                    <td className='p-3 border'>{new Date(inv.InvoiceDate).toLocaleDateString()}
                    </td>
                    <td className='p-3 border'>₹{inv.TotalAmount}</td>
                    <td className='px-4 py-2 border space-x-6 flex gap-2 justify-center'>
                        <button 
                        onClick={()=>onSelectInvoice(inv,'view')}
                        className='bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700'><FaEye size={18} /></button>
                        <button 
                        onClick={()=>onSelectInvoice(inv,'edit')}
                        className='bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600'><FaPen size={18}/></button>
                        <button
                        onClick={()=>onDeleteInvoice(inv.InvoiceId)}
                         className='bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700'><FaTrash size={18}/></button>
                    </td>
                </tr>
                 ))}
            </tbody>
        </table>
    </div>
  )
}

export default Invoicelist
