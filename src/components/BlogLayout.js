import Link from "next/link";
import { Container } from "react-bootstrap";

export default function BlogLayout({ children }) {
  return (
    <>
      <header className="bg-white p-5 border-bottom">
        <Container>
          <h1>My Blog</h1>
          <p className="mb-0">A blog about stuff and things</p>
        </Container>
      </header>
      <Container className="mt-5 ps-0">
        <Link href="/">🡄 back to blog</Link>
      </Container>
      <Container as="main" className="bg-white p-5 border">
        {children}
      </Container>
    </>
  );
}