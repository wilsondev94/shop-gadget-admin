import { useEffect } from "react";
import { Controller, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { CreateCategoryValues } from "@/lib/validations";

export const CategoryForm = ({
  form,
  onSubmit,
  defaultValues,
}: {
  form: any;
  onSubmit: SubmitHandler<CreateCategoryValues>;
  defaultValues: CreateCategoryValues | null;
}) => {
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({ name: "", image: undefined });
    }
  }, [defaultValues, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <FieldGroup>
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="image">Image</FieldLabel>
              <Input
                type="file"
                accept="image/*"
                {...form.register("image")}
                onChange={(event) => {
                  field.onChange(event.target.files?.[0]);
                }}
                disabled={isSubmitting}
              />
              <ErrorMessage fieldState={fieldState} />
            </Field>
          )}
        />
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input disabled={isSubmitting} placeholder="Name" {...field} />

              <ErrorMessage fieldState={fieldState} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button disabled={isSubmitting} type="submit" variant="outline">
        Submit
      </Button>
    </form>
  );
};
