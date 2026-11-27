import React, { useState } from "react";
import WorkspaceLayout from "../components/WorkspaceLayout";
import { useData } from "../context/DataContext";
export default function AlertsPage(){
 const {alerts,markAlertRead,markAllAlertsRead,deleteAlert,addAlert}=useData();const [filter,setFilter]=useState("All");
 const shown=alerts.filter(a=>filter==="All"||(filter==="Unread"?!a.read:a.read));
 return <WorkspaceLayout title="Alerts & Notifications" eyebrow="MONITORING"><div className="nf-page-intro"><div><h1>Alerts Center</h1><p>Review notifications generated in your workspace.</p></div><div className="nf-inline-actions"><button className="nf-secondary-button" onClick={markAllAlertsRead}>Mark all read</button><button className="nf-primary-button" onClick={()=>addAlert({title:"Test notification created",detail:"Manually generated from Alerts Center",severity:"Info"})}>＋ Test Alert</button></div></div>
 <div className="nf-toolbar"><select className="nf-control" value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Unread</option><option>Read</option></select><span className="nf-muted">{alerts.filter(a=>!a.read).length} unread · {alerts.length} total</span></div>
 <section className="nf-panel"><div className="alert-list">{shown.map(a=><article className={`alert-item ${a.read?"is-read":""}`} key={a.id}><div className={`alert-mark ${a.severity.toLowerCase()}`}>{a.severity==="Warning"?"!":a.severity==="Critical"?"×":"i"}</div><div className="alert-copy"><div className="alert-title-row"><strong>{a.title}</strong><span className={`alert-severity ${a.severity.toLowerCase()}`}>{a.severity}</span></div><p>{a.detail}</p><small>{new Date(a.createdAt).toLocaleString()}</small></div><div className="table-actions"><button onClick={()=>markAlertRead(a.id)} disabled={a.read}>{a.read?"Read":"Mark read"}</button><button className="danger-action" onClick={()=>deleteAlert(a.id)}>Delete</button></div></article>)}{shown.length===0&&<div className="nf-empty-state"><strong>No notifications here</strong><p>There are no alerts matching this filter.</p></div>}</div></section>
 </WorkspaceLayout>;
}
