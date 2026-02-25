import React, { useState, useEffect } from "react";

// Placeholder for future backend API call
const fetchRecords = async () => {
  // Placeholder mock data
  return [
    { id: 1, skName: "SK Rahim Uddin", submissionDate: "2026-02-24", status: "Completed", village: "Village 1" },
    { id: 2, skName: "SK Hasan Ali", submissionDate: "2026-02-23", status: "Pending", village: "Village 2" },
    { id: 3, skName: "SK Mizanur Rahman", submissionDate: "2026-02-22", status: "Completed", village: "Village 3" },
    { id: 4, skName: "SK Rani Begum", submissionDate: "2026-02-21", status: "In Progress", village: "Village 4" },
  ];
};

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const getRecords = async () => {
      try {
        const fetchedRecords = await fetchRecords();
        setRecords(fetchedRecords);
      } catch (err) {
        setError("Failed to load records.");
      } finally {
        setLoading(false);
      }
    };
    getRecords();
  }, []);

  // Handling Record Deletion
  const handleDelete = (id: number) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
  };

  // Handling Record Edit (Just a placeholder for now)
  const handleEdit = (id: number) => {
    alert(`Editing record with ID: ${id}`);
  };

  if (loading) {
    return <p>Loading records...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-medium mb-4 text-gray-800">Submitted Records</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500">SK Name</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500">Submission Date</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500">Village</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500">Status</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-xs text-gray-700">{record.skName}</td>
              <td className="px-6 py-4 text-xs text-gray-700">{record.submissionDate}</td>
              <td className="px-6 py-4 text-xs text-gray-700">{record.village}</td>
              <td className="px-6 py-4 text-xs text-gray-700">{record.status}</td>
              <td className="px-6 py-4 text-xs text-gray-700">
                <button
                  onClick={() => handleEdit(record.id)}
                  className="text-blue-600 hover:text-blue-800 mr-4 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="text-red-600 hover:text-red-800 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
