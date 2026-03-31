"use client";

import { authenticate } from "@/actions/authenticate";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginValues, validation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Auth() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(validation.login),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: LoginValues) => {
    setIsAuthenticating(true);
    try {
      await authenticate(data.email, data.password);
      router.push("/admin");
    } catch (error) {
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="flex h-svh items-center justify-center">
      <div className="mx-auto grid w-[350px] gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <ErrorMessage fieldState={fieldState} />
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />

                  <ErrorMessage fieldState={fieldState} />
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            variant="outline"
            disabled={isAuthenticating}
            type="submit"
            className="bg-black text-white"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
