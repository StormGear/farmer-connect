import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
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


const produceSchema = z.object({
  name: z.string().min(2, "Produce name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
});

type ProduceFormData = z.infer<typeof produceSchema>;


const ProduceUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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


      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-6"
        >
          <div>

            <Label className="block text-sm font-medium text-gray-700">
              Produce Name
            </Label>
            <Input
              placeholder="Enter produce name"
              type="text"
              {...register("name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:!border-green-500 focus:!ring-green-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Description
            </Label>
            <Input
              placeholder="Enter produce description"
              multiline
              type="text"
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

              <Label className="block text-sm font-medium text-gray-700">
                Price
              </Label>
              <Input
                type="number"
                placeholder="Enter price"
                {...register("price", { valueAsNumber: true })}
                className="mt-1 block w-md rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

           
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Images
            </Label>
             <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
        <ImageUploadForm onSubmit={uploadImagesToFirestore} submit={submitImages} />
        </div>
      </div>
      
          <div className="flex justify-center w-full">
              <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-md cursor-pointer text-center flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                 <UploadFileIcon className='mr-2'/>  Upload Produce

              </motion.button>
          </div>
      
        </motion.div>
      </form>
    </div>
  );
};

export default ProduceUploadForm;