"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function LoginPage() {
    const { login } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            toast({ title: "Login successful", description: "Redirecting..." });
            router.push("/dashboard");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Invalid login";
            toast({ title: "Error", description: errorMessage, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                        <p className="text-sm text-center mt-2">
                            Don’t have an account?{" "}
                            <Link href="/sign-up" className="text-blue-600 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
