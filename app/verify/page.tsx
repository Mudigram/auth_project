"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [verified, setVerified] = useState(false);
    const token = searchParams.get("token");

    useEffect(() => {
        if (token) {
            verifyEmail(token);
        }
    }, [token]);

    async function verifyEmail(token: string) {
        try {
            const res = await fetch(`http://localhost:5000/verify?token=${token}`);
            if (res.ok) {
                setVerified(true);
                toast({ title: "Email verified successfully!" });
            } else {
                throw new Error("Verification failed");
            }
        } catch (error) {
            toast({
                title: "Verification failed",
                variant: "destructive"
            });
        }
    }

    return (
        <Card className="max-w-md mx-auto mt-20">
            <CardContent className="p-6">
                {verified ? (
                    <p className="text-green-600">Email verified successfully!</p>
                ) : (
                    <p>Verifying your email...</p>
                )}
            </CardContent>
        </Card>
    );
}