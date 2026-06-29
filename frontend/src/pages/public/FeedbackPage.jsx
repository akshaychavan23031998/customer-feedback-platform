function FeedbackPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          User Window
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          We value your feedback
        </h1>

        <p className="mt-3 text-slate-600">
          Share your thoughts, issues, or suggestions with the Acowale team.
        </p>

        <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-6 text-slate-500">
          Feedback form will be built here.
        </div>
      </section>
    </main>
  );
}

export default FeedbackPage;