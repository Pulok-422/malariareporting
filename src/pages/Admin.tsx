import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, EditIcon, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Import your components
import UserManagement from "@/components/UserManagement";
import VillageAssignment from "@/components/VillageAssignment";
import RecordList from "@/components/RecordList";

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
  ]);

  // Track which section is active
  const [activeSection, setActiveSection] = useState<string>("records");

  // Premium button styles (neutral, not colorful)
  const navBtnBase =
    "h-9 px-3 rounded-md border text-sm font-medium " +
    "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 " +
    "border-gray-200 text-gray-800 " +
    "shadow-sm hover:shadow-md " +
    "hover:bg-white hover:border-gray-300 " +
    "active:translate-y-[0.5px] " +
    "transition-all duration-200 " +
    "focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const navBtnActive =
    "bg-gray-900 text-white border-gray-900 shadow-md hover:bg-gray-900 hover:border-gray-900";

  const iconBase = "h-4 w-4 mr-2";

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-gray-100">
      {/* Header Section */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6 py-4 flex items-center justify-between">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="h-9 px-3 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
        >
          <ArrowLeft className={iconBase} /> Back
        </Button>

        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
          Admin Panel
        </h1>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Admin Section Navigation */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("records")}
            className={`${navBtnBase} ${
              activeSection === "records" ? navBtnActive : ""
            }`}
          >
            <FileText className={iconBase} /> View Records
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("assignments")}
            className={`${navBtnBase} ${
              activeSection === "assignments" ? navBtnActive : ""
            }`}
          >
            <FileText className={iconBase} /> Assign Villages
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("users")}
            className={`${navBtnBase} ${
              activeSection === "users" ? navBtnActive : ""
            }`}
          >
            <UserPlus className={iconBase} /> Manage Users
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveSection("masterData")}
            className={`${navBtnBase} ${
              activeSection === "masterData" ? navBtnActive : ""
            }`}
          >
            <EditIcon className={iconBase} /> Master Data
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* View Submitted Records Section */}
        {activeSection === "records" && (
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-800">
              Submitted Records
            </h2>
            <RecordList />
          </div>
        )}

        {/* Assign New Village Section */}
        {activeSection === "assignments" && (
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-800">
              Assign New Village
            </h2>
            <VillageAssignment users={users} setUsers={setUsers} />
          </div>
        )}

        {/* User Management Section */}
        {activeSection === "users" && (
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-800">
              User Management
            </h2>
            <UserManagement users={users} setUsers={setUsers} />
          </div>
        )}

        {/* Master Data Section */}
        {activeSection === "masterData" && (
          <div>
            <h2 className="text-xl font-medium mb-4 text-gray-800">
              Manage Master Data
            </h2>
            <p className="text-sm text-gray-500">
              Add or update master data here (e.g., villages, regions).
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
