# Service-Manager Architectural Laws

**One System. Infinite Configurations. Zero Forks.**

These laws are non-negotiable. Any fork, contribution, or usage that violates them receives **zero technical support** — no bug fixes, no advice, no help of any kind. You will be on your own.

### LAW 1 — Configuration Is the Source of Truth
No behavior exists without a `CompanyConfig` read.

- All business logic MUST resolve through `CompanyConfig`
- Defaults live in config, not code
- No `if (enterprise)` or `if (customerX)` logic

**Violation**: Hard-coded workflows, one-off feature flags, hidden rigidity.

### LAW 2 — Profiles Are Write-Once Initializers
Profiles never gate behavior after signup.

- `ProfileType` is used only to seed `CompanyConfig`
- No runtime checks against profile
- Changing profile only rewrites config

**Violation**: “You chose Classic, so you can’t do X”, locked customers.

### LAW 3 — No Schema Forks for Customer Needs
Schema is global. Behavior is local.

- Never add a table or column for one customer
- Customization via JSON config, CustomField system, or policy evaluation only

**Violation**: `special_customer_jobs`, `enterprise_only_*`, schema drift.

### LAW 4 — Every Entity Is Company-Scoped
Tenant boundaries are absolute.

- Every top-level entity MUST resolve to `companyId`
- No cross-company joins
- No implicit scoping via Account alone

**Violation**: Data leaks, compliance failure.

### LAW 5 — AI Never Acts Without Explicit Permission
AI is opt-in, scoped, and reversible.

- Betty cannot create, modify, approve, or send without explicit config permission
- All AI actions require `bettyEnabled`, permission flag, autonomy level, and approval workflow if needed

**Violation**: Rogue automation, loss of trust, legal exposure.

### LAW 6 — Policy Decides, Code Executes
Code does not decide business rules.

- Code evaluates policy → policy determines outcome → code executes result

**Violation**: Hard-coded thresholds, buried assumptions.

### LAW 7 — Defaults Live in Config, Not Code
There is no “normal behavior.”

- Every default must exist in `CompanyConfig`
- Absence of config = validation error or fallback profile

### LAW 8 — UI Is a Reflection of Capability, Not Role
If you can’t do it, you shouldn’t see it.

- UI derived from permissions, enabled modules, and workflow modes
- Role alone is insufficient

**Violation**: Hidden errors, confusing UX.

### LAW 9 — Workflows Are Data, Not Logic
If it can change, it must be data-driven.

- Approval rules, conditions, thresholds, sequencing live in config or workflow tables

**Violation**: Rewrites for simple changes, sales blockers.

### LAW 10 — Auditing Is Mandatory, Not Optional
Every consequential action is explainable.

- All state changes produce AuditLog with actor, before/after, timestamp

**Violation**: Compliance failure, AI mistrust.

### LAW 11 — Behavior Must Be Deterministic
Same input + same config = same outcome.

- No hidden randomness or unlogged time-based side effects

**Violation**: Unreliable automation, user distrust.

### LAW 12 — No Code Path Knows the Customer
The system never “recognizes” a company.

- No `companyId`, name, or plan checks in logic
- Only config checks allowed

**Violation**: Implicit forks, product rot.

### LAW 13 — Migration Must Be Additive
Nothing breaks existing customers. Ever.

- New features default to disabled
- New config keys are optional
- No destructive migrations

**Violation**: Forced change, customer churn.

### LAW 14 — The System Must Always Say “Yes”
But only through configuration.

- If sales says “yes,” engineering implements via config/policy/UI — never code forks

### LAW 15 — If It Can’t Be Configured, It Doesn’t Belong
Rigid features are forbidden.

**Final Note**  
These laws protect everyone from enterprise hell, one-off debt, AI disasters, and scaling pain.  
Violate even one → **zero technical help will be provided**.
