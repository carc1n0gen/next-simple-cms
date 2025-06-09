import { Container } from "react-bootstrap";

import { Posts } from "@/lib/database";
import EditForm from "@/components/forms/EditForm";
import { isAuthenticated } from "@/lib/authorization";

export default async function EditPost({ searchParams }) {
  if (!isAuthenticated()) {
    return redirect("/signin");
  }

  const { postId = "" } = await searchParams;
  const post = Posts.query().equalTo("_id", postId).first();

  return (
    <Container>
      <a href="/dashboard">🡄 back to dashboard</a>
      <EditForm post={post} />
    </Container>
  );
}