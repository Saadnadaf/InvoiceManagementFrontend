import React, { useEffect } from 'react'

function InvoiceTable({items=[],onItemsChange,onValidityChange}) {
    const addItem = () =>{
        const newItem = {
            id : Date.now(),
            productname : "",
            quantity : 1,
            unitprice : 0 
        };

        onItemsChange([...items,newItem]);
    };

    const updateItem = (id,field,value) =>{
        const updated = items.map((it) => (it.id === id ? {...it,[field] : value} : it));
        onItemsChange(updated);
    };

    const removeItem = (id) =>{
        const updated = items.filter((it) => it.id !== id);
        onItemsChange(updated);
    };


    useEffect(()=>{
        const hasAtLeastOne = items.length > 0;
        const allRowValid = items.every((it)=>{
            const prodOk = it.productname && it.productname.toString().trim().length>0;
            const qty = Number(it.quantity);
            const qtyOk = Number.isFinite(qty) && qty>=1 && qty<=99;
            const price = Number(it.unitprice);
            const priceOK = Number.isFinite(price) && price >= 0;
            return prodOk && qtyOk && priceOK; 
        });

        const valid = hasAtLeastOne && allRowValid;
        if(typeof onValidityChange === "function"){
            onValidityChange(valid);
        }
    },[items,onValidityChange]);


    const fmt = (v) =>{
        const n = Number(v) || 0;
        return n.toLocaleString("en-IN",{style:"currency",currency:"INR"});
    };

  return (
    <div className='bg-white p-6 rounded-xl shadow-md mb-6'>
        <h2 className='text-lg font-semibold mb-4'>Invoice Items</h2>
        <table className='w-full border border-gray-300'>
            <thead>
                <tr className='bg-gray-100 text-left'>
                    <th className='p-3  border'>Product Name</th>
                    <th className='p-3 border'>Quantity</th>
                    <th className='p-3 border'>Unit Price</th>
                    <th className='p-3 border'>Total</th>
                </tr>
            </thead>

            <tbody>
                {items.map((it)=>{
                    const qty = Number(it.quantity) || 0;
                    const price = Number(it.unitprice) || 0;
                    const lineTotal = qty * price;

                    const nameError = !it.productname || it.productname.toString().trim() === "" ? "Required" : "";
                    const qtyError = !Number.isFinite(qty) || qty < 1 ||qty > 99 ? "Qty must be 1 - 99" : "";
                    const priceError = !Number.isFinite(price) || price < 0 ? "Must be >=0 " : "";
                

                return(
                    <tr key={it.id}>
                
                    <td className='p-3 border'>
                        <input type="text" value={it.productname} onChange={(e) => updateItem(it.id,"productname",e.target.value)}
                        placeholder='Product name' className='w-full px-2 py-1 border rounded' />
                        {nameError && <div className='text-red-500 text-xs mt-1'>{nameError}</div>}
                    </td>

                    <td className='p-3 border'>
                        <input type="text" min="1" max="99" step="1" value={it.quantity} 
                        onChange={(e) => updateItem(it.id,"quantity",e.target.value)}
                        className='w-full px-2 py-1 border rounded'/>
                        {qtyError && <div className='text-red-500 text-xs mt-1'>{qtyError}</div>}
                    </td>

                    <td className='p-3 border'>
                        <input type="number" min = "0" step="0.01" value={it.unitprice} 
                        onChange={(e)=> updateItem(it.id,"unitprice",e.target.value)}
                        className='w-full px-2 py-1 border rounded'/>
                        {priceError && <div className='text-red-500 text-xs mt-1'>{priceError}</div>}
                    </td>

                    <td className='p-3 border'>
                        {fmt(lineTotal)}
                    </td>

                    <td className='p-3 border'>
                        <button type='button' onClick={() => removeItem(it.id)} 
                        className='px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded'>
                            Remove
                        </button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        <div className='mt-4'>
            <button type='button' onClick={addItem} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
                + Add item
                </button>
        </div>
    </div>
  );
}

export default InvoiceTable