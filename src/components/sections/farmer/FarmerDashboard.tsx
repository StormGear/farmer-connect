import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardStats from './DashboardStats'
import ProduceForm from './ProduceForm';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'upload'>('stats');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="!max-w-7xl !mx-auto !px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('stats')}
                className={`${
                  activeTab === 'stats'
                    ? '!border-green-500 !text-green-600'
                    : '!border-transparent !text-gray-500 hover:!text-gray-700 hover:!border-gray-300'
                } whitespace-nowrap !py-4 !px-1 !border-b-2 font-medium text-sm`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`${
                  activeTab === 'upload'
                    ? '!border-green-500 !text-green-600'
                    : '!border-transparent text-gray-500 hover:!text-gray-700 hover:!border-gray-300'
                } whitespace-nowrap !py-4 px-1 !border-b-2 font-medium text-sm`}
              >
                Upload Produce
              </button>
            </nav>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'stats' ? <DashboardStats /> : <ProduceForm />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;