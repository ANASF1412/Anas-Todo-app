import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    year: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) newErrors.username = "Username is required";
    else if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    else if (!/^[a-z0-9_-]+$/.test(formData.username))
      newErrors.username = "Username can only contain lowercase letters, numbers, underscores, and hyphens";

    // Email validation
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    // Password validation
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    else if (!/[a-z]/.test(formData.password))
      newErrors.password = "Password must contain at least one lowercase letter";
    else if (!/[A-Z]/.test(formData.password))
      newErrors.password = "Password must contain at least one uppercase letter";
    else if (!/[0-9]/.test(formData.password))
      newErrors.password = "Password must contain at least one digit";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.register(formData);
      const { user, token } = response.data.data;
      login(user, token);
      addToast("Registration successful!", "success");
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      addToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Join Us</h1>
            <p className="text-gray-300">Create your Todo account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.username ? "border-red-400" : "border-white/20"
                } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.email ? "border-red-400" : "border-white/20"
                } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.password ? "border-red-400" : "border-white/20"
                } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Optional Fields Row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Age (Optional)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Year (Optional)
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="">Select year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                </select>
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Department (Optional)
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Computer Science"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-gray-400">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="block w-full text-center py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
