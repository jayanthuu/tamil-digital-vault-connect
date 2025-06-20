
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import UserRegistration from "./pages/UserRegistration";
import DepartmentRegistration from "./pages/DepartmentRegistration";
import ProtectedDepartments from "./pages/ProtectedDepartments";
import DocumentAccess from "./pages/DocumentAccess";
import Services from "./pages/Services";
import TrackProgress from "./pages/TrackProgress";
import NotFound from "./pages/NotFound";
import DepartmentDashboard from "./pages/DepartmentDashboard";
import RequestDetails from "./pages/RequestDetails";
import ApprovalTracking from "./pages/ApprovalTracking";
import DocumentGeneration from "./pages/DocumentGeneration";
import GenerateCertificate from "./pages/GenerateCertificate";
import ArchitectureDiagramPage from "./pages/ArchitectureDiagram";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/departments" element={<ProtectedDepartments />} />
          <Route path="/documents/:departmentId" element={<DocumentAccess />} />
          <Route path="/services/:departmentId" element={<Services />} />
          <Route path="/track-progress" element={<TrackProgress />} />

          {/* Department Routes */}
          <Route path="/department" element={<DepartmentDashboard />} />
          <Route path="/department/register" element={<DepartmentRegistration />} />
          <Route path="/department/request/:requestId" element={<RequestDetails />} />
          <Route path="/department/approval-tracking" element={<ApprovalTracking />} />
          <Route path="/department/generate/:requestId" element={<DocumentGeneration />} />

          {/* Certificate and Architecture Routes */}
          <Route path="/generate-certificate" element={<GenerateCertificate />} />
          <Route path="/architecture" element={<ArchitectureDiagramPage />} />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
