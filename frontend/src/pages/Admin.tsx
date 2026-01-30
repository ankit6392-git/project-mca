// import { useEffect, useState } from "react";
// import { api } from "../services/api";
// import Navbar from "../components/common/Navbar";
// import AdminCharts from "../components/admin/AdminCharts";

// export default function Admin() {
//   const [analytics, setAnalytics] = useState<any>(null);
//   const [users, setUsers] = useState<any[]>([]);

//   const fetchAnalytics = () => {
//     api.get("/analytics").then((res) => setAnalytics(res.data));
//   };

//   const fetchUsers = () => {
//     api.get("/users").then((res) => setUsers(res.data));
//   };

//   useEffect(() => {
//     fetchAnalytics();
//     fetchUsers();
//   }, []);

//   const updateRole = async (
//     id: string,
//     role: string,
//     department?: string
//   ) => {
//     await api.put(`/users/update-role/${id}`, {
//       role,
//       department,
//     });
//     fetchUsers();
//   };

//   const deleteUser = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;
//     await api.delete(`/users/${id}`);
//     fetchUsers();
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="bg-gray-100 min-h-screen p-6">
//         <div className="max-w-7xl mx-auto space-y-8">

//           {/* ================= HEADER ================= */}
//           <div>
//             <h1 className="text-2xl font-bold text-black">
//               Admin Dashboard
//             </h1>
//             <p className="text-gray-600">
//               System analytics & user management
//             </p>
//           </div>

//           {/* ================= ANALYTICS ================= */}
//           {analytics && (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-white p-6 rounded shadow border-l-4 border-blue-600">
//                   <p className="text-gray-500 text-sm">
//                     Total Users
//                   </p>
//                   <p className="text-3xl font-bold text-black">
//                     {analytics.totalUsers}
//                   </p>
//                 </div>

//                 <div className="bg-white p-6 rounded shadow border-l-4 border-green-600">
//                   <p className="text-gray-500 text-sm">
//                     Total Issues
//                   </p>
//                   <p className="text-3xl font-bold text-black">
//                     {analytics.totalIssues}
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-white p-6 rounded shadow">
//                 <AdminCharts data={analytics} />
//               </div>
//             </>
//           )}

//           {/* ================= USER MANAGEMENT ================= */}
//           <div className="bg-white rounded shadow">
//             <div className="p-5 border-b">
//               <h2 className="text-xl font-semibold text-black">
//                 Manage Users
//               </h2>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-black">
//                 <thead className="bg-gray-100 sticky top-0">
//                   <tr className="text-left">
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Email</th>
//                     <th className="p-3">Role</th>
//                     <th className="p-3">Department</th>
//                     <th className="p-3">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {users.map((u) => (
//                     <tr
//                       key={u._id}
//                       className="border-t hover:bg-gray-50 transition"
//                     >
//                       <td className="p-3 font-medium">
//                         {u.name}
//                       </td>

//                       <td className="p-3 text-gray-700">
//                         {u.email}
//                       </td>

//                       <td className="p-3">
//                         <span
//                           className={`px-2 py-1 rounded text-xs font-semibold
//                             ${
//                               u.role === "admin"
//                                 ? "bg-purple-100 text-purple-800"
//                                 : u.role === "authority"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "bg-gray-200 text-gray-800"
//                             }`}
//                         >
//                           {u.role}
//                         </span>
//                       </td>

//                       <td className="p-3">
//                         {u.role === "authority" ? (
//                           <select
//                             className="border rounded px-2 py-1 text-black"
//                             value={u.department || ""}
//                             onChange={(e) =>
//                               updateRole(
//                                 u._id,
//                                 "authority",
//                                 e.target.value
//                               )
//                             }
//                           >
//                             <option value="">Select</option>
//                             <option value="water">Water</option>
//                             <option value="road">Road</option>
//                             <option value="electricity">
//                               Electricity
//                             </option>
//                             <option value="sanitation">
//                               Sanitation
//                             </option>
//                           </select>
//                         ) : (
//                           <span className="text-gray-400">
//                             —
//                           </span>
//                         )}
//                       </td>

//                       <td className="p-3 space-x-2">
//                         <button
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
//                           onClick={() =>
//                             updateRole(
//                               u._id,
//                               "authority",
//                               "water"
//                             )
//                           }
//                         >
//                           Make Authority
//                         </button>

//                         <button
//                           className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs"
//                           onClick={() =>
//                             updateRole(u._id, "citizen")
//                           }
//                         >
//                           Make Citizen
//                         </button>

//                         <button
//                           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
//                           onClick={() => deleteUser(u._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}

//                   {users.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan={5}
//                         className="text-center p-6 text-gray-500"
//                       >
//                         No users found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/common/Navbar";
import AdminCharts from "../components/admin/AdminCharts";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { user } = useAuth(); // logged-in admin

  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  const fetchAnalytics = () => {
    api.get("/analytics").then((res) => setAnalytics(res.data));
  };

  const fetchUsers = () => {
    api.get("/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchAnalytics();
    fetchUsers();
  }, []);

  const updateRole = async (
    id: string,
    role: string,
    department?: string
  ) => {
    await api.put(`/users/update-role/${id}`, {
      role,
      department,
    });
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  // ✅ REMOVE ADMIN FROM USER MANAGEMENT TABLE
  const managedUsers = users.filter((u) => u.role !== "admin");

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* ================= ADMIN PROFILE (SEPARATE) ================= */}
          {user && (
            <div className="bg-white rounded shadow p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-lg font-semibold text-black">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {user.email}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-semibold">
                    ADMIN
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href="/profile"
                  className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}

          {/* ================= ANALYTICS ================= */}
          {analytics && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded shadow border-l-4 border-blue-600">
                  <p className="text-gray-500 text-sm">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {analytics.totalUsers}
                  </p>
                </div>

                <div className="bg-white p-6 rounded shadow border-l-4 border-green-600">
                  <p className="text-gray-500 text-sm">
                    Total Issues
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {analytics.totalIssues}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded shadow">
                <AdminCharts data={analytics} />
              </div>
            </>
          )}

          {/* ================= USER MANAGEMENT ================= */}
          <div className="bg-white rounded shadow">
            <div className="p-5 border-b">
              <h2 className="text-xl font-semibold text-black">
                Manage Users
              </h2>
              <p className="text-sm text-gray-500">
                Citizens & Authorities only
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-black">
                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {managedUsers.map((u) => (
                    <tr
                      key={u._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium">
                        {u.name}
                      </td>

                      <td className="p-3 text-gray-700">
                        {u.email}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold
                            ${
                              u.role === "authority"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-200 text-gray-800"
                            }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="p-3">
                        {u.role === "authority" ? (
                          <select
                            className="border rounded px-2 py-1"
                            value={u.department || ""}
                            onChange={(e) =>
                              updateRole(
                                u._id,
                                "authority",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select</option>
                            <option value="water">Water</option>
                            <option value="road">Road</option>
                            <option value="electricity">
                              Electricity
                            </option>
                            <option value="sanitation">
                              Sanitation
                            </option>
                          </select>
                        ) : (
                          <span className="text-gray-400">
                            —
                          </span>
                        )}
                      </td>

                      <td className="p-3 space-x-2">
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                          onClick={() =>
                            updateRole(
                              u._id,
                              "authority",
                              "water"
                            )
                          }
                        >
                          Make Authority
                        </button>

                        <button
                          className="bg-gray-600 text-white px-3 py-1 rounded text-xs"
                          onClick={() =>
                            updateRole(u._id, "citizen")
                          }
                        >
                          Make Citizen
                        </button>

                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                          onClick={() => deleteUser(u._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {managedUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center p-6 text-gray-500"
                      >
                        No users available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
