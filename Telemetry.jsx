import React, { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import WorkspaceLayout from "../components/WorkspaceLayout";
import { useData } from "../context/DataContext";

export default function TelemetryPage() {
  const { devices, rules, updateDevice, addAlert, log } = useData();
  const [selected, setSelected] = useState("all");
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const active = devices.filter(d=>d.status==="Online");
  const data = useMemo(()=>Array.from({length:12},(_,i)=>({time:`${String(i*2).padStart(2,"0")}:00`,temperature:22+((i*7+devices.length*3)%15),humidity:40+((i*9+active.length*4)%35),pressure:990+((i*11)%28)})),[devices.length,active.length,lastRefresh]);
  const refresh = () => {
    const samples = active.map(d => ({ ...d, reading: Number((Number(d.reading || 20) + (Math.random() - .45) * 2).toFixed(1)) }));
    samples.forEach(d => updateDevice(d.id, { reading: d.reading }));
    rules.filter(r => r.enabled).forEach(rule => {
      const matching = samples.find(d => {
        const metric = rule.metric.toLowerCase();
        return (metric.includes("temperature") && d.unit === "°C") ||
          (metric.includes("humidity") && d.unit === "%") ||
          (metric.includes("pressure") && d.unit.toLowerCase() === "hpa") ||
          (metric.includes("air") && d.unit.toLowerCase() === "aqi");
      });
      if (!matching) return;
      const value = Number(matching.reading);
      const triggered = rule.operator === ">" ? value > Number(rule.threshold) :
        rule.operator === "<" ? value < Number(rule.threshold) : value === Number(rule.threshold);
      if (triggered) addAlert({ title: `Rule triggered: ${rule.name}`, detail: `${matching.name} reported ${value}${matching.unit}; condition ${rule.metric} ${rule.operator} ${rule.threshold}`, severity: "Warning" });
    });
    setLastRefresh(new Date());
    log("Telemetry refreshed", `${active.length} online devices sampled; enabled rules evaluated`);
  };
  return <WorkspaceLayout title="Live Telemetry" eyebrow="MONITORING">
    <div className="nf-page-intro"><div><h1>Live Telemetry</h1><p>Explore sensor readings and recent device measurements.</p></div><button className="nf-primary-button" onClick={refresh}>↻ Refresh Readings</button></div>
    <div className="nf-stats compact-stats"><div className="nf-stat-card"><div className="stat-top">Online Sensors</div><div className="stat-value">{active.length}</div></div><div className="nf-stat-card"><div className="stat-top">Tracked Devices</div><div className="stat-value">{devices.length}</div></div><div className="nf-stat-card"><div className="stat-top">Telemetry Channels</div><div className="stat-value">3</div></div><div className="nf-stat-card"><div className="stat-top">Last Refresh</div><div className="stat-value" style={{fontSize:19}}>{lastRefresh.toLocaleTimeString()}</div></div></div>
    <section className="nf-panel"><div className="panel-heading"><div><h3>Sensor Data Stream</h3><p>Sampled values for demonstration; connect a device API for actual live telemetry.</p></div><select className="nf-control" value={selected} onChange={e=>setSelected(e.target.value)}><option value="all">All sensors</option>{devices.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></div><div className="nf-chart-large"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#29334b"/><XAxis dataKey="time" stroke="#8996b3"/><YAxis stroke="#8996b3"/><Tooltip contentStyle={{background:"#111a2d",border:"1px solid #34405d",borderRadius:10,color:"#fff"}}/><Legend/>{(selected==="all"||devices.find(d=>d.id===selected)?.type==="Environmental")&&<><Line type="monotone" dataKey="temperature" name="Temperature °C" stroke="#9a7cff" strokeWidth={2} dot={false}/><Line type="monotone" dataKey="humidity" name="Humidity %" stroke="#42c9ff" strokeWidth={2} dot={false}/></>}<Line type="monotone" dataKey="pressure" name="Pressure hPa" stroke="#4bd6a5" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div></section>
    <section className="nf-panel"><div className="panel-heading"><div><h3>Current Device Readings</h3><p>Most recently stored reading per device</p></div></div><div className="nf-table-wrap"><table className="nf-table"><thead><tr><th>DEVICE</th><th>STATUS</th><th>READING</th><th>LAST UPDATED</th></tr></thead><tbody>{devices.filter(d=>selected==="all"||d.id===selected).map(d=><tr key={d.id}><td>{d.name}<br/><small>{d.id}</small></td><td><span className={`device-status ${d.status.toLowerCase()}`}>{d.status}</span></td><td>{d.status==="Online"?`${d.reading??"—"}${d.unit||""}`:"—"}</td><td>{new Date(d.updatedAt||Date.now()).toLocaleString()}</td></tr>)}</tbody></table></div></section>
  </WorkspaceLayout>;
}
