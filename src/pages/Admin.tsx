import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  if (role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">Access denied</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </header>
      <main className="p-6">
        <p className="text-muted-foreground">
          Admin management features (user creation, assignments, master data) can be added here.
        </p>
      </main>
    </div>
  );
};

export default Admin;
