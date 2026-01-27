const issues = [
  { id: 1, title: "Pothole on Main Road", status: "OPEN" },
  { id: 2, title: "Streetlight not working", status: "IN_PROGRESS" },
  { id: 3, title: "Water leakage near park", status: "RESOLVED" }
];

const statusColor = {
  OPEN: "bg-red-500/20 text-red-400",
  IN_PROGRESS: "bg-yellow-500/20 text-yellow-400",
  RESOLVED: "bg-green-500/20 text-green-400"
};

export default function Issues() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Reported Issues</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {issues.map(issue => (
          <div
            key={issue.id}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl mb-4">{issue.title}</h2>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${statusColor[issue.status]}`}
            >

              <p className="text-sm text-indigo-400">
  AI Category: {issue.category} ({issue.aiConfidence}%)
</p>


              {issue.status.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
