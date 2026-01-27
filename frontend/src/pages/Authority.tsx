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
    await api.put(`/issues/status/${id}`, { status });
    setToast(`Issue marked as ${status}`);
    fetchIssues();
    setTimeout(() => setToast(""), 3000);
  };

  const filteredIssues = issues.filter((i) =>
    statusFilter === "all" ? true : i.status === statusFilter
  );

  const finalIssues = filteredIssues.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="p-6 text-black">
        {toast && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded">
            {toast}
          </div>
        )}

        <AuthorityChart issues={issues} />

        <div className="flex gap-4 mb-4">
          <select
            className="border p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <input
            type="text"
            placeholder="Search by title"
            className="border p-2 flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          {finalIssues.map((issue) => (
            <div key={issue._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{issue.title}</h3>
              <p className="text-sm text-gray-600">{issue.description}</p>

              <p className="text-xs text-gray-500 mt-1">
                Registered on:{" "}
                {new Date(issue.createdAt).toLocaleString()}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="capitalize font-medium">
                  {issue.status}
                </span>

                <select
                  className="border p-2"
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
