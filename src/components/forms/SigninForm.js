"use client";

import { useActionState } from "react";
import { Button } from "react-bootstrap";

import { signin } from "@/actions/auth";
import CustomCard from "@/components/CustomCard";
import LabelAndInput from "@/components/LabelAndInput";

export default function SigninForm() {
  const [state, action, isPending] = useActionState(signin);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <CustomCard as="form" action={action}>
        {{
          header: (
            <h1 className="fs-3">Sign in</h1>
          ),
          body: (
            <>
              {state?.errors?.page && (
                <p className="text-danger">
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
                <Button className="px-4 ms-auto" type="submit" disabled={isPending}>sign in</Button>
              </div>
            </>
          ),
          footer: (
            <span className="text-center">
              Don&apos;t have an account? <a href="/signup">Sign up</a>
            </span>
          ),
        }}
      </CustomCard>
    </div>
  );
}