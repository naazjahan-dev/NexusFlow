# NexusFlow — API Test Case Catalogue

**Day:** 3  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Create a reusable catalogue of positive, negative, and boundary API tests.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| DEV-01 | POST /api/devices | Valid device payload | 2xx and persisted device | Not run | Not run |
| DEV-02 | POST /api/devices | Missing required name | 4xx validation response | Not run | Not run |
| TEL-01 | POST /api/telemetry | Valid linked device reading | 2xx and reading retrievable | Not run | Not run |
| TEL-02 | POST /api/telemetry | Unknown device ID | Document observed behavior; ideally reject | Not run | Not run |
| RULE-01 | POST /api/rules | Valid threshold rule | 2xx and rule retrievable | Not run | Not run |
| ALERT-01 | GET /api/alerts | Fetch alerts | 2xx and array/paginated result | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
