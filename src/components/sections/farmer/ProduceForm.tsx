import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import UploadImages from './UploadImages';
import waste from '@/assets/farm_produce.jpeg';
import UploadFileIcon from '@mui/icons-material/UploadFile';
=======
import waste from '@/assets/waste.jpeg';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Label } from '@/components/ui/label';
import { Input } from '@mui/material';
// import { X } from 'lucide-react';
import ImageUploadForm from './UploadImages';
import { useState } from 'react';
import { uploadProduce, uploadProduceImage } from '@/api/produce_upload';
import toast from 'react-hot-toast';
import { useUser } from '@/context/UserProvider';

export interface ImagePreview {
  name: string;
  url: string;
}
>>>>>>> refs/remotes/origin/main


const produceSchema = z.object({
  name: z.string().min(2, "Produce name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
<<<<<<< HEAD
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
=======
});

type ProduceFormData = z.infer<typeof produceSchema>;
>>>>>>> refs/remotes/origin/main

const ProduceUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
<<<<<<< HEAD
  } = useForm<ProduceForm>({
    resolver: zodResolver(produceSchema),
  });

  const onSubmit = (data: ProduceForm) => {
    console.log(data);
    // Handle form submission here
=======
    reset
  } = useForm<ProduceFormData>({
    resolver: zodResolver(produceSchema),
  });
  const [submitImages, setSubmitImages] = useState(false);
  const { user } = useUser();

  const onSubmit = async (data: ProduceFormData) => {
    
    const userId = user?.id || ""; // Replace with actual user ID

    try {
    console.log("Produce Form submitted:", data);
    setSubmitImages(true);
    // Add the produce data to Firestore
    const produceData = {
      user_id: userId, // Replace with actual user ID
      produce_name: data.name,
      produce_description: data.description,
      price: data.price,
    };
    const res = await uploadProduce(produceData);
    if (res.success) {
      console.log(res.message);
      toast.success("Produce uploaded successfully");
      reset(); // Reset the form after successful submission
      
      // Optionally, you can reset the form or redirect the user
    } else {
      console.error("Error uploading produce:", res.message);
      toast.error("Error uploading produce: " + res.message);
    }
  } catch (error) {
    console.error("Error in onSubmit:", error);
    toast.error("Error in onSubmit: " + error);
  }

  };

  const uploadImagesToFirestore = async (files: File[]) => {
    try {
    const userId = user?.id || ""; 
    
    console.log("Uploading images to Firestore:", files);
     // You can use Firebase Storage or any other service to upload the images
     /// upload the images

        for (let i = 0; i < files.length; i++) {
            const image = files[i];
            await uploadProduceImage(image, userId);
        }
        // After uploading, you can update the Firestore document with the image URLs
        console.log("Images uploaded successfully");
        toast.success("Images uploaded successfully");
      } catch (error) {
        // console.error("Error uploading images:", error);
        // toast.error("Error uploading images: " + error);
      } finally {
        setSubmitImages(false);
      }
  };

  const onInvalid = (errors: any) => {
    console.log("Form errors:", errors);
  
>>>>>>> refs/remotes/origin/main
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

<<<<<<< HEAD
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
=======
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
>>>>>>> refs/remotes/origin/main
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-6"
        >
          <div>
<<<<<<< HEAD
            <label className="block text-sm font-medium text-gray-700">
              Produce Name
            </label>
            <input
=======
            <Label className="block text-sm font-medium text-gray-700">
              Produce Name
            </Label>
            <Input
              placeholder="Enter produce name"
>>>>>>> refs/remotes/origin/main
              type="text"
              {...register("name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:!border-green-500 focus:!ring-green-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
<<<<<<< HEAD
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
=======
            <Label className="block text-sm font-medium text-gray-700">
              Description
            </Label>
            <Input
              placeholder="Enter produce description"
              multiline
              type="text"
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
=======
              <Label className="block text-sm font-medium text-gray-700">
                Price
              </Label>
              <Input
                type="number"
                placeholder="Enter price"
                {...register("price", { valueAsNumber: true })}
                className="mt-1 block w-md rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
>>>>>>> refs/remotes/origin/main
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
<<<<<<< HEAD
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
=======
           
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Images
            </Label>
             <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
        <ImageUploadForm onSubmit={uploadImagesToFirestore} submit={submitImages} />
        </div>
          
>>>>>>> refs/remotes/origin/main
          </div>
      
          <div className="flex justify-center w-full">
              <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
<<<<<<< HEAD
                  className="w-md text-center flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                 <UploadFileIcon/>  Upload Produce
=======
                  className="w-md cursor-pointer text-center flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                 <UploadFileIcon className='mr-2'/>  Upload Produce
>>>>>>> refs/remotes/origin/main
              </motion.button>
          </div>
      
        </motion.div>
      </form>
    </div>
  );
};

export default ProduceUploadForm;