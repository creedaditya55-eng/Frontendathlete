import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Reset Password State
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [athleteID, setAthleteID] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
  };

  const handleResetSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
              email: resetEmail,
              athleteID,
              newPassword
          });
          toast.success('Password updated! Please login.');
          setShowReset(false);
          setEmail(resetEmail);
          setPassword('');
      } catch (error) {
          toast.error(error.response?.data?.message || 'Reset failed');
      }
  }

  if (showReset) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Reset Password</h2>
                <form onSubmit={handleResetSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required className="mt-1 block w-full border p-2 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Athlete ID</label>
                        <input type="text" value={athleteID} onChange={e => setAthleteID(e.target.value)} required className="mt-1 block w-full border p-2 rounded-md" placeholder="ATH-XXXXXX" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="mt-1 block w-full border p-2 rounded-md" />
                    </div>
                    <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">Reset Password</button>
                    <button type="button" onClick={() => setShowReset(false)} className="w-full text-gray-600 text-sm hover:underline">Cancel</button>
                </form>
            </div>
        </div>
      );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to AthleteHub</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Login
          </button>
          <div className="text-center mt-4">
              <button type="button" onClick={() => setShowReset(true)} className="text-sm text-blue-600 hover:underline">
                  Forgot Password? Reset with AthleteID
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
