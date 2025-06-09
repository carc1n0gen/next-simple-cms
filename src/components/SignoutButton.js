"use client";

import { Button } from "react-bootstrap";

import { signout } from "@/actions/auth";

export default function SignoutButton() {
  return (
    <Button
      variant="warning"
      size="sm"
      className="ms-3 px-3"
      onClick={async () => await signout()}
    >
      Sign out
    </Button>
  );
}