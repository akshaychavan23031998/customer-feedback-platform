function StatCard({ title, value, helperText, icon: Icon }) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
          {helperText ? <p className="mt-2 text-sm text-slate-500">{helperText}</p> : null}
        </div>

        {Icon ? (
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Icon size={22} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default StatCard;