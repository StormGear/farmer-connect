import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserProvider';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg p-6 shadow-xl z-10 w-full max-w-md mx-4"
          >
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;