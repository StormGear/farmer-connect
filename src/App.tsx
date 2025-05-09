
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// import '@coinbase/onchainkit/styles.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import "@radix-ui/themes/styles.css";
import Signup from "./components/sections/Signup";
import Login from "./components/sections/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import FarmerDashboard from "./components/sections/farmer/FarmerDashboard";
import { UserProvider } from "./auth/context/UserProvider";
import ProductView from "./components/sections/buyer/ProductView";
import  { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
  <UserProvider>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/farmer/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['farmer', 'buyer']}>
              <FarmerDashboard />
            </ProtectedRoute>
          } 
        />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute allowedRoles={['farmer', 'buyer']}>
                <ProductView />
              </ProtectedRoute>
            } 
          />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
 </QueryClientProvider>
);

export default App;