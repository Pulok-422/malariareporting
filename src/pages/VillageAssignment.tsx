// src/components/VillageAssignment.tsx
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
    <div>
      <h2 className="text-lg font-semibold mb-4">Assign Village to SK</h2>
      <div className="mb-4">
        <label htmlFor="skId" className="block text-sm font-medium text-gray-700">
          Select SK:
        </label>
        <select
          id="skId"
          value={skId}
          onChange={(e) => setSkId(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md"
        >
          <option value="">Select SK</option>
          {sks.map((sk) => (
            <option key={sk} value={sk}>
              {sk}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="village" className="block text-sm font-medium text-gray-700">
          Select Village:
        </label>
        <select
          id="village"
          value={selectedVillage}
          onChange={(e) => setSelectedVillage(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md"
        >
          <option value="">Select Village</option>
          {villages.map((village) => (
            <option key={village} value={village}>
              {village}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Assign
      </button>
    </div>
  );
};

export default VillageAssignment;
