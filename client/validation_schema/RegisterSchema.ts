import { z } from 'zod'

export const RegisterValidationSchema = z
  .object({
    email: z
      .string({ required_error: 'An email is required' })
      .email('Invalid email'),
    password: z
      .string()
      .min(6, 'Your password must be at least six characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Your password must be at least six characters long'),
    agreeTerms: z.boolean({
      required_error: 'The terms must be accepted to proceed',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.agreeTerms === true, {
    message: 'Agree to the privacy policy terms',
    path: ['agreeTerms'],
  })
