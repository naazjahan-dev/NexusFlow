import React, { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import WorkspaceLayout from "../components/WorkspaceLayout";
import { useData } from "../context/DataContext";

export default function AnalyticsPage() {
  const { devices, rules, alerts } = useData();
  const [range,setRange]=useState("7 Days");
  const online=devices.filter(d=>d.status==="Online").length;
  const status=[{name:"Online",value:online},{name:"Offline",value:devices.length-online}];
  const activity=useMemo(()=>Array.from({length:range==="7 Days"?7:range==="30 Days"?10:12},(_,i)=>({period:range==="7 Days"?["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]:`P${i+1}`,devices:Math.max(0,devices.length+((i*3)%5)-2),alerts:(i*2+alerts.length)%8})),[range,devices.length,alerts.length]);
  const download=()=>{const rows=[["Period","Devices","Alerts"],...activity.map(x=>[x.period,x.devices,x.alerts])];const csv=rows.map(r=>r.join(",")).join("\n");const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));const a=document.createElement("a");a.href=url;a.download="nexusflow-analytics.csv";a.click();URL.revokeObjectURL(url);};
  return <WorkspaceLayout title="Analytics" eyebrow="INSIGHTS">
    <div className="nf-page-intro"><div><h1>Analytics & Reports</h1><p>Understand device availability and workspace activity.</p></div><div className="nf-inline-actions"><select className="nf-control" value={range} onChange={e=>setRange(e.target.value)}><option>7 Days</option><option>30 Days</option><option>90 Days</option></select><button className="nf-primary-button" onClick={download}>↓ Export CSV</button></div></div>
    <div className="nf-stats compact-stats">{[["Registered Devices",devices.length],["Online Rate",`${devices.length?Math.round(online/devices.length*100):0}%`],["Active Rules",rules.filter(r=>r.enabled).length],["Total Alerts",alerts.length]].map(([t,v])=><div className="nf-stat-card" key={t}><div className="stat-top">{t}</div><div className="stat-value">{v}</div></div>)}</div>
    <div className="nf-middle-grid"><section className="nf-panel"><div className="panel-heading"><div><h3>Workspace Activity</h3><p>Illustrative device and alert trend</p></div></div><div className="nf-chart-large"><ResponsiveContainer width="100%" height="100%"><BarChart data={activity}><CartesianGrid strokeDasharray="3 3" stroke="#29334b"/><XAxis dataKey="period" stroke="#8996b3"/><YAxis stroke="#8996b3"/><Tooltip contentStyle={{background:"#111a2d",border:"1px solid #34405d",borderRadius:10}}/><Legend/><Bar dataKey="devices" name="Device count" fill="#9478ff" radius={[5,5,0,0]}/><Bar dataKey="alerts" name="Alerts (sample)" fill="#42c9ff" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></section><section className="nf-panel"><div className="panel-heading"><div><h3>Device Availability</h3><p>Current registered device status</p></div></div><div className="nf-pie-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={status} dataKey="value" nameKey="name" innerRadius={65} outerRadius={95} paddingAngle={4}>{status.map((s,i)=><Cell key={s.name} fill={i===0?"#55d9ad":"#ffad67"}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer></div></section></div>
    <section className="nf-panel"><div className="panel-heading"><div><h3>Report Notes</h3><p>How to interpret this workspace report</p></div></div><p className="nf-muted">Device availability is calculated from the current device registry. Historical trend bars are illustrative sample data, not archived hardware measurements. Export downloads the currently displayed sample series as CSV.</p></section>
  </WorkspaceLayout>;
}
