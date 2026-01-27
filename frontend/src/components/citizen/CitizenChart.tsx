import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function CitizenChart({ issues }: any) {
  const data = [
    {
      name: "Pending",
      value: issues.filter((i: any) => i.status === "pending").length,
    },
    {
      name: "In Progress",
      value: issues.filter((i: any) => i.status === "in-progress").length,
    },
    {
      name: "Resolved",
      value: issues.filter((i: any) => i.status === "resolved").length,
    },
  ];

  const COLORS = ["#ef4444", "#facc15", "#22c55e"];

  return (
    <div className="bg-white text-black p-4 rounded shadow mb-6">
      <h2 className="font-semibold mb-2">
        Complaint Status Overview
      </h2>

      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
