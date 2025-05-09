import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import UploadImages from './UploadImages';
import waste from '@/assets/farm_produce.jpeg';
import UploadFileIcon from '@mui/icons-material/UploadFile';


const produceSchema = z.object({
  name: z.string().min(2, "Produce name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  unit: z.enum(["kg", "lbs", "pieces"], {
    required_error: "Please select a unit",
  }),
  category: z.enum(["vegetables", "fruits", "grains", "other"], {
    required_error: "Please select a category",
  }),
  images: z.object({
    images: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, "At least one image is required")
      .refine(
        (files) => Array.from(files).every(file => file.type.startsWith('image/')),
        "All files must be images"
      )
  })
});

type ProduceForm = z.infer<typeof produceSchema>;

const ProduceUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProduceForm>({
    resolver: zodResolver(produceSchema),
  });

  const onSubmit = (data: ProduceForm) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div>
         <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex items-center justify-center gap-4"
        >
          
          <div className="rounded-lg border-green-600 border-4"><img src={waste} alt="" className='w-32 h-32 rounded-md' /></div>
          
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-3">Upload Your Fresh Produce</h2>
            <p className="text-green-700 mb-2">
              Connect directly with buyers and sell your quality farm products
            </p>
            <div className="flex justify-center items-center gap-2 text-sm text-green-600">
              <i className="fas fa-store"></i>
              <span>From farm to table with transparent pricing</span>
            </div>
          </div>
        </motion.div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Produce Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:!border-green-500 focus:!ring-green-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <UploadImages />
            {errors.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
            )}
          </div>
      
          <div className="flex justify-center w-full">
              <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-md text-center flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                 <UploadFileIcon/>  Upload Produce
              </motion.button>
          </div>
      
        </motion.div>
      </form>
    </div>
  );
};

export default ProduceUploadForm;