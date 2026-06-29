import { useMemo, useState } from 'react';
import {
  Archive,
  CheckCircle2,
  Clock3,
  Inbox,
  LogOut,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/Button';
import CategoryDistributionChart from '../../components/dashboard/CategoryDistributionChart';
import FeedbackFilters from '../../components/dashboard/FeedbackFilters';
import FeedbackTable from '../../components/dashboard/FeedbackTable';
import RatingDistributionChart from '../../components/dashboard/RatingDistributionChart';
import RecentSubmissions from '../../components/dashboard/RecentSubmissions';
import StatCard from '../../components/dashboard/StatCard';
import { DEFAULT_FEEDBACK_FILTERS } from '../../constants/feedback.constants';
import { mockAnalyticsResponse } from '../../data/analytics.mock';
import { mockFeedbackResponse } from '../../data/feedback.mock';
import { clearStoredAuth, getStoredAuthUser } from '../../utils/authStorage';
import { filterFeedbackItems, sortFeedbackItems } from '../../utils/feedbackFilters';

function DashboardPage() {
  const navigate = useNavigate();

  const analytics = mockAnalyticsResponse.data;
  const feedbackItems = mockFeedbackResponse.data;
  const adminUser = getStoredAuthUser();

  const [filters, setFilters] = useState(DEFAULT_FEEDBACK_FILTERS);

  const filteredFeedbackItems = useMemo(() => {
    const filteredItems = filterFeedbackItems(feedbackItems, filters);

    return sortFeedbackItems(filteredItems, filters.sortBy);
  }, [feedbackItems, filters]);

  function handleLogout() {
    clearStoredAuth();
    navigate('/admin/login');
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Admin Console
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Feedback Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Analyse feedback trends, category distribution, and recent submissions.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">
              Weekly feedback:{' '}
              <span className="font-semibold text-slate-950">
                {analytics.trends.weeklyCount}
              </span>
            </div>

            <div className="rounded-xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">
              Admin:{' '}
              <span className="font-semibold text-slate-950">
                {adminUser?.name || 'Admin'}
              </span>
            </div>

            <Button variant="secondary" onClick={handleLogout} className="gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            title="Total feedback"
            value={analytics.overview.totalFeedback}
            helperText="All submissions"
            icon={Inbox}
          />

          <StatCard
            title="New"
            value={analytics.overview.totalNew}
            helperText="Needs attention"
            icon={Clock3}
          />

          <StatCard
            title="In review"
            value={analytics.overview.totalInReview}
            helperText="Being checked"
            icon={TrendingUp}
          />

          <StatCard
            title="Resolved"
            value={analytics.overview.totalResolved}
            helperText="Completed"
            icon={CheckCircle2}
          />

          <StatCard
            title="Archived"
            value={analytics.overview.totalArchived}
            helperText="No action"
            icon={Archive}
          />

          <StatCard
            title="Avg rating"
            value={`${analytics.overview.averageRating}/5`}
            helperText="Customer score"
            icon={Star}
          />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <CategoryDistributionChart data={analytics.categoryDistribution} />
          <RatingDistributionChart data={analytics.ratingDistribution} />
        </div>

        <div className="mt-8">
          <RecentSubmissions submissions={analytics.recentSubmissions} />
        </div>

        <div className="mt-8">
          <FeedbackFilters
            filters={filters}
            onFilterChange={setFilters}
            totalResults={filteredFeedbackItems.length}
          />
        </div>

        <div className="mt-6">
          <FeedbackTable feedbackItems={filteredFeedbackItems} />
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;