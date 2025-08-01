import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUser, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo Section */}
        <div className="flex justify-center">
          <div className="bg-green-400 rounded-b-full w-48 h-24 flex items-end justify-center">
            <img
              src="/img/loginpic.png"
              alt="Login"
              className="w-24 h-24 -mb-10 rounded-full border-4 border-white"
            />
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white mt-10 p-6 rounded shadow-md space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block font-medium mb-1">Username</label>
            <div className="flex items-center border-b border-gray-400">
              <input
                type="email"
                {...register("email")}
                placeholder="PRAJESH SHAKYA"
                className="w-full px-2 py-2 outline-none text-gray-700 placeholder-gray-400"
              />
              <FiUser className="text-gray-500" />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <div className="flex items-center border-b border-gray-400">
              <input
                type="password"
                {...register("password")}
                className="w-full px-2 py-2 outline-none text-gray-700 placeholder-gray-400"
              />
              <FiEyeOff className="text-gray-500" />
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700"
          >
            Login
          </button>

          {/* Forgot Password */}
          <div className="text-center text-sm text-gray-500">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Don't Have an Account */}
          <div className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
