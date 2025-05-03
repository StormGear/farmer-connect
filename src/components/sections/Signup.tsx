import { motion } from "framer-motion";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Spinner } from "@radix-ui/themes";
import { addUser } from "@/api/user_auth";
import { toast } from "react-hot-toast";


const signupSchema = z.object({
    email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      "Please enter a valid email address"
    )
    .transform(str => str.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  role: z.enum(["farmer", "buyer"], {
    required_error: "Please select a role",
  }),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
});

export type SignupForm = z.infer<typeof signupSchema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignupForm) => {
    try {
      setLoading(true);
      const res = await addUser(data);
      if (!res.success) {
        throw new Error(res.message);
      }
      toast.success('Registered Successfully!')
      reset();

    } catch (e) {
      console.log(`Error logging in.. ${e}`);
      toast.error(`Error logging in.. ${e}`)


    } finally {
      setLoading(false);

    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className= "flex justify-center flex-col items-center"
        >
        <i className="fas fa-leaf text-4xl  !text-[#72b01d] !mr-2 my-5 "></i>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">

            Join FarmConnect
          </h2>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          > 
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${ errors.email ? '!border-red-500' : 'border-gray-300 focus:!ring-green-500'} focus:border-transparent outline-none transition-all`}
              placeholder="Enter your name"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          > 
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="name"
              {...register("name")}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${ errors.name? '!border-red-500' : 'border-gray-300 focus:!ring-green-500'} focus:border-transparent outline-none transition-all`}
              placeholder="Enter your email"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2  ${ errors.password ? '!border-red-500' : 'border-gray-300 focus:!ring-green-500'}  focus:border-transparent outline-none transition-all`}
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to join as a
            </label>
            <select
              {...register("role")}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${ errors.role ? '!border-red-500' : 'border-gray-300 focus:!ring-green-500'} focus:border-transparent outline-none transition-all`}
            >
              <option value="">Select your role</option>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 !bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
             {loading ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center !mt-6 text-gray-600"
        >
          Already have an account?{" "}
          <a href="/login" className="!text-green-600 hover:underline">
            Log in
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;