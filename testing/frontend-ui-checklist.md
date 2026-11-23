# NexusFlow — Frontend UI Test Checklist

**Day:** 12  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Check navigation, rendering, responsive behavior, and errors.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| UI-01 | Sidebar | Open each page | Correct content and active nav | Not run | Not run |
| UI-02 | Overview | No data | Useful empty state | Not run | Not run |
| UI-03 | Devices | Create/list flow | New device appears after refresh | Not run | Not run |
| UI-04 | Telemetry | Load readings | Values and units display correctly | Not run | Not run |
| UI-05 | Rules | Create threshold rule | Rule visible in list | Not run | Not run |
| UI-06 | Alerts | View generated alerts | Alert details readable | Not run | Not run |
| UI-07 | Network failure | Stop backend temporarily | Friendly error rather than blank page | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
