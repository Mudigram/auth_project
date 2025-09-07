"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    const { register } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const [formState, setFormState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        touched: {
            email: false,
            password: false,
            confirmPassword: false
        }
    });
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    // Validation functions
    const isEmailValid = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const getEmailError = () => {
        if (!formState.touched.email) return null;
        if (!formState.email) return "Email is required";
        if (!isEmailValid(formState.email)) return "Please enter a valid email";
        return null;
    };

    useEffect(() => {
        const errors: string[] = [];
        let strength = 0;

        if (formState.password.length >= 8) strength += 25;
        else errors.push("At least 8 characters");

        if (/[A-Z]/.test(formState.password)) strength += 25;
        else errors.push("One uppercase letter");

        if (/[a-z]/.test(formState.password)) strength += 25;
        else errors.push("One lowercase letter");

        if (/[0-9!@#$%^&*]/.test(formState.password)) strength += 25;
        else errors.push("One number or special character");

        setPasswordStrength(strength);
        setPasswordErrors(errors);
    }, [formState.password]);

    const getStrengthColor = () => {
        if (passwordStrength <= 25) return "bg-red-500";
        if (passwordStrength <= 50) return "bg-orange-500";
        if (passwordStrength <= 75) return "bg-yellow-500";
        return "bg-green-500";
    };

    const handleInputChange = (field: keyof typeof formState) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormState(prev => ({
            ...prev,
            [field]: e.target.value,
            touched: {
                ...prev.touched,
                [field]: true
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        setFormState(prev => ({
            ...prev,
            touched: {
                email: true,
                password: true,
                confirmPassword: true
            }
        }));


        const emailError = getEmailError();
        if (emailError) {
            toast({
                title: "Error",
                description: emailError,
                variant: "destructive"
            });
            return;
        }

        if (formState.password !== formState.confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive"
            });
            return;
        }

        if (passwordStrength < 100) {
            toast({
                title: "Error",
                description: "Password is not strong enough",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);

        try {
            await register(formState.email, formState.password);
            toast({
                title: "Success!",
                description: "Account created successfully. Redirecting to login...",
                variant: "default"
            });
            router.push("/login");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Signup failed";
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={formState.email}
                                onChange={handleInputChange("email")}
                                disabled={loading}
                                className={formState.touched.email && getEmailError() ? "border-red-500" : ""}
                                required
                            />
                            {formState.touched.email && getEmailError() && (
                                <p className="text-sm text-red-500">{getEmailError()}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={formState.password}
                                onChange={handleInputChange("password")}
                                disabled={loading}
                                required
                            />
                            {formState.password && (
                                <>
                                    <Progress
                                        value={passwordStrength}
                                        className={`h-2 ${getStrengthColor()}`}
                                    />
                                    <div className="text-sm">
                                        {passwordErrors.length > 0 ? (
                                            <ul className="text-red-500 space-y-1">
                                                {passwordErrors.map((error, index) => (
                                                    <li key={index}>• {error}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-green-500">Password is strong!</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                value={formState.confirmPassword}
                                onChange={handleInputChange("confirmPassword")}
                                disabled={loading}
                                required
                            />
                            {formState.confirmPassword && (
                                <p className={`text-sm ${formState.password === formState.confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                                    {formState.password === formState.confirmPassword ?
                                        "✓ Passwords match" :
                                        "✗ Passwords do not match"}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading || passwordStrength < 100 || formState.password !== formState.confirmPassword}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>

                        <p className="text-sm text-center mt-2">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-blue-600 hover:underline"
                                tabIndex={loading ? -1 : 0}
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}