# NexusFlow — Rule Engine Boundary Scenarios

**Day:** 10  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Exercise threshold comparisons at, below, and above the limit.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| RE-01 | temperature > 40 | 39 | No match | Not run | Not run |
| RE-02 | temperature > 40 | 40 | No match | Not run | Not run |
| RE-03 | temperature > 40 | 41 | Match | Not run | Not run |
| RE-04 | temperature >= 40 | 40 | Match | Not run | Not run |
| RE-05 | temperature < 40 | 40 | No match | Not run | Not run |
| RE-06 | temperature <= 40 | 40 | Match | Not run | Not run |
| RE-07 | Disabled rule > 40 | 55 | No alert from disabled rule | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
