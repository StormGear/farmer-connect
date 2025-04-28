import { motion } from 'framer-motion';

const DashboardStats = () => {
  return (
    <div className="space-y-6">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;