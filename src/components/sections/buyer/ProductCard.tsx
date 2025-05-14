import { MenuItem } from '@/context/MenuProvider';
import { motion } from 'framer-motion';

interface ProductProps extends MenuItem {
  onAddToCart: (productId: string) => void;
}

const ProductCard = ({ id, name, price, description, image, onAddToCart }: ProductProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
       
        <p className="text-gray-600 mt-2">
         {description}
          </p>
        <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
        {/* <div className="mt-2 text-sm text-gray-600">
          <p>Farmer: {farmer}</p>
          <p>Location: {location}</p>
        </div> */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(id)}
          className="mt-4 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;