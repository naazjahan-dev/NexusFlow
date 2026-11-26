import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const DataContext = createContext(null);
const KEYS = {
  devices: "nexusflow_devices",
  rules: "nexusflow_rules",
  alerts: "nexusflow_alerts",
  activities: "nexusflow_activities",
  settings: "nexusflow_settings",
};

const seedDevices = [
  { id: "DEV-001", name: "Temperature Sensor", type: "Environmental", location: "Server Room", status: "Online", reading: 26.4, unit: "°C", updatedAt: new Date().toISOString() },
  { id: "DEV-002", name: "Humidity Monitor", type: "Environmental", location: "Main Office", status: "Online", reading: 64, unit: "%", updatedAt: new Date().toISOString() },
  { id: "DEV-003", name: "Pressure Sensor", type: "Industrial", location: "Production Floor", status: "Offline", reading: null, unit: "hPa", updatedAt: new Date().toISOString() },
  { id: "DEV-004", name: "Air Quality Monitor", type: "Environmental", location: "Lab", status: "Online", reading: 42, unit: "AQI", updatedAt: new Date().toISOString() },
];

const seedRules = [
  { id: "RULE-001", name: "High Temperature Alert", metric: "Temperature", operator: ">", threshold: 35, action: "Create alert", enabled: true },
  { id: "RULE-002", name: "Humidity Warning", metric: "Humidity", operator: ">", threshold: 75, action: "Create alert", enabled: true },
];

const seedAlerts = [
  { id: "ALT-001", title: "Pressure Sensor is offline", detail: "DEV-003 · Production Floor", severity: "Warning", read: false, createdAt: new Date().toISOString() },
  { id: "ALT-002", title: "High temperature threshold configured", detail: "High Temperature Alert", severity: "Info", read: false, createdAt: new Date(Date.now()-3600000).toISOString() },
];

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function DataProvider({ children }) {
  const [devices, setDevices] = useState(() => read(KEYS.devices, seedDevices));
  const [rules, setRules] = useState(() => read(KEYS.rules, seedRules));
  const [alerts, setAlerts] = useState(() => read(KEYS.alerts, seedAlerts));
  const [activities, setActivities] = useState(() => read(KEYS.activities, [
    { id: "ACT-001", title: "Workspace initialized", detail: "NexusFlow demo environment is ready", createdAt: new Date().toISOString() },
  ]));
  const [settings, setSettings] = useState(() => read(KEYS.settings, { emailAlerts: true, compactMode: false, refreshInterval: "30" }));

  useEffect(() => { localStorage.setItem(KEYS.devices, JSON.stringify(devices)); }, [devices]);
  useEffect(() => { localStorage.setItem(KEYS.rules, JSON.stringify(rules)); }, [rules]);
  useEffect(() => { localStorage.setItem(KEYS.alerts, JSON.stringify(alerts)); }, [alerts]);
  useEffect(() => { localStorage.setItem(KEYS.activities, JSON.stringify(activities)); }, [activities]);
  useEffect(() => { localStorage.setItem(KEYS.settings, JSON.stringify(settings)); }, [settings]);

  const log = (title, detail = "") => {
    setActivities(current => [{ id: `ACT-${Date.now()}`, title, detail, createdAt: new Date().toISOString() }, ...current].slice(0, 100));
  };

  const addDevice = (device) => {
    const item = { ...device, id: `DEV-${Date.now().toString().slice(-6)}`, status: "Online", reading: Number(device.reading) || 0, updatedAt: new Date().toISOString() };
    setDevices(current => [item, ...current]);
    log("Device added", `${item.name} · ${item.id}`);
    return item;
  };
  const updateDevice = (id, changes) => {
    setDevices(current => current.map(d => d.id === id ? { ...d, ...changes, updatedAt: new Date().toISOString() } : d));
    log("Device updated", id);
  };
  const deleteDevice = (id) => {
    const device = devices.find(d => d.id === id);
    setDevices(current => current.filter(d => d.id !== id));
    log("Device removed", device?.name || id);
  };
  const toggleDevice = (id) => {
    const device = devices.find(d => d.id === id);
    if (!device) return;
    const status = device.status === "Online" ? "Offline" : "Online";
    updateDevice(id, { status });
    if (status === "Offline") addAlert({ title: `${device.name} went offline`, detail: `${device.id} · ${device.location || "No location"}`, severity: "Warning" });
  };
  const addRule = (rule) => {
    const item = { ...rule, id: `RULE-${Date.now().toString().slice(-6)}`, enabled: true };
    setRules(current => [item, ...current]);
    log("Automation rule created", item.name);
  };
  const updateRule = (id, changes) => {
    setRules(current => current.map(r => r.id === id ? { ...r, ...changes } : r));
    log("Automation rule updated", id);
  };
  const deleteRule = (id) => {
    const rule = rules.find(r => r.id === id);
    setRules(current => current.filter(r => r.id !== id));
    log("Automation rule deleted", rule?.name || id);
  };
  const addAlert = (alert) => {
    setAlerts(current => [{ ...alert, id: `ALT-${Date.now()}`, read: false, createdAt: new Date().toISOString() }, ...current]);
  };
  const markAlertRead = (id) => setAlerts(current => current.map(a => a.id === id ? { ...a, read: true } : a));
  const markAllAlertsRead = () => setAlerts(current => current.map(a => ({ ...a, read: true })));
  const deleteAlert = (id) => setAlerts(current => current.filter(a => a.id !== id));
  const updateSettings = (changes) => { setSettings(current => ({ ...current, ...changes })); log("Settings updated", "Workspace preferences changed"); };

  const value = useMemo(() => ({
    devices, rules, alerts, activities, settings,
    addDevice, updateDevice, deleteDevice, toggleDevice,
    addRule, updateRule, deleteRule,
    addAlert, markAlertRead, markAllAlertsRead, deleteAlert,
    updateSettings, log,
  }), [devices, rules, alerts, activities, settings]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const value = useContext(DataContext);
  if (!value) throw new Error("useData must be used within DataProvider");
  return value;
}
