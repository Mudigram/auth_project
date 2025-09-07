"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPosts, deletePost, Post } from "@/lib/api";

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts().then(setPosts);
    }, []);

    const handleDelete = async (id?: number) => {
        if (!id) return;
        await deletePost(id);
        setPosts(posts.filter((p) => p.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Posts</h1>
            <Link href="/posts/new" className="text-blue-500">+ New Post</Link>
            <ul className="mt-4 space-y-2">
                {posts.map((post) => (
                    <li key={post.id} className="border p-2 flex justify-between">
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        <div>
                            <Link href={`/posts/${post.id}/edit`} className="text-green-600 mr-2">Edit</Link>
                            <button onClick={() => handleDelete(post.id)} className="text-red-600">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
