import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: '', sport: '', position: '', location: '', achievements: '', contact: '',
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (profilePhoto) data.append('profilePhoto', profilePhoto);

    const success = await register(data);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen py-10 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Join AthleteHub</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="name" required className="mt-1 block w-full border p-2 rounded-md" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" required className="mt-1 block w-full border p-2 rounded-md" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" required className="mt-1 block w-full border p-2 rounded-md" onChange={handleChange} />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input type="number" name="age" required className="mt-1 block w-full border p-2 rounded-md" onChange={handleChange} />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Sport</label>
            <input type="text" name="sport" required className="mt-1 block w-full border p-2 rounded-md" onChange={handleChange} />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input type="text" name="position" required className="mt-1 block w-full border p-2 rounded-md" onChange={handleChange} />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" required className="mt-1 block w-full border p-2 rounded-md" onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Achievements</label>
            <textarea name="achievements" className="mt-1 block w-full border p-2 rounded-md" onChange={handleChange}></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Contact Info</label>
            <input type="text" name="contact" className="mt-1 block w-full border p-2 rounded-md" onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <input type="file" accept="image/*" className="mt-1 block w-full" onChange={handleFileChange} />
          </div>

          <button type="submit" className="md:col-span-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
