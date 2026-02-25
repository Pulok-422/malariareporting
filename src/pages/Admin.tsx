import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, AssignIcon, EditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
        <p className="text-destructive">Access denied</p>
      </div>
    );
  }

  // Track which section is active
  const [activeSection, setActiveSection] = useState<string>("records");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        {/* Back Button */}
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <div className="flex items-center gap-3">
          {/* Admin Section Navigation */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("records")}
            className="hover:bg-blue-100"
          >
            <span className="mr-2">📋</span> View Records
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("assignments")}
            className="hover:bg-blue-100"
          >
            <AssignIcon className="h-5 w-5 mr-2" /> Assign Villages
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("users")}
            className="hover:bg-blue-100"
          >
            <UserPlus className="h-5 w-5 mr-2" /> Manage Users
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("masterData")}
            className="hover:bg-blue-100"
          >
            <EditIcon className="h-5 w-5 mr-2" /> Master Data
          </Button>
        </div>
      </header>

      <main className="p-6">
        {/* View Submitted Records Section */}
        {activeSection === "records" && (
          <div>
            <h2 className="text-xl font-medium mb-4">Submitted Records</h2>
            <RecordList /> {/* Component for viewing submitted records by SKs */}
          </div>
        )}

        {/* Assign New Village Section */}
        {activeSection === "assignments" && (
          <div>
            <h2 className="text-xl font-medium mb-4">Assign New Village</h2>
            <VillageAssignment /> {/* Component for assigning new villages */}
          </div>
        )}

        {/* User Management Section */}
        {activeSection === "users" && (
          <div>
            <h2 className="text-xl font-medium mb-4">User Management</h2>
            <UserManagement /> {/* Component for creating or managing users */}
          </div>
        )}

        {/* Master Data Section */}
        {activeSection === "masterData" && (
          <div>
            <h2 className="text-xl font-medium mb-4">Manage Master Data</h2>
            <p className="text-muted-foreground">Add or update master data here (e.g., villages, regions).</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
