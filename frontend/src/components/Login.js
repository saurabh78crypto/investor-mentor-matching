import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { getAuthToken, getToken } from "../utils/loginUtils";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      const token = getToken(response);
      const data = await getAuthToken(token);
      saveUserEmailAndNavigateToDashboard(data, navigate);

    } catch (error) {
        console.error(error);
    }
  };

  const saveUserEmailAndNavigateToDashboard  = (data, navigate) => {
    localStorage.setItem("userEmail", data.email);
    navigate("/dashboard");
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login with Google</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={(error) => console.error(error)} />
    </div>
  );
};

export default Login;
