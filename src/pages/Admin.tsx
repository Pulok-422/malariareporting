import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, EditIcon, FileText, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Import your components
import UserManagement from "@/components/UserManagement";
import VillageAssignment from "@/components/VillageAssignment";
import RecordList from "@/components/RecordList";

type SectionKey = "records" | "assignments" | "users" | "masterData";

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
  const [activeSection, setActiveSection] = useState<SectionKey>("records");

  // Compact premium button styles (neutral, professional)
  const navBtnBase =
    "h-8 px-3 rounded-md border text-xs font-medium " +
    "inline-flex items-center justify-center gap-2 " +
    "whitespace-nowrap shrink-0 " +
    "bg-white border-gray-200 text-gray-800 " +
    "shadow-[0_1px_2px_rgba(0,0,0,0.06)] " +
    "hover:bg-gray-50 hover:border-gray-300 hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)] " +
    "active:translate-y-[0.5px] " +
    "transition-all duration-150 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const navBtnActive =
    "bg-gray-900 text-white border-gray-900 " +
    "hover:bg-gray-900 hover:border-gray-900";

  const iconCls = "h-4 w-4";

  const NavButton = ({
    id,
    label,
    icon,
  }: {
    id: SectionKey;
    label: string;
    icon: React.ReactNode;
  }) => (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => setActiveSection(id)}
      className={`${navBtnBase} ${activeSection === id ? navBtnActive : ""}`}
    >
      {icon}
      <span className="leading-none">{label}</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-gray-100">
      {/* Header Section */}
      <header className="sticky top-0 z-10 border-b bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/65">
        <div className="px-4 md:px-6 py-3 grid grid-cols-[auto,1fr,auto] items-center gap-3">
          {/* Back Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="h-8 px-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>

          {/* Title (smaller + centered) */}
          <h1 className="justify-self-center text-base md:text-lg font-semibold text-gray-900 tracking-tight">
            Admin Panel
          </h1>

          {/* Right navigation (wraps, prevents blank/collapse) */}
          <div className="justify-self-end flex flex-wrap items-center justify-end gap-2 max-w-[70vw]">
            <NavButton
              id="records"
              label="View Records"
              icon={<FileText className={iconCls} />}
            />
            <NavButton
              id="assignments"
              label="Assign Villages"
              icon={<MapPin className={iconCls} />}
            />
            <NavButton
              id="users"
              label="Manage Users"
              icon={<UserPlus className={iconCls} />}
            />
            <NavButton
              id="masterData"
              label="Master Data"
              icon={<EditIcon className={iconCls} />}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 space-y-6">
        {activeSection === "records" && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Submitted Records
            </h2>
            <RecordList />
          </div>
        )}

        {activeSection === "assignments" && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Assign New Village
            </h2>
            <VillageAssignment users={users} setUsers={setUsers} />
          </div>
        )}

        {activeSection === "users" && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              User Management
            </h2>
            <UserManagement users={users} setUsers={setUsers} />
          </div>
        )}

        {activeSection === "masterData" && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
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
