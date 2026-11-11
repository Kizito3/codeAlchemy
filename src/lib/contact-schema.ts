import { z } from "zod";

export const contactInput = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(200),
  company: z.string().trim().max(200),
  services: z.array(z.string().max(60)).min(1, "Choose at least one service").max(8),
  budget: z.string().trim().min(1, "Select a budget range").max(60),
  timeline: z.string().trim().max(60),
  message: z.string().trim().min(10, "Tell us a little more").max(5000),
  trap: z.string().max(200), // honeypot: real people leave it empty
});

export type ContactInput = z.infer<typeof contactInput>;