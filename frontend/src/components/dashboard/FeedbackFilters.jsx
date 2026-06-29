import { Search } from 'lucide-react';

import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_STATUSES,
  RATING_OPTIONS,
} from '../../constants/feedback.constants';

function FeedbackFilters({ filters, onFilterChange, totalResults }) {
  function handleChange(event) {
    const { name, value } = event.target;

    onFilterChange({
      ...filters,
      [name]: value,
    });
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Feedback explorer</h2>
          <p className="mt-1 text-sm text-slate-500">
            Search and filter all submitted feedback.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-950">{totalResults}</span> result
          {totalResults === 1 ? '' : 's'}
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Search</span>
          <div className="relative mt-2">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Search comment, category, user..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All</option>
            {FEEDBACK_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Status</span>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All</option>
            {FEEDBACK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Rating</span>
          <select
            name="rating"
            value={filters.rating}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All</option>
            {RATING_OPTIONS.map((rating) => (
              <option key={rating} value={rating}>
                {rating} star
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Sort by</span>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="highestRating">Highest rating</option>
            <option value="lowestRating">Lowest rating</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default FeedbackFilters;