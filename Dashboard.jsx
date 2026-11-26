import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../components/WorkspaceLayout";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const { devices, rules, alerts, activities } = useData();
  const navigate = useNavigate();
  const [period, setPeriod] = useState("7 Days");
  const online = devices.filter(d => d.status === "Online").length;
  const offline = devices.length - online;
  const activeRules = rules.filter(r => r.enabled).length;
  const health = devices.length ? Math.round(online / devices.length * 1000) / 10 : 0;
  const name = user?.fullName || user?.name || "there";
  const firstName = name.split(" ")[0];
  const stats = [
    ["Total Devices", devices.length, "▣", "purple"],
    ["Online Devices", online, "⌁", "green"],
    ["Offline Devices", offline, "◉", "orange"],
    ["Active Rules", activeRules, "⚙", "blue"],
  ];
  const series = useMemo(() => {
    const count = period === "7 Days" ? 7 : period === "30 Days" ? 10 : 12;
    return Array.from({ length: count }, (_, i) => ({
      temperature: 25 + ((i * 13 + devices.length * 3) % 48),
      humidity: 18 + ((i * 17 + online * 2) % 45),
      label: period === "7 Days" ? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i] : `P${i+1}`,
    }));
  }, [period, devices.length, online]);
  const latestActivities = activities.slice(0,4);
  const latestAlerts = alerts.slice(0,3);

  return <WorkspaceLayout title="Dashboard" eyebrow="WORKSPACE / OVERVIEW">
    <section className="nf-welcome"><div><div className="welcome-date"><span className="live-dot"/> SYSTEM OVERVIEW</div><h1>Welcome back, {firstName}! <span>✦</span></h1><p>Here's what's happening across your connected IoT ecosystem.</p></div><button className="nf-primary-button" onClick={()=>navigate("/devices")}>＋ Add New Device</button></section>
    <section className="nf-stats">{stats.map(([title,value,icon,color])=><div className="nf-stat-card" key={title}><div className="stat-top"><span>{title}</span><div className={`stat-icon ${color}`}>{icon}</div></div><div className="stat-value">{value.toLocaleString()}</div><div className="stat-bottom"><span className="stat-change">Live count</span><span>from your workspace</span></div></div>)}</section>
    <section className="nf-middle-grid">
      <div className="nf-panel telemetry-panel"><div className="panel-heading"><div><h3>Telemetry Overview</h3><p>Sample sensor readings from your workspace</p></div><select value={period} onChange={e=>setPeriod(e.target.value)}><option>7 Days</option><option>30 Days</option><option>90 Days</option></select></div>
        <div className="telemetry-legend"><span><i className="legend-purple"/> Temperature</span><span><i className="legend-blue"/> Humidity</span></div>
        <div className="nf-chart"><div className="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-area"><div className="chart-grid-lines">{[1,2,3,4,5].map(n=><span key={n}/>)}</div><svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={series.map((d,i)=>`${i*100/(series.length-1)},${100-d.temperature}`).join(" ")} fill="none" stroke="#987cff" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/><polyline points={series.map((d,i)=>`${i*100/(series.length-1)},${100-d.humidity}`).join(" ")} fill="none" stroke="#42c9ff" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/></svg><div className="chart-x-labels">{series.map((d,i)=><span key={i}>{d.label}</span>)}</div></div></div><div className="chart-disclaimer">Illustrative sample telemetry · Connect hardware/API for live readings</div>
      </div>
      <div className="nf-panel system-panel"><div className="panel-heading"><div><h3>System Health</h3><p>Based on registered device status</p></div><span className="health-dot"/></div><div className="health-circle" style={{background:`radial-gradient(circle,#151e34 59%,transparent 61%),conic-gradient(#8f79ff 0% ${health}%,#29334b ${health}% 100%)`}}><div><strong>{health}%</strong><span>Operational</span></div></div><div className="health-row"><span><i className="health-green"/> Online</span><strong>{online}</strong></div><div className="health-row"><span><i className="health-orange"/> Offline</span><strong>{offline}</strong></div><div className="health-row"><span><i className="health-blue"/> Total</span><strong>{devices.length}</strong></div></div>
    </section>
    <section className="nf-bottom-grid">
      <div className="nf-panel devices-panel"><div className="panel-heading"><div><h3>Connected Devices</h3><p>Your recently registered devices</p></div><button className="nf-view-all" onClick={()=>navigate("/devices")}>Manage Devices →</button></div><div className="nf-table-wrap"><table className="nf-table"><thead><tr><th>DEVICE</th><th>DEVICE ID</th><th>STATUS</th><th>READING</th></tr></thead><tbody>{devices.slice(0,5).map(d=><tr key={d.id}><td><div className="device-name"><span className="device-icon">▣</span>{d.name}</div></td><td>{d.id}</td><td><span className={`device-status ${d.status.toLowerCase()}`}>{d.status}</span></td><td>{d.status==="Online" ? `${d.reading ?? "—"}${d.unit||""}` : "—"}</td></tr>)}{devices.length===0&&<tr><td colSpan="4">No devices yet. Add your first device.</td></tr>}</tbody></table></div></div>
      <div className="nf-panel activity-panel"><div className="panel-heading"><div><h3>Recent Activity</h3><p>Latest workspace events</p></div><button className="nf-view-all" onClick={()=>navigate("/activity-logs")}>View All →</button></div><div className="activity-list">{latestActivities.map(a=><div className="activity-item" key={a.id}><div className="activity-icon">✓</div><div className="activity-details"><strong>{a.title}</strong><p>{a.detail}</p><small>{new Date(a.createdAt).toLocaleString()}</small></div></div>)}{latestActivities.length===0&&<p className="nf-muted">No activity recorded yet.</p>}</div></div>
    </section>
    <section className="nf-panel dashboard-alert-strip"><div className="panel-heading"><div><h3>Recent Alerts</h3><p>{alerts.filter(a=>!a.read).length} unread notifications</p></div><button className="nf-view-all" onClick={()=>navigate("/alerts")}>Open Alerts →</button></div><div className="alert-preview-list">{latestAlerts.map(a=><div key={a.id}><span className={`alert-severity ${a.severity.toLowerCase()}`}>{a.severity}</span><strong>{a.title}</strong><small>{new Date(a.createdAt).toLocaleString()}</small></div>)}{latestAlerts.length===0&&<p className="nf-muted">You're all caught up.</p>}</div></section>
  </WorkspaceLayout>;
}
