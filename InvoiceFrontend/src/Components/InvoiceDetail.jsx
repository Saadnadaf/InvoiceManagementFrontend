import React, { useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

function InvoiceDetail({ invoice }) {
  const invoiceRef = useRef();
  
  if (!invoice) {
    return (
      <div className="bg-white dark:bg-gray-800 mt-6 p-12 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Select an Invoice</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Choose an invoice from the list to view details</p>
        </div>
      </div>
    );
  }

  const subTotal =
    invoice.InvoiceItems?.reduce(
      (sum, item) => sum + item.Quantity * item.UnitPrice,
      0
    ) || 0;

  const formatCurrency = (amount) => {
    const n = Number(amount) || 0;
    return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  };

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`Invoice_${invoice.InvoiceNumber}.pdf`);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 mt-6 p-5 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <div ref={invoiceRef}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-700 dark:to-gray-800 px-8 py-6 rounded-t-xl -m-5 mb-5">
          <h2 className="text-2xl font-bold text-white">
            Invoice #{invoice.InvoiceNumber}
          </h2>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Bill To */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b-2 border-blue-500 dark:border-blue-400">
                Bill To
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-semibold">{invoice.CustomerName}</p>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">{invoice.CustomerAddress}</p>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Phone: {invoice.CustomerPhone}</p>
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Email: {invoice.CustomerEmail}</p>
                </div>
              </div>
            </div>

            {/* Ship From */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b-2 border-blue-500 dark:border-blue-400">
                Ship From
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">{invoice.DeliveryFrom}</p>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                  <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">Invoice Date</p>
                  <p className="text-gray-900 dark:text-gray-100">
                    {new Date(invoice.InvoiceDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b-2 border-blue-500 dark:border-blue-400">
              Items
            </h3>
            
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Product</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Qty</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Unit Price</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {invoice.InvoiceItems?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{item.ProductName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 text-center">{item.Quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 text-right">{formatCurrency(item.UnitPrice)}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">
                        {formatCurrency(item.Quantity * item.UnitPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-end">
            <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400 rounded-lg px-8 py-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(subTotal)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleDownloadPDF}
          title="Download as PDF"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 active:bg-blue-800 dark:active:bg-blue-900 text-white px-5 py-2.5 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default InvoiceDetail;