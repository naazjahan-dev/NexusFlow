# NexusFlow

NexusFlow is a React + Vite IoT workspace demo with browser-local authentication and persistent demo workspace data.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run on Windows (VS Code)
1. Extract the ZIP.
2. Open the `NEXUSFLOW` folder in VS Code (the folder containing `package.json`).
3. Open Terminal > New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Implemented workspace features
- Register/login and protected routes
- Device create, edit, delete, search and online/offline toggle
- Dashboard counts derived from registered devices and rules
- Sample telemetry chart with refresh and rule evaluation
- Analytics charts and CSV export
- Automation rule create/edit/enable/disable/delete
- Alerts create/read/delete
- Activity log and CSV export
- Profile/preferences and JSON workspace backup

## Important demo limitations
This project currently uses `localStorage`; it does not include a production backend, encrypted authentication, multi-user database, email delivery, or a real IoT hardware/MQTT/API connection. Device readings and telemetry charts are demonstration data. Do not use a real password. Connect a backend and device gateway before production deployment.
