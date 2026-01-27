import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/**
 * Admin analytics charts component
 */
export default function AdminCharts({ data }: any) {
  const COLORS = ["#4ade80", "#facc15", "#f87171"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Pie Chart - Issue Status */}
      <div className="bg-white p-4 rounded shadow text-black">  
        <h2 className="font-semibold mb-2 text-black">Issues by Status</h2>
        <PieChart width={300} height={300}>
          <Pie
            data={data.issuesByStatus}
            dataKey="count"
            nameKey="_id"
            outerRadius={100}
          >
            {data.issuesByStatus.map((_: any, i: number) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Bar Chart - Department */}
      <div className="bg-white p-4 rounded shadow text-black">
        <h2 className="font-semibold mb-2 text-black">Issues by Department</h2>
        <BarChart width={350} height={300} data={data.issuesByDepartment}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#60a5fa" />
        </BarChart>
      </div>
    </div>
  );
}
