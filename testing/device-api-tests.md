# NexusFlow — Device API Test Cases

**Day:** 4  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Verify device creation, listing, identity, and malformed input.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| D-01 | POST /api/devices | Unique valid name and metadata | Success; ID returned | Not run | Not run |
| D-02 | GET /api/devices | List after creation | New device present | Not run | Not run |
| D-03 | POST /api/devices | Empty request body | Validation error, not 500 | Not run | Not run |
| D-04 | POST /api/devices | Wrong type for name | Validation error | Not run | Not run |
| D-05 | GET /api/devices | No devices in test database | Empty collection response | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
