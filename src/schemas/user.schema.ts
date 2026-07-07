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
