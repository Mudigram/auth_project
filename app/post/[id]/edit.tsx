"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPost, updatePost } from "@/lib/api";

export default function EditPostPage() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (id) {
            getPost(Number(id)).then((post) => {
                setTitle(post.title);
                setContent(post.content);
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        await updatePost(Number(id), { title, content });
        router.push("/posts");
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Edit Post</h1>
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
            <button type="submit" className="bg-green-500 text-white px-4 py-2">Update</button>
        </form>
    );
}
