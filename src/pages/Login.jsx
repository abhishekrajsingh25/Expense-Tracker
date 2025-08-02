import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import axiosConfig from "../util/AxiosConfig";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter valid email address");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError("");

    //login API Call
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user)); // ✅ persist user
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error("Something went wrong", error);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to login in
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={setEmail}
              label="Email"
              placeholder="Enter your Email Address"
              type="text"
            />

            <Input
              value={password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={setPassword}
              label="Password"
              placeholder="Enter your Password"
              type="password"
            />
            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              className={`w-full py-3 text-lg font-medium bg-purple-800 text-white rounded hover:bg-purple-600 cursor-pointer flex items-center justify-center gap-2 ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" size={20} />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?
              <Link
                to="/signup"
                className="font-medium text-purple-800 underline hover:text-purple-600 transition-colors"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
