# NexusFlow — Telemetry API Test Cases

**Day:** 5  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Validate ingest, history, timestamps, and invalid sensor readings.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| T-01 | POST /api/telemetry | Known device, temperature 35 | Accepted and retrievable | Not run | Not run |
| T-02 | POST /api/telemetry | Known device, temperature 55 | Accepted; may trigger configured rule | Not run | Not run |
| T-03 | POST /api/telemetry | Non-numeric temperature | Rejected or documented handling | Not run | Not run |
| T-04 | POST /api/telemetry | Missing device reference | Validation error | Not run | Not run |
| T-05 | GET /api/telemetry | Retrieve after ingest | Expected device and value visible | Not run | Not run |
| T-06 | POST /api/telemetry | Duplicate reading | Record observed deduplication behavior | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
