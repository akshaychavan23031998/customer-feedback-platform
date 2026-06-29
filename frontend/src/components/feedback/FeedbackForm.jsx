import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import Button from '../common/Button';
import FormFieldError from '../common/FormFieldError';
import { FEEDBACK_CATEGORIES, RATING_OPTIONS } from '../../constants/feedback.constants';
import { submitFeedback } from '../../services/feedbackService';
import { feedbackFormSchema } from '../../utils/validationSchemas';

const defaultValues = {
  name: '',
  email: '',
  category: '',
  rating: 5,
  comment: '',
};

function FeedbackForm() {
  const [submitState, setSubmitState] = useState({
    type: '',
    message: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues,
  });

  const commentValue =
    useWatch({
      control,
      name: 'comment',
    }) || '';

  async function onSubmit(formValues) {
    setSubmitState({ type: '', message: '' });

    const payload = {
      ...formValues,
      name: formValues.name?.trim() || undefined,
      email: formValues.email?.trim() || undefined,
      comment: formValues.comment.trim(),
      source: 'Web',
    };

    try {
      const response = await submitFeedback(payload);

      if (!response.success) {
        setSubmitState({
          type: 'error',
          message: response.message || 'Unable to submit feedback. Please try again.',
        });
        return;
      }

      setSubmitState({
        type: 'success',
        message: 'Thank you! Your feedback has been submitted successfully.',
      });

      reset(defaultValues);
    } catch {
      setSubmitState({
        type: 'error',
        message: 'Unable to submit feedback right now. Please check your connection and try again.',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name <span className="text-slate-400">(optional)</span>
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            {...register('name')}
          />

          <FormFieldError message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email <span className="text-slate-400">(optional)</span>
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            {...register('email')}
          />

          <FormFieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-medium text-slate-700">
          Feedback category
        </label>

        <select
          id="category"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          {...register('category')}
        >
          <option value="">Select a category</option>
          {FEEDBACK_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <FormFieldError message={errors.category?.message} />
      </div>

      <div>
        <span className="text-sm font-medium text-slate-700">Rating</span>

        <div className="mt-2 grid grid-cols-5 gap-2">
          {RATING_OPTIONS.map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-400 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700"
            >
              <input type="radio" value={rating} className="sr-only" {...register('rating')} />
              {rating}
            </label>
          ))}
        </div>

        <FormFieldError message={errors.rating?.message} />
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="comment" className="text-sm font-medium text-slate-700">
            Comments
          </label>

          <span className="text-xs text-slate-400">{commentValue.length}/500</span>
        </div>

        <textarea
          id="comment"
          rows="5"
          placeholder="Tell us what happened, what can be improved, or what you liked..."
          className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          {...register('comment')}
        />

        <FormFieldError message={errors.comment?.message} />
      </div>

      {submitState.message ? (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            submitState.type === 'success'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {submitState.message}
        </div>
      ) : null}

      <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full gap-2">
        <Send size={18} />
        Submit Feedback
      </Button>
    </form>
  );
}

export default FeedbackForm;
