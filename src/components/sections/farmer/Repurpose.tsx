
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import waste from '@/assets/waste.jpeg';

const repurposeSchema = z.object({
  wasteType: z.enum(['crop_residue', 'food_waste', 'manure', 'other'], {
    required_error: "Please select a waste type",
  }),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.enum(["kg", "tons"], {
    required_error: "Please select a unit",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupLocation: z.string().min(5, "Address must be at least 5 characters"),
  otherDetails: z.string().optional(),
});

type RepurposeForm = z.infer<typeof repurposeSchema>;

const Repurpose = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RepurposeForm>({
    resolver: zodResolver(repurposeSchema),
    defaultValues: {
      wasteType: undefined,
      unit: undefined,
      quantity: undefined,
      description: '',
      otherDetails: '',
    }
  });

  const onSubmit = async (data: RepurposeForm) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submitted data:', data);
      setShowSuccess(true);
      reset();
      toast.success('Your waste recycling request has been submitted!');
    } catch (error) {
      toast.error('There was an error submitting your request.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex items-center justify-center gap-4"
        >
         <div className="rounded-lg border-green-600 border-4"><img src={waste} alt="" className='w-32 h-32 rounded-md' /></div>
          <div>
              <h2 className="text-2xl font-bold text-green-800 mb-3">Repurpose Your Agricultural Waste</h2>
              <p className="text-green-700 mb-2">
                Turn your organic waste into valuable resources and earn crypto rewards
              </p>
              <div className="flex justify-center items-center gap-2 text-sm text-green-600">
                <i className="fas fa-recycle"></i>
                <span>Promoting sustainable farming through blockchain technology</span>
              </div>
          </div>
        </motion.div>
      </div>

      {showSuccess ? (
        <SuccessMessage setShowSuccess={setShowSuccess} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waste Type*
              </label>
              <select
                {...register("wasteType")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.wasteType ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select waste type</option>
                <option value="crop_residue">Crop Residue</option>
                <option value="food_waste">Food Waste</option>
                <option value="manure">Manure</option>
                <option value="other">Other</option>
              </select>
              {errors.wasteType && (
                <p className="text-red-500 text-sm mt-1">{errors.wasteType.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity*
                </label>
                <input
                  type="number"
                  min="1"
                  {...register("quantity", { valueAsNumber: true })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Amount"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit*
                </label>
                <select
                  {...register("unit")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.unit ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select unit</option>
                  <option value="kg">Kilograms</option>
                  <option value="tons">Tons</option>
                </select>
                {errors.unit && (
                  <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Describe the organic waste you want to recycle"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Date*
              </label>
              <input
                type="date"
                {...register("pickupDate")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.pickupDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.pickupDate && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupDate.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Location*
              </label>
              <input
                type="text"
                {...register("pickupLocation")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.pickupLocation ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Address for waste collection"
              />
              {errors.pickupLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              {...register("otherDetails")}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Any other information about your waste"
            />
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="text-green-800 font-medium mb-2 flex items-center gap-2">
              <i className="fas fa-coins text-green-600"></i>
              Reward Information
            </h3>
            <p className="text-green-700 text-sm mb-2">
              By recycling your organic waste, you'll earn FarmTokens that can be:
            </p>
            <ul className="text-sm text-green-600 space-y-1 ml-6 list-disc">
              <li>Used for purchasing farming supplies</li>
              <li>Exchanged for fiat currency</li>
              <li>Used for discounts on farming equipment</li>
              <li>Staked for additional rewards</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-recycle"></i>
                  Submit for Recycling
                </>
              )}
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
};

const SuccessMessage = ({ setShowSuccess }: { setShowSuccess: (show: boolean) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
        <i className="fas fa-check text-2xl text-green-600"></i>
      </div>
      <h3 className="text-xl font-bold text-green-800 mb-2">Request Submitted Successfully!</h3>
      <p className="text-gray-600 mb-6">
        Your recycling request has been submitted. You'll receive 
        <span className="text-green-700 font-medium"> FarmTokens </span>
        after your waste is collected and processed.
      </p>
      <div className="p-4 bg-green-50 rounded-lg mb-6">
        <h4 className="font-medium text-green-800 mb-2">Estimated Rewards</h4>
        <div className="flex justify-center items-center gap-2">
          <i className="fas fa-coins text-green-600"></i>
          <span className="text-lg font-bold text-green-700">25-40 FarmTokens</span>
        </div>
        <p className="text-xs text-green-600 mt-1">
          (Final amount depends on quality and weight verification)
        </p>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        A composting company representative will contact you 
        to confirm the pickup details.
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowSuccess(false)}
        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Submit Another Request
      </motion.button>
    </motion.div>
  );
};

export default Repurpose;