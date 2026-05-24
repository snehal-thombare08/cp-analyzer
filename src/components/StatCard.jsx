export default function StatCard({ label, value, sub, color }) {
  return (
    <div style={{ background: "#f0f0ee", borderRadius: 8, padding: "12px 16px" }}>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 500, color: color || "#111" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
