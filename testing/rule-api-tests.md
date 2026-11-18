# NexusFlow — Rule Management API Test Cases

**Day:** 6  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Check threshold operators, rule creation, and enabled state.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| R-01 | POST /api/rules | temperature > 40, enabled | Rule saved | Not run | Not run |
| R-02 | GET /api/rules | List after rule creation | New rule listed | Not run | Not run |
| R-03 | POST /api/rules | Unsupported operator | Validation error | Not run | Not run |
| R-04 | POST /api/rules | Missing threshold | Validation error | Not run | Not run |
| R-05 | Rule evaluation | Reading exactly 40 with >40 | No alert for this rule | Not run | Not run |
| R-06 | Rule evaluation | Reading 41 with >40 | Alert expected when evaluation supported | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
