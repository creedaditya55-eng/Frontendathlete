import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoEmbed from '../components/VideoEmbed';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/athletes/${id}`);
        setAthlete(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAthlete();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!athlete) return <div className="text-center mt-10">Athlete not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
       <div className="bg-white rounded-xl shadow-md overflow-hidden">
             <div className="bg-gray-800 h-48 relative">
                 <div className="absolute -bottom-16 left-8">
                     <img src={athlete.profilePhoto || 'https://via.placeholder.com/150'} className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white" />
                 </div>
            </div>
             <div className="pt-20 px-8 pb-8">
                  <h1 className="text-3xl font-bold text-gray-900">{athlete.name}</h1>
                  <p className="text-gray-600 text-lg font-medium">{athlete.sport} • {athlete.position}</p>
                  
                  <div className="flex items-center mt-2 text-gray-500">
                      <FaMapMarkerAlt className="mr-2" /> {athlete.location}
                  </div>
                  
                   <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="md:col-span-1 space-y-6">
                           <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                               <h3 className="font-bold text-lg mb-4 border-b pb-2">About</h3>
                               <div className="space-y-3">
                                   <p><span className="font-semibold text-gray-700">Age:</span> {athlete.age}</p>
                                   <p><span className="font-semibold text-gray-700">Contact:</span> {athlete.contact}</p>
                                   <p><span className="font-semibold text-gray-700">Email:</span> {athlete.email}</p>
                               </div>
                           </div>
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                               <h3 className="font-bold text-lg mb-4 border-b pb-2">Achievements</h3>
                               <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{athlete.achievements || "No achievements listed yet."}</p>
                           </div>
                       </div>
                       
                       <div className="md:col-span-2">
                           <h3 className="text-2xl font-bold mb-6 text-gray-900">Highlights</h3>
                           <div className="grid grid-cols-1 gap-8">
                                {athlete.videos?.map(video => (
                                    <div key={video._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                                        <VideoEmbed url={video.url} platform={video.platform} />
                                        <div className="p-4">
                                            <p className="font-bold text-lg">{video.title}</p>
                                        </div>
                                    </div>
                                ))}
                                {athlete.videos?.length === 0 && <p className="text-gray-500 italic">No videos uploaded yet.</p>}
                           </div>
                       </div>
                   </div>
             </div>
       </div>
    </div>
  );
};

export default Profile;
