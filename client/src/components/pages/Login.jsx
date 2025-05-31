import { useState } from "react";
import api from "../../api/axios";
import { Toaster, toast } from "sonner";
import { login } from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handlSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/user/login", formData);
      if (
        res.data.message === "Invalid credentials" ||
        res.data.message === "Invalid password"
      ) {
        toast.error(res.data.message);
      } else {
        dispatch(login(res.data));

        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
          <Toaster />
          <form onSubmit={handlSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-gray-400 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <a
                href="/forgot-password"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-black hover:text-gray-800"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
