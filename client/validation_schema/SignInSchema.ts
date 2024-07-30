import { z } from 'zod'

export const SignInValidationSchema = z.object({
  email: z
    .string({ required_error: 'Your login email is required' })
    .email('Invalid email'),
  password: z.string({
    required_error: 'A password is required to log in',
  }),
})
