import * as z from "zod"; 
 
export const SendEmailInput = z.object({ 
  recipient: z
  .string({message: 'recipient email must be string'})
  .email({message: "invalid email address"}),
  listLink: z.string(), 
  listName: z.string().min(1, {message: "list name cannot be empty"}),
});

export const CronJobInput = z.object({
    recipient: z
    .string({message: 'recipient email must be string'})
    .email({message: "invalid email address"}),
    listLink: z.string(), 
    listName: z.string().min(1, {message: "list name cannot be empty"}),
    sender: z.string().min(1, {message: "sender name cannot be empty"}),
})