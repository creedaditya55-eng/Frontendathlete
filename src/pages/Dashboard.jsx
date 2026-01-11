import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import VideoEmbed from '../components/VideoEmbed';

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({ ...user });
  const [newVideo, setNewVideo] = useState({ url: '', platform: 'youtube', title: '' });
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/athletes/profile`, formData, config);
        updateUser({...user, ...data});
        toast.success('Profile Updated');
    } catch (error) {
        toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddVideo = async (e) => {
      e.preventDefault();
      try {
          const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/athletes/video`, newVideo, config);
        updateUser({...user, videos: data});
        setNewVideo({ url: '', platform: 'youtube', title: '' });
        toast.success('Video Added');
      } catch (error) {
          console.error('Add video error:', error);
          const message = error.response?.data?.message || 'Failed to add video';
          toast.error(message);
      }
  }

   const handleRemoveVideo = async (videoId) => {
      if(!window.confirm('Are you sure?')) return;
      try {
          const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/athletes/video/${videoId}`, config);
        updateUser({...user, videos: data});
        toast.success('Video Removed');
      } catch (error) {
          console.error('Remove video error:', error);
          toast.error('Failed to remove video');
      }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-800 h-32 md:h-48 relative">
                 <div className="absolute -bottom-16 left-8">
                     <img src={user.profilePhoto || 'https://via.placeholder.com/150'} className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white" />
                 </div>
            </div>
            <div className="pt-20 px-8 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                     <div>
                         <h1 className="text-3xl font-bold">{user.name}</h1>
                         <p className="text-gray-600">{user.sport} • {user.position}</p>
                     </div>
                     <div className="flex space-x-2">
                        <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded-md transition ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            Edit Profile
                        </button>
                        <button onClick={() => setActiveTab('videos')} className={`px-4 py-2 rounded-md transition ${activeTab === 'videos' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            Manage Videos
                        </button>
                     </div>
                </div>

                <div className="mt-8 border-t pt-8">
                    {activeTab === 'profile' ? (
                        <div>
                             <h2 className="text-xl font-bold mb-4">Profile Details</h2>
                             
                             {/* Static Details Section */}
                             <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                                <h3 className="font-semibold text-gray-800 mb-4 border-b pb-2">Public Profile Preview</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    <div><span className="text-gray-500 text-sm block">Name</span> <p className="font-medium">{user.name}</p></div>
                                    <div><span className="text-gray-500 text-sm block">Age</span> <p className="font-medium">{user.age}</p></div>
                                    <div><span className="text-gray-500 text-sm block">Sport</span> <p className="font-medium">{user.sport}</p></div>
                                    <div><span className="text-gray-500 text-sm block">Position</span> <p className="font-medium">{user.position}</p></div>
                                    <div><span className="text-gray-500 text-sm block">Location</span> <p className="font-medium">{user.location}</p></div>
                                    <div><span className="text-gray-500 text-sm block">Contact</span> <p className="font-medium">{user.contact}</p></div>
                                    <div className="md:col-span-2">
                                        <span className="text-gray-500 text-sm block">Achievements</span>
                                        <p className="font-medium mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded">{user.achievements || 'No achievements listed.'}</p>
                                    </div>
                                </div>
                             </div>
                             
                             {/* Athlete ID Warning Section */}
                             <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl">⚠️</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-yellow-800">Unique Athlete ID</h3>
                                        <p className="text-yellow-700 font-medium text-lg my-1 bg-white inline-block px-3 py-1 rounded border border-yellow-300">
                                            {user.athleteID || 'Generating...'}
                                        </p>
                                        <p className="text-sm text-yellow-800 mt-2 font-semibold">
                                            Always Remember athleteID. You will need this to reset your password if you forget it.
                                        </p>
                                    </div>
                                </div>
                             </div>

                             {/* Registered Credentials Section */}
                             <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                                <h3 className="font-semibold text-blue-800 mb-2">Registered Credentials</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Login ID)</label>
                                        <input type="email" value={formData.email} disabled className="border p-2 w-full rounded-md bg-gray-100 text-gray-500 cursor-not-allowed" />
                                        <p className="text-xs text-gray-500 mt-1">This email is used to log in.</p>
                                    </div>
                                    <div>
                                         <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                         <input 
                                            type="password" 
                                            placeholder="Leave blank to keep current" 
                                            onChange={e => setFormData({...formData, password: e.target.value})} 
                                            className="border p-2 w-full rounded-md" 
                                         />
                                    </div>
                                </div>
                             </div>

                             <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-2 w-full rounded-md" />
                                 </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="border p-2 w-full rounded-md" />
                                 </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                                    <input type="text" value={formData.sport} onChange={e => setFormData({...formData, sport: e.target.value})} className="border p-2 w-full rounded-md" />
                                 </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                    <input type="text" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="border p-2 w-full rounded-md" />
                                 </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="border p-2 w-full rounded-md" />
                                 </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                                    <input type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="border p-2 w-full rounded-md" />
                                 </div>
                                 <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
                                    <textarea value={formData.achievements} onChange={e => setFormData({...formData, achievements: e.target.value})} className="border p-2 w-full rounded-md h-32"></textarea>
                                 </div>
                                 <div className="md:col-span-2">
                                     <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
                                         {loading ? 'Saving...' : 'Save Changes'}
                                     </button>
                                 </div>
                             </form>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-bold mb-4">My Videos</h2>
                            <form onSubmit={handleAddVideo} className="mb-8 p-6 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                <div className="md:col-span-3">
                                    <label className="block text-sm font-medium mb-1">Platform</label>
                                    <select 
                                        value={newVideo.platform} 
                                        onChange={e => setNewVideo({...newVideo, platform: e.target.value})} 
                                        className="border p-2 w-full rounded-md"
                                    >
                                        <option value="youtube">YouTube</option>
                                        <option value="google_drive">Google Drive</option>
                                    </select>
                                </div>
                                <div className="md:col-span-4">
                                    <label className="block text-sm font-medium mb-1">Video URL</label>
                                    <input type="text" value={newVideo.url} onChange={e => setNewVideo({...newVideo, url: e.target.value})} className="border p-2 w-full rounded-md" placeholder="https://..." required />
                                </div>
                                 <div className="md:col-span-3">
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} className="border p-2 w-full rounded-md" placeholder="Game Highlights" required />
                                </div>
                                <div className="md:col-span-2">
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full">Add</button>
                                </div>
                            </form>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {user.videos?.map(video => (
                                    <div key={video._id} className="bg-white rounded-lg shadow overflow-hidden group">
                                        <VideoEmbed url={video.url} platform={video.platform} />
                                        <div className="p-4 flex justify-between items-center">
                                            <span className="font-medium text-gray-900 truncate">{video.title}</span>
                                            <button onClick={() => handleRemoveVideo(video._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                                        </div>
                                    </div>
                                ))}
                                {(!user.videos || user.videos.length === 0) && (
                                    <p className="text-gray-500 col-span-full text-center py-10">No videos added yet.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
