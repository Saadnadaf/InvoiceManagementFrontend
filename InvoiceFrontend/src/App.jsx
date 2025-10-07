import { useState,useEffect} from "react";
import { getinvoices , deleteInvoice } from './Services/InvoiceService';
import InvoiceDetail from "./Components/InvoiceDetail";
import InvoiceForm from "./Components/InvoiceForm";
import InvoiceSummary from "./Components/InvoiceSummary";
import InvoiceTable from "./Components/InvoiceTable";
import Invoicelist from "./Components/Invoicelist";
import Navbar from "./Components/Navbar";

function App() {
  const [selectedinvoice, setSelectedinvoice] = useState(null);
  const [mode, setMode] = useState(null);
  const [invoices,setInvoices] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError]  = useState("");

  const fetchInvoices = async () => {
      try{
          const res = await getinvoices();
          setInvoices(res.data);
      }
      catch(err){
          setError("Failed to fetch invoices");
          console.error(err);
      }
      finally{
          setLoading(false);
      }
  }

  useEffect(()=>{
      fetchInvoices();
  },[]);


  const handleSelectInvoice = (invoice, mode) => {
    setSelectedinvoice(invoice);
    setMode(mode);
  };


  
  const handleDelete = async (id) =>{
    if(!window.confirm("Are you sure you want to delete this invoice?")) return ;

    try{
        await deleteInvoice(id);
        //const updated = invoices.filter((inv) => inv.InvoiceId !== id);
        setInvoices(invoices.filter((inv) => inv.InvoiceId !== id));
        alert("Invoice deleted successfully");
    }
    catch(err){
        console.error(err);
        alert("Failed to delete invoice");
    }
};

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <main className="container mx-auto my-6 px-4">

      <div className="flex justify-end mb-4">
          <button
            onClick={() => {setMode("create"); setSelectedinvoice(null);}}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Create Invoice
          </button>
        </div>

        {(mode === "edit" ||
          mode === "create") && (
            <InvoiceForm
              invoice={mode === "edit" ? selectedinvoice : null}
              mode = {mode}
              onSaveSuccess={() => {
                fetchInvoices();
                setMode(null);
              }}
            />
          )}
        {/* <InvoiceTable /> */}
        {/* <InvoiceSummary /> */}

        <Invoicelist invoices={invoices} loading={loading}
         error={error} onSelectInvoice={handleSelectInvoice} 
         onDeleteInvoice = {handleDelete} />

        {mode == "view" && <InvoiceDetail invoice={selectedinvoice} />}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2025 Invoice Management . All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;
