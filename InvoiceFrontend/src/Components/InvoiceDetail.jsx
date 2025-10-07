import React from 'react'

function InvoiceDetail({invoice}) {
    if(!invoice){
        return (
        <p className='mt-4 text-gray-500  text-center'>
            Select an invoice to view details</p>
        );
    }


    const subTotal = invoice.InvoiceItems?.reduce(
        (sum,item)=>sum + item.Quantity * item.UnitPrice,0
    ) || 0;

  return (
    <div className='bg-white mt-6 p-6 rounded-xl shadow-md '>
        <h2 className='text-lg font-semibold mb-4'>Invoice details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <div>
                <p><span className='font-medium'>Invoice no : </span>{invoice.InvoiceNumber}</p>
                <p><span className='font-medium'>Customer : </span>{invoice.CustomerName}</p>
                <p><span className='font-medium'>Date : </span>{new Date(invoice.InvoiceDate).toLocaleDateString()}</p>
            </div>
        </div>

        <h3 className='text-md font-semibold mb-2'>Items</h3>
        <table className='w-full border border-gray-300 mb-6'>
            <thead>
                <tr className='bg-gray-100 text-left'>
                    <th className='p-3 border'>Product</th>
                    <th className='p-3 border'>Quantity</th>
                    <th className='p-3 border'>Unit Price</th>
                    <th className='p-3 border'>Total</th>
                </tr>
            </thead>
            <tbody>
                {invoice.InvoiceItems?.map((item,idx) =>(
                     <tr key={idx}>
                     <td className='p-3 border'>{item.ProductName}</td>
                     <td className='p-3 border'>{item.Quantity}</td>
                     <td className='p-3 border'>{item.UnitPrice}</td>
                     <td className='p-3 border'>₹{(item.Quantity * item.UnitPrice).toLocaleString()}</td>
                 </tr>
                ))}
            </tbody>
        </table>

        <div className='flex justify-end'>
            <div className='text-right'>
                <p><span className='font-medium'>Subtotal:</span>₹{subTotal.toLocaleString()}</p>
            </div>
        </div>
    </div>
  )
}

export default InvoiceDetail