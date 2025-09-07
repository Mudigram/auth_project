"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api";

export default function NewPostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createPost({ title, content });
        router.push("/posts");
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h1 className="text-xl font-bold">New Post</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full"
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
        </form>
    );
}
