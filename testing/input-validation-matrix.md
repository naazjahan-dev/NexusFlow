# NexusFlow — Input Validation Matrix

**Day:** 8  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Document invalid and boundary inputs to protect API reliability.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| V-01 | Device name | Empty string | Rejected with clear message | Not run | Not run |
| V-02 | Device name | Very long string | Length policy applied | Not run | Not run |
| V-03 | Telemetry value | NaN/string | Rejected or explicitly normalized | Not run | Not run |
| V-04 | Telemetry timestamp | Invalid ISO date | Rejected or documented default | Not run | Not run |
| V-05 | Rule threshold | Negative number | Allowed/rejected per domain policy | Not run | Not run |
| V-06 | Rule operator | Unexpected token | Rejected | Not run | Not run |
| V-07 | JSON body | Malformed JSON | 4xx response, not 500 | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
