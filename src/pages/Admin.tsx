import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, EditIcon, FileText } from "lucide-react"; // Replaced AssignIcon with FileText
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Import your components
import UserManagement from "@/components/UserManagement"; // User Management Component
import VillageAssignment from "@/components/VillageAssignment"; // Village Assignment Component
import RecordList from "@/components/RecordList"; // Record List Component

const Admin = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  // Check if the user has admin role
  if (role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive text-lg">Access Denied</p>
      </div>
    );
  }

  // State to manage users
  const [users, setUsers] = useState([
    { id: 1, name: "SK Rahim Uddin", email: "rahim@skmail.com", role: "sk" },
    { id: 2, name: "SK Hasan Ali", email: "hasan@skmail.com", role: "sk" },
    { id: 3, name: "SK Mizanur Rahman", email: "mizan@skmail.com", role: "sk" },
    // other users can be added dynamically from UserManagement
  ]);

  // Track which section is active
  const [activeSection, setActiveSection] = useState<string>("records");

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-gray-100">
      {/* Header Section */}
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between shadow-md">
        {/* Back Button */}
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
        <div className="flex items-center gap-3">
          {/* Admin Section Navigation */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("records")}
            className="hover:bg-blue-100 hover:text-blue-700 transition duration-200"
          >
            <FileText className="h-5 w-5 mr-2" /> View Records
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("assignments")}
            className="hover:bg-blue-100 hover:text-blue-700 transition duration-200"
          >
            <FileText className="h-5 w-5 mr-2" /> Assign Villages
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("users")}
            className="hover:bg-blue-100 hover:text-blue-700 transition duration-200"
          >
            <UserPlus className="h-5 w-5 mr-2" /> Manage Users
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("masterData")}
            className="hover:bg-blue-100 hover:text-blue-700 transition duration-200"
          >
            <EditIcon className="h-5 w-5 mr-2" /> Master Data
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* View Submitted Records Section */}
        {activeSection === "records" && (
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-800">Submitted Records</h2>
            <RecordList /> {/* Component for viewing submitted records by SKs */}
          </div>
        )}

        {/* Assign New Village Section */}
        {activeSection === "assignments" && (
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-800">Assign New Village</h2>
            <VillageAssignment users={users} setUsers={setUsers} /> {/* Pass users and setUsers as props */}
          </div>
        )}

        {/* User Management Section */}
        {activeSection === "users" && (
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-800">User Management</h2>
            <UserManagement users={users} setUsers={setUsers} /> {/* Pass users and setUsers as props */}
          </div>
        )}

        {/* Master Data Section */}
        {activeSection === "masterData" && (
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-800">Manage Master Data</h2>
            <p className="text-sm text-gray-500">Add or update master data here (e.g., villages, regions).</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
