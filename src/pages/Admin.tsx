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
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    "disabled:opacity-50 disabled:pointer-events-none";

  const navBtnActive =
    "bg-gray-900 text-white border-gray-900 " +
    "hover:bg-gray-900 hover:border-gray-900 " +
    "shadow-[0_2px_10px_rgba(0,0,0,0.14)] " +
    "ring-1 ring-inset ring-black/10";

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

  const SectionCard = ({
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }) => (
    <section className="rounded-xl border bg-white shadow-sm p-4 md:p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-900 tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-xs md:text-sm text-gray-500 mt-1">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-white to-gray-100">
      {/* Header Section */}
      <header className="sticky top-0 z-10 border-b bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/65 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 grid grid-cols-[auto,1fr,auto] items-center gap-3">
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

          {/* Right navigation */}
          <div className="justify-self-end max-w-[70vw]">
            {/* Option A: wrap nicely (clean on desktop, fine on small) */}
            <div className="flex flex-wrap items-center justify-end gap-2">
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

            {/* If you prefer horizontal scroll on small screens instead of wrapping, replace the div above with:
              <div className="flex flex-nowrap items-center justify-end gap-2 overflow-x-auto no-scrollbar py-1">
                ...
              </div>
            */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {activeSection === "records" && (
          <SectionCard
            title="Submitted Records"
            subtitle="Review records submitted by SKs."
          >
            <RecordList />
          </SectionCard>
        )}

        {activeSection === "assignments" && (
          <SectionCard
            title="Assign New Village"
            subtitle="Assign villages to users and manage coverage."
          >
            <VillageAssignment users={users} setUsers={setUsers} />
          </SectionCard>
        )}

        {activeSection === "users" && (
          <SectionCard
            title="User Management"
            subtitle="Add, update, and manage user access."
          >
            <UserManagement users={users} setUsers={setUsers} />
          </SectionCard>
        )}

        {activeSection === "masterData" && (
          <SectionCard
            title="Manage Master Data"
            subtitle="Maintain core reference lists like villages and regions."
          >
            <p className="text-sm text-gray-600">
              Add or update master data here (e.g., villages, regions).
            </p>
          </SectionCard>
        )}
      </main>
    </div>
  );
};

export default Admin;
