import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LocalRecordsGrid from "@/components/LocalRecordsGrid";
import NonLocalRecordsGrid from "@/components/NonLocalRecordsGrid";
import { LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { profile, role, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 via-white to-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-xl px-8 py-6 flex items-center justify-between">
        {/* Title Section */}
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Malaria Annual Reporting
          </h1>
        </div>

        {/* User Info and Actions */}
        <div className="flex items-center gap-6">
          {/* Admin Button */}
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin")}
              className="bg-white text-blue-800 hover:bg-blue-50 shadow-md transition duration-200 ease-in-out"
            >
              <Shield className="h-5 w-5 mr-2" /> Admin
            </Button>
          )}

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium">{profile?.full_name || profile?.email}</span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-700 text-white text-xs font-semibold uppercase">
              {role}
            </span>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="gap-3 text-white hover:bg-blue-800 rounded-md transition duration-200 ease-in-out"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-8 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl h-full">
          <Tabs defaultValue="local" className="h-full flex flex-col">
            <TabsList className="mb-6 w-fit rounded-lg bg-blue-100/70 p-1 shadow-lg">
              <TabsTrigger
                value="local"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-800 text-blue-600 hover:text-blue-800 text-lg font-semibold p-3 rounded-md transition duration-150 ease-in-out"
              >
                Local
              </TabsTrigger>
              <TabsTrigger
                value="non-local"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-800 text-blue-600 hover:text-blue-800 text-lg font-semibold p-3 rounded-md transition duration-150 ease-in-out"
              >
                Non-Local
              </TabsTrigger>
            </TabsList>

            <TabsContent value="local" className="flex-1 overflow-hidden">
              <LocalRecordsGrid />
            </TabsContent>

            <TabsContent value="non-local" className="flex-1 overflow-hidden">
              <NonLocalRecordsGrid />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
