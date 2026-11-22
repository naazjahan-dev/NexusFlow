# NexusFlow — Alert Generation Scenarios

**Day:** 11  
**Owner:** Divyansh  
**Responsibility:** Testing and Integration Verification  
**Document status:** Prepared; execution not yet verified

## Purpose
Trace telemetry through rule evaluation into alerts.

## Preconditions
- Use a local or dedicated test environment, not production.
- Start the backend and database; start frontend for UI scenarios.
- Record actual API base URL, test data, and build/commit SHA before execution.
- Confirm endpoint names and request fields against the running implementation; the project plan lists `/api/devices`, `/api/telemetry`, `/api/rules`, and `/api/alerts`.

## Test cases

| ID | Area / Endpoint | Input or Action | Expected outcome | Actual | Result |
|---|---|---|---|---|---|
| AG-01 | Rule >40 enabled | 35 degrees | No new alert | Not run | Not run |
| AG-02 | Rule >40 enabled | 55 degrees | One or more matching alerts according to policy | Not run | Not run |
| AG-03 | Rule >40 disabled | 55 degrees | No alert for disabled rule | Not run | Not run |
| AG-04 | Multiple matching rules | 55 degrees | Document one-per-rule behavior | Not run | Not run |
| AG-05 | Repeated breached readings | 55 twice | Document cooldown/deduplication behavior | Not run | Not run |
| AG-06 | Rule created after reading | Historical 55 | Document whether historical evaluation occurs | Not run | Not run |

## Execution record
- **Date/time:** Not run
- **Environment / API URL:** To be filled
- **Commit/build tested:** To be filled
- **Executed by:** Divyansh
- **Evidence (Postman response, screenshot, logs):** To be attached after execution
- **Defects / GitHub issues:** None reported in this document; add actual IDs after verification

## Notes
These are planned checks, not claims that the implementation passed. If a feature is not implemented, mark its test **Blocked / Not implemented** rather than **Pass**.
