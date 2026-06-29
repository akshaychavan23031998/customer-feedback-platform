import FeedbackForm from '../../components/feedback/FeedbackForm';

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
          Your feedback helps us improve the product experience.
        </p>

        <FeedbackForm />
      </section>
    </main>
  );
}

export default FeedbackPage;