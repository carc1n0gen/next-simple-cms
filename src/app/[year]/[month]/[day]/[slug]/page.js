import { notFound } from "next/navigation";

import { Posts } from "@/lib/database";
import BlogLayout from "@/components/BlogLayout";
import { Badge } from "react-bootstrap";

export default async function ShowPost({ params }) {
  const { slug } = await params;
  const post = Posts.query().equalTo("slug", slug).first();

  if (!post) {
    notFound();
  }

  return (
    <BlogLayout>
      <article>
        <header>
          <h2 className="mb-0">{post.title}</h2>
          <small>
            <div>{post.tags.map((tag) => <Badge key={tag} className="me-2">{tag}</Badge> )}</div>
            <b>created</b>:{" "}
            {new Date(post.createdAt).toLocaleDateString()}
            {" "}|{" "}
            <b>updated</b>:{" "}
            {new Date(post.updatedAt).toLocaleDateString()}
          </small>
        </header>
        <section
          className="mt-3"
          dangerouslySetInnerHTML={{__html: post.content}}
        />
      </article>
    </BlogLayout>
  );
}