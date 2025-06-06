"use client";

import { useActionState } from "react";
import { Alert, Button } from "react-bootstrap";

import AuthCard from "@/components/AuthForm";
import { signin } from "@/actions/auth";
import LabelAndInput from "@/components/LabelAndInput";

export default function Signin() {
  const [state, action, _] = useActionState(signin);

  console.log(state);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <AuthCard action={action}>
        {{
          header: (
            <h1 className="fs-3">Sign in</h1>
          ),
          body: (
            <>
              {state?.errors?.page && (
                <p class="text-danger">
                  {state.errors.page}
                </p>
              )}

              <LabelAndInput
                id="username"
                name="username"
                label="Username"
                type="text"
                defaultValue={state?.previousValues?.username}
                errors={state?.errors?.username}
              />

              <LabelAndInput
                id="password"
                name="password"
                label="Password"
                type="password"
                errors={state?.errors?.password}
              />

              <div className="mt-3 d-flex">
                <Button type="submit" className="ms-auto">sign in</Button>
              </div>
            </>
          ),
          footer: (
            <span className="text-center">
              Don&apos;t have an account? <a href="/signup">Sign up</a>
            </span>
          ),
        }}
      </AuthCard>
    </div>
  )
}