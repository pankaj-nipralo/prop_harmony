import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo credentials for easy testing
  const demoCredentials = [
    {
      role: "landlord",
      email: "john.landlord@propertyharmony.com",
      password: "landlord123",
      name: "John Smith (Landlord)",
    },
    {
      role: "tenant",
      email: "mike.tenant@email.com",
      password: "tenant123",
      name: "Michael Chen (Tenant)",
    },
    {
      role: "property_manager",
      email: "alex.manager@propertyharmony.com",
      password: "manager123",
      name: "Alex Thompson (Property Manager)",
    },
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear errors when component mounts or form changes
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear errors when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleDemoLogin = (credentials) => {
    setFormData({
      email: credentials.email,
      password: credentials.password,
      rememberMe: false,
    });
    setSelectedRole(credentials.role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(formData);

      if (result.success) {
        // Redirect to intended page or role-based dashboard
        const from = location.state?.from;
        let redirectPath = "/";

        if (from) {
          redirectPath = from;
        } else {
          // Redirect to role-based dashboard
          switch (result.user.role) {
            case "landlord":
              redirectPath = "/landlord/dashboard";
              break;
            case "tenant":
              redirectPath = "/tenants/dashboard";
              break;
            case "property_manager":
              redirectPath = "/manager/dashboard";
              break;
            default:
              redirectPath = "/";
          }
        }

        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center w-full p-6 lg:w-1/2 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="p-8 bg-white shadow-lg rounded-xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
                <AlertCircle className="flex-shrink-0 w-5 h-5 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="flex items-center gap-2 mb-3 text-sm font-medium text-blue-900">
                <CheckCircle className="w-4 h-4" />
                Demo Accounts - Click to auto-fill:
              </h3>
              <div className="space-y-2">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.role}
                    type="button"
                    onClick={() => handleDemoLogin(cred)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedRole === cred.role
                        ? "bg-blue-200 text-blue-900"
                        : "bg-white text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {cred.name}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="block ml-2 text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.email || !formData.password}
                className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-500 border border-transparent rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed myButton"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="font-medium text-blue-500 transition-colors hover:text-blue-600"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Hero Image */}
      <div className="relative justify-center hidden overflow-hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center">
            <h1 className="mb-6 text-4xl font-bold">Welcome to Prop Harmony</h1>
            <p className="mb-8 text-xl text-blue-100">
              Your comprehensive property management solution. Manage
              properties, tenants, and finances all in one place.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-100">Properties Managed</div>
              </div>
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-blue-100">Happy Landlords</div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute w-32 h-32 rounded-full top-20 right-20 bg-white/10 blur-xl"></div>
        <div className="absolute w-24 h-24 rounded-full bottom-20 left-20 bg-white/10 blur-xl"></div>
      </div>
    </div>
  );
};

export default Login;
