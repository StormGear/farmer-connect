
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// import '@coinbase/onchainkit/styles.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
<<<<<<< HEAD
import "@radix-ui/themes/styles.css";
=======
>>>>>>> refs/remotes/origin/main
import Signup from "./components/sections/Signup";
import Login from "./components/sections/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import FarmerDashboard from "./components/sections/farmer/FarmerDashboard";
<<<<<<< HEAD
import { UserProvider } from "./auth/context/UserProvider";
import ProductView from "./components/sections/buyer/ProductView";
import  { Toaster } from 'react-hot-toast';
=======
import { UserProvider } from "@/context/UserProvider";
import ProductView from "./components/sections/buyer/ProductView";
import  { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/ErrorBoundary";
import MenuProvider from "@/context/MenuProvider";
import CartProvider from "@/context/CartProvider";
import Cart from "./components/sections/buyer/cart/Cart";
>>>>>>> refs/remotes/origin/main

const queryClient = new QueryClient();

const App = () => (
<<<<<<< HEAD
  <QueryClientProvider client={queryClient}>
  <UserProvider>
=======
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
>>>>>>> refs/remotes/origin/main
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
<<<<<<< HEAD
          path="/farmer/dashboard" 
=======
          path="/farmer/dashboard/:id" 
>>>>>>> refs/remotes/origin/main
          element={
            <ProtectedRoute allowedRoles={['farmer', 'buyer']}>
              <FarmerDashboard />
            </ProtectedRoute>
          } 
        />
          <Route 
<<<<<<< HEAD
            path="/products" 
=======
            path="/products/:id" 
>>>>>>> refs/remotes/origin/main
            element={
              <ProtectedRoute allowedRoles={['farmer', 'buyer']}>
                <ProductView />
              </ProtectedRoute>
            } 
          />
<<<<<<< HEAD
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
 </QueryClientProvider>
=======
          <Route 
            path="/products/:id/cart" 
            element={
              <ProtectedRoute allowedRoles={['farmer', 'buyer']}>
                <Cart />
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
>>>>>>> refs/remotes/origin/main
);

export default App;