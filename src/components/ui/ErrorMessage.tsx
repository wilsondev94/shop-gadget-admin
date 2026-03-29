"use client";

import { ControllerFieldState } from "react-hook-form";
import { FieldError } from "./field";

export default function ErrorMessage({
  fieldState,
}: {
  fieldState: ControllerFieldState;
}) {
  return (
    <FieldError errors={[fieldState.error]} className="text-rose-500 text-xs" />
  );
}
