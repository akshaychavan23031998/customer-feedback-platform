export const FEEDBACK_CATEGORIES = [
  'Bug',
  'Feature Request',
  'UI/UX',
  'Performance',
  'Support',
  'Billing',
  'General',
  'Other',
];

export const FEEDBACK_STATUSES = [
  'New',
  'In Review',
  'Resolved',
  'Archived',
];

export const FEEDBACK_SOURCES = ['Web', 'Mobile', 'Email', 'Other'];

export const RATING_OPTIONS = [1, 2, 3, 4, 5];

export const DEFAULT_FEEDBACK_FILTERS = {
  search: '',
  category: 'All',
  status: 'All',
  rating: 'All',
  sortBy: 'latest',
};