import { useCart } from '@/context/CartProvider';
import { MenuItem } from '@/context/MenuProvider';
import { useUser } from '@/context/UserProvider';
import { CartItem } from '@/global';
import { Spinner } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface ProductProps extends MenuItem {
  onAddToCart: (item: CartItem) => Promise<void>;
}

const ProductCard = ({ id, name, price, description, images = [], onAddToCart }: ProductProps) => {
  const allImages = images.length > 0 ? images : [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [loadingState, setLoadingState] = useState({
    loading: false,
    success: false,
  });
  const { cart } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();
  
  // Auto-rotate carousel
  useEffect(() => {
    // Only set up rotation if we have multiple images
    if (allImages.length > 1) {
      intervalRef.current = window.setInterval(() => {
        if (!isPaused) {
          setCurrentImageIndex((prevIndex) => 
            prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
          );
        }
      }, 3000); // Change image every 3 seconds
    }
    
    // Clean up interval on component unmount
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [allImages.length, isPaused]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  // Pause rotation when hovering over the image
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleAddToCart = async () => {
    try {
      console.log(`isMenuItemInCart ${isMenuItemInCart(id)}`);
    if (isMenuItemInCart(id)) {
        navigate(`/products/${user?.id}/cart`)
        return;
      }
      setLoadingState({ loading: true, success: false });
      const cartItem: CartItem = {
        menuitem_id: id,
      };
    await onAddToCart(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Error adding to cart: " + error);
  } finally {
    setLoadingState({ loading: false, success: true });
    if (!isMenuItemInCart(id)) {
    toast.success("Added to cart successfully");
    }
  }
  };

  const isMenuItemInCart = (id: string) => {
    const cartItem = cart.find((item) => item.id === id) as CartItem | undefined;
    return cartItem !== undefined;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >

      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {allImages.length > 0 ? (
          <div className="relative h-48 overflow-hidden">
            {allImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  index === currentImageIndex ? 'translate-x-0' : 
                  index < currentImageIndex ? '-translate-x-full' : 'translate-x-full'
                }`}
                style={{ zIndex: index === currentImageIndex ? 10 : 0 }}
              >
                <img 
                  src={img} 
                  alt={`${name} - image ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-48 bg-green-50 flex items-center justify-center">
            <i className="fas fa-seedling text-green-500 text-4xl"></i>
          </div>
        )}
        
        {allImages.length > 1 && (
          <>
            <button 
              onClick={() => {
                prevImage();
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 5000); // Resume auto-rotation after 5 seconds
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 text-green-700 z-20"
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              onClick={() => {
                nextImage();
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 5000); // Resume auto-rotation after 5 seconds
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 text-green-700 z-20"
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-20">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 5000); // Resume auto-rotation after 5 seconds
                  }}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2 line-clamp-2">{description}</p>
        <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="mt-4 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
            {(() => {
            switch (loadingState.success) {
              case true:
                return 'Go to Cart';
              case false:
                return  loadingState.loading ? <div className="flex items-center justify-center">
                  <Spinner />
                </div> : isMenuItemInCart(id) ? 'Go to Cart' : 'Add to Cart';
              default:
                return  'Go to Cart';
            }
            })()}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;