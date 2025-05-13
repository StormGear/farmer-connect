
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
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/ErrorBoundary";
import MenuProvider from "./auth/context/MenuProvider";
import CartProvider from "./auth/context/CartProvider";

const queryClient = new QueryClient();

const App = () => (
     <ErrorBoundary
    FallbackComponent={Fallback}
    onReset={(details) => {
      // Reset the state of your app so the error doesn't happen again
      console.log('Resetting the UI', details);
    }} 
    >
  <QueryClientProvider client={queryClient}>
     <UserProvider>
  <MenuProvider>
  <CartProvider>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/farmer/dashboard/:id" 
          element={
            <ProtectedRoute allowedRoles={['farmer', 'buyer']}>
              <FarmerDashboard />
            </ProtectedRoute>
          } 
        />
          <Route 
            path="/products/:id" 
            element={
              <ProtectedRoute allowedRoles={['farmer', 'buyer']}>
                <ProductView />
              </ProtectedRoute>
            } 
          />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </MenuProvider>
     </UserProvider>
 </QueryClientProvider>
 </ErrorBoundary>
);

export default App;