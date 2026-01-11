import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaRunning, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-blue-600 font-bold text-xl">
              <FaRunning className="mr-2 text-2xl" />
              AthleteHub
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/athletes" className="text-gray-700 hover:text-blue-600 transition">Athletes</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
                <div className="flex items-center space-x-2">
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <FaUserCircle className="text-2xl text-gray-400" />
                  )}
                  <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
