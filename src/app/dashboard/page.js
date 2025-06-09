

import { Button, Container, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";

import { Posts } from "@/lib/database";
import { deletePost } from "@/actions/posts";
import { isAuthenticated } from "@/lib/authorization";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  if (!isAuthenticated()) {
    return redirect("/signin");
  }
  
  const posts = Posts.query().descending("createdAt").find();

  return (
    <Container>
      <h1>Dashboard</h1>
      <Button as="a" href="/dashboard/edit" size="sm" variant="success" className="mb-3 px-3">New Post</Button>

      {posts.length === 0 ? (
        <p>No posts yet. Create your first post to see it here!</p>
      ) : (
        <ListGroup className="shadow-lg">
          {posts.map((post) => {
            return (
              <ListGroupItem key={post._id} className="d-flex align-items-center">
                <a href={`/dashboard/edit?postId=${post._id}`}>{post.title}</a>
                <span className="ms-auto">
                  <form action={deletePost}>
                    <FormControl type="hidden" name="postId" value={post._id} readOnly />
                    <Button
                      type="submit"
                      size="sm"
                      variant="danger"
                      className="px-3"
                    >
                      delete
                    </Button>
                  </form>
                </span>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      )}
    </Container>
  );
}
