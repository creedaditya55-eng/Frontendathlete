import { useEffect, useState } from 'react';
import axios from 'axios';
import AthleteCard from '../components/AthleteCard';

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    sport: '',
    position: '',
  });

  const fetchAthletes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters);
      // Remove empty params
      for (const [key, value] of params.entries()) {
        if (!value) params.delete(key);
      }
      
      const { data } = await axios.get(`/api/athletes?${params.toString()}`);
      setAthletes(data);
    } catch (error) {
      console.error('Error fetching athletes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAthletes();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Discover Athletes</h1>
      
      {/* Search Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name..."
              className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
            <input
              type="text"
              name="sport"
              value={filters.sport}
              onChange={handleFilterChange}
              placeholder="e.g. Basketball"
              className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              name="position"
              value={filters.position}
              onChange={handleFilterChange}
              placeholder="e.g. Point Guard"
              className="w-full border p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : athletes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {athletes.map((athlete) => (
            <AthleteCard key={athlete._id} athlete={athlete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No athletes found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default Athletes;
