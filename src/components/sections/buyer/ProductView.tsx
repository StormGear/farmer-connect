import { useUser } from '@/context/UserProvider';
import Navigation from './Navigation';
import ProductCard from './ProductCard'
import { useMenu } from '@/context/MenuProvider';
import { useEffect } from 'react';
import { getAllProduceItems } from '@/api/produce_upload';
import toast from 'react-hot-toast';

// Mock data - replace with actual API call
const mockProducts = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 2.99,
    location: 'Kumasi, Ghana',
    image: '/tomatoes.jpg',
    farmer: 'John Doe'
  },
  // Add more mock products...
];

const ProductView = () => {
  const { menuItems, getProduceMenuItems } = useMenu();
  const { user} = useUser();

   useEffect(() => {
    const fetchMenuItems = async () => {
      if (user) {
        const response = await getProduceMenuItems();
        if (!response.success) {
          console.error('Error fetching produce items:', response.message);
          toast.error('Error fetching produce items: ' + response.message);
        } else {
          console.log('Fetched menu items:', response.success);
          // toast.success('Fetched menu items successfully');
        }
       
      }
    };
    fetchMenuItems();
  }, [user]);

    const handleAddToCart = (productId: string) => {
    // Implement cart functionality
    console.log('Adding to cart:', productId);
  };

   const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const userName = user?.name ? capitalizeFirstLetter(user.name) : '';

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Available Produce</h1>
         <div className="flex items-center mb-6">
            <i className="fas fa-leaf text-4xl text-green-600 mr-2"></i>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back{ user?.name ? `,${userName}!` : '!'}</h1>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductView;