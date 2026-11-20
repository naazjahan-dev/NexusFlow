# NexusFlow — HTTP Status and JSON Verification

**Day:** 9  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Check response shape and status code consistency.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| H-01 | Successful GET | Existing endpoint | 200 and valid JSON | Not run | Not run |
| H-02 | Successful POST | Valid payload | 200/201 and resource identifier | Not run | Not run |
| H-03 | Invalid POST | Missing required field | 400/422 and useful error | Not run | Not run |
| H-04 | Unknown route | GET /api/not-a-route | 404, not 500 | Not run | Not run |
| H-05 | Unexpected method | DELETE on unsupported route | 404/405, no unintended change | Not run | Not run |
| H-06 | Server unavailable | Frontend request | Visible error state | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
