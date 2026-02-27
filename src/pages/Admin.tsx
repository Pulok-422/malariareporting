import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  UserPlus,
  EditIcon,
  FileText,
  MapPin,
  Users,
  Database,
} from "lucide-react";
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-2xl border bg-white shadow-sm p-8 text-center">
          <p className="text-gray-900 font-semibold">Access Denied</p>
          <p className="mt-1 text-sm text-gray-500">
            You don’t have permission to view this page.
          </p>
          <div className="mt-5">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 border-gray-200 bg-white hover:bg-gray-50"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // State to manage users
  const [users, setUsers] = useState([
    { id: 1, name: "SK Rahim Uddin", email: "rahim@skmail.com", role: "sk" },
    { id: 2, name: "SK Hasan Ali", email: "hasan@skmail.com", role: "sk" },
    { id: 3, name: "SK Mizanur Rahman", email: "mizan@skmail.com", role: "sk" },
  ]);

  const [tab, setTab] = useState<SectionKey>("records");

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="h-8 px-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>

          <h1 className="text-base md:text-lg font-semibold tracking-tight text-gray-900">
            Admin Panel
          </h1>

          <div className="w-[72px]" />
        </div>

        {/* Tabs Navigation (consistent with Dashboard, more friendly) */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-3">
          <Tabs value={tab} onValueChange={(v) => setTab(v as SectionKey)}>
            <TabsList className="w-fit rounded-lg bg-gray-100 p-1">
              <TabsTrigger
                value="records"
                className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <FileText className="h-4 w-4" />
                Records
              </TabsTrigger>

              <TabsTrigger
                value="assignments"
                className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <MapPin className="h-4 w-4" />
                Assignments
              </TabsTrigger>

              <TabsTrigger
                value="users"
                className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>

              <TabsTrigger
                value="masterData"
                className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Database className="h-4 w-4" />
                Master Data
              </TabsTrigger>
            </TabsList>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto pt-3">
              <TabsContent value="records" className="m-0">
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
                        onClick={() => window.location.reload()}
                      >
                        Refresh
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs border-gray-200 bg-white hover:bg-gray-50"
                        onClick={() => alert("Export coming soon.")}
                      >
                        Export
                      </Button>
                    </>
                  }
                >
                  <RecordList />
                </SectionCard>
              </TabsContent>

              <TabsContent value="assignments" className="m-0">
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
              </TabsContent>

              <TabsContent value="users" className="m-0">
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
              </TabsContent>

              <TabsContent value="masterData" className="m-0">
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
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </header>

      {/* Page spacing */}
      <div className="flex-1" />
    </div>
  );
};

export default Admin;
