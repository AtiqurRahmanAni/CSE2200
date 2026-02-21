import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/users/profile");
        const { data } = response;
        setUser(data);
      } catch (err) {
        if (err.response) {
          setUser(null);
          navigate("/login");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleError = (err) => {
    if (err.response) {
      toast.error(err.response.data.error);
      if (err.response.status === 401) {
        setUser(null);
        navigate("/login");
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const { data } = response;
      setUser(data);
      toast.success("Login successful");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      const response = await axiosInstance.post("/auth/logout", {});
      const { data } = response;
      toast.success(data.message);
      setUser(null);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, setUser, handleError }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
