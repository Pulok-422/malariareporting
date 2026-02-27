import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  UserPlus,
  EditIcon,
  FileText,
  MapPin,
  LayoutGrid,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

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

  // Optional: quick find for nav (helps usability when the panel grows)
  const [navQuery, setNavQuery] = useState("");

  const sections = useMemo(
    () => [
      {
        id: "records" as const,
        label: "View Records",
        short: "Records",
        icon: FileText,
        title: "Submitted Records",
        subtitle: "Review records submitted by SKs.",
      },
      {
        id: "assignments" as const,
        label: "Assign Villages",
        short: "Assignments",
        icon: MapPin,
        title: "Assign New Village",
        subtitle: "Assign villages to users and manage coverage.",
      },
      {
        id: "users" as const,
        label: "Manage Users",
        short: "Users",
        icon: UserPlus,
        title: "User Management",
        subtitle: "Add, update, and manage user access.",
      },
      {
        id: "masterData" as const,
        label: "Master Data",
        short: "Master",
        icon: EditIcon,
        title: "Manage Master Data",
        subtitle: "Maintain core reference lists like villages and regions.",
      },
    ],
    []
  );

  const activeMeta = sections.find((s) => s.id === activeSection);

  const filteredSections = useMemo(() => {
    const q = navQuery.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q)
    );
  }, [navQuery, sections]);

  // Segmented control styles (neutral, compact, premium)
  const segWrap =
    "inline-flex items-center rounded-lg border bg-white shadow-sm p-1 " +
    "border-gray-200";

  const segBtnBase =
    "h-8 px-3 rounded-md text-xs font-medium inline-flex items-center gap-2 " +
    "whitespace-nowrap transition-all duration-150 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const segBtnInactive =
    "text-gray-700 hover:text-gray-900 hover:bg-gray-50";

  const segBtnActive =
    "bg-gray-900 text-white shadow-[0_2px_10px_rgba(0,0,0,0.14)]";

  const SectionCard = ({
    title,
    subtitle,
    actions,
    children,
  }: {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <section className="rounded-2xl border bg-white shadow-sm">
      <div className="px-4 md:px-6 py-4 border-b bg-white/70 rounded-t-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 tracking-tight">
              {title}
            </h2>
            {subtitle ? (
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {subtitle}
              </p>
            ) : null}
          </div>

          {actions ? (
            <div className="shrink-0 flex items-center gap-2">{actions}</div>
          ) : null}
        </div>
      </div>

      <div className="p-4 md:p-6">{children}</div>
    </section>
  );

  const GhostPill = ({ label }: { label: string }) => (
    <span className="inline-flex items-center h-7 px-2.5 rounded-full border text-xs font-medium bg-white text-gray-700 border-gray-200">
      {label}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="sticky top-0 z-10 border-b bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
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

          {/* Title + context */}
          <div className="justify-self-center text-center">
            <h1 className="text-base md:text-lg font-semibold text-gray-900 tracking-tight leading-tight">
              Admin Panel
            </h1>
            <p className="text-[11px] md:text-xs text-gray-500 mt-0.5">
              {activeMeta?.short ? `Section: ${activeMeta.short}` : ""}
            </p>
          </div>

          {/* Right controls */}
          <div className="justify-self-end flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 rounded-lg border bg-white px-2 h-8 shadow-sm border-gray-200">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                value={navQuery}
                onChange={(e) => setNavQuery(e.target.value)}
                placeholder="Find section..."
                className="w-[160px] text-xs bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <GhostPill label="Admin" />
          </div>
        </div>

        {/* Navigation row */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-3">
          <div className="flex items-center justify-between gap-3">
            {/* Segmented navigation (more friendly + compact) */}
            <div className={`${segWrap} max-w-full overflow-x-auto`}>
              <div className="flex items-center gap-1">
                {(filteredSections.length ? filteredSections : sections).map(
                  (s) => {
                    const Icon = s.icon;
                    const isActive = s.id === activeSection;

                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSection(s.id)}
                        className={`${segBtnBase} ${
                          isActive ? segBtnActive : segBtnInactive
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="leading-none">{s.label}</span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Optional quick shortcut button (neutral) */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setActiveSection("records")}
              className="hidden lg:inline-flex h-8 px-3 rounded-md border border-gray-200 bg-white shadow-sm text-xs font-medium text-gray-800 hover:bg-gray-50"
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Overview
            </Button>
          </div>

          {/* Mobile search (shown only on small screens) */}
          <div className="md:hidden mt-2 flex items-center gap-2 rounded-lg border bg-white px-2 h-9 shadow-sm border-gray-200">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              placeholder="Find section..."
              className="w-full text-sm bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {activeSection === "records" && (
          <SectionCard
            title="Submitted Records"
            subtitle="Review records submitted by SKs."
            actions={
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs border-gray-200 bg-white hover:bg-gray-50"
                  onClick={() => {
                    // Placeholder action
                    // Later: hook to refetch
                    window.location.reload();
                  }}
                >
                  Refresh
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs border-gray-200 bg-white hover:bg-gray-50"
                  onClick={() => {
                    // Placeholder action
                    alert("Export coming soon.");
                  }}
                >
                  Export
                </Button>
              </>
            }
          >
            <RecordList />
          </SectionCard>
        )}

        {activeSection === "assignments" && (
          <SectionCard
            title="Assign New Village"
            subtitle="Assign villages to users and manage coverage."
            actions={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs border-gray-200 bg-white hover:bg-gray-50"
                onClick={() => alert("Bulk assign coming soon.")}
              >
                Bulk Assign
              </Button>
            }
          >
            <VillageAssignment users={users} setUsers={setUsers} />
          </SectionCard>
        )}

        {activeSection === "users" && (
          <SectionCard
            title="User Management"
            subtitle="Add, update, and manage user access."
            actions={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs border-gray-200 bg-white hover:bg-gray-50"
                onClick={() => alert("Add user coming soon.")}
              >
                Add User
              </Button>
            }
          >
            <UserManagement users={users} setUsers={setUsers} />
          </SectionCard>
        )}

        {activeSection === "masterData" && (
          <SectionCard
            title="Manage Master Data"
            subtitle="Maintain core reference lists like villages and regions."
            actions={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs border-gray-200 bg-white hover:bg-gray-50"
                onClick={() => alert("Add item coming soon.")}
              >
                Add Item
              </Button>
            }
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
