# NexusFlow — Alert API Test Cases

**Day:** 7  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Verify alert retrieval and rule-to-alert linkage.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| A-01 | GET /api/alerts | List without alerts | Successful empty response | Not run | Not run |
| A-02 | GET /api/alerts | After breached reading | Matching alert present | Not run | Not run |
| A-03 | GET /api/alerts | Inspect alert fields | Device, rule, value and timestamp where supported | Not run | Not run |
| A-04 | GET /api/alerts | Repeat same reading | Record whether duplicates are generated | Not run | Not run |
| A-05 | GET /api/alerts | Malformed query parameters | No server crash | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
