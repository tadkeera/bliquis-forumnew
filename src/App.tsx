import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import DoctorSupportForm from "./pages/DoctorSupportForm";
import ConsignmentForm from "./pages/ConsignmentForm";
import ExtraBonusForm from "./pages/ExtraBonusForm";
import Reports from "./pages/Reports";
import ReportsIndex from "./pages/ReportsIndex";
import DataManagement from "./pages/DataManagement";
import ActivationPage, { isActivated } from "./pages/ActivationPage";
import NotFound from "./pages/NotFound";
import { useAutoBackup } from "@/hooks/useAutoBackup";

const queryClient = new QueryClient();

const AppContent = () => {
  useAutoBackup();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/doctor-support" element={<DoctorSupportForm />} />
        <Route path="/consignment" element={<ConsignmentForm />} />
        <Route path="/extra-bonus" element={<ExtraBonusForm />} />
        <Route path="/reports" element={<ReportsIndex />} />
        <Route path="/reports/:type" element={<Reports />} />
        <Route path="/data-management" element={<DataManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [activated, setActivated] = useState(isActivated());

  if (!activated) {
    return <ActivationPage onActivated={() => setActivated(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
