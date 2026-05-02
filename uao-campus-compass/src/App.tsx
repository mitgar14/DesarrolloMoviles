import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import AppLayout from "@/components/AppLayout";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Items from "@/pages/Items";
import NewItem from "@/pages/NewItem";
import ItemDetail from "@/pages/ItemDetail";
import Errands from "@/pages/Errands";
import NewErrand from "@/pages/NewErrand";
import ErrandDetail from "@/pages/ErrandDetail";
import MapPage from "@/pages/MapPage";
import Notifications from "@/pages/Notifications";
import Profile from "@/pages/Profile";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/new" element={<NewItem />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/errands" element={<Errands />} />
            <Route path="/errands/new" element={<NewErrand />} />
            <Route path="/errands/:id" element={<ErrandDetail />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
