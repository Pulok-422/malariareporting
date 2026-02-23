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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-4 py-3 flex items-center justify-between shrink-0">
        <h1 className="text-lg font-semibold tracking-tight">Malaria Annual Reporting</h1>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
              <Shield className="h-4 w-4 mr-1" /> Admin
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            {profile?.full_name || profile?.email}{" "}
            <span className="inline-block ml-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-primary/10 text-primary">
              {role}
            </span>
          </span>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 overflow-hidden">
        <Tabs defaultValue="local" className="h-full flex flex-col">
          <TabsList className="mb-3 w-fit">
            <TabsTrigger value="local">Local</TabsTrigger>
            <TabsTrigger value="non-local">Non-Local</TabsTrigger>
          </TabsList>
          <TabsContent value="local" className="flex-1 overflow-hidden">
            <LocalRecordsGrid />
          </TabsContent>
          <TabsContent value="non-local" className="flex-1 overflow-hidden">
            <NonLocalRecordsGrid />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
