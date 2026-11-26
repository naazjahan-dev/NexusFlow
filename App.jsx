import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import DevicesPage from "./pages/Devices";
import TelemetryPage from "./pages/Telemetry";
import AnalyticsPage from "./pages/Analytics";
import RulesPage from "./pages/Rules";
import AlertsPage from "./pages/Alerts";
import ActivityLogsPage from "./pages/ActivityLogs";
import SettingsPage from "./pages/Settings";
import NotFoundPage from "./pages/NotFound";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    {[
      ["/dashboard", <DashboardPage />], ["/devices", <DevicesPage />],
      ["/telemetry", <TelemetryPage />], ["/analytics", <AnalyticsPage />],
      ["/rules", <RulesPage />], ["/alerts", <AlertsPage />],
      ["/activity-logs", <ActivityLogsPage />], ["/settings", <SettingsPage />],
    ].map(([path, page]) => <Route key={path} path={path} element={<PrivateRoute>{page}</PrivateRoute>} />)}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>;
}
export default function App() {
  return <AuthProvider><DataProvider><Router><AppRoutes /></Router></DataProvider></AuthProvider>;
}
