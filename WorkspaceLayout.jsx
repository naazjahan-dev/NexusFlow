import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const links = [
  ["Overview", "/dashboard", "▦"], ["Devices", "/devices", "▣"],
  ["Live Telemetry", "/telemetry", "⌁"], ["Analytics", "/analytics", "◫"],
  ["Rule Engine", "/rules", "⚙"], ["Alerts", "/alerts", "♢"],
  ["Activity Logs", "/activity-logs", "◷"], ["Settings", "/settings", "☷"],
];

const faqs = [
  { q: "How do I add a new device?", a: "Open Devices from the sidebar and choose Add Device. Enter a device name, type, location and initial reading, then save." },
  { q: "Why is a device showing offline?", a: "Open Devices and check its status. In this demo workspace, you can use the status control to switch a device between Online and Offline." },
  { q: "Where can I view sensor readings?", a: "Open Live Telemetry to review readings and the available telemetry charts. The current project uses demo data stored in this browser." },
  { q: "How do automation rules work?", a: "Open Rule Engine to create a rule, select a metric and threshold, then enable it. Rules can generate alerts when supported readings meet the configured condition." },
  { q: "How do I back up my workspace?", a: "Open Settings and select Export Workspace Backup. This downloads a JSON file containing the workspace data stored in this browser." },
];

export default function WorkspaceLayout({ title, eyebrow = "WORKSPACE", children }) {
  const { user, logout } = useAuth();
  const { alerts, log } = useData();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [ticket, setTicket] = useState({ category: "General question", subject: "", message: "" });
  const [ticketMessage, setTicketMessage] = useState("");
  const name = user?.fullName || user?.name || user?.email?.split("@")[0] || "Administrator";
  const unread = alerts.filter(a => !a.read).length;
  const signOut = () => { logout(); navigate("/login"); };

  const submitSupportRequest = (event) => {
    event.preventDefault();
    const cleanSubject = ticket.subject.trim();
    const cleanMessage = ticket.message.trim();
    if (!cleanSubject || !cleanMessage) return;

    const request = {
      id: `SUP-${Date.now()}`,
      category: ticket.category,
      subject: cleanSubject,
      message: cleanMessage,
      user: name,
      email: user?.email || "",
      status: "Saved locally",
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("nexusflow_support_requests") || "[]");
      localStorage.setItem("nexusflow_support_requests", JSON.stringify([request, ...existing]));
      log("Support request submitted", `${request.id} · ${cleanSubject}`);
      setTicket({ category: "General question", subject: "", message: "" });
      setTicketMessage(`Your request ${request.id} has been saved in this browser.`);
    } catch {
      setTicketMessage("Could not save your request. Please check browser storage and try again.");
    }
  };

  const openHelp = () => {
    setHelpOpen(true);
    setShowContact(false);
    setTicketMessage("");
  };

  return <div className="nf-dashboard">
    <aside className={`nf-sidebar ${menuOpen ? "sidebar-open" : ""}`}>
      <div className="nf-brand"><span className="nf-brand-icon">N</span><span>Nexus<span>Flow</span></span></div>
      <div className="nf-workspace"><span className="workspace-dot"/><div><strong>Workspace</strong><small>IoT Management</small></div><span className="workspace-arrow">⌄</span></div>
      <div className="sidebar-label">MAIN MENU</div>
      <nav className="nf-nav">{links.map(([label,path,icon]) => <NavLink key={path} to={path} end={path==="/dashboard"} onClick={()=>setMenuOpen(false)} className={({isActive})=>isActive?"nf-nav-link active":"nf-nav-link"}><span className="nf-nav-icon">{icon}</span><span>{label}</span>{label==="Alerts" && unread>0 && <span className="nav-count">{unread}</span>}</NavLink>)}</nav>
      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <div className="help-icon">✦</div>
          <strong>Need assistance?</strong>
          <p>Find quick answers or send a support request.</p>
          <button type="button" onClick={openHelp}>Open Help Center →</button>
        </div>
        <button className="nf-logout" onClick={signOut}><span>⇥</span> Sign Out</button>
      </div>
    </aside>
    <main className="nf-main">
      <header className="nf-topbar">
        <div className="topbar-left"><button className="mobile-menu" onClick={()=>setMenuOpen(v=>!v)}>☰</button><div><small>{eyebrow} / NEXUSFLOW</small><h2>{title}</h2></div></div>
        <div className="topbar-right"><button className="notification-button" onClick={()=>navigate("/alerts")} aria-label="Open alerts">♧{unread>0&&<span/>}</button><div className="nf-profile"><div className="profile-avatar">{name.charAt(0).toUpperCase()}</div><div className="profile-info"><strong>{name}</strong><small>Administrator</small></div></div></div>
      </header>
      <div className="nf-content">{children}<footer className="nf-footer"><span>© 2026 NexusFlow. All rights reserved.</span><span>Visual IoT Telemetry & Rule Engine</span></footer></div>
    </main>

    {helpOpen && <div className="nf-help-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setHelpOpen(false); }}>
      <section className="nf-help-modal" role="dialog" aria-modal="true" aria-labelledby="nf-help-title">
        <div className="nf-help-header">
          <div className="nf-help-heading-icon">✦</div>
          <div><span> NEXUSFLOW SUPPORT</span><h2 id="nf-help-title">How can we help?</h2><p>Find an answer or send us a support request.</p></div>
          <button className="nf-help-close" type="button" onClick={() => setHelpOpen(false)} aria-label="Close help center">×</button>
        </div>

        {!showContact ? <>
          <div className="nf-help-actions">
            <button type="button" onClick={() => { setShowContact(true); setTicketMessage(""); }}><span>✉</span><strong>Contact Support</strong><small>Describe an issue or ask a question</small><b>→</b></button>
            <button type="button" onClick={() => { setHelpOpen(false); navigate("/activity-logs"); }}><span>◷</span><strong>Activity Logs</strong><small>Review recent workspace actions</small><b>→</b></button>
          </div>
          <div className="nf-faq-heading"><div><strong>Frequently asked questions</strong><small>Quick guides for common tasks</small></div><span>{faqs.length} ARTICLES</span></div>
          <div className="nf-faq-list">
            {faqs.map((faq, index) => <div className={`nf-faq-item ${activeFaq === index ? "is-open" : ""}`} key={faq.q}>
              <button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span>{faq.q}</span><b>{activeFaq === index ? "−" : "+"}</b></button>
              {activeFaq === index && <p>{faq.a}</p>}
            </div>)}
          </div>
          <div className="nf-help-footnote">Help content is available locally in this demo workspace.</div>
        </> : <>
          <button className="nf-help-back" type="button" onClick={() => { setShowContact(false); setTicketMessage(""); }}>← Back to Help Center</button>
          {ticketMessage ? <div className="nf-ticket-success"><div>✓</div><h3>Request saved</h3><p>{ticketMessage}</p><small>This demo stores requests in this browser; it does not send an email or contact a remote support team.</small><button type="button" onClick={() => { setTicketMessage(""); setShowContact(false); }}>Back to Help Center</button></div> : <form className="nf-support-form" onSubmit={submitSupportRequest}>
            <label>Request category<select value={ticket.category} onChange={e=>setTicket({...ticket,category:e.target.value})}><option>General question</option><option>Device issue</option><option>Telemetry issue</option><option>Automation rule issue</option><option>Account and settings</option><option>Bug report</option></select></label>
            <label>Subject<input required maxLength={100} value={ticket.subject} onChange={e=>setTicket({...ticket,subject:e.target.value})} placeholder="Briefly describe your issue"/></label>
            <label>How can we help?<textarea required rows={5} maxLength={1500} value={ticket.message} onChange={e=>setTicket({...ticket,message:e.target.value})} placeholder="Share details so the issue can be understood..."/></label>
            <div className="nf-support-form-bottom"><small>{ticket.message.length}/1500 characters</small><button className="nf-primary-button" type="submit">Submit Request →</button></div>
            <p className="nf-support-note">Demo mode: your request is saved locally and appears in Activity Logs.</p>
          </form>}
        </>}
      </section>
    </div>}
  </div>;
}
