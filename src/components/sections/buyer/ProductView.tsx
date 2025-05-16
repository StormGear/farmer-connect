import { useUser } from '@/context/UserProvider';
import Navigation from './Navigation';
import ProductCard from './ProductCard'
import { useMenu } from '@/context/MenuProvider';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartProvider';
import { CartItem } from '@/global';
import ShimmerEffect from '@/components/ShimmerEffect';

const ProductView = () => {
  const { menuItems, getProduceMenuItems } = useMenu();
  const { addToCart} = useCart();
  const { user} = useUser();
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    const fetchMenuItems = async () => {
      try {
      setLoading(true);
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
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Error fetching menu items: ' + error);
    } finally {
      setLoading(false);
    }
    };
    fetchMenuItems();
  }, [user]);

  const handleAddToCart = async (item: CartItem) => {
      try {
        const response = await addToCart(item);
        if (!response.success) {
          console.error('Error adding to cart:', response.message);
          toast.error('Error adding to cart: ' + response.message);
        } else {
          console.log('Added to cart successfully:', response.message);
          toast.success('Added to cart successfully');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Error adding to cart: ' + error);
      }
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
        <h1 className="text-3xl font-bold text-gray-800 my-5">
          Available Produce</h1>
         <div className="flex items-center mb-6">
            <i className="fas fa-leaf text-4xl text-green-600 mr-2"></i>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back{ user?.name ? `,${userName}!` : '!'}</h1>
          </div>
          {loading && (
            <div className="flex justify-center items-center">
              <ShimmerEffect />
            </div>
          )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && menuItems.length === 0 && (
  <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 px-4">
    <div className="text-center">
      <div className="mb-6 bg-green-50 rounded-full p-6 inline-block">
        <i className="fas fa-seedling text-5xl text-green-500"></i>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">No Produce Available</h2>
      <p className="text-gray-600 max-w-md mb-8">
        We're waiting for local farmers to add their fresh produce. 
        Check back soon for farm-fresh vegetables, fruits, and more!
      </p>
      <div className="space-y-4">
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
        >
          <i className="fas fa-sync-alt mr-2"></i> Refresh Page
        </button>
        
        <div className="mt-10">
          <p className="text-sm text-green-700 font-medium mb-2">Are you a farmer?</p>
          <a 
            href="/login" 
            className="text-green-600 hover:text-green-800 underline font-medium"
          >
            Login to add your produce
          </a>
        </div>
      </div>
    </div>
    
    <div className="flex flex-wrap justify-center gap-4 mt-12 text-center w-full max-w-2xl">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100 flex-1 min-w-[150px]">
        <i className="fas fa-carrot text-orange-500 text-xl mb-2"></i>
        <p className="text-gray-500">Vegetables</p>
        <p className="text-gray-400 text-sm">Coming soon</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100 flex-1 min-w-[150px]">
        <i className="fas fa-apple-alt text-red-500 text-xl mb-2"></i>
        <p className="text-gray-500">Fruits</p>
        <p className="text-gray-400 text-sm">Coming soon</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100 flex-1 min-w-[150px]">
        <i className="fas fa-egg text-yellow-500 text-xl mb-2"></i>
        <p className="text-gray-500">Dairy</p>
        <p className="text-gray-400 text-sm">Coming soon</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100 flex-1 min-w-[150px]">
        <i className="fas fa-wheat-awn text-amber-600 text-xl mb-2"></i>
        <p className="text-gray-500">Grains</p>
        <p className="text-gray-400 text-sm">Coming soon</p>
      </div>
    </div>
  </div>
)}
          {!loading && menuItems.length > 0 && (
            <div className="">
              {menuItems.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
      
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductView;