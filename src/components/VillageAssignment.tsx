import React, { useState } from 'react';

const VillageAssignment = () => {
  const [selectedVillage, setSelectedVillage] = useState("");
  const [skId, setSkId] = useState("");

  // Placeholder village data (replace with actual data from your backend or state)
  const villages = ["Village 1", "Village 2", "Village 3"];
  const sks = ["SK1", "SK2", "SK3"];

  const handleSubmit = () => {
    // Placeholder submission logic
    alert(`Assigned ${selectedVillage} to ${skId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Assign Village to SK</h2>

      <div className="space-y-4">
        {/* SK Selection */}
        <div className="mb-4">
          <label htmlFor="skId" className="block text-xs font-medium text-gray-700">
            Select SK:
          </label>
          <select
            id="skId"
            value={skId}
            onChange={(e) => setSkId(e.target.value)}
            className="mt-1 block w-full p-3 border rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select SK</option>
            {sks.map((sk) => (
              <option key={sk} value={sk}>
                {sk}
              </option>
            ))}
          </select>
        </div>

        {/* Village Selection */}
        <div className="mb-4">
          <label htmlFor="village" className="block text-xs font-medium text-gray-700">
            Select Village:
          </label>
          <select
            id="village"
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="mt-1 block w-full p-3 border rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Village</option>
            {villages.map((village) => (
              <option key={village} value={village}>
                {village}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-start mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs transition duration-200"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default VillageAssignment;
