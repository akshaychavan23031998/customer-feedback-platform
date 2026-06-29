function RecentSubmissions({ submissions }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Recent submissions</h2>
        <p className="mt-1 text-sm text-slate-500">
          Latest feedback received from users.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {submissions.map((submission) => (
          <article
            key={submission.id}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {submission.category}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {submission.status}
                </span>
                <span className="text-sm text-slate-500">{submission.rating}★</span>
              </div>

              <time className="text-xs text-slate-400">
                {new Date(submission.createdAt).toLocaleString()}
              </time>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-700">{submission.comment}</p>

            <p className="mt-3 text-xs text-slate-500">
              Submitted by {submission.user?.name || 'Anonymous'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecentSubmissions;