"use client";

import { useActionState } from 'react';
import { Button } from "react-bootstrap";

import { signup } from "@/actions/auth";
import CustomCard from "@/components/CustomCard";
import LabelAndInput from '@/components/LabelAndInput';

export default function SignupForm() {
  const [state, action, isPending] = useActionState(signup);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <CustomCard as="form" action={action}>
      {{
        header: (
          <h1 className="fs-3">Sign up</h1>
        ),
        body: (
          <>
            <LabelAndInput
              id="displayName"
              name="displayName"
              label="Display name"
              type="text"
              defaultValue={state?.previousValues?.displayName}
              errors={state?.errors?.displayName}
            />

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
              defaultValue={state?.previousValues?.password}
              errors={state?.errors?.password}
            />

            <div className="mt-3 d-flex">
              <Button type="submit" className="ms-auto" disabled={isPending}>sign up</Button>
            </div>
          </>
        ),
        footer: (
          <span className="text-center">
            Already have an account? <a href="/signin">Sign in</a>
          </span>
        ),
      }}
      </CustomCard>
    </div>
  );
}
