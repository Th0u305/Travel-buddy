import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(6, "Username must be at least 6 characters long")
    .max(20, "Username must not exceed 20 characters")
    .refine((value) => !/[@$!%*?&]/.test(value), {
      message: "Username cannot contain special characters like @$!%*?&",
    })
    .refine((value) => !/[0-9]/.test(value), {
      message: "Username cannot contain numbers",
    }),
  email: z
    .string({ error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least 1 number.",
    }),
  confirm_password: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least 1 number.",
    }),
  phone_number: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() === "" || val.length <= 12, {
      message: "Phone number must be less than 13 digits",
    })
    .refine((val) => !val || val.trim() === "" || val.length >= 12, {
      message: "Phone number must be at least 12 digits",
    })
    .refine((val) => !val || val.trim() === "" || !/[a-zA-Z+]/.test(val), {
      message: "Phone number cannot contain letters",
    }),
  country: z.string().min(2, { message: "Country is required" }),
});

export const loginSchema = z.object({
  email: z
    .string({ error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
});

export const forgotPassword = z.object({
  email: z
    .string({ error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  new_password: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*[0-9])/, {
      message: "Password must contain at least 1 number.",
    }),
  confirm_password: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*[0-9])/, {
      message: "Password must contain at least 1 number.",
    }),
});

export const createPlanSchema = z.object({
  trip_title: z.string().min(3, { message: "Trip title is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  city: z.string().min(2, { message: "City is required" }),
  travel_type: z.string().min(2, { message: "Travel type is required" }),
  min_budget: z.number().min(100, { message: "Minimum budget is 100" }),
  max_budget: z
    .number()
    .max(1000000000000, { message: "Maximum budget is too high" }),
  max_travelers: z.number().min(1, { message: "Maximum buddies is required" }),
  trip_description: z
    .string()
    .min(2, { message: "Trip description is required" }),
  tags: z
    .array(z.string())
    .min(4, { message: "Please add at least 4 tags" })
    .max(7, { message: "You can only add 7 tags" }),
  looking_for_buddy: z.boolean({ message: "Looking for buddy is required" }),
  status: z.string({ message: "Status is required" }),
});

export type loginValidation = z.infer<typeof loginSchema>;
export type formValidation = z.infer<typeof formSchema>;
export type forgotPasswordValidation = z.infer<typeof forgotPassword>;

export const updateProfileSchema = z.object({
  bio: z
    .string()
    .max(500, { message: "Bio cannot exceed 500 characters." })
    .optional(),
  travel_interests: z
    .string()
    .max(200, { message: "Travel interests cannot exceed 200 characters." })
    .optional(),
  country: z.string().max(100).optional(),
  phone_number: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() === "" || val.length <= 12, {
      message: "Phone number must be less than 13 digits",
    })
    .refine((val) => !val || val.trim() === "" || val.length >= 12, {
      message: "Phone number must be at least 12 digits",
    })
    .refine((val) => !val || val.trim() === "" || !/[a-zA-Z+]/.test(val), {
      message: "Phone number cannot contain letters",
    }),
});
export type updateProfileValidation = z.infer<typeof updateProfileSchema>;
