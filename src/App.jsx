import { useState } from "react";
import { analyzeUser } from "./api";
import StatCard from "./components/StatCard";
import WeaknessTable from "./components/WeaknessTable";
import TagBarChart from "./components/BarChart";

export default function App() {
  const [handle, setHandle] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze() {
    if (!handle.trim()) return;
    setLoading(true); setError(""); setData(null);
    try {
      const result = await analyzeUser(handle.trim());
      setData(result);
    } catch (e) {
      setError(e.response?.data?.detail ?? "Handle not found or API error.");
    } finally {
      setLoading(false);
    }
  }

  const totalSolved = data ? data.weaknesses.reduce((acc, w) => acc + w.solved, 0) : 0;
  const successRate = data ? Math.round((totalSolved / Math.max(data.total_submissions, 1)) * 100) : 0;
  const criticalCount = data ? data.weaknesses.filter((w) => w.recommendation.startsWith("Critical")).length : 0;

  return (
    <div style={{ padding: 20, background: "#f7f7f5", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
        <span style={{ fontSize: 18, fontWeight: 500 }}>CP Analyzer</span>
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && analyze()}
          placeholder="Enter Codeforces handle..."
          style={{ flex: 1, height: 36, padding: "0 12px", borderRadius: 8, border: "0.5px solid #ccc", fontSize: 14, background: "#fff" }}
        />
        <button
          onClick={analyze}
          disabled={loading}
          style={{ height: 36, padding: "0 20px", borderRadius: 8, border: "0.5px solid #ccc", cursor: "pointer", fontSize: 14, background: loading ? "#eee" : "#fff" }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && (
        <div style={{ background: "#FCEBEB", color: "#A32D2D", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
          {error}
        </div>
      )}

      {data && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
            <StatCard label="Rating" value={data.rating ?? "Unrated"} sub={data.rank} color="#185FA5" />
            <StatCard label="Total submissions" value={data.total_submissions} sub="Last 500 fetched" />
            <StatCard label="Success rate" value={`${successRate}%`} color={successRate > 70 ? "#1D9E75" : "#E24B4A"} />
            <StatCard label="Critical topics" value={criticalCount} sub="Need daily practice" color="#E24B4A" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <WeaknessTable data={data.weaknesses.slice(0, 8)} />
            <TagBarChart tagStats={data.tag_stats} />
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e5e5e5", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#888", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 12 }}>
              Practice Recommendations
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {data.weaknesses.filter((w) => !w.recommendation.startsWith("Strong")).slice(0, 6).map((w) => {
                const isC = w.recommendation.startsWith("Critical");
                return (
                  <div key={w.tag} style={{ background: isC ? "#FCEBEB" : "#FAEEDA", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: isC ? "#A32D2D" : "#633806", marginBottom: 4 }}>
                      {w.tag} — {isC ? "Critical" : "Needs work"}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      Success: {Math.round(w.success_rate * 100)}% | {w.attempts} attempts
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {!data && !loading && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: 14 }}>
          Enter a Codeforces handle above and click Analyze
        </div>
      )}
    </div>
  );
}
