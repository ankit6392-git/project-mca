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
