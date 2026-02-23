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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-white to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur-xl px-4 py-3 flex items-center justify-between shrink-0">
        <h1 className="text-lg font-semibold tracking-tight">
          Malaria Annual Reporting
        </h1>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin")}
              className="bg-white/60"
            >
              <Shield className="h-4 w-4 mr-1" /> Admin
            </Button>
          )}

          <span className="text-sm text-muted-foreground">
            {profile?.full_name || profile?.email}
            <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase border border-primary/20 bg-primary/10 text-primary">
              {role}
            </span>
          </span>

          <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl h-full">
          <Tabs defaultValue="local" className="h-full flex flex-col">
            <TabsList className="mb-3 w-fit rounded-lg bg-muted/60 p-1">
              <TabsTrigger
                value="local"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Local
              </TabsTrigger>
              <TabsTrigger
                value="non-local"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
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
