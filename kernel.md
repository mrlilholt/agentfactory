# Kernel — AI Agency Builder Website

## 0) Studio Mode
PRO (building a real website)

## 1) Mission Files
- mission.md (this file)
- kernel.md (this file)
- agentCom.md (agent message board + task routing)

## 2) System Map (Roles)

Human Director (You)
- You talk to the Project Lead
- You review output and decide what to implement

Agents
- Project Lead (PM/Orchestrator)
  - Owns plan + task board
  - Assigns work to other agents via agentCom.md
  - Always outputs: "Next Agent Sequence: 1) __ 2) __ 3) __ 4) __"
- Designer Lead
  - Owns IKEA-style UI system, diagrams, layout, typography, page structure
- Builder Lead
  - Owns implementation (HTML/CSS/JS or React—your choice)
- Tester Lead
  - Owns testing checklist + clarity/usability checks + bug reports
- Documentarian Lead
  - Owns change log, decisions, and “student instructions” copy edits

## 3) Communication Rules
- Agents do NOT talk directly to each other.
- All agent-to-agent communication happens ONLY in agentCom.md.
- The only instruction you give agents is:
  "Read agentCom.md and do your assigned work."
- The Project Lead is the only agent that can assign tasks.

## 4) Build Constraints
- Audience: 7th grade students
- Primary UX requirement: IKEA instruction manual feel
- Must include:
  - Step-by-step flow
  - Diagrams (simple, black/white)
  - Copy/paste blocks (agent prompts + file templates)
  - Downloadable starter kit
- Prefer:
  - Minimal dependencies
  - Fast load
  - Mobile-friendly

## 5) Gates
G1 — Plan Locked
- Site map + step list complete
- Diagram list complete

G2 — Prototype Live
- Working pages with placeholder diagrams
- Navigation stepper works

G3 — Content Complete
- All steps written
- All prompts/templates included

G4 — Classroom Ready
- Student can follow start-to-finish
- Tested on Mac with Codex
- Starter kit download works

## 6) Task Board (Project Lead owns)
Now (Top 5)
- [ ] T01 — Define site map + step sequence (IKEA structure)
- [ ] T02 — Design UI system (layout grid + step page template)
- [ ] T03 — Draft all step content (short + precise)
- [ ] T04 — Implement site shell + navigation
- [ ] T05 — Build diagram set (system map, folder structure, flow)

Next
- [ ] T06 — Create starter-kit zip (templates + sample index)
- [ ] T07 — QA pass (clarity + missing steps)
- [ ] T08 — Classroom pilot checklist

Later
- [ ] T09 — Add “Troubleshooting” page
- [ ] T10 — Add “Example Agencies” gallery

## 7) Decisions Log (Project Lead maintains)
- D01 — IKEA-style instruction format (diagram-first, minimal text)
- D02 — Agents communicate only via agentCom.md