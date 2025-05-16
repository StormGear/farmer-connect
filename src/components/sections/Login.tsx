import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { loginUser } from "@/api/user_auth";
import { useUser } from "@/context/UserProvider";




const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .transform(str => str.toLowerCase()),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const onSubmit = async (data: LoginFormData) => {
    try {
    // Simulate a login process
    setLoading(true);
    const res = await loginUser(data);
    if (!res.success) {
      throw new Error(res.message);
    }
    toast.success('Logged in Successfully!', {
      position: "top-right",
    })
    if (res.data?.role === "farmer") {
      toast.success('Welcome Farmer!', {
        position: "top-right",
      })
      // set user state in context
      const user = {
        email: res.data.email,
        name: res.data.name,
        role: res.data.role,
        id: res.data.id,
      }
      setUser(user);

      navigate("/farmer/dashboard/"+user.id);
    }
    else if (res.data?.role === "buyer") {
      toast.success('Welcome Buyer!', {
        position: "top-right",
      })
      // set user state in context
      console.log("res.data", res.data)
      const user = {
        email: res.data.email,
        name: res.data.name,
        role: res.data.role,
        id: res.data.id,
      }
      setUser(user);
      navigate(`/products/${user.id}`);
    } else {
      toast.error('Invalid role!', {
        position: "top-right",
      })
      navigate("/");
    }
    reset();

    console.log(data);
    }
    catch (error) {
      console.error("Login failed:", error);
      toast.error(`Login failed. ${error}`);
    }
    finally {
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
          className="flex justify-center flex-col items-center"
        >
          <i className="fas fa-leaf text-5xl text-[#72b01d] !mb-6"></i>
          <h2 className="text-3xl font-bold text-center text-gray-800 !mb-8">
            Welcome Back to FarmConnect
           
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
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${
                errors.email ? '!border-red-500' : 'border-gray-300 focus:!ring-green-500'
              } focus:border-transparent outline-none transition-all`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {/* <Link 
                to="/forgot-password" 
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </Link> */}
            </div>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${
                errors.password ? '!border-red-500' : 'border-gray-300 focus:!ring-green-500'
              } focus:border-transparent outline-none transition-all`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 !bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center !mt-6 !text-gray-600"
        >
          Don't have an account?{" "}
          <Link to="/signup" className="!text-green-600 hover:underline">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;

