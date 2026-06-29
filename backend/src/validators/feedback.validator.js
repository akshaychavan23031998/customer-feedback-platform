import { allowedCategories } from '../data/feedback.store.js';

export function validateCreateFeedbackPayload(payload) {
  const errors = [];

  if (!payload || typeof payload !== 'object') {
    return ['Request body is required.'];
  }

  const { name, email, category, rating, comment } = payload;

  if (name && typeof name !== 'string') {
    errors.push('Name must be a string.');
  }

  if (name && name.trim().length > 50) {
    errors.push('Name must be less than 50 characters.');
  }

  if (email && typeof email !== 'string') {
    errors.push('Email must be a string.');
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push('Email must be valid.');
  }

  if (!category) {
    errors.push('Category is required.');
  }

  if (category && !allowedCategories.includes(category)) {
    errors.push('Category must be one of the allowed categories.');
  }

  if (rating === undefined || rating === null || rating === '') {
    errors.push('Rating is required.');
  }

  const numericRating = Number(rating);

  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    errors.push('Rating must be an integer between 1 and 5.');
  }

  if (!comment || typeof comment !== 'string') {
    errors.push('Comment is required.');
  }

  if (comment && comment.trim().length < 10) {
    errors.push('Comment must be at least 10 characters.');
  }

  if (comment && comment.trim().length > 500) {
    errors.push('Comment must be less than 500 characters.');
  }

  return errors;
}