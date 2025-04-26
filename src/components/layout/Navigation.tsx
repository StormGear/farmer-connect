
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConnectWalletButton from '../web3/ConnectWalletButton';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="flex justify-between items-center px-[5%] py-4 max-w-[1400px] mx-auto">
        <div className="flex items-center text-2xl font-bold text-[#3b7d4a]">
          <i className="fas fa-leaf text-[#72b01d] mr-2"></i> FarmConnect
        </div>
        <ul className={`md:flex items-center gap-8 ${isMenuOpen ? 'flex flex-col absolute top-[70px] left-0 w-full bg-white shadow-md p-4' : 'hidden md:flex'}`}>
          <li><Link to="#features" className="hover:text-[#3b7d4a] font-medium">Features</Link></li>
          <li><Link to="#how-it-works" className="hover:text-[#3b7d4a] font-medium">How It Works</Link></li>
          <li><Link to="#testimonials" className="hover:text-[#3b7d4a] font-medium">Testimonials</Link></li>
          <li><ConnectWalletButton /></li>
        </ul>
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </nav>
    </header>
  );
};

export default Navigation;
