import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HeaderNav } from "./components/Header";
import CustomerPage from "./Pages/CustomerPage";
import PoliciesPage from "./Pages/PoliciesPage";
import AddCustomerForm from "./Pages/AddCustomerForm";
import AddPolicyForm from "./Pages/AddPolicyForm";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        Page not found
      </div>
    );
  }
  // Convert path → active tab
  const activeTab = React.useMemo(() => {
    if (location.pathname === "/") return "customers";
    if (location.pathname === "/policies") return "policies";
    if (location.pathname === "/add-customer") return "add-customer";
    if (location.pathname === "/add-policy") return "add-policy";
    return "customers";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNav active={activeTab} onNavigate={navigate} />

      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border bg-card p-8">
          <Routes>
            <Route path="/" element={<CustomerPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/add-customer" element={<AddCustomerForm />} />
            <Route path="/add-policy" element={<AddPolicyForm />} />

            {/* Default Route */}
            <Route path="*" element={<CustomerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
