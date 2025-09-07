"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    return (
        <nav className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-gray-100 hover:text-white font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-gray-100 hover:text-white font-medium"
                        >
                            Dashboard
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="destructive"
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}