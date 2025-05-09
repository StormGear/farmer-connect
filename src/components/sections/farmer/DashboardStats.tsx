import { motion } from 'framer-motion';
import produce from '@/assets/produce.svg';
import dashboardImg from '@/assets/dashboard.png';

const DashboardStats = () => {
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
          { // display an empty state if no produce is available
            <div className="p-6 text-center">
              <div className="mt-4 flex flex-col items-center">
                <p className="text-green-500 font-bold ">It looks like you haven't added any produce yet.</p>
                <p className="text-green-500 font-bold">Add some produce to your listings!</p>
                <p className="text-green-500 font-bold">Click the <span>Upload Produce</span> Tab to get started.</p>
                <img src={produce} alt="Produce" className='mt-5 w-32 h-32 ' />
              </div>
            </div>
          }
         
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;