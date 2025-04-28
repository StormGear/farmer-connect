import Navigation from './Navigation';
import ProductCard from './ProductCard'

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
  const handleAddToCart = (productId: string) => {
    // Implement cart functionality
    console.log('Adding to cart:', productId);
  };

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Produce</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
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