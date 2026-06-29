import { useEffect, useMemo, useState } from 'react';
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
import { getAnalyticsSummary } from '../../services/analyticsService';
import { logoutAdmin } from '../../services/authService';
import { getFeedbackList } from '../../services/feedbackService';
import { clearStoredAuth, getStoredAuthUser } from '../../utils/authStorage';

const emptyAnalytics = {
  overview: {
    totalFeedback: 0,
    totalNew: 0,
    totalInReview: 0,
    totalResolved: 0,
    totalArchived: 0,
    averageRating: 0,
  },
  categoryDistribution: [],
  ratingDistribution: [],
  recentSubmissions: [],
  trends: {
    todayCount: 0,
    yesterdayCount: 0,
    weeklyCount: 0,
    monthlyCount: 0,
  },
};

function DashboardPage() {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(emptyAnalytics);
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FEEDBACK_FILTERS);
  const [dashboardState, setDashboardState] = useState({
    isLoading: true,
    error: '',
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const adminUser = getStoredAuthUser();

  const apiFilters = useMemo(
    () => ({
      search: filters.search,
      category: filters.category,
      status: filters.status,
      rating: filters.rating,
      sortBy: filters.sortBy,
      page: 1,
      limit: 50,
    }),
    [filters],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        setDashboardState({
          isLoading: true,
          error: '',
        });

        const [analyticsResponse, feedbackResponse] = await Promise.all([
          getAnalyticsSummary(),
          getFeedbackList(apiFilters),
        ]);

        if (!isMounted) return;

        if (!analyticsResponse.success || !feedbackResponse.success) {
          throw new Error('Unable to load dashboard data.');
        }

        setAnalytics(analyticsResponse.data);
        setFeedbackItems(feedbackResponse.data);
      } catch (error) {
        if (!isMounted) return;

        setDashboardState({
          isLoading: false,
          error: error.message || 'Something went wrong while loading dashboard data.',
        });
        return;
      }

      if (!isMounted) return;

      setDashboardState({
        isLoading: false,
        error: '',
      });
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [apiFilters]);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      await logoutAdmin();
    } catch {
      // Even if server logout fails, local auth should still be cleared.
    } finally {
      clearStoredAuth();
      setIsLoggingOut(false);
      navigate('/admin/login');
    }
  }

  if (dashboardState.isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
        <section className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin Console
          </p>
          <h1 className="mt-3 text-2xl font-bold text-slate-950">
            Loading dashboard...
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please wait while we fetch feedback insights.
          </p>
        </section>
      </main>
    );
  }

  if (dashboardState.error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
        <section className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
            Dashboard Error
          </p>
          <h1 className="mt-3 text-2xl font-bold text-slate-950">
            Unable to load dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">{dashboardState.error}</p>
          <Button className="mt-6" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </section>
      </main>
    );
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

            <Button
              variant="secondary"
              onClick={handleLogout}
              isLoading={isLoggingOut}
              className="gap-2"
            >
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
            totalResults={feedbackItems.length}
          />
        </div>

        <div className="mt-6">
          <FeedbackTable feedbackItems={feedbackItems} />
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;