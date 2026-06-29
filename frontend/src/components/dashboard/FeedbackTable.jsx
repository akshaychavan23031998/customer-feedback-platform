function FeedbackTable({ feedbackItems, isLoading = false, error = '' }) {
  if (isLoading) {
    return (
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-950">All feedback</h2>
          <p className="mt-1 text-sm text-slate-500">
            Complete list of feedback submissions matching the selected filters.
          </p>
        </div>

        <div className="px-6 py-8 text-center text-sm font-medium text-slate-500">
          Loading feedback...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-950">Unable to load feedback</h2>
        <p className="mt-2 text-sm text-slate-500">{error}</p>
      </section>
    );
  }

  if (!feedbackItems.length) {
    return (
      <section className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-950">No feedback found</h2>
        <p className="mt-2 text-sm text-slate-500">
          No feedback found for the selected filters.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-950">All feedback</h2>
        <p className="mt-1 text-sm text-slate-500">
          Complete list of feedback submissions matching the selected filters.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Feedback
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Category
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Rating
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                User
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Submitted
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {feedbackItems.map((item) => (
              <tr key={item.id} className="align-top hover:bg-slate-50">
                <td className="max-w-md px-6 py-4">
                  <p className="font-medium text-slate-950">{item.comment}</p>
                  <p className="mt-1 text-xs text-slate-400">ID: {item.id}</p>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {item.category}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-4 font-medium text-slate-700">{item.rating}★</td>

                <td className="px-6 py-4">
                  <p className="font-medium text-slate-700">{item.user?.name || 'Anonymous'}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.user?.email || 'No email'}</p>
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default FeedbackTable;
