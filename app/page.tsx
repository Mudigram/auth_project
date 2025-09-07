import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl">
            Welcome to Auth Demo
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            A secure and modern authentication system built with Next.js and Shadcn
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl">New Here?</CardTitle>
              <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                Join us to access all features:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                <li>Secure authentication</li>
                <li>Personal dashboard</li>
                <li>User management</li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full" size="lg">
                  Sign Up
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl">Already a Member?</CardTitle>
              <CardDescription>Welcome back!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                Access your account to:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
                <li>View your dashboard</li>
                <li>Manage your profile</li>
                <li>Access protected features</li>
              </ul>
              <Link href="/login">
                <Button className="w-full" variant="outline" size="lg">
                  Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
