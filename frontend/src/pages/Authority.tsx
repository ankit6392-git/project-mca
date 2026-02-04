import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/common/Navbar";
import AuthorityChart from "../components/authority/AuthorityChart";

export default function Authority() {
  const [issues, setIssues] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const fetchIssues = () => {
    api.get("/issues/department").then((res) => setIssues(res.data));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/issues/${id}/status`, { status });
    setToast(`Issue marked as ${status}`);
    fetchIssues();
    setTimeout(() => setToast(""), 3000);
  };

  const priorityColor = (p: string) => {
    if (p === "HIGH") return "bg-red-200 text-red-800";
    if (p === "MEDIUM") return "bg-yellow-200 text-yellow-800";
    return "bg-green-200 text-green-800";
  };

  const filteredIssues = issues
    .filter((i) =>
      statusFilter === "all" ? true : i.status === statusFilter
    )
    .filter((i) =>
      i.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6 text-black">
        {/* Toast */}
        {toast && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow">
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="max-w-7xl mx-auto mb-6">
          <h1 className="text-2xl font-bold">
            Authority Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and resolve department complaints
          </p>
        </div>

        {/* Chart */}
        <div className="max-w-7xl mx-auto mb-8 bg-white p-6 rounded shadow">
          <AuthorityChart issues={issues} />
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto flex gap-4 mb-6">
          <select
            className="border rounded px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <input
            type="text"
            placeholder="Search by title"
            className="border rounded px-3 py-2 flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Issue List */}
        <div className="max-w-7xl mx-auto grid gap-5">
          {filteredIssues.map((issue) => (
            <div
              key={issue._id}
              className="bg-white p-5 rounded shadow border-l-4 border-indigo-600"
            >
              {/* Complaint ID */}
              <p className="text-xs text-gray-500 mb-1">
                Complaint ID: <b>{issue.complaintId}</b>
              </p>

              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">
                  {issue.title}
                </h3>

                <span
                  className={`px-2 py-1 text-xs rounded ${priorityColor(
                    issue.priority
                  )}`}
                >
                  {issue.priority}
                </span>
              </div>

              <p className="text-sm text-gray-700">
                {issue.description}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                📅 Registered on:{" "}
                {new Date(issue.createdAt).toLocaleString()}
              </p>

              {issue.location && (
                <p className="text-xs text-gray-600 mt-1">
                  📍 <b>Location:</b> {issue.location}
                </p>
              )}

              {/* Status Control */}
              <div className="flex justify-between items-center mt-4">
                <span className="capitalize font-medium">
                  Status: {issue.status}
                </span>

                <select
                  className="border rounded px-3 py-1"
                  value={issue.status}
                  onChange={(e) =>
                    updateStatus(issue._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
