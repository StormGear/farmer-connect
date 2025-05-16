<<<<<<< HEAD
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../auth/context/UserProvider';
import LogoutModal from './components/LogoutModal';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user } = useUser();
=======

import { Link } from 'react-router-dom';
import LogoutButton from '../Logout';
import { useUser } from '@/context/UserProvider';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartProvider';

const Navigation = () => {
  const {  setUser, user } = useUser();
  const { cartItems } = useCart();
>>>>>>> refs/remotes/origin/main

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="flex justify-between items-center px-[5%] py-4 max-w-[1400px] mx-auto">
        <Link to="/" className="flex items-center text-2xl font-bold text-[#3b7d4a]">
          <i className="fas fa-leaf text-[#72b01d] mr-2"></i> FarmConnect
        </Link>

        <div className="flex items-center gap-4">
          {/* {user && ( */}
            <>
<<<<<<< HEAD
              <Link to="/cart" className="text-gray-600 hover:text-green-600">
                <div className="relative">
                  <i className="fas fa-shopping-cart text-xl"></i>
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </div>
              </Link>
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="text-gray-600 hover:text-green-600"
              >
                <i className="fas fa-sign-out-alt text-xl"></i>
              </button>
=======
              <Link to={`/products/${user?.id}/cart`} className="text-gray-600 hover:text-green-600 mr-5">
                <div className="relative">
                  <i className="fas fa-shopping-cart text-xl "></i>
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </div>
              </Link>
             
                <LogoutButton logoutHandler={() => {
                  // Implement logout functionality
                  console.log('Logging out...');
                  setUser(null);
                  toast.success('Logged out successfully');
                }} />
            
      
>>>>>>> refs/remotes/origin/main
            </>
          {/* )} */}
        </div>
      </nav>

<<<<<<< HEAD
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
      />
=======
      
     
>>>>>>> refs/remotes/origin/main
    </header>
  );
};

export default Navigation;