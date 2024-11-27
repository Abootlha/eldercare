import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const MissingPersonForm = () => {
  const navigate = useNavigate();

  // State for the form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    lastSeen: '',
    description: '',
    contactInfo: '',
    image: null,
  });

  // State for storing the list of missing persons
  const [missingPersons, setMissingPersons] = useState([]);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for loading indicator
  const [loading, setLoading] = useState(false);

  // State for error handling
  const [error, setError] = useState(null);

  const fetchMissingPersons = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        toast.error("Authentication token is missing");
        setError("No authentication token found");
        return;
      }
  
      const response = await fetch("http://localhost:3001/api/report/missing-persons", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
  
      const data = await response.json();
  
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch missing persons");
      }
  
      // Flexible data extraction
      const missingPersonsList = data.data || data.missingPersons || data;
      
  
      // Ensure we're setting an array
      setMissingPersons(Array.isArray(missingPersonsList) ? missingPersonsList : []);
    } catch (error) {
      console.error("Error fetching missing persons:", error);
      toast.error(error.message || "Unable to fetch missing persons");
      setError(error.message);
      setMissingPersons([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Load missing persons on component mount
  useEffect(() => {
    fetchMissingPersons();
  }, []);
  
  // Robust filtering with fallback
  const filteredPersons = missingPersons.filter((person) => {
    if (!person) return false;
    const personName = person.name?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return personName.includes(query);
  });

  // Convert date to dd-mm-yyyy format
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return 'Invalid Date';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Authentication token is missing');
      return;
    }
  
    try {
      const form = new FormData();
      form.append('fullName', formData.name);
      form.append('age', formData.age);
      
      // Format date to match backend expectation
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };
      form.append('lastSeenDate', formatDate(formData.lastSeen));
      
      form.append('description', formData.description);
      form.append('contactInfo', formData.contactInfo);
      
      // Debugging: log file before appending
      console.log('Image file to upload:', formData.image);
      
      // Ensure 'Image' matches backend expectation
      if (formData.image) {
        form.append('Image', formData.image, formData.image.name);
      } else {
        console.error('No image selected');
        toast.error('Please select an image');
        return;
      }
  
      const response = await fetch('http://localhost:3001/api/report/upload-data', {
        method: 'POST',
        body: form,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error('Upload error response:', responseData);
        toast.error(responseData.message || 'Submission failed');
        return;
      }
  
      toast.success('Report submitted successfully');
      navigate('/dashboard/reports');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit report');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form for submitting missing persons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Submit Missing Person Report
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                className="input-field mt-1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                required
                className="input-field mt-1"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Seen Date</label>
              <input
                type="date"
                required
                className="input-field mt-1"
                value={formData.lastSeen}
                onChange={(e) => setFormData({ ...formData, lastSeen: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={4}
                className="input-field mt-1"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Information</label>
              <input
                type="text"
                required
                className="input-field mt-1"
                value={formData.contactInfo}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                type="file"
                accept="image/*"
                className="mt-1"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              type="submit"
              className="w-full btn-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </motion.div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Missing Person"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Missing persons list */}
                <div className="w-full overflow-x-auto">
          <div className="flex space-x-6 pb-4">
            {filteredPersons.map((person) => (
              <div 
                key={person._id || Math.random()} 
                className="w-80 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
          {person.media && person.media.Image ? (
                  <img 
                    src={person.media.Image} 
                    alt={person.fullName || 'Missing Person'} 
                    className="w-full h-64 object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <svg 
                      className="w-16 h-16 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                )}

                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 truncate pr-2">
                      {person.fullName || 'Unknown Name'}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Age: {person.age || 'N/A'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg 
                        className="w-4 h-4 mr-2 text-gray-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                      <span className="truncate">Last Seen: {person.lastSeenDate}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <svg 
                        className="w-4 h-4 mr-2 text-gray-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                      <span className="truncate">
                        Description: {person.description || 'No description available'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <svg 
                        className="w-4 h-4 mr-2 text-gray-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                      </svg>
                      <span className="truncate">
                        Contact: {person.contactInfo || 'No contact info'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};