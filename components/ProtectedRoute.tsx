"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[]; // for admin-only routes
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { token, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.replace("/login"); // redirect to login
        }

        if (allowedRoles && user && !allowedRoles.includes(user.role)) {
            router.replace("/"); // redirect home if not allowed
        }
    }, [token, user, allowedRoles, router]);

    if (!token) {
        return null; // Or loading spinner while checking
    }

    return <>{children}</>;
}
