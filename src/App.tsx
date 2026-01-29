import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Job from "./pages/Job";
import JobOffer from "./pages/JobOffer";
import JobPeople from "./pages/JobPeople";
import JobPeopleView from "./pages/JobPeopleView";
import JobPipeline from "./pages/JobPipeline";
import JobApplicants from "./pages/JobApplicants";
import JobBrain from "./pages/JobBrain";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import { EmbedScaleWrapper } from "./components/EmbedScaleWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <EmbedScaleWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/job" element={<Job />} />
            <Route path="/job/people" element={<JobPeople />} />
            <Route path="/job/people/view" element={<JobPeopleView />} />
            <Route path="/job/applicants" element={<JobApplicants />} />
            <Route path="/job/pipeline" element={<JobPipeline />} />
            <Route path="/job/brain" element={<JobBrain />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/joboffer" element={<JobOffer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EmbedScaleWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
