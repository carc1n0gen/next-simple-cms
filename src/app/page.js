import Link from "next/link";
import { Badge } from "react-bootstrap";

import { Posts } from "@/lib/database";
import BlogLayout from "@/components/BlogLayout";

export default function Blog() {
  const posts = Posts.query().descending("createdAt").find();

  return (
    <BlogLayout>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : posts.map((post) => {
        const createdAt = new Date(post.createdAt);
        const year = createdAt.getFullYear();
        const month = String(createdAt.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(createdAt.getDate()).padStart(2, '0');
        const url = `/${year}/${month}/${day}/${post.slug}`;
        return (
          <article key={post._id}>
            <header>
              <Link href={url}><h2 className="mb-0">{post.title}</h2></Link>
              <small>
                <div>{post.tags.map((tag) => <Badge key={tag} className="me-2">{tag}</Badge> )}</div>
                <b>created</b>:{" "}
                {new Date(post.createdAt).toLocaleDateString()}
                {" "}|{" "}
                <b>updated</b>:{" "}
                {new Date(post.updatedAt).toLocaleDateString()}
              </small>
            </header>
            <section className="mt-3"><p>{post.excerpt}</p></section>
          </article>
        );
      })}
    </BlogLayout>
  );
}
