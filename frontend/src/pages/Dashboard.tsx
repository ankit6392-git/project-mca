import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/common/Navbar";
import IssueForm from "../components/issues/IssueForm";
import CitizenChart from "../components/citizen/CitizenChart";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [issues, setIssues] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const fetchIssues = () => {
    api.get("/issues/my").then((res) => setIssues(res.data));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const priorityColor = (priority: string) => {
    if (priority === "HIGH") return "bg-red-200 text-red-800";
    if (priority === "MEDIUM") return "bg-yellow-200 text-yellow-800";
    return "bg-green-200 text-green-800";
  };

  const filteredIssues = issues
    .filter((i) =>
      statusFilter === "all" ? true : i.status === statusFilter
    )
    .filter((i) =>
      i.title.toLowerCase().includes(search.toLowerCase())
    );

  const followTicket = async (id: string) => {
    try {
      await api.post(`/issues/${id}/follow`);
      setToast("You are now following this ticket");
      fetchIssues();
      setTimeout(() => setToast(""), 3000);
    } catch (err: any) {
      setToast(err.response?.data?.message || "Already following");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6">
        {/* Toast */}
        {toast && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-5 py-2 rounded shadow">
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="max-w-7xl mx-auto mb-6">
          <h1 className="text-2xl font-bold text-black">
            Citizen Dashboard
          </h1>
          <p className="text-gray-600">
            Register and track your civic complaints
          </p>
        </div>

        {/* Issue Form */}
        <div className="max-w-7xl mx-auto mb-10">
          <IssueForm
            onSuccess={() => {
              setToast("Complaint registered successfully");
              fetchIssues();
              setTimeout(() => setToast(""), 3000);
            }}
          />
        </div>

        {/* Chart */}
        <div className="max-w-7xl mx-auto mb-10 bg-white p-6 rounded shadow">
          <CitizenChart issues={issues} />
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto flex gap-4 mb-6">
          <select
            className="border rounded px-3 py-2 text-black"
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
            placeholder="Search complaint by title"
            className="border rounded px-3 py-2 flex-1 text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Issue List */}
        <div className="max-w-7xl mx-auto grid gap-5">
          {filteredIssues.map((issue) => {
            const isFollowing =
              issue.relatedUsers?.includes(user?.id);

            return (
              <div
                key={issue._id}
                className="bg-white p-5 rounded shadow border-l-4 border-blue-600"
              >
                {/* Complaint ID */}
                <p className="text-xs text-gray-500 mb-1">
                  Complaint ID: <b>{issue.complaintId}</b>
                </p>

                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-black">
                    {issue.title}
                  </h3>

                  <div className="flex gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${statusColor(
                        issue.status
                      )}`}
                    >
                      {issue.status}
                    </span>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${priorityColor(
                        issue.priority
                      )}`}
                    >
                      {issue.priority}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-700">
                  {issue.description}
                </p>

                <div className="text-xs text-gray-500 mt-2">
                  📅 Registered on:{" "}
                  {new Date(issue.createdAt).toLocaleString()}
                </div>

                <div className="text-xs text-gray-700 mt-1">
                  🏢 <b>Department:</b> {issue.department}
                </div>

                {issue.location && (
                  <div className="text-xs text-gray-700 mt-1">
                    📍 <b>Location:</b> {issue.location}
                  </div>
                )}

                {issue.image && (
                  <img
                    src={issue.image}
                    alt="issue"
                    className="mt-3 w-40 rounded border"
                  />
                )}

                {/* Follow Button */}
                <div className="mt-3">
                  <button
                    disabled={isFollowing}
                    onClick={() => followTicket(issue._id)}
                    className={`px-4 py-1 rounded text-sm ${
                      isFollowing
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow Ticket"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
