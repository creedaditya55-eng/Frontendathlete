import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const AthleteCard = ({ athlete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100 overflow-hidden flex flex-col">
      <div className="h-48 bg-gray-200 relative">
        {athlete.profilePhoto ? (
          <img src={athlete.profilePhoto} alt={athlete.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Photo
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
          {athlete.sport}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{athlete.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{athlete.position} • {athlete.age} yo</p>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <FaMapMarkerAlt className="mr-1" /> {athlete.location}
        </div>
        <Link to={`/athletes/${athlete._id}`} className="mt-auto block text-center w-full bg-gray-50 hover:bg-gray-100 text-blue-600 font-medium py-2 rounded-lg border border-gray-200 transition">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default AthleteCard;
