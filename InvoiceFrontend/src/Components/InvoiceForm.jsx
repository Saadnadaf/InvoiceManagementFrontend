import React, { useEffect, useState } from "react";
import InvoiceTable from "./InvoiceTable";
import { createInvoice, updateInvoice } from "../Services/InvoiceService";

function InvoiceForm({ invoice, onSaveSuccess , mode }) {
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [customername, setCustomerName] = useState("");
  const [invoicedate, setInvoiceDate] = useState("");

  const [items, setItems] = useState([
    { id: Date.now(), productname: "", quantity: 1, unitprice: 0 },
  ]);

  const [itemsvalid, setItemsValid] = useState(false);

  const [errors, setErrors] = useState({});
  const [isvalid, setIsValid] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newErrors = {};

    if (!invoicenumber.trim()) {
      newErrors.invoicenumber = "Invoice Number is required";
    } else if (invoicenumber.length > 50) {
      newErrors.invoicenumber = "Max 50 characters allowed";
    }
    if (!customername.trim()) {
      newErrors.customername = "Customer name is required";
    } else if (customername.length > 50) {
      newErrors.customername = "Max 50 characters allowed";
    }
    if (!invoicedate) {
      newErrors.invoicedate = "Invoice Date is required";
    }

    if (!items || items.length === 0) {
      newErrors.items = "At least one invoice item is required";
    } else if (!itemsvalid) {
      newErrors.items = "Please fix errors in invoice items";
    }

    setErrors(newErrors);

    setIsValid(Object.keys(newErrors).length === 0);
  }, [invoicenumber, customername, invoicedate, items, itemsvalid]);

  useEffect(() => {
    if (invoice) {
      setInvoiceNumber(invoice.InvoiceNumber || "");
      setCustomerName(invoice.CustomerName || "");
      setInvoiceDate(
        invoice.InvoiceDate ? invoice.InvoiceDate.split("T")[0] : ""
      );
      setItems(
        invoice.InvoiceItems?.map((it, idx) => ({
          id: idx + 1,
          productname: it.ProductName,
          quantity: it.Quantity,
          unitprice: it.UnitPrice,
        })) || [{ id: Date.now(), productname: "", quantity: 1, unitprice: 0 }]
      );
    } else {
      setInvoiceNumber("");
      setCustomerName("");
      setInvoiceDate("");
      setItems([
        { id: Date.now(), productname: "", quantity: 1, unitprice: 0 },
      ]);
    }
  }, [invoice]);

  const handleitemChange = (newItems) => {
    setItems(newItems);
  };

  const handleitemValidityChange = (valid) => {
    setItemsValid(valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isvalid) return;

    const payload = {
      InvoiceNumber: invoicenumber,
      CustomerName: customername,
      InvoiceDate: new Date(invoicedate).toISOString(),
      InvoiceItems: items.map((it) => ({
        ProductName: it.productname,
        Quantity: Number(it.quantity),
        UnitPrice: Number(it.unitprice),
      })),
    };

    if(mode === "edit"){
      payload.InvoiceNumber = invoice.InvoiceNumber;
    }

    try {
      setLoading(true);

      if (invoice) {
        await updateInvoice(invoice.InvoiceId, payload);
        alert("Invoice Updated successfully");
      } else {
        const res = await createInvoice(payload);
        alert("Invoice created successfully!");
        console.log("API response", res.data);
      }

      onSaveSuccess?.();

      if (!invoice) {
        setInvoiceNumber("");
        setCustomerName("");
        setInvoiceDate("");
        setItems([
          { id: Date.now(), productname: "", quantity: 1, unitprice: 0 },
        ]);
      }
    } catch (err) {
      console.error("Save failed", err);

      const servermsg =
        err?.response?.data?.error || err?.response?.data || err.message;
      alert("Failed to save invoice" + JSON.stringify(servermsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6 ">
      <h2 className="text-lg font-semibold mb-4">
        {invoice ? "Edit Invoice " : "Create new Invoice"}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Customer Name
            </label>
            <input
              type="text"
              value={customername}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring  focus:ring-blue-300 "
            />
            {errors.customername && (
              <p className="text-red-500 text-sm mt-1">{errors.customername}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoicedate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              placeholder="Enter date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.invoicedate && (
              <p className="text-red-500 text-sm mt-1">{errors.invoicedate}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoicenumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="INV-001"
              disabled={mode === "edit"}
              className="w-full px-3 py-2 border rounded-lg  focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.invoicenumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.invoicenumber}
              </p>
            )}
          </div>
        </div>
        <div>
          <InvoiceTable
            items={items}
            onItemsChange={handleitemChange}
            onValidityChange={handleitemValidityChange}
          />
          {errors.items && (
            <p className="text-red-500 text-sm -mt-2">{errors.items}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!isvalid || loading}
            className={`px-4 py-2 rounded-lg text-white ${
              isvalid && !loading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading
              ? "Saving..."
              : invoice
              ? "Update Invoice"
              : "Save Invoice"}
          </button>

          <button
            type="button"
            onClick={() => {
              setInvoiceNumber("");
              setCustomerName("");
              setInvoiceDate("");
              setItems([
                { id: Date.now(), productname: "", quantity: 1, unitprice: 0 },
              ]);
            }}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default InvoiceForm;
