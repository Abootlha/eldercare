import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface MedicalRecord {
  id: string;
  condition: string;
  medication: string;
  lastUpdated: string;
}

export const MedicalData = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      condition: 'Asthma',
      medication: 'Albuterol',
      lastUpdated: '2024-03-01',
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newRecord, setNewRecord] = useState({
    condition: '',
    medication: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const record: MedicalRecord = {
      id: Math.random().toString(36).substr(2, 9),
      ...newRecord,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setRecords([...records, record]);
    setNewRecord({ condition: '', medication: '' });
    setIsAdding(false);
    toast.success('Medical record added');
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter((record) => record.id !== id));
    toast.success('Medical record deleted');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Medical Data Management
            </h2>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>Add Record</span>
            </button>
          </div>

          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Condition
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field mt-1"
                    value={newRecord.condition}
                    onChange={(e) =>
                      setNewRecord({ ...newRecord, condition: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medication
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field mt-1"
                    value={newRecord.medication}
                    onChange={(e) =>
                      setNewRecord({ ...newRecord, medication: e.target.value })
                    }
                  />
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary">
                    Save Record
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medication
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.condition}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.medication}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};