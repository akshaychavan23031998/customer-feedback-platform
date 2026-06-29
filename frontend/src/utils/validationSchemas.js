import { z } from 'zod';

import { FEEDBACK_CATEGORIES, RATING_OPTIONS } from '../constants/feedback.constants';

export const feedbackFormSchema = z.object({
  name: z
    .string()
    .trim()
    .max(50, 'Name must be less than 50 characters.')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .optional()
    .or(z.literal('')),
  category: z.enum(FEEDBACK_CATEGORIES, {
    message: 'Please select a valid category.',
  }),
  rating: z.coerce
    .number()
    .refine((value) => RATING_OPTIONS.includes(value), {
      message: 'Please select a rating between 1 and 5.',
    }),
  comment: z
    .string()
    .trim()
    .min(10, 'Comment must be at least 10 characters.')
    .max(500, 'Comment must be less than 500 characters.'),
});