import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('athleteUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      setUser(data);
      localStorage.setItem('athleteUser', JSON.stringify(data));
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await axios.post( `${import.meta.env.VITE_API_URL}/api/auth/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(data);
      localStorage.setItem('athleteUser', JSON.stringify(data));
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('athleteUser');
    toast.success('Logged out');
  };

  const updateUser = (updatedData) => {
    setUser(updatedData);
    localStorage.setItem('athleteUser', JSON.stringify(updatedData));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
