import { useScrollToSection } from '@/hooks/use-scroll';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = useScrollToSection();


  const handleNavClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="flex justify-between items-center px-[5%] py-4 max-w-[1400px] mx-auto">
        <div className="flex items-center text-2xl font-bold !text-[#3b7d4a]">
          <i className="fas fa-leaf !text-[#72b01d] !mr-2"></i> FarmConnect
        </div>
        <ul className={`md:!flex items-center gap-8 ${isMenuOpen ? '!flex flex-col absolute top-[70px] left-0 w-full bg-white shadow-md p-4' : 'hidden md:flex'}`}>
          <li className="hover:text-[#3b7d4a] font-medium" onClick={(e) => handleNavClick(e, 'features')}>Features</li>
        
          <li className="hover:text-[#3b7d4a] font-medium" onClick={(e) => handleNavClick(e, 'how-it-works')}>How It Works</li>
          <li className="md:ml-4 flex gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-[#3b7d4a] border border-[#3b7d4a] rounded-lg hover:bg-[#3b7d4a] hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-[#3b7d4a] text-white rounded-lg hover:bg-[#2d6138] transition-colors"
            >
              Sign Up
            </Link>
          </li>
        </ul>
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </nav>
    </header>
  );
};

export default Navigation;
