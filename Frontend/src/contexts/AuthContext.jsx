import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

const baseURL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/login/`, {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      const data = response.data;
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong! Check your username and password.");
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/register/`, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (response.status === 201) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong during registration.");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens]);

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
