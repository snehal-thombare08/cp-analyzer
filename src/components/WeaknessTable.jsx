const BADGE = {
  "Critical — Daily practice needed": { bg: "#FCEBEB", color: "#A32D2D", label: "Critical" },
  "Needs work — Practice 3x/week": { bg: "#FAEEDA", color: "#633806", label: "Needs work" },
  "Moderate — Review concepts": { bg: "#EAF3DE", color: "#27500A", label: "Moderate" },
  "Strong — Keep it up": { bg: "#E1F5EE", color: "#085041", label: "Strong" },
};
export default function WeaknessTable({ data }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid #e5e5e5", borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 12 }}>Weak Topics</div>
      {data.map((item) => {
        const badge = BADGE[item.recommendation] ?? BADGE["Strong — Keep it up"];
        return (
          <div key={item.tag} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: "0.5px solid #f0f0f0" }}>
            <span style={{ fontSize: 13 }}>{item.tag}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#888" }}>{Math.round(item.success_rate * 100)}%</span>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500, background: badge.bg, color: badge.color }}>{badge.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
