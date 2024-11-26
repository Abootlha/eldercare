import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the new missing person to the list
      const newMissingPerson = { ...formData, id: Date.now() }; // Adding an id for tracking
      setMissingPersons([newMissingPerson, ...missingPersons]);

      toast.success('Report submitted successfully');
      navigate('/dashboard/reports');
    } catch (error) {
      toast.error('Failed to submit report');
    }
  };

  // Filter missing persons based on the search query
  const filteredPersons = missingPersons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Submit Missing Person Report
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields */}
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
            >
              Submit Report
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Missing Persons List
          </h3>
          {filteredPersons.length === 0 ? (
            <p className="text-gray-600">No missing persons found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredPersons.map((person) => (
                <li key={person.id} className="p-4 border-b border-gray-200">
                  <h4 className="font-bold text-gray-900">{person.name}</h4>
                  <p className="text-gray-600">Age: {person.age}</p>
                  <p className="text-gray-600">Last Seen: {person.lastSeen}</p>
                  <p className="text-gray-600">Description: {person.description}</p>
                  <p className="text-gray-600">Contact: {person.contactInfo}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
