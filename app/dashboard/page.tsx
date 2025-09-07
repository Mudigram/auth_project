"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
    const { logout } = useAuth();
    return (
        <ProtectedRoute>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p>Welcome! You are logged in ✅</p>
            </div>
            <Button variant="destructive" onClick={logout}>
                Logout
            </Button>
        </ProtectedRoute>
    );
}
