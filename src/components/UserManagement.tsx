import React, { useState } from "react";

const LocalCaseReportForm = () => {
  const [union, setUnion] = useState("");
  const [village, setVillage] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [hh, setHh] = useState(0);
  const [itn2023, setItn2023] = useState(0);
  const [itn2024, setItn2024] = useState(0);
  const [itn2025, setItn2025] = useState(0);
  const [population, setPopulation] = useState(0);
  const [reportMonth, setReportMonth] = useState("Feb");
  const [cases, setCases] = useState(0);

  // Handling form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form Submitted!");
    // Add functionality to save the data here (e.g., API call)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Local Case Report</h2>

      <form onSubmit={handleSubmit} className="space-y-6 text-sm">
        {/* Union & Village */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="union" className="block text-xs font-medium text-gray-700">
              Select Union
            </label>
            <select
              id="union"
              value={union}
              onChange={(e) => setUnion(e.target.value)}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            >
              <option value="">Select Union</option>
              <option value="Union1">Union 1</option>
              <option value="Union2">Union 2</option>
            </select>
          </div>

          <div className="col-span-1">
            <label htmlFor="village" className="block text-xs font-medium text-gray-700">
              Select Village
            </label>
            <select
              id="village"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            >
              <option value="">Select Village</option>
              <option value="Village1">Village 1</option>
              <option value="Village2">Village 2</option>
            </select>
          </div>
        </div>

        {/* Ward No, HH, and Population */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <label htmlFor="wardNo" className="block text-xs font-medium text-gray-700">
              Ward No
            </label>
            <input
              type="text"
              id="wardNo"
              value={wardNo}
              onChange={(e) => setWardNo(e.target.value)}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="hh" className="block text-xs font-medium text-gray-700">
              H/H
            </label>
            <input
              type="number"
              id="hh"
              value={hh}
              onChange={(e) => setHh(Number(e.target.value))}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="population" className="block text-xs font-medium text-gray-700">
              Population
            </label>
            <input
              type="number"
              id="population"
              value={population}
              onChange={(e) => setPopulation(Number(e.target.value))}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            />
          </div>
        </div>

        {/* ITN Inputs */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <label htmlFor="itn2023" className="block text-xs font-medium text-gray-700">
              ITN 2023
            </label>
            <input
              type="number"
              id="itn2023"
              value={itn2023}
              onChange={(e) => setItn2023(Number(e.target.value))}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="itn2024" className="block text-xs font-medium text-gray-700">
              ITN 2024
            </label>
            <input
              type="number"
              id="itn2024"
              value={itn2024}
              onChange={(e) => setItn2024(Number(e.target.value))}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="itn2025" className="block text-xs font-medium text-gray-700">
              ITN 2025
            </label>
            <input
              type="number"
              id="itn2025"
              value={itn2025}
              onChange={(e) => setItn2025(Number(e.target.value))}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            />
          </div>
        </div>

        {/* Total Active ITNs */}
        <div className="mt-4">
          <p className="text-xs font-medium text-gray-700">
            Total Active ITNs:{" "}
            <span className="font-semibold text-green-600">
              {itn2023 + itn2024 + itn2025}
            </span>
          </p>
        </div>

        {/* Reporting Month and Cases */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="reportMonth" className="block text-xs font-medium text-gray-700">
              Reporting Month
            </label>
            <select
              id="reportMonth"
              value={reportMonth}
              onChange={(e) => setReportMonth(e.target.value)}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            >
              <option value="Feb">Feb</option>
              <option value="Mar">Mar</option>
              <option value="Apr">Apr</option>
            </select>
          </div>

          <div className="col-span-1">
            <label htmlFor="cases" className="block text-xs font-medium text-gray-700">
              Cases ({reportMonth})
            </label>
            <input
              type="number"
              id="cases"
              value={cases}
              onChange={(e) => setCases(Number(e.target.value))}
              className="mt-2 w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-xs"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocalCaseReportForm;
