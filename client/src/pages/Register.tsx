import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "admin"]).optional(),
  course: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data);
    // TODO: Add register API call here
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            {...register("fullName")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            disabled={isSubmitting}
          />
          {errors.fullName && (
            <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            {...register("role")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            disabled={isSubmitting}
          >
            <option value="">Select role (optional)</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Course</label>
          <input
            type="text"
            {...register("course")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            disabled={isSubmitting}
          />
          {errors.course && (
            <p className="text-red-600 text-sm mt-1">{errors.course.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <div className="text-center text-sm mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
