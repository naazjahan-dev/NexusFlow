# NexusFlow — Testing and Integration Verification

**Team member:** Divyansh  
**Role:** Testing & Integration Verification  
**Day:** 1 — Project Understanding and Testing Scope

## 1. Project overview

NexusFlow is a Visual IoT Telemetry Dashboard and Rule Engine. It is designed to receive readings from IoT devices (or simulated sensors), store telemetry, evaluate configured rules, and display alerts in a web dashboard.

## 2. Expected data flow

```text
IoT Device / Sensor Simulator
             |
             v
     Node.js / Express API
             |
             +----> MongoDB (devices, telemetry, rules, alerts)
             |
             v
       Rule Evaluation
             |
             v
     Alert Creation (when a rule matches)
             |
             v
       React Dashboard
```

This is the intended architecture to verify against the actual implementation; it is not evidence that every component is already complete.

## 3. Main modules to understand

| Module | Purpose | What testing should verify |
| --- | --- | --- |
| Overview | Show system summary | Counts and summaries match backend data |
| Devices | Manage IoT devices | Device creation, listing, and input validation |
| Telemetry | Receive and display sensor readings | Correct ingestion, storage, and display |
| Rules | Configure conditions for sensor data | Operators, thresholds, and enabled/disabled behavior |
| Alerts | Show triggered events | Correct alert creation and display |

## 4. Testing responsibilities

- Review API request/response formats using Postman.
- Check HTTP status codes and JSON structures.
- Test valid inputs, invalid inputs, and missing fields.
- Verify frontend data matches backend responses.
- Report reproducible bugs with expected and actual behavior.
- Re-test fixes and record outcomes.

## 5. Initial API inventory (to confirm during implementation review)

| Method | Endpoint | Expected purpose |
| --- | --- | --- |
| GET / POST | `/api/devices` | List and register devices |
| GET / POST | `/api/telemetry` | Retrieve and submit readings |
| GET / POST | `/api/rules` | List and create rules |
| GET | `/api/alerts` | Retrieve alerts |

Endpoint names are provisional until confirmed against backend route files.

## 6. Day 1 review checklist

- [x] Documented the intended NexusFlow workflow.
- [x] Identified the main modules and their testing goals.
- [x] Defined Divyansh's testing responsibilities.
- [x] Drafted the API inventory for later verification.
- [ ] Confirm actual routes and payloads against backend source code.
- [ ] Confirm implemented UI screens against the running application.
- [ ] Identify test environment URLs and database setup.

## 7. Next step — Day 2

Set up the local repository and Postman environment. Confirm the backend base URL and make a first health/API request before beginning detailed test cases.

## Day 1 output

A documented project overview, initial testing scope, architecture flow, and review checklist. No API tests were executed on Day 1.
