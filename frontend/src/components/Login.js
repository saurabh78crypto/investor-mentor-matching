import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    const token = response.credential;

    const res = await googleAuth({ token });
    const data = await res.data;

    if(res.status === 200) {
      localStorage.setItem("userEmail", data.email)
      navigate("/dashboard");
    } else {
      console.error("Login failed:", data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login with Google</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.error("Login Failed")} />
    </div>
  );
};

export default Login;
