import React, { useEffect, useState } from "react";
import InvoiceTable from "./InvoiceTable";
import { createInvoice, updateInvoice } from "../Services/InvoiceService";

function InvoiceForm({ invoice, onSaveSuccess, mode }) {
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [customername, setCustomerName] = useState("");
  const [invoicedate, setInvoiceDate] = useState("");
  const [customeraddress, setCustomerAddress] = useState("");
  const [customerphone, setCustomerPhone] = useState("");
  const [customeremail, setCustomerEmail] = useState("");
  const [deliveryfrom, setDeliveryFrom] = useState("");

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

    if (!customeraddress.trim()) {
      newErrors.customeraddress = "Customer address is required";
    }

    if (!customerphone.trim()) {
      newErrors.customerphone = "Customer phone is required";
    } else if (!/^\d{10}$/.test(customerphone)) {
      newErrors.customerphone = "Phone must be 10 digits";
    }

    if (!customeremail.trim()) {
      newErrors.customeremail = "Customer email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customeremail)) {
      newErrors.customeremail = "Invalid email address";
    }

    if (!deliveryfrom.trim()) {
      newErrors.deliveryfrom = "Delivery from address is required";
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
  }, [
    invoicenumber,
    customername,
    customeraddress,
    customerphone,
    customeremail,
    deliveryfrom,
    invoicedate,
    items,
    itemsvalid,
  ]);

  useEffect(() => {
    if (invoice) {
      setInvoiceNumber(invoice.InvoiceNumber || "");
      setCustomerName(invoice.CustomerName || "");
      setInvoiceDate(
        invoice.InvoiceDate ? invoice.InvoiceDate.split("T")[0] : ""
      );

      setCustomerAddress(invoice.CustomerAddress || "");
      setCustomerPhone(invoice.CustomerPhone || "");
      setCustomerEmail(invoice.CustomerEmail || "");
      setDeliveryFrom(invoice.DeliveryFrom || "");

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
      setCustomerAddress("");
      setCustomerPhone("");
      setCustomerEmail("");
      setDeliveryFrom("");

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
      CustomerAddress: customeraddress,
      CustomerPhone: customerphone,
      CustomerEmail: customeremail,
      DeliveryFrom: deliveryfrom,
      InvoiceDate: new Date(invoicedate).toISOString(),
      InvoiceItems: items.map((it) => ({
        ProductName: it.productname,
        Quantity: Number(it.quantity),
        UnitPrice: Number(it.unitprice),
      })),
    };

    if (mode === "edit") {
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

  const getInputClasses = (fieldError) => 
    `w-full px-3 py-2 border rounded-lg transition duration-200 
    bg-white dark:bg-gray-700 
    text-gray-900 dark:text-gray-100
    focus:outline-none focus:ring-2 
    ${
      fieldError
        ? "border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900"
        : "border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-100 dark:focus:ring-blue-900"
    }`;

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl mb-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b dark:border-gray-700 pb-3">
        {invoice ? "Edit Invoice" : "Create new Invoice"}
      </h2>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer Name
            </label>
            <input
              type="text"
              value={customername}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className={getInputClasses(errors.customername)}
            />
            {errors.customername && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1 font-medium">
                {errors.customername}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer Address
            </label>
            <input
              type="text"
              value={customeraddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="Enter customer address"
              className={getInputClasses(errors.customeraddress)}
            />
            {errors.customeraddress && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1 font-medium">
                {errors.customeraddress}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer Phone
            </label>
            <input
              type="text"
              value={customerphone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Enter phone number"
              className={getInputClasses(errors.customerphone)}
            />
            {errors.customerphone && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1 font-medium">
                {errors.customerphone}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer Email
            </label>
            <input
              type="email"
              value={customeremail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Enter email"
              className={getInputClasses(errors.customeremail)}
            />
            {errors.customeremail && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1 font-medium">
                {errors.customeremail}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Delivery From
            </label>
            <input
              type="text"
              value={deliveryfrom}
              onChange={(e) => setDeliveryFrom(e.target.value)}
              placeholder="Enter delivery address"
              className={getInputClasses(errors.deliveryfrom)}
            />
            {errors.deliveryfrom && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1 font-medium">
                {errors.deliveryfrom}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoicedate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              placeholder="Enter date"
              className={getInputClasses(errors.invoicedate)}
            />
            {errors.invoicedate && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1 font-medium">
                {errors.invoicedate}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoicenumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="INV-001"
              disabled={mode === "edit"}
              className={`${getInputClasses(errors.invoicenumber)} ${
                mode === "edit" ? "bg-gray-100 dark:bg-gray-600 cursor-not-allowed" : ""
              }`}
            />
            {errors.invoicenumber && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1 font-medium">
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
            <p className="text-red-500 dark:text-red-400 text-sm mt-3 font-medium">
              {errors.items}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t dark:border-gray-700">
          <button
            type="submit"
            disabled={!isvalid || loading}
            className={`px-6 py-2 rounded-xl text-white font-semibold shadow-md transition duration-200 transform hover:scale-[1.01] ${
              isvalid && !loading
                ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
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
              setCustomerAddress("");
              setCustomerPhone("");
              setCustomerEmail("");
              setDeliveryFrom("");
              setInvoiceDate("");
              setItems([
                { id: Date.now(), productname: "", quantity: 1, unitprice: 0 },
              ]);
            }}
            className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default InvoiceForm;
