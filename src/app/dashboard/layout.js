import { 
  Container,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarText,
  NavbarToggle
} from "react-bootstrap";

import { getAuthenticatedUser } from "@/lib/authorization";
import SignoutButton from "@/components/SignoutButton";

export default async function DashboardLayout({ children }) {
  const user = await getAuthenticatedUser();

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <NavbarBrand href="/dashboard">NextJS Simple CMS</NavbarBrand>
          <NavbarToggle aria-controls="welcome-nav" />
          <NavbarCollapse id="welcome-nav" className="justify-content-end">
            <NavbarText>
              Welcome {user.displayName}!
            </NavbarText>
            <SignoutButton />
          </NavbarCollapse>
        </Container>
      </Navbar>
      <main className="pt-4">
        {children}
      </main>
    </>
  );
}