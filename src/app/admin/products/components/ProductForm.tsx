import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateOrUpdateProductValues } from "@/lib/validations";
import { Category } from "@/types";

type Props = {
  form: UseFormReturn<CreateOrUpdateProductValues>;
  onSubmit: (data: CreateOrUpdateProductValues) => void;
  categories: Category[];
  setIsProductModalOpen: Dispatch<SetStateAction<boolean>>;
  isProductModalOpen: boolean;
  defaultValues: CreateOrUpdateProductValues | null;
};

export const ProductForm = ({
  form,
  onSubmit,
  categories,
  setIsProductModalOpen,
  isProductModalOpen,
  defaultValues,
}: Props) => {
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        title: "",
        category: "",
        price: "",
        maxQuantity: "",
        heroImage: undefined,
        images: undefined,
      });
    }
  }, [defaultValues, form]);

  return (
    <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <div
          className="max-h-[calc(100svh-200px)] overflow-y-auto"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* Internet Explorer 10+ */,
          }}
        >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Name</FieldLabel>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter product title"
                      {...field}
                    />

                    <ErrorMessage fieldState={fieldState} />
                  </Field>
                )}
              />

              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="category">Name</FieldLabel>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger
                        disabled={isSubmitting}
                        className="col-span-3"
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage fieldState={fieldState} />
                  </Field>
                )}
              />

              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col"
                  >
                    <FieldLabel htmlFor="Price">Name</FieldLabel>

                    <Input
                      id="price"
                      type="number"
                      className="col-span-3"
                      {...field}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage fieldState={fieldState} />
                  </Field>
                )}
              />

              <Controller
                name="maxQuantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col"
                  >
                    <FieldLabel htmlFor="maxQuantity">Max Quantity</FieldLabel>
                    <Input
                      id="maxQuantity"
                      type="number"
                      className="col-span-3"
                      {...field}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage fieldState={fieldState} />
                  </Field>
                )}
              />

              <Controller
                name="heroImage"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col"
                  >
                    <FieldLabel htmlFor="heroImage">Hero Image</FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      {...form.register("heroImage")}
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
                name="images"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex flex-col"
                  >
                    <FieldLabel htmlFor="images">Hero Image</FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      {...form.register("images")}
                      onChange={(event) => {
                        field.onChange(event.target.files);
                      }}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage fieldState={fieldState} />
                  </Field>
                )}
              />

              <DialogFooter>
                <Button disabled={isSubmitting} type="submit">
                  Add Product
                </Button>
              </DialogFooter>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
