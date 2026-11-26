import React, { useState } from "react";
import WorkspaceLayout from "../components/WorkspaceLayout";
import { useData } from "../context/DataContext";

const blank = { name: "", type: "Environmental", location: "", reading: "", unit: "°C" };
export default function DevicesPage() {
  const { devices, addDevice, updateDevice, deleteDevice, toggleDevice } = useData();
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const filtered = devices.filter(d => (status==="All" || d.status===status) && `${d.name} ${d.id} ${d.location}`.toLowerCase().includes(query.toLowerCase()));
  const submit = e => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editing) updateDevice(editing, { ...form, reading: Number(form.reading)||0 });
    else addDevice(form);
    setForm(blank); setEditing(null); setShowForm(false);
  };
  const edit = d => { setEditing(d.id); setForm({ name:d.name, type:d.type, location:d.location||"", reading:d.reading??"", unit:d.unit||"°C" }); setShowForm(true); };
  const cancel = () => { setForm(blank); setEditing(null); setShowForm(false); };
  return <WorkspaceLayout title="Device Management" eyebrow="MAIN MENU">
    <div className="nf-page-intro"><div><h1>Connected Devices</h1><p>Register, monitor and manage your IoT devices.</p></div><button className="nf-primary-button" onClick={()=>{cancel();setShowForm(true);}}>＋ Add Device</button></div>
    <div className="nf-stats compact-stats">{[["Total Devices",devices.length],["Online",devices.filter(d=>d.status==="Online").length],["Offline",devices.filter(d=>d.status!=="Online").length],["Device Types",new Set(devices.map(d=>d.type)).size]].map(([t,v])=><div className="nf-stat-card" key={t}><div className="stat-top">{t}</div><div className="stat-value">{v}</div></div>)}</div>
    {showForm&&<section className="nf-panel nf-form-panel"><div className="panel-heading"><div><h3>{editing?"Edit Device":"Register New Device"}</h3><p>Enter the device details below.</p></div><button className="nf-close" onClick={cancel}>×</button></div><form className="nf-form-grid" onSubmit={submit}><label>Device Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Temperature Sensor"/></label><label>Device Type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Environmental</option><option>Industrial</option><option>Security</option><option>Energy</option><option>Other</option></select></label><label>Location<input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="e.g. Server Room"/></label><label>Initial Reading<input type="number" step="any" value={form.reading} onChange={e=>setForm({...form,reading:e.target.value})} placeholder="0"/></label><label>Unit<input value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})} placeholder="°C, %, AQI..."/></label><div className="nf-form-actions"><button className="nf-primary-button" type="submit">{editing?"Save Changes":"Register Device"}</button><button className="nf-secondary-button" type="button" onClick={cancel}>Cancel</button></div></form></section>}
    <section className="nf-panel"><div className="nf-toolbar"><input className="nf-control search-control" placeholder="Search by name, ID or location..." value={query} onChange={e=>setQuery(e.target.value)}/><select className="nf-control" value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Online</option><option>Offline</option></select></div><div className="nf-table-wrap"><table className="nf-table"><thead><tr><th>DEVICE</th><th>ID</th><th>TYPE / LOCATION</th><th>STATUS</th><th>READING</th><th>ACTIONS</th></tr></thead><tbody>{filtered.map(d=><tr key={d.id}><td><div className="device-name"><span className="device-icon">▣</span>{d.name}</div></td><td>{d.id}</td><td>{d.type}<br/><small>{d.location||"Location not set"}</small></td><td><span className={`device-status ${d.status.toLowerCase()}`}>{d.status}</span></td><td>{d.status==="Online"?`${d.reading??"—"}${d.unit||""}`:"—"}</td><td><div className="table-actions"><button onClick={()=>toggleDevice(d.id)}>{d.status==="Online"?"Set Offline":"Set Online"}</button><button onClick={()=>edit(d)}>Edit</button><button className="danger-action" onClick={()=>{if(window.confirm(`Delete ${d.name}?`))deleteDevice(d.id);}}>Delete</button></div></td></tr>)}{filtered.length===0&&<tr><td colSpan="6" className="empty-cell">No devices match your filters.</td></tr>}</tbody></table></div><div className="nf-list-footer">Showing {filtered.length} of {devices.length} devices · Changes are saved in this browser.</div></section>
  </WorkspaceLayout>;
}
