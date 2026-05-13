import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleOwnerLogin = () => {

    const fakeOwnerToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvd25lckBnbWFpbC5jb20iLCJyb2xlIjoiT1dORVIifQ.fake-signature";

    login(fakeOwnerToken);

    navigate("/owner-dashboard", {
      replace: true,
    });
  };

  const handleConsumerLogin = () => {

    const fakeConsumerToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjb25zdW1lckBnbWFpbC5jb20iLCJyb2xlIjoiQ09OU1VNRVIifQ.fake-signature";

    login(fakeConsumerToken);

    navigate("/consumer-dashboard", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">

        <div className="flex flex-col items-center">

          <div className="bg-blue-100 p-4 rounded-2xl">
            <BookOpen
              size={40}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-6">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3 text-center">
            Login to continue to your Book Exchange dashboard
          </p>

        </div>

        <div className="mt-10 space-y-5">

          <button
            onClick={handleOwnerLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
          >
            Login as Owner
          </button>

          <button
            onClick={handleConsumerLogin}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
          >
            Login as Consumer
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;