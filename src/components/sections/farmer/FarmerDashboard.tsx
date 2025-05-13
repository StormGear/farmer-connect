import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardStats from './DashboardStats'
import ProduceForm from './ProduceForm';
import { useUser } from '@/auth/context/UserProvider';
import Repurpose from './Repurpose';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'upload' | 'repurpose'>('stats');
  const { user } = useUser();

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return <DashboardStats />;
      case 'upload':
        return <ProduceForm />;
      case 'repurpose':
        return <Repurpose />;
      default:
        return <DashboardStats />;
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const userName = user?.name ? capitalizeFirstLetter(user.name) : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="!max-w-7xl !mx-auto !px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <i className="fas fa-leaf text-4xl text-green-600 mr-2"></i>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back{ user?.name ? `,${userName}!` : '!'}</h1>
          </div>
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('stats')}
                className={`${
                  activeTab === 'stats'
                    ? '!border-green-500 !text-green-600 cursor-pointer'
                    : '!border-transparent !text-gray-500 hover:!text-gray-700 hover:!border-gray-300'
                } whitespace-nowrap !py-4 !px-1 !border-b-2 font-medium text-sm cursor-pointer`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`${
                  activeTab === 'upload'
                    ? '!border-green-500 !text-green-600 '
                    : '!border-transparent text-gray-500 hover:!text-gray-700 hover:!border-gray-300'
                } whitespace-nowrap !py-4 px-1 !border-b-2 font-medium text-sm cursor-pointer`}
              >
                Upload Produce
              </button>
              <button
                onClick={() => setActiveTab('repurpose')}
                className={`${
                  activeTab === 'repurpose'
                    ? '!border-green-500 !text-green-600'
                    : '!border-transparent text-gray-500 hover:!text-gray-700 hover:!border-gray-300'
                } whitespace-nowrap !py-4 px-1 !border-b-2 font-medium text-sm cursor-pointer`}
              >
                Repurpose Organic Waste
              </button>
            </nav>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;