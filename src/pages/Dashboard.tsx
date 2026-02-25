import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, LogOut } from "lucide-react"; // Assuming you have these icons
import { useAuth } from "@/contexts/AuthContext"; // Assuming you're using useAuth for authentication
import { useNavigate } from "react-router-dom"; // Assuming you're using this for routing

const Dashboard = () => {
  const { profile, role, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = role === "admin";

  return (
    <header className="sticky top-0 z-10 border-b bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg px-6 py-4 flex items-center justify-between">
      {/* Title Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Malaria Annual Reporting
        </h1>
      </div>

      {/* User Info and Actions */}
      <div className="flex items-center gap-4">
        {/* Admin Button */}
        {isAdmin && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin")}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Shield className="h-4 w-4 mr-2" /> Admin
          </Button>
        )}

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <span className="text-sm">{profile?.full_name || profile?.email}</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold uppercase">
            {role}
          </span>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="gap-2 text-white hover:bg-blue-700 rounded-md"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

// Export the component as default
export default Dashboard;
