import React from 'react'

function InvoiceSummary() {
  return (
    <div className='bg-white p-6 rounded-xl shadow-md'>
        <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Total Amount</h2>
            <p className='text-xl font-bold text-gray-500'>$1300</p>
        </div>
        <div className='mt-4 flex space-x-4'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 '>Save</button>
            <button className='bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700'>Clear</button>
        </div>
    </div>
  )
}

export default InvoiceSummary