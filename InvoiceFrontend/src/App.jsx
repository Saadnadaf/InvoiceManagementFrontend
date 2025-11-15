// import { useState, useEffect } from "react";
// import Modal from "react-modal";
// import { motion, AnimatePresence } from "framer-motion";
// import { getinvoices, deleteInvoice } from "./Services/InvoiceService";
// import InvoiceDetail from "./Components/InvoiceDetail";
// import InvoiceForm from "./Components/InvoiceForm";
// import InvoiceSummary from "./Components/InvoiceSummary";
// import InvoiceTable from "./Components/InvoiceTable";
// import Invoicelist from "./Components/Invoicelist";
// import Navbar from "./Components/Navbar";
// import Login from "./Components/Login";
// import Register from "./Components/Register";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import ForgotPassword from "./Components/ForgotPassword";
// import ResetPassword from "./Components/ResetPassword";

// Modal.setAppElement("#root");

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [invoices, setInvoices] = useState([]);
//   const [selectedinvoice, setSelectedinvoice] = useState(null);
//   const [mode, setMode] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//     navigate("/invoices");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     navigate("/login");
//   };

//   const fetchInvoices = async () => {
//     try {
//       const res = await getinvoices();
//       setInvoices(res.data);
//     } catch (err) {
//       setError("Failed to fetch invoices");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) fetchInvoices();
//   }, [isAuthenticated]);

//   const handleSelectInvoice = (invoice, mode) => {
//     setSelectedinvoice(invoice);
//     setMode(mode);

//     if (mode === "edit" || mode === "create") {
//       setShowModal(true);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this invoice?"))
//       return;

//     try {
//       await deleteInvoice(id);
//       //const updated = invoices.filter((inv) => inv.InvoiceId !== id);
//       setInvoices(invoices.filter((inv) => inv.InvoiceId !== id));
//       alert("Invoice deleted successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete invoice");
//     }
//   };

//   const PrivateRoute = ({ children }) => {
//     return isAuthenticated ? children : <Navigate to="/login" replace />;
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setMode(null);
//     setSelectedinvoice(null);
//   };

//   // if (!isAuthenticated) {
//   //   return showRegister ? (
//   //     <Register onSwitchToLogin={() => setShowRegister(false)} />
//   //   ) : (
//   //     <Login
//   //       onLoginSuccess={handleLoginSuccess}
//   //       onSwitchToRegister={() => setShowRegister(true)}
//   //     />
//   //   );
//   // }
//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={<Login onLoginSuccess={handleLoginSuccess} />}
//       />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password" element={<ResetPassword />} />

//       <Route
//         path="/invoices"
//         element={
//           <PrivateRoute>
//             <div className="flex flex-col min-h-screen bg-gray-200  dark:bg-gray-900">
//               <Navbar
//                 onLogout={handleLogout}
//                 onCreateInvoice={() => {
//                   setMode("create");
//                   setSelectedinvoice(null);
//                   setShowModal(true);
//                 }}
//               />
//               <main className="flex flex-col min-h-screen bg-gray-200  dark:bg-gray-900">
//                 {/* <div className="flex justify-end mb-4">
//                   <button
//                     onClick={() => {
//                       setMode("create");
//                       setSelectedinvoice(null);
//                       setShowModal(true);
//                     }}
//                     className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   >
//                     + Create Invoice
//                   </button>
//                 </div> */}

//                 <AnimatePresence>
//                   {showModal && (
//                     <Modal
//                       isOpen={showModal}
//                       onRequestClose={closeModal}
//                       shouldCloseOnOverlayClick={false}
//                       contentLabel="Invoice Form"
//                       className="flex items-center justify-center outline-none"
//                       overlayClassName="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
//                     >
//                       <motion.div
//                         initial={{ scale: 0.95, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         exit={{ scale: 0.95, opacity: 0 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                         className="relative w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-8"
//                       >
//                         <button
//                           onClick={closeModal}
//                           className="absolute top-3 right-3 text-gray-800 hover:text-red-500 text-2xl font-bold"
//                         >
//                           &times;
//                         </button>

//                         {(mode === "edit" || mode === "create") && (
//                           <InvoiceForm
//                             invoice={mode === "edit" ? selectedinvoice : null}
//                             mode={mode}
//                             onSaveSuccess={() => {
//                               fetchInvoices();
//                               setMode(null);
//                               closeModal();
//                             }}
//                           />
//                         )}
//                         {/* <InvoiceTable /> */}
//                         {/* <InvoiceSummary /> */}
//                       </motion.div>
//                     </Modal>
//                   )}
//                 </AnimatePresence>

//                 {/* Now its my turn  */}

//                 {/* Modal end */}

//                 <Invoicelist
//                   invoices={invoices}
//                   loading={loading}
//                   error={error}
//                   onSelectInvoice={handleSelectInvoice}
//                   onDeleteInvoice={handleDelete}
//                 />

//                 {mode == "view" && <InvoiceDetail invoice={selectedinvoice} />}
//               </main>
//               <footer className="bg-gray-800  dark:bg-gray-900 text-white text-center py-4">
//                 <p>&copy; 2025 Invoice Management. All rights reserved.</p>
//               </footer>
//             </div>
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="*"
//         element={<Navigate to={isAuthenticated ? "/invoices" : "/login"} />}
//       />
//     </Routes>
//   );
// }
// export default App;

import { useState, useEffect } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { getinvoices, deleteInvoice } from "./Services/InvoiceService";
import InvoiceDetail from "./Components/InvoiceDetail";
import InvoiceForm from "./Components/InvoiceForm";
import InvoiceSummary from "./Components/InvoiceSummary";
import InvoiceTable from "./Components/InvoiceTable";
import Invoicelist from "./Components/Invoicelist";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

Modal.setAppElement("#root");

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [selectedinvoice, setSelectedinvoice] = useState(null);
  const [mode, setMode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate("/invoices");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const fetchInvoices = async () => {
    try {
      const res = await getinvoices();
      setInvoices(res.data);
    } catch (err) {
      setError("Failed to fetch invoices");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchInvoices();
  }, [isAuthenticated]);

  const handleSelectInvoice = (invoice, mode) => {
    setSelectedinvoice(invoice);
    setMode(mode);

    if (mode === "edit" || mode === "create") {
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?"))
      return;

    try {
      await deleteInvoice(id);
      setInvoices(invoices.filter((inv) => inv.InvoiceId !== id));
      alert("Invoice deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete invoice");
    }
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  const closeModal = () => {
    setShowModal(false);
    setMode(null);
    setSelectedinvoice(null);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/invoices"
        element={
          <PrivateRoute>
            <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-gray-900">
              <Navbar
                onLogout={handleLogout}
                onCreateInvoice={() => {
                  setMode("create");
                  setSelectedinvoice(null);
                  setShowModal(true);
                }}
              />
              <main className="flex flex-col min-h-screen bg-gray-200 dark:bg-gray-900 px-4">
                <AnimatePresence>
                  {showModal && (
                    <Modal
                      isOpen={showModal}
                      onRequestClose={closeModal}
                      shouldCloseOnOverlayClick={false}
                      contentLabel="Invoice Form"
                      className="flex items-center justify-center outline-none"
                      overlayClassName="fixed inset-0 backdrop-blur-sm bg-black/20 dark:bg-black/40 flex items-center justify-center z-50"
                    >
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
                      >
                        <button
                          onClick={closeModal}
                          className="absolute top-3 right-3 text-gray-800 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 text-2xl font-bold"
                        >
                          &times;
                        </button>

                        {(mode === "edit" || mode === "create") && (
                          <InvoiceForm
                            invoice={mode === "edit" ? selectedinvoice : null}
                            mode={mode}
                            onSaveSuccess={() => {
                              fetchInvoices();
                              setMode(null);
                              closeModal();
                            }}
                          />
                        )}
                      </motion.div>
                    </Modal>
                  )}
                </AnimatePresence>

                <Invoicelist
                  invoices={invoices}
                  loading={loading}
                  error={error}
                  onSelectInvoice={handleSelectInvoice}
                  onDeleteInvoice={handleDelete}
                />

                {mode == "view" && <InvoiceDetail invoice={selectedinvoice} />}
              </main>
              <footer className="bg-gray-800 dark:bg-gray-950 text-white text-center py-4">
                <p>&copy; 2025 Invoice Management. All rights reserved.</p>
              </footer>
            </div>
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/invoices" : "/login"} />}
      />
    </Routes>
  );
}

export default App;