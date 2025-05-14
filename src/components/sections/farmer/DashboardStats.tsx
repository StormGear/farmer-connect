import { motion } from 'framer-motion';
import produce from '@/assets/produce.svg';
import dashboardImg from '@/assets/dashboard.png';
import { useEffect } from 'react';
import { useUser } from '@/context/UserProvider';
import { useCart } from '@/context/CartProvider';
import toast from 'react-hot-toast';

const DashboardStats = () => {
  const { user } = useUser();
  const { getProduceItems, produceItems } = useCart();

  useEffect(() => {
    const fetchProduceItems = async () => {
      if (user) {
        const response = await getProduceItems(user.id);
        if (!response.success) {
          console.error('Error fetching produce items:', response.message);
          toast.error('Error fetching produce items: ' + response.message);
        } else {
          console.log('Fetched produce items:', response.data);
          // toast.success('Fetched produce items successfully');
        }
       
      }
    };
    fetchProduceItems();
  }, [user]);

  return (
    <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex items-center justify-center gap-4"
        >
          <div className="rounded-lg border-green-600 border-4">
            <img src={dashboardImg} alt="Dashboard" className='w-32 h-32 rounded-md object-cover' />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-3">Farmer Dashboard</h2>
            <p className="text-green-700 mb-2">
              Track your sales, manage inventory and grow your farm business
            </p>
            <div className="flex justify-center items-center gap-2 text-sm text-green-600">
              <i className="fas fa-chart-line"></i>
              <span>Your farming business at a glance</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 p-6 rounded-lg"
        >
          <h3 className="text-lg font-medium text-green-800">Total Earnings</h3>
          <p className="text-3xl font-bold text-green-600">$2,450.00</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 p-6 rounded-lg"
        >
          <h3 className="text-lg font-medium text-green-800">Active Listings</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 p-6 rounded-lg"
        >
          <h3 className="text-lg font-medium text-green-800">Total Sales</h3>
          <p className="text-3xl font-bold text-green-600">45</p>
        </motion.div>
      </div>

      {/* Recent Produce List */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Produce</h3>
        <div className="bg-white shadow overflow-hidden rounded-lg">
          {/* Add your produce list table here */}
         {produceItems && produceItems.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {produceItems.map((item, index) => (
      <motion.div
        key={item.id || index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="relative h-48 bg-green-50">
          {item.images && item.images.length > 0 ? (
            <img
              className="w-full h-full object-cover"
              src={item.images[0]}
              alt={item.produce_name}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-500">
              <i className="fas fa-seedling text-4xl"></i>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900 mb-1">{item.produce_name}</h3>
            <p className="text-lg font-bold text-green-600">${item.price?.toFixed(2)}</p>
          </div>
          
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {item.produce_description}
          </p>
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div>
              <i className="far fa-calendar-alt mr-1"></i>
              {item.upload_date ? new Date(item.upload_date).toLocaleDateString() : 'N/A'}
            </div>
            
            <div className="flex space-x-3">
              <button className="text-indigo-600 hover:text-indigo-900 transition-colors">
                <i className="fas fa-edit mr-1"></i> Edit
              </button>
              <button className="text-red-600 hover:text-red-900 transition-colors">
                <i className="fas fa-trash mr-1"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
) : (
  emptyProduce()
)}
         
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;

function emptyProduce() {
  return <div className="p-6 text-center">
    <div className="mt-4 flex flex-col items-center">
      <p className="text-green-500 font-bold ">It looks like you haven't added any produce yet.</p>
      <p className="text-green-500 font-bold">Add some produce to your listings!</p>
      <p className="text-green-500 font-bold">Click the <span>Upload Produce</span> Tab to get started.</p>
      <img src={produce} alt="Produce" className='mt-5 w-32 h-32 ' />
    </div>
  </div>;
}
