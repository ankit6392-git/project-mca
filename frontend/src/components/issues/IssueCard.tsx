export default function IssueCard({ issue }: any) {
  return (
    <div className="gov-card mb-3">
      <h2 className="font-semibold">{issue.title}</h2>
      <p className="text-sm text-gray-600">{issue.description}</p>
      <span className="text-xs text-blue-800 font-medium">
        Status: {issue.status.toUpperCase()}
      </span>
    </div>
  );
}
<div key={issue._id} className="bg-white p-4 rounded shadow space-y-2">
  <div className="flex justify-between items-center">
    <h3 className="font-semibold">{issue.title}</h3>

    <span
      className={`text-xs px-3 py-1 rounded-full ${statusColor(
        issue.status
      )}`}
    >
      {issue.status}
    </span>
  </div>

  <p className="text-sm text-gray-600">
    <b>Complaint ID:</b> {issue.complaintId}
  </p>

  <p className="text-sm text-gray-600">{issue.description}</p>

  <div className="flex gap-3 text-xs">
    <span
      className={`px-2 py-1 rounded ${priorityColor(issue.priority)}`}
    >
      Priority: {issue.priority}
    </span>

    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
      Users affected: {issue.relatedUsers?.length || 1}
    </span>
  </div>

  {issue.status !== "resolved" && (
    <button
      onClick={async () => {
        await api.post(`/issues/${issue._id}/follow`);
        fetchIssues();
      }}
      className="text-sm bg-indigo-600 text-white px-3 py-1 rounded"
    >
      Follow this ticket
    </button>
  )}
</div>
