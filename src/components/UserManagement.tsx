import React, { useState } from "react";

const UserManagement = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("sk");
  const [users, setUsers] = useState([
    { id: 1, name: "SK Rahim Uddin", email: "rahim@skmail.com", role: "sk" },
    { id: 2, name: "SK Hasan Ali", email: "hasan@skmail.com", role: "sk" },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setErrorMessage("Please fill in all fields.");
      setSuccessMessage("");
      return;
    }

    // If editing an existing user, update their details
    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, name, email, role } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setSuccessMessage("User updated successfully!");
    } else {
      const newUser = { id: Date.now(), name, email, role };
      setUsers([...users, newUser]);
      setSuccessMessage("User created successfully!");
    }

    setName("");
    setEmail("");
    setRole("sk");
    setErrorMessage("");
  };

  // Handle deleting a user
  const handleDelete = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setSuccessMessage("User deleted successfully!");
  };

  // Handle editing a user
  const handleEdit = (user: { id: number; name: string; email: string; role: string }) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setEditingUser(user);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Manage Users (SK)</h2>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 mb-6 rounded-md shadow-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-md shadow-md">
          {errorMessage}
        </div>
      )}

      {/* User Creation/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 block w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 block w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="sk">SK</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {editingUser ? "Update User" : "Create User"}
        </button>
      </form>

      {/* User List Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800 mr-4 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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
    </div>
  );
};

export default UserManagement;
