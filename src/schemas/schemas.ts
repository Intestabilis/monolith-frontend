import z from "zod";

// REVIEW
// technically don't need it here since we can use JSONContent from Tiptap, but will keep it for a while
export const TiptapContentSchema = z.looseObject({
  type: z.literal("doc"),
  // simple validation, can impove with definite union schema for every possible content but IMHO too much work it'll suffice
  content: z.array(z.any()).optional(),
});
