import z from "zod";

const UserSchema = z.object({
  email: z.email(),
  username: z.string().min(6).max(20),
  password: z.string().min(3).max(20),
  avatarUrl: z.url().nullable().optional(),
});

export const CreateUserSchema = UserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Паролі не співпадають",
  path: ["confirmPassword"],
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export const LoginUserSchema = UserSchema.omit({
  username: true,
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;

export const UserStatusSchema = z.object({
  id: z.string(),
  isActivated: z.boolean(),
});

export type UserStatusDTO = z.infer<typeof UserStatusSchema>;

export const UserInfoSchema = z
  .object({
    ...UserSchema.shape,
    ...UserStatusSchema.shape,
  })
  .omit({ password: true });

export type UserInfoDTO = z.infer<typeof UserInfoSchema>;

export const CampaignMemberSchema = UserInfoSchema.omit({
  email: true,
}).extend({
  joinedAt: z.iso.datetime(),
  // characterName: z.string().optional(),
  // characterClass: z.string().optional(),
});

export type CampaignMember = z.infer<typeof CampaignMemberSchema>;

// PASSWORD RESET (heavily review with other types, maybe somehow connect those with normal user types, especially reset password schema and form type)

export const ForgotPasswordSchema = z.object({
  email: z.email("Введіть коректну електронну пошту"),
});

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;

// CHANGE revisit user types and schemas in general (+ I clearly remember some "change to proper user payload types" in some requests)
export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

// CHANGE password validation schema to proper one (spec character number etc.)
export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Пароль має містити мінімум 6 символів"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Паролі не збігаються",
    path: ["confirmPassword"],
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
