import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, EditIcon, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

// Import your components
import UserManagement from "@/components/UserManagement";
import VillageAssignment from "@/components/VillageAssignment";
import RecordList from "@/components/RecordList";

const Dashboard = () => {
  const { profile, role, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = role === "admin";

  // Example Chart data
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Submitted Records",
        data: [40, 50, 70, 80],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-white to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        {/* Back Button */}
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-semibold">Malaria Reporting System</h1>
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
      <main className="flex-1 p-6 overflow-hidden">
        <div className="mx-auto w-full max-w-7xl h-full">
          {/* Dashboard Stats */}
          <section className="mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-sm text-gray-600">Total Submitted Records</h3>
                <p className="text-lg font-semibold text-gray-800">150</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-sm text-gray-600">Pending Records</h3>
                <p className="text-lg font-semibold text-gray-800">30</p>
              </div>
            </div>
          </section>

          {/* Charts */}
          <section className="mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Submitted Records by Month</h2>
            <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
          </section>

          <Tabs defaultValue="local" className="h-full flex flex-col">
            <TabsList className="mb-3 w-fit rounded-lg bg-muted/60 p-1">
              <TabsTrigger value="local" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Local
              </TabsTrigger>
              <TabsTrigger value="non-local" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Non-Local
              </TabsTrigger>
            </TabsList>

            <TabsContent value="local" className="flex-1 overflow-hidden">
              <RecordList />
            </TabsContent>

            <TabsContent value="non-local" className="flex-1 overflow-hidden">
              <VillageAssignment />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
