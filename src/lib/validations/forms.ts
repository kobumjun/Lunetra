import { z } from "zod";

export const auditionApplicationSchema = z.object({
  audition_id: z.string().uuid(),
  name: z.string().min(2),
  birth_date: z.string().min(8),
  gender: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  region: z.string().min(2),
  sns_url: z.string().url().optional().or(z.literal("")),
  portfolio_url: z.string().url().optional().or(z.literal("")),
  self_intro: z.string().min(20),
  category: z.string().min(2),
  attachment_url: z.string().optional(),
  consent_privacy: z.boolean().refine((v) => v, "개인정보 동의가 필요합니다."),
});

export const bannerSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2),
  subtitle: z.string().min(2),
  image_url: z.string().url(),
  link_url: z.string().url().optional().or(z.literal("")),
  sort_order: z.coerce.number().int(),
  is_active: z.coerce.boolean(),
});
