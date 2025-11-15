import React, { useEffect } from "react";

function InvoiceTable({ items = [], onItemsChange, onValidityChange }) {
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      productname: "",
      quantity: 1,
      unitprice: 0,
    };

    onItemsChange([...items, newItem]);
  };

  const updateItem = (id, field, value) => {
    const updated = items.map((it) =>
      it.id === id ? { ...it, [field]: value } : it
    );
    onItemsChange(updated);
  };

  const removeItem = (id) => {
    const updated = items.filter((it) => it.id !== id);
    onItemsChange(updated);
  };

  useEffect(() => {
    const hasAtLeastOne = items.length > 0;
    const allRowValid = items.every((it) => {
      const prodOk =
        it.productname && it.productname.toString().trim().length > 0;
      const qty = Number(it.quantity);
      const qtyOk = Number.isFinite(qty) && qty >= 1 && qty <= 99;
      const price = Number(it.unitprice);
      const priceOK = Number.isFinite(price) && price >= 0;
      return prodOk && qtyOk && priceOK;
    });

    const valid = hasAtLeastOne && allRowValid;
    if (typeof onValidityChange === "function") {
      onValidityChange(valid);
    }
  }, [items, onValidityChange]);

  const fmt = (v) => {
    const n = Number(v) || 0;
    return n.toLocaleString("en-IN", { style: "currency", currency: "INR" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4 border-b dark:border-gray-700 pb-2">
        List Items
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3 w-20 text-center">Qty</th>
              <th className="px-4 py-3 w-32 text-right">Unit Price</th>
              <th className="px-4 py-3 w-32 text-right">Total</th>
              <th className="px-4 py-3 w-20"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((it) => {
              const qty = Number(it.quantity) || 0;
              const price = Number(it.unitprice) || 0;
              const lineTotal = qty * price;

              const nameError =
                !it.productname || it.productname.toString().trim() === ""
                  ? "Required"
                  : "";
              const qtyError =
                !Number.isFinite(qty) || qty < 1 || qty > 99
                  ? "Qty must be 1 - 99"
                  : "";
              const priceError =
                !Number.isFinite(price) || price < 0 ? "Must be >=0 " : "";

              return (
                <tr
                  key={it.id}
                  className="hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-150"
                >
                  <td className="px-4 py-2 whitespace-nowrap align-top">
                    <input
                      type="text"
                      value={it.productname}
                      onChange={(e) =>
                        updateItem(it.id, "productname", e.target.value)
                      }
                      placeholder="Product name"
                      className={`w-full px-2 py-1 border rounded-md text-sm transition 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-gray-100
                        focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 
                        ${nameError ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />
                    {nameError && (
                      <div className="text-red-500 dark:text-red-400 text-xs mt-1 font-medium">
                        {nameError}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap align-top">
                    <input
                      type="text"
                      min="1"
                      max="99"
                      step="1"
                      value={it.quantity}
                      onChange={(e) =>
                        updateItem(it.id, "quantity", e.target.value)
                      }
                      className={`w-full px-2 py-1 border rounded-md text-sm text-center transition 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-gray-100
                        focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 
                        ${qtyError ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />
                    {qtyError && (
                      <div className="text-red-500 dark:text-red-400 text-xs mt-1 font-medium text-center">
                        {qtyError}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap align-top">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={it.unitprice}
                      onChange={(e) =>
                        updateItem(it.id, "unitprice", e.target.value)
                      }
                      className={`w-full px-2 py-1 border rounded-md text-sm text-right transition 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-gray-100
                        focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 
                        ${priceError ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />
                    {priceError && (
                      <div className="text-red-500 dark:text-red-400 text-xs mt-1 font-medium text-right">
                        {priceError}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap text-right text-gray-700 dark:text-gray-300 font-semibold align-middle">
                    {fmt(lineTotal)}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap align-top">
                    <button
                      type="button"
                      onClick={() => removeItem(it.id)}
                      className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition duration-150 transform hover:scale-105"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center space-x-2 bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-200 transform hover:scale-[1.01]"
        >
          + Add item
        </button>
      </div>
    </div>
  );
}

export default InvoiceTable;
