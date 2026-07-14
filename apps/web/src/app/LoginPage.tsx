import React, { useState, useEffect, useRef } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import api from "../api/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus email input on mount
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setMessage("Welcome back! Redirecting...");
        setTimeout(() => {
          window.location.href = "/portal/dashboard";
        }, 800);
      } else {
        setMessage(response.data.error || "Invalid credentials");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setMessage(
        err.response?.data?.error || "Invalid login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Brand Area */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-4 shadow-2xl border border-white/20">
              <span className="text-4xl">🏠</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Simpex Repipe
            </h1>
            <p className="text-indigo-100 text-lg">Customer Portal</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-indigo-100 mb-8">
              Sign in to access your project dashboard
            </p>

            <div className="space-y-5">
              {/* Email Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-indigo-100 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail
                      className={`h-5 w-5 transition-colors ${
                        focusedField === "email"
                          ? "text-indigo-200"
                          : "text-gray-300"
                      }`}
                    />
                  </div>
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    onKeyPress={handleKeyPress}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all backdrop-blur-sm"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-indigo-100 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      className={`h-5 w-5 transition-colors ${
                        focusedField === "password"
                          ? "text-indigo-200"
                          : "text-gray-300"
                      }`}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all backdrop-blur-sm"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-indigo-100 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <a
                  href="/portal/reset-password"
                  className="text-sm text-indigo-100 hover:text-white transition-colors font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Message Display */}
              {message && (
                <div
                  className={`text-center p-3 rounded-lg ${
                    message.includes("Welcome") || message.includes("success")
                      ? "bg-green-500/20 text-green-100 border border-green-400/30"
                      : "bg-red-500/20 text-red-100 border border-red-400/30"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>

            {/* Demo Credentials (for presentation) */}
            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-xs text-indigo-200 text-center mb-2 font-medium">
                Demo Credentials
              </p>
              <div className="text-xs text-indigo-100 space-y-1">
                <p className="text-center">demo@customer.com / password123</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-indigo-100 text-sm">
            <p>
              Need help? Contact us at{" "}
              <a
                href="tel:9494634694"
                className="text-white hover:underline transition-colors font-medium"
              >
                (949) 463-4694
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}
