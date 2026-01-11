import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaRunning, FaVideo, FaUsers, FaGlobe } from 'react-icons/fa';

const Home = () => {
  const [stats, setStats] = useState({ athletes: 0, videos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/athletes/stats/public`);
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Sports Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Showcase Your <span className="text-blue-500">Talent</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10">
            The ultimate platform for athletes to build their profile, share highlight videos, and get discovered by the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg transition transform hover:scale-105"
            >
              Join Now
            </Link>
            <Link 
              to="/athletes" 
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold rounded-full text-lg transition transform hover:scale-105"
            >
              Browse Athletes
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-white">
            <div className="flex flex-col items-center p-6 bg-blue-700 rounded-xl shadow-lg transform hover:-translate-y-1 transition">
              <FaUsers className="text-5xl mb-4 text-blue-300" />
              <div className="text-4xl font-bold mb-2">
                {loading ? '...' : stats.athletes}
              </div>
              <div className="text-xl opacity-90">Registered Athletes</div>
            </div>
            <div className="flex flex-col items-center p-6 bg-blue-700 rounded-xl shadow-lg transform hover:-translate-y-1 transition">
              <FaVideo className="text-5xl mb-4 text-blue-300" />
              <div className="text-4xl font-bold mb-2">
                {loading ? '...' : stats.videos}
              </div>
              <div className="text-xl opacity-90">Videos Uploaded</div>
            </div>
          </div>
        </div>
      </div>

      {/* Details/Features Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why AthleteHub?</h2>
          <p className="mt-4 text-xl text-gray-600">Everything you need to take your sports career to the next level.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-6">
              <FaRunning />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Build Your Profile</h3>
            <p className="text-gray-600 leading-relaxed">
              Create a comprehensive athlete profile with your stats, position, achievements, and contact information all in one place.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition duration-300 border border-gray-100">
             <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mb-6">
              <FaVideo />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Video Highlights</h3>
            <p className="text-gray-600 leading-relaxed">
              Embed your best plays from YouTube directly into your profile. Let your performance speak for itself.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition duration-300 border border-gray-100">
             <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-6">
              <FaGlobe />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Get Discovered</h3>
            <p className="text-gray-600 leading-relaxed">
              Join a growing community of athletes. Share your profile link with scouts, coaches, and teammates easily.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">Ready to start?</h2>
            <p className="text-lg text-gray-600 mt-2">Join AthleteHub today and create your free profile.</p>
          </div>
          <div className="flex space-x-4">
             <Link 
              to="/register" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
