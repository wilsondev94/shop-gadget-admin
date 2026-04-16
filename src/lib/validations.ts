import z from "zod";

const requiredString = z.string().trim().min(1, "Required");
const passwordSchema = z
  .string()
  .regex(/^.{8,}$/, "At Least 8 Characters")
  .regex(/[a-z]/g, "Lowercase Letter (a-z)")
  .regex(/[A-Z]/g, "Uppercase Letter (A-Z)")
  .regex(/[0-9]/g, "Numbers (0-9)")
  .regex(
    /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/,
    "Special Character (#,*)",
  );

export const validation = {
  // Auth
  signUp: z.object({
    firstName: requiredString,
    lastName: requiredString,
    email: requiredString.email("Invalid email"),
    password: passwordSchema,
    referralCode: z.string().optional(),
  }),
  login: z.object({
    email: requiredString.email("Invalid email"),
    password: requiredString,
  }),

  createCategorySchema: z.object({
    image: z.any().refine((file) => file instanceof File, "Image is required"),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    intent: z
      .enum(["create", "update"], {
        message: "Intent must be either create or update",
      })
      .optional(),
    slug: z.string().optional(),
  }),

  updateCategorySchema: z.object({
    imageUrl: z.string().min(1, { message: "Image is required" }),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    intent: z.enum(["create", "update"], {
      message: "Intent must be either create or update",
    }),
    slug: z.string().min(1, { message: "Slug is required" }),
  }),
};

export type CreateAccountValues = z.infer<typeof validation.signUp>;
export type LoginValues = z.infer<typeof validation.login>;
export type CreateCategoryValues = z.infer<
  typeof validation.createCategorySchema
>;
export type UpdateCategoryValues = z.infer<
  typeof validation.updateCategorySchema
>;
