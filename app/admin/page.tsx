"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-red-600">Admin Panel</h1>
                <p>Only admins can see this 🚀</p>
            </div>
        </ProtectedRoute>
    );
}
