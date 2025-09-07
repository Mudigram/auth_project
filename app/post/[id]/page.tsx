"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPost, Post } from "@/lib/api";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      getPost(Number(id)).then(setPost);
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.content}</p>
    </div>
  );
}
