import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
const color = (rate) => rate >= 80 ? "#1D9E75" : rate >= 60 ? "#BA7517" : "#E24B4A";
export default function TagBarChart({ tagStats }) {
  const data = Object.entries(tagStats)
    .map(([tag, s]) => ({ tag, rate: Math.round(s.success_rate * 100) }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 12);
  return (
    <div style={{ background: "#fff", border: "0.5px solid #e5e5e5", borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 12 }}>Success Rate by Tag</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} fontSize={11} />
          <YAxis type="category" dataKey="tag" width={100} fontSize={11} />
          <Tooltip formatter={(v) => [`${v}%`, "Success rate"]} />
          <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => <Cell key={i} fill={color(entry.rate)} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
