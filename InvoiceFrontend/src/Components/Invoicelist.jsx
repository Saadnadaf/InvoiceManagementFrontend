import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

function Invoicelist({
  invoices,
  loading,
  error,
  onSelectInvoice,
  onDeleteInvoice,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.CustomerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.InvoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    const dateA = new Date(a.InvoiceDate);
    const dateB = new Date(b.InvoiceDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const totalItems = sortedInvoices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = sortedInvoices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading)
    return (
      <p className="text-center py-8 text-lg text-blue-600 dark:text-blue-400 font-medium">
        Loading invoices...
      </p>
    );
  if (error)
    return (
      <p className="text-red-600 dark:text-red-400 text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
        {error}
      </p>
    );
  if (invoices.length === 0)
    return (
      <p className="text-center py-8 text-gray-500 dark:text-gray-400 italic">
        No invoices found. Click '+ Create Invoice' to begin.
      </p>
    );

  return (
    <div className="bg-white dark:bg-gray-800 mt-6 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b dark:border-gray-700 pb-3">
        Invoice History
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <input
          type="text"
          placeholder="Search by Invoice No / Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Sort by date (Oldest first)</option>
          <option value="desc">Sort by date (Newest first)</option>
        </select>
      </div> 

      <div className="overflow-x-auto rounded-lg scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        <table className="min-w-[700px] md:min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              <th className="px-4 py-3 border-b-2 dark:border-gray-600">
                Invoice No
              </th>
              <th className="px-4 py-3 border-b-2 dark:border-gray-600">
                Customer
              </th>
              <th className="px-4 py-3 border-b-2 dark:border-gray-600 hidden sm:table-cell">
                Phone
              </th>
              <th className="px-4 py-3 border-b-2 dark:border-gray-600 hidden lg:table-cell">
                Email
              </th>
              <th className="px-4 py-3 border-b-2 dark:border-gray-600">
                Date
              </th>
              <th className="px-4 py-3 border-b-2 dark:border-gray-600 text-right">
                Total Amount
              </th>
              <th className="px-4 py-3 border-b-2 dark:border-gray-600 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedInvoices.map((inv) => (
              <tr
                key={inv.InvoiceId}
                className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {inv.InvoiceNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {inv.CustomerName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hidden sm:table-cell">
                  {inv.CustomerPhone}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hidden lg:table-cell">
                  {inv.CustomerEmail}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {new Date(inv.InvoiceDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-right text-green-700 dark:text-green-400">
                  ₹{inv.TotalAmount}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <button
                      onClick={() => onSelectInvoice(inv, "view")}
                      className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition duration-200"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => onSelectInvoice(inv, "edit")}
                      className="p-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded-full hover:bg-yellow-600 dark:hover:bg-yellow-700 hover:text-white transition duration-200"
                    >
                      <FaPen size={18} />
                    </button>
                    <button
                      onClick={() => onDeleteInvoice(inv.InvoiceId)}
                      className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full hover:bg-red-600 dark:hover:bg-red-700 hover:text-white transition duration-200"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-6 gap-3">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-gray-700 dark:text-gray-300 font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Invoicelist;
