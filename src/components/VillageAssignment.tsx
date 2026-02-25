import React, { useState, useEffect } from "react";

// Assuming users are passed as a prop
const VillageAssignment = ({ users }) => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [skId, setSkId] = useState("");

  // Get SKs from users
  const sks = users.filter(user => user.role === "sk").map(user => user.name);

  // Placeholder data for districts, upazilas, unions, villages, and wards
  const districts = ["District 1", "District 2", "District 3"];
  const upazilas = ["Upazila 1", "Upazila 2", "Upazila 3"];
  const unions = ["Union 1", "Union 2", "Union 3"];
  const villages = ["Village 1", "Village 2", "Village 3"];
  const wards = ["Ward 1", "Ward 2", "Ward 3"];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Assigned SK ${skId} to Village: ${selectedVillage}, Ward: ${selectedWard}, Union: ${selectedUnion}, Upazila: ${selectedUpazila}, District: ${selectedDistrict}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Assign Village to SK</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* District and Upazila Selection */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="district" className="block text-xs font-medium text-gray-700">
              Select District:
            </label>
            <select
              id="district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="mt-1 block w-full p-3 border rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="upazila" className="block text-xs font-medium text-gray-700">
              Select Upazila:
            </label>
            <select
              id="upazila"
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              className="mt-1 block w-full p-3 border rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Union and Village Selection */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="union" className="block text-xs font-medium text-gray-700">
              Select Union:
            </label>
            <select
              id="union"
              value={selectedUnion}
              onChange={(e) => setSelectedUnion(e.target.value)}
              className="mt-1 block w-full p-3 border rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Union</option>
              {unions.map((union) => (
                <option key={union} value={union}>
                  {union}
                </option>
              ))}
            </select>
          </div>

          <div>
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
        </div>

        {/* Ward Selection */}
        <div className="mb-4">
          <label htmlFor="ward" className="block text-xs font-medium text-gray-700">
            Select Ward:
          </label>
          <select
            id="ward"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="mt-1 block w-full p-3 border rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Ward</option>
            {wards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-start mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs transition duration-200"
          >
            Assign
          </button>
        </div>
      </form>
    </div>
  );
};

export default VillageAssignment;
