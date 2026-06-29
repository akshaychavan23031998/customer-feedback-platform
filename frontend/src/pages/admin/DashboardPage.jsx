function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-7xl">
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

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          Dashboard widgets will be built here.
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;