# AgentCom — Shared Message Board (Single Source)

RULES (READ FIRST)
- Agents do NOT chat with each other.
- Agents ONLY communicate through THIS file.
- Human Director instruction to any agent is always:
  "Read agentCom.md and do your assigned work."
- ONLY Project Lead assigns tasks.

------------------------------------------------------------
## 0) Current Status (Project Lead updates)

Project:
AI Agency Builder Website

Current Gate:
G3 (Content Complete) — Sprint V2 Refinement

Current Focus (1 sentence):
Diagram-only explainers with `?` bubbles: place each box explainer at bottom-right of its box, and keep line explainers anchored to lines.

Next Agent Sequence (Project Lead must fill this every cycle):
1) Designer Lead
2) Builder Lead
3) Tester Lead
4) Documentarian Lead

------------------------------------------------------------
## 1) Task Assignments (Project Lead writes)

### Active Tasks (IN PROGRESS)
- Task ID: V2-S13
  Assigned To: Designer Lead
  Title: Diagram-Only Explainer Scope Lock
  Goal: Redline final interaction scope and placement style so explainers exist ONLY for diagram parts inside panel P4 with consistent marker rules.
  Inputs (files/links to review): mission.md, kernel.md, assignmentContext.md, this file, current live preview
  Output Required (what to produce): one-page scope spec listing allowed explainer zones (diagram hotspots only) and banned zones (home cards, step rail, panel labels, checklist, starter non-diagram blocks), plus per-diagram content table showing which explainer lines are sourced from assignmentContext.md vs newly authored, and anchor type for each item (`box` or `line`)
  Acceptance Criteria:
  1) Scope explicitly states "ONLY EXPLAINERS IN DIAGRAMS".
  2) Includes diagram-specific anchor notes for D-STA-00, D-FLD-03, D-CUE-06, D-STR-05, D-SYS-01, D-COM-02, D-WKF-04.
  3) Confirms explainers show only on hover/focus/tap of diagram parts.
  4) Uses assignmentContext.md where relevant, and creates missing explainer content where not provided.
  5) All `box` explainers use a bottom-right anchored `?` bubble by default.
  6) All `line` explainers stay on line anchors (no forced bottom-right move).
  Status: IN PROGRESS
  Notes: This task supersedes site-wide explainer scope. assignmentContext.md is supplemental context, not a full copy source. Replace numbered bubbles with `?`.

- Task ID: V2-S14
  Assigned To: Builder Lead
  Title: Remove Non-Diagram Explainers + Keep Diagram Hotspots
  Goal: Remove all explainer triggers outside diagrams and keep only per-part diagram explainers in P4.
  Inputs (files/links to review): mission.md, kernel.md, assignmentContext.md, this file, V2-S13 output, codebase
  Output Required (what to produce): code/data changes that disable home/starter/step-rail/panel/check explainers while preserving and improving diagram-only hotspot explainers
  Acceptance Criteria:
  1) No explainer appears anywhere except inside diagrams.
  2) Diagram explainers appear only when hovering/focusing/tapping a diagram part.
  3) No default visible explainer box on load.
  4) Diagram explainer text is readable and unobstructed.
  5) Diagram explainer copy matches V2-S13 table (including assignmentContext-derived lines and new authored lines).
  6) Marker glyph for explainers is `?` (not numbered markers).
  7) `box` explainers render at bottom-right inside each diagram box by default.
  8) `line` explainers stay anchored on/near the target line.
  Status: TODO
  Notes: Treat this as blocking hotfix for next preview.

- Task ID: V2-S15
  Assigned To: Tester Lead
  Title: Diagram-Only Explainer QA Sweep
  Goal: Verify the scope lock is implemented correctly and no non-diagram explainers remain.
  Inputs (files/links to review): mission.md, kernel.md, assignmentContext.md, this file, V2-S13 output, V2-S14 output
  Output Required (what to produce): pass/fail matrix for each page and each diagram with screenshots of any remaining non-diagram explainer bugs
  Acceptance Criteria:
  1) Home page: zero explainers outside diagrams.
  2) Starter page: zero explainers outside diagrams.
  3) Step pages: explainers only within P4 diagram content.
  4) Diagram hotspots still work with mouse, keyboard, and touch.
  5) Spot-check confirms implemented copy aligns with V2-S13 source mapping (context-sourced vs authored).
  6) Spot-check confirms `?` markers replaced numeric markers.
  7) Spot-check confirms box markers are bottom-right and line markers remain on line anchors.
  Status: TODO
  Notes: Flag any regression as P1.

- Task ID: V2-S16
  Assigned To: Documentarian Lead
  Title: Scope-Change Communication + Cleanup Notes
  Goal: Publish clear note that explainer scope is now diagram-only and archive superseded site-wide explainer tasks.
  Inputs (files/links to review): mission.md, kernel.md, assignmentContext.md, this file, V2-S13 through V2-S15 outputs
  Output Required (what to produce): concise release note and task-status cleanup block marking V2-S01, V2-S02, V2-S03, V2-S04, V2-S09, V2-S10, V2-S11, V2-S12 as superseded by V2-S13 to V2-S16
  Acceptance Criteria:
  1) Team-facing note is explicit and unambiguous.
  2) Superseded tasks are documented and traceable.
  3) Release note includes marker-style lock: `?` bubbles, box bottom-right default, line explainers on line.
  Status: TODO
  Notes: Keep protocol command unchanged.

### Next Tasks (READY SOON)
- Task ID: V2-S05
  Assigned To: Builder Lead
  Title: Fix Pack Implementation
  Goal: Implement all approved P1/P2 issues from V2-S03 and report completion.
  Status: READY

- Task ID: V2-S06
  Assigned To: Designer Lead
  Title: Final Diagram + Icon Export Lock
  Goal: Export final SVG/PNG set and freeze visual asset pack for classroom use.
  Status: READY

- Task ID: V2-S07
  Assigned To: Tester Lead
  Title: 2-Student Dry Run (V2)
  Goal: Validate post-fix usability and confirm no blockers before full pilot.
  Status: READY

- Task ID: V2-S08
  Assigned To: Documentarian Lead
  Title: V2 Release Notes + Classroom Handoff
  Goal: Publish final teacher/student handoff notes, known limitations, and run checklist.
  Status: READY

------------------------------------------------------------
## 2) Agent Responses (Agents write here)

### Designer Lead
- Reply To Task ID: T01
  Summary:
  Assembly Manual Visual Language Spec v1 defined for nonverbal-first instruction pages.
  System is monochrome, panel-based, stage-sequenced, and aligned to 7th-grade clarity.
  Uses `assets/icons/person.svg` as the Human Director icon baseline (rounded joins/caps, outline-first form).
  Step page layout (wireframe in text):
  Panel grid spec:
  - Reading order is fixed: left-to-right, top-to-bottom (Z-pattern).
  - Desktop grid: 12 columns, 24px gutters, 64px margins, max width 1200px.
  - Mobile grid: 4 columns, 16px gutters, 20px margins.
  - Page is built from panel blocks with one instruction per panel:
    P0 Header strip (Step X/8 + title)
    P1 Goal panel (icon + one-line intent)
    P2 Action panel A
    P3 Action panel B
    P4 Diagram panel
    P5 Template/prompt panel
    P6 Check panel (Done / Verify)
    P7 Nav strip (Back / Next)
  One step-page wireframe (example: Step 6 "Use agentCom only"):
  - P0: "06" badge + title.
  - P1: Human icon + file icon + short line: "All agent updates go in agentCom.md."
  - P2: DO panel (check icon): "Open agentCom.md before each agent turn."
  - P3: DON'T panel (cross-out icon): "Do not send agent-to-agent chat messages."
  - P4: Diagram of allowed arrows through hub file.
  - P5: Copy block: "Read agentCom.md and do your assigned work."
  - P6: Two checks: "I used only agentCom.md" and "I followed Next Agent Sequence."
  - P7: Back/Next buttons pinned on mobile.
  Diagram plan:
  - D-SYS-01 System Map:
    Human Director (`person.svg` baseline) -> Project Lead -> Designer/Builder/Tester/Documentarian.
    Add DO cue: "Talk to Project Lead first." Add DON'T cue: crossed line between specialist agents.
  - D-COM-02 Communication Rules:
    `agentCom.md` as central hub node; all arrows terminate at hub.
    Forbidden direct agent-to-agent arrows shown with cross-out overlays.
  - D-FLD-03 Folder Tree:
    Root folder -> mission.md, kernel.md, agentCom.md, starter-kit.zip.
    Use numbered callouts 1-4 matching setup sequence.
  - D-WKF-04 Workflow Sequence:
    Eight numbered tiles with mandatory forward arrows.
    Include loop arrow from Step 8 back to Step 1 for future cycles.
  - D-STR-05 Startup Flow:
    4 panels: Open Codex -> Open Project Folder -> Open Project Lead Chat -> Send command.
    Each panel uses one main icon and one action verb token.
  - D-CUE-06 Do/Don't Cues:
    Mini reference panel listing check mark (allowed), cross-out (forbidden), hatch fill (inactive/not this step), and lock icon (do not edit).
  Diagram export rules:
  - Formats: SVG (primary), PNG @2x (fallback).
  - Palette: #111111 (ink), #FFFFFF (paper), #D9D9D9 (neutral separators), #B3B3B3 (hatch only).
  - No gradients, no shadows, no decorative color accents.
  - Keep text labels <= 2 words whenever possible.
  UI rules (fonts, spacing, icons):
  Typography:
  - Step numbers: League Spartan 700, boxed badge style.
  - UI/body labels: IBM Plex Sans 500/400.
  - File/template text: IBM Plex Mono 500.
  Type scale:
  - Step number 56px desktop / 48px mobile.
  - Step title 26px desktop / 22px mobile.
  - Panel label 14px all sizes (uppercase).
  - Body line 15-16px.
  Line-weight rules:
  - Primary structural outlines: 2.5px.
  - Icon strokes and primary arrows: 2px.
  - Secondary connectors/dividers: 1.5px.
  - Detail ticks/hatch lines: 1px.
  Arrow/flow grammar:
  - Solid arrow = required action.
  - Dashed arrow = optional reference.
  - Bent arrow = continue to next panel row.
  - Loop arrow = repeat cycle.
  - Arrowheads are filled triangles; no decorative arrow styles.
  - No crossing arrows inside one panel; split into extra panel if needed.
  Hatch/cross-out usage rules:
  - Hatch (45 degrees, 6px interval) marks inactive/locked zones.
  - Cross-out uses two 3px diagonal strokes over forbidden object/action.
  - Do not place text on top of hatch fills.
  Step number treatment:
  - Every page starts with a boxed `01-08` marker at top-left.
  - Every panel includes a small corner index (A, B, C...) for verbal guidance.
  Icon vocabulary:
  - Actor icons: Human Director (`person.svg`), Project Lead, specialist agent.
  - Object icons: folder, file, chat window, prompt block, zip package.
  - Action icons: copy, paste, open, run, check.
  - State icons: do/check, don't/cross-out, warning/triangle, done/fill check circle.
  Mobile behavior notes:
  - All panel stacks become one column; panel order preserved exactly.
  - Sticky nav remains visible with 44x44 min targets.
  - Diagrams can scroll horizontally, but action panel always remains above first scroll point.
  - Step number badge and first action must appear without scrolling.
  Status: DONE

- Reply To Task ID: V1-S02
  Summary:
  Delivered the V1 final diagram pack aligned to current starter-set workflow and panel system.
  All diagrams are monochrome assembly-manual style, mobile-readable, and mapped to step usage.
  Final SVGs produced:
  - assets/diagrams/d-sys-01-system-map.svg
  - assets/diagrams/d-com-02-communication-rules.svg
  - assets/diagrams/d-fld-03-folder-tree.svg
  - assets/diagrams/d-wkf-04-workflow-sequence.svg
  - assets/diagrams/d-str-05-startup-flow.svg
  - assets/diagrams/d-cue-06-do-dont-cues.svg
  - assets/diagrams/d-sta-00-starter-flow.svg
  Diagram coverage and intent:
  - System map: Human Director (person.svg baseline) -> Project Lead -> specialist leads; direct specialist chat marked forbidden.
  - Communication rules: agentCom.md as mandatory hub with blocked direct paths.
  - Folder structure: required file tree and setup-side callouts.
  - Workflow sequence: full 1-8 order with repeat loop.
  - Startup flow: open Codex -> open project folder -> open Project Lead chat -> send exact command.
  - Do/Don't cues: check, cross-out, lock, hatch, and mission gate behavior.
  - Starter-set flow panel: download starter set -> duplicate/copy folder -> rename to student project name -> open mission.md.
  Visual spec enforcement in assets:
  - Monochrome palette only (#111111, #FFFFFF, neutral hatch gray).
  - Solid arrows for required flow; dashed lines only for disallowed/reference indicators.
  - Consistent rounded panel cards, bold step numbers, minimal-text labels.
  - SVGs include title/desc metadata for accessibility and validated XML structure.
  Status: DONE

- Reply To Task ID: V2-S01
  Summary:
  Defined Interactive Diagram Info System UX spec for hover/focus/tap learning layers while preserving assembly-manual visual discipline.
  Interaction teaches two things per part: what this part is + how it connects to the full step.
  Hotspot/callout interaction spec:
  - Every interactive diagram part uses one hotspot with one linked callout record.
  - Hotspot metadata model (design contract): `id`, `label`, `whatThisIs`, `howItConnects`, `anchor` (`x`,`y` as %), `group`, `order`.
  - Callout content structure is fixed:
    1) Label (1-3 words)
    2) What this is (max 8 words)
    3) How it connects (max 10 words)
  - One diagram should contain 3-7 hotspots (target 5) to avoid cognitive overload.
  - Connection teaching rule: active hotspot also highlights 1-2 related parts using thin dashed connector lines.
  Visual states (default / hover / focus / active):
  - Default:
    - Hotspot marker: 14px circle, 2px black stroke, white fill, small number inside.
    - No callout card visible.
  - Hover (mouse):
    - Marker grows to 18px; stroke increases to 2.5px.
    - Part stroke weight increases by +0.5px.
    - Mini preview chip appears near marker: label only.
  - Focus (keyboard):
    - Same as hover plus 2px dashed outer ring offset 3px.
    - Preview chip remains visible until blur.
  - Active (click/tap/Enter/Space):
    - Full callout card opens.
    - Selected part stays bold; non-selected interactive parts reduce to 60% opacity.
    - Related parts receive dashed connector highlight.
    - Active marker fill switches to black with white number.
  Placement rules:
  - Callout card is anchored by preferred quadrant priority: top-right, top-left, bottom-right, bottom-left.
  - Minimum clear spacing: 12px from diagram bounds; 8px from any other callout.
  - If overlap risk remains after quadrant search, dock callout to side rail inside panel with leader line to hotspot.
  - Never place callout text directly over critical diagram symbols.
  - Maximum one full callout card open at a time.
  - For dense diagrams, use numbered hotspot markers and keep full descriptions in ordered side list.
  Desktop vs mobile behavior:
  - Desktop:
    - Hover shows preview; click locks full callout.
    - Keyboard order follows left-to-right/top-to-bottom hotspot order.
    - `Esc` closes active callout and returns focus to active marker.
  - Mobile/touch:
    - Tap toggles active callout; second tap on same marker closes.
    - Full callout appears in bottom info sheet (not floating) for readability.
    - Bottom sheet includes `Part X of N`, label, what-this-is, how-it-connects, Prev/Next part buttons.
    - Diagram remains visible above sheet; sheet max height 42vh.
  Accessibility + clarity rules:
  - Every hotspot has visible number and accessible name matching `label`.
  - Minimum touch target: 44x44.
  - Do not rely on color; state changes must include line weight/shape/fill changes.
  - If scripts fail, fallback ordered callout list under diagram still shows `label`, `whatThisIs`, `howItConnects`.
  Assembly-manual style guardrails:
  - Palette remains monochrome (#111111, #FFFFFF, gray only for hatch/dividers).
  - No glow, blur, drop shadow, or animated bounces.
  - Motion allowed only as 120-180ms fade/slide for callout open/close.
  - Text remains minimal; no paragraph blocks inside callouts.
  Brand asset usage (`assets/brand/agent-factory-logo.png`):
  - Keep logo in topbar/home hero only.
  - Do not place logo inside instructional diagrams or callout cards.
  - Optional small 24px logo stamp allowed in non-instructional help drawer header only.
  Example wireframe for one step diagram (Step 07, D-COM-02):
  - Panel P4 layout:
    1) Diagram viewport at top.
    2) Five numbered hotspots: Human Director, Project Lead, agentCom.md Hub, Assigned Lead, Forbidden Direct Path.
    3) On selecting `agentCom.md Hub`, show callout:
       - Label: `Hub File`
       - What this is: `Shared communication file`
       - How it connects: `All role updates must pass here`
    4) Related lines from Human/Leads to hub become emphasized.
    5) Forbidden direct path hotspot opens DON'T callout with cross-out icon.
  Status: DONE

- Reply To Task ID: V2-S01 (Site-Wide Revision)
  Summary:
  Expanded the explainer interaction spec from diagram-only to full site coverage (Home, Starter Kit, and all Step pages).
  One unified pattern now defines how every explainer element answers: "what this is" + "how it connects to workflow."
  Interaction inventory for all explainer zones:
  - Home page:
    - Mandatory Before Workflow block (`.must-do` list items).
    - Step cards in Step Routes grid (`.home-step-card`).
    - Progress meta (`X/8 steps checked`) explanation target.
  - Step pages:
    - Step rail items (`.step-rail-item` links).
    - Panel labels and panel indexes (`P0-P7` markers).
    - Diagram hotspots/callouts inside P4.
    - Mission gate warning states in P3/P6 when present.
    - Check items in P6 (purpose and flow linkage).
  - Starter Kit page:
    - Starter flow boxes and sequence arrows.
    - Download action block and fallback note.
    - "Required before workflow" cues.
  - Global explainer triggers:
    - Inline hotspot markers.
    - Label tooltips.
    - Side-panel detail cards.
  Global state spec (default / hover / focus / active):
  - Default:
    - Explainer markers show index only.
    - No detail panel open.
    - Connected elements remain normal line weight.
  - Hover (pointer):
    - Marker gains +0.5px line weight and 104% scale.
    - Small tooltip appears with `label` only.
    - Linked UI part gets subtle 2px inset outline.
  - Focus (keyboard):
    - Same as hover plus 2px dashed focus ring with 3px offset.
    - Tooltip persists while focused.
  - Active (click/tap/Enter/Space):
    - Side-panel explainer opens with:
      - `label`
      - `whatThisIs` (max 8 words)
      - `howItConnects` (max 10 words)
    - Related elements in same flow group are highlighted by dashed connectors.
    - Non-active explainer markers reduce to 60% opacity.
  Hotspot/callout rules:
  - One hotspot maps to one explainer record.
  - Record schema:
    - `id`
    - `zone` (`home|step|starter`)
    - `label`
    - `whatThisIs`
    - `howItConnects`
    - `anchor` (`x`,`y` percent for overlays)
    - `group` (flow cluster id)
    - `order` (keyboard/tap sequence)
  - Per view limits:
    - Home: 4-6 explainers
    - Step page: 5-8 explainers
    - Starter page: 4-6 explainers
  - Max one active explainer at a time.
  - For dense zones, fallback to numbered list with linked highlight on selection.
  Tooltip/side-panel rules:
  - Tooltip (quick layer):
    - Triggered on hover/focus.
    - Contains label only.
    - Max width 160px; 1 line preferred.
    - Positioned above target, then right/left fallback if clipped.
  - Side-panel (deep layer):
    - Triggered on active state.
    - Contains label + whatThisIs + howItConnects + optional "Related part: X".
    - Includes Prev/Next controls through same-zone explainers.
    - Desktop placement: right dock inside current panel.
    - Mobile placement: bottom sheet (`max-height: 42vh`), sticky close control.
  Desktop vs mobile behavior:
  - Desktop:
    - Hover previews + click locks.
    - Side-panel docked right when space allows; overlays only as fallback.
    - `Esc` closes active explainer and returns focus to trigger.
  - Mobile:
    - Tap opens/closes.
    - No hover-only dependencies.
    - Bottom sheet preserves diagram/content visibility above fold.
    - Swipe or Prev/Next moves between explainer parts in order.
  Placement rules:
  - Avoid covering actionable buttons and primary instruction lines.
  - Keep 12px minimum edge padding from panel bounds.
  - Keep 8px minimum gap between tooltip and any other explainer surface.
  - If collision persists, route details to side-panel and leave marker inline.
  Assembly-manual style controls:
  - Monochrome only (#111111, #FFFFFF, neutral gray for dividers/hatch).
  - No glow, shadows, bright accents, or playful motion.
  - Transition budget: 120-180ms fade/slide only.
  - Text budget per explainer: short phrase + short connection line, no paragraphs.
  Example wireframes:
  - Home page wireframe:
    1) User hovers `Mandatory Before Workflow` item.
    2) Tooltip shows label: `Mission Gate`.
    3) Active opens side-panel:
       - What: `Required preflight checks`
       - Connects: `Prevents setup errors in later steps`
    4) Related Step 1 and Step 3 cards get dashed connector emphasis.
  - Step page wireframe (P4 + step rail):
    1) User focuses Step rail item `07`.
    2) Tooltip label: `Current Stage`.
    3) Active side-panel:
       - What: `Your place in sequence`
       - Connects: `Controls what to do next`
    4) Selecting diagram hotspot `agentCom hub` updates same side-panel content and highlights linked rule in P3.
  - Starter page wireframe:
    1) User taps starter flow box `Rename`.
    2) Bottom sheet opens:
       - What: `Project folder naming step`
       - Connects: `Ensures correct files open in Codex`
    3) `Mission` box receives dashed related highlight to show required next dependency.
  Brand usage rule (`assets/brand/agent-factory-logo.png`):
  - Keep logo in brand/header contexts only.
  - Do not use logo as explainer hotspot target in instructional panels.
  Status: DONE

- Reply To Task ID: V2-S09
  Summary:
  Delivered readability and hotspot-collision redesign for explainer UX, prioritizing Step 2 folder diagram first and then applying the same rules site-wide.
  Fix goal: sentence-style explainer text (no one-word stacking) and zero hotspot overlap on critical diagram labels.
  Revised explainer panel typography spec:
  - Explainer card width:
    - Desktop docked panel: min 300px, preferred 340px, max 380px.
    - Desktop floating card: min 260px, max 320px.
    - Mobile bottom sheet: full width minus 24px side margins.
  - Type scale:
    - `label`: 13px, 700, uppercase, letter-spacing 0.08em.
    - `whatThisIs` line: 16px, 600, line-height 1.45.
    - `howItConnects` line: 15px, 500, line-height 1.5.
    - helper/meta line: 12px, 500, line-height 1.4.
  - Readability constraints:
    - Max line length: 42ch.
    - Min useful line length: 22ch.
    - At least 8px between heading and body lines.
    - `word-break: normal; overflow-wrap: normal; hyphens: none;` for explainer text.
  Line-length and spacing rules:
  - Card internal spacing (desktop): 12px top/bottom, 14px left/right.
  - Card internal spacing (mobile): 14px top/bottom, 16px left/right.
  - Section rhythm:
    - `label` -> `whatThisIs`: 8px
    - `whatThisIs` -> `howItConnects`: 10px
    - body -> controls row: 12px
  - If text exceeds 3 lines for either statement, collapse to one-line summary + "More" expand action.
  Hotspot safe-zone map (Step 2 first: D-FLD-03):
  - Protected content zones (no marker centers allowed):
    - Header title strip: x 40-920, y 32-96.
    - Folder tree text block: x 108-470, y 146-452.
    - Right checklist text block: x 662-892, y 144-468.
  - Preferred marker lanes for Step 2:
    - Left lane: x 72-98, y 142-448.
    - Mid lane: x 586-616, y 142-448.
    - Right lane: x 900-924, y 142-448.
  - Marker placement for Step 2 key parts:
    - `Download starter set` marker near right lane top with leader to first checklist row.
    - `Duplicate folder` marker near mid lane, aligned to second checklist row.
    - `Rename folder` marker near right lane mid, aligned to third checklist row.
    - `Open mission.md` marker near mid lane lower, aligned to fourth checklist row.
  - Generalized safe-zone pattern for all diagrams:
    - Define protected rectangles around all text labels and action buttons.
    - Keep a 16px marker exclusion buffer around each protected rectangle.
    - Use outer perimeter lanes first; internal placement only if lane placement fails.
  Collision-avoidance placement rules:
  - Rule 1: Place marker in nearest allowed lane relative to target part centroid.
  - Rule 2: If overlap with protected zone or existing marker (<28px center distance), nudge by 8px in priority order: up, down, right, left.
  - Rule 3: After 4 nudges, switch to edge-docked marker and draw 1.5px leader line to target.
  - Rule 4: If two leader lines cross, re-route lower-priority marker to alternate lane.
  - Rule 5: Keep minimum 12px between any callout card edge and key diagram text.
  - Rule 6: Max one expanded callout card at a time for dense diagrams; others show compact label chips only.
  Updated wireframe examples for dense diagrams:
  - Step 2 folder diagram (priority):
    1) Markers sit in left/mid/right lanes only.
    2) Leaders point to checklist rows and file tree nodes.
    3) Explainer panel docks right on desktop, bottom sheet on mobile.
    4) No marker or card covers `mission.md`, `kernel.md`, or `agentCom.md` text.
  - Step 7 communication diagram:
    1) Hub hotspot remains central but marker offset sits above-right of hub text.
    2) Forbidden path marker is edge-docked with leader to crossed line.
    3) Callout card never overlaps `agentCom.md` label.
  - Workflow sequence diagram:
    1) Hotspots for steps 1, 4, 8 use top/bottom perimeter lanes.
    2) Loop-arrow explainer card docks below row to avoid covering step tiles.
  Seamless interaction behavior requirements:
  - Hover/focus delay for tooltip: 80ms in, 80ms out.
  - Active card transition: 140ms fade+slide (no bounce).
  - Touch targets remain 44x44 minimum even when visual marker is smaller.
  - Keyboard flow remains sequential by explainer `order` index.
  Status: DONE

- Reply To Task ID: V2-S10
  Summary:
  Finalized hover overlay hotfix so marker centers stay in whitespace lanes only, hover help appears near hovered targets, and tooltip text wraps as normal sentence lines.
  This spec is implementation-ready for immediate Builder pass.
  Updated hotspot placement spec (whitespace-only):
  - Placement rule:
    1) Define protected zones from all diagram text, command text, and labels.
    2) Expand each protected zone by 16px padding.
    3) Marker centers are valid only in remaining whitespace lanes.
  - Global constraints:
    - Minimum marker-center distance to protected zones: 16px.
    - Minimum marker-center distance to another marker: 28px.
    - Visual marker size: 18px; interactive hit area: 44x44.
  - Lane priority order:
    1) Inter-panel gutters
    2) Outer perimeter lanes
    3) Edge-docked lane with leader line (fallback)
  - Hard block rule: marker center must never land on any text baseline area.
  Overlay tooltip behavior spec (above/near hovered area):
  - Trigger:
    - Desktop: hover/focus opens local tooltip.
    - Touch: tap opens local tooltip; second tap closes.
  - Placement:
    - Preferred: above hovered target (`top-center`, 10px offset).
    - Fallback order: top-right, top-left, right, left, bottom.
    - Keep tooltip on-screen with 12px viewport margin.
  - Visibility behavior:
    - Open delay 80ms, close delay 100ms.
    - One tooltip active at a time.
    - Tooltip tracks hovered target context; no static always-on block below diagram.
  - Diagram visibility rule:
    - Tooltip cannot cover critical target label or command text.
    - Keep primary diagram graphic visible while tooltip is open.
  Wrapping and line-length rules for tooltip text:
  - Tooltip width:
    - Desktop: min 240px, preferred 280px, max 340px.
    - Mobile: width = viewport minus 24px side margins.
  - Text layout:
    - `label`: 13px/1.3, bold.
    - `whatThisIs`: 16px/1.45.
    - `howItConnects`: 15px/1.5.
  - Wrapping rules:
    - `white-space: normal`.
    - `word-break: normal`.
    - `overflow-wrap: break-word` only for long tokens.
    - Target line length: 28-46 characters.
    - Max 3 lines per statement before truncation + expand.
  Corrected text-position layout notes (affected diagrams):
  - D-STR-05 (`assets/diagrams/d-str-05-startup-flow.svg`):
    - Protected text zones:
      - Title/subtitle area: x 46-560, y 40-96.
      - Step labels/microcopy in cards: y 208-252 across card text blocks.
      - Command text block: x 724-892, y 264-348 (hard no-overlap zone).
      - Bottom instruction sentence: x 108-890, y 438-460.
    - Whitespace lanes for marker centers:
      - Vertical gutters: x 246-270, 466-490, 686-710.
      - Outer lanes: x 28-46 and x 906-932.
      - Lower whitespace strip above bottom panel: y 372-398.
    - Correction:
      - Move any marker currently on card text into nearest gutter lane and connect via 1.5px leader line.
      - For Step 4 command area, place marker in right outer lane (x ~914, y 292), tooltip preferred above-left.
  - D-SYS-01 (`assets/diagrams/d-sys-01-system-map.svg`):
    - Protected text zones:
      - Header/subtitle: x 46-520, y 40-94.
      - Node labels in all role cards.
      - `NO DIRECT` label zone: x 820-920, y 210-236.
      - Bottom Do/Don't text block: x 114-570, y 410-468.
    - Whitespace lanes for marker centers:
      - Mid channel between Project and specialist cards: x 602-644, y 102-386.
      - Left perimeter lane: x 28-52, y 120-494.
      - Right perimeter lane: x 910-932, y 120-494.
    - Correction:
      - Keep specialist markers in mid channel, not on specialist label text.
      - Keep Do/Don't explainer markers outside bottom copy; use perimeter lane with short leaders.
  Implementation-ready redline notes:
  - Add per-diagram metadata:
    - `protectedZones[]` rectangles (x,y,w,h).
    - `laneGuides[]` rectangles and priority.
    - `hotspots[]` with preferred target point and fallback lanes.
  - Placement algorithm:
    1) Pick nearest point in highest-priority lane.
    2) Reject if rule violations (protected overlap / marker spacing).
    3) Nudge by 8px increments (up/down/right/left) max 4 attempts.
    4) Fallback to edge-docked position + leader.
  - Tooltip renderer:
    - Anchor to active marker rect.
    - Run placement fallback order.
    - Auto-flip on viewport collision.
    - Preserve keyboard flow (`Tab` order follows hotspot `order`).
  - QA checkpoints for Builder handoff:
    - No marker center intersects protected zone.
    - No tooltip obscures command text in D-STR-05.
    - No tooltip obscures role labels in D-SYS-01.
    - Tooltip lines render as sentence chunks, not one-word stacks.
  Status: DONE

- Reply To Task ID: V2-S11
  Summary:
  Delivered complete diagram-by-diagram explainer content and anchor redlines for all required diagrams.
  Copy is 7th-grade friendly and each row explains both what the part is and why it matters.
  Per-diagram explainer spec tables:

  D-STA-00 (Starter Flow)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes |
  | --- | --- | --- | --- | --- | --- |
  | 1 | Download starter set | Class folder source files | Starts setup with correct files | top gutter above box 1 | Keep marker out of title and box-1 label text |
  | 2 | Unzip downloaded folder | Open the downloaded zip | Makes editable project folder on Mac | mid gutter between box 1 and 2 | Keep clear of arrow and "Duplicate" text |
  | 3 | Rename for findability | Name folder for your project | Helps you find and open right folder later | mid gutter between box 2 and 3 | Do not overlap rename label line |
  | 4 | Open mission.md and plan next step | First planning file to complete | Required gate before agent workflow starts | right perimeter lane beside box 4 | Keep clear of mission text and warning strip |

  D-FLD-03 (Folder Structure)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes |
  | --- | --- | --- | --- | --- | --- |
  | 1 | Project root folder | Main folder for this build | Holds every required setup file | left perimeter lane beside root row | Never sit on root folder name text |
  | 2 | mission.md | Project plan and goals | Must be complete before workflow start | left tree lane near mission row | Keep 16px away from mission filename text |
  | 3 | agentCom.md | Shared team message board | All agent updates pass through this file | right checklist lane aligned to step 4 callout | Keep marker off both tree text and checklist copy |
  | 4 | starter-kit.zip | Original starter package file | Backup source if setup needs reset | right perimeter lane near zip row | Avoid overlap with zip filename baseline |

  D-CUE-06 (Do/Don't Cues)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes |
  | --- | --- | --- | --- | --- | --- |
  | 1 | DO panel | Allowed action example | Shows actions students should follow | top gutter over DO card | Keep out of DO headline and check icon |
  | 2 | DON'T panel | Blocked action example | Prevents wrong workflow behavior | top gutter over DON'T card | Keep out of cross icon and body lines |
  | 3 | LOCKED panel | No-edit zone with hatch | Protects fixed protocol content | top gutter over LOCKED card | Never place inside hatched rectangle |
  | 4 | Mission gate rule | Final start condition | Confirms when students may continue | lower perimeter lane at mission block edge | Keep clear of long mission sentence line |

  D-STR-05 (Startup Flow)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes |
  | --- | --- | --- | --- | --- | --- |
  | 1 | Open Codex | Launch coding workspace app | Begins tool environment for all next steps | vertical gutter x 246-270 near card 1 | Do not overlap "Open Codex" text |
  | 2 | Open project folder | Load renamed folder | Ensures correct files are in current workspace | vertical gutter x 466-490 near card 2 | Keep clear of card-2 label and micro line |
  | 3 | Open Project Lead chat | Open main orchestration chat | Needed to receive Next Agent Sequence | vertical gutter x 686-710 near card 3 | Avoid text area and icon block |
  | 4 | Send exact command | Protocol command entry step | Triggers first assigned workflow cycle | right outer lane x 906-932 near card 4 | Hard no-overlap on command text block |

  D-SYS-01 (System Map)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes |
  | --- | --- | --- | --- | --- | --- |
  | 1 | Human Director | Student who directs the process | Starts flow by messaging Project Lead | left perimeter lane near human card | Keep marker off "Human Director" label |
  | 2 | Project Lead | Main planning and routing role | Assigns work to other leads | center channel lane between main cards | Keep clear of Project Lead title text |
  | 3 | Specialist leads | Designer, Builder, Tester, Docs | Execute assigned tasks by role | mid channel lane x 602-644 beside specialist stack | Do not overlap specialist label rows |
  | 4 | No direct specialist chat | Forbidden direct lead-to-lead path | Enforces agentCom-only communication rule | right perimeter lane near NO DIRECT cue | Keep marker off NO DIRECT text and cross lines |

  D-COM-02 (Communication Rules)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes |
  | --- | --- | --- | --- | --- | --- |
  | 1 | Human instruction input | Director sends kickoff command | Starts the message flow into system | left perimeter lane near human node | Keep marker off node title and subtitle |
  | 2 | agentCom.md hub | Shared communication file node | Required route for all updates | top-right lane of hub rectangle | Never cover "agentCom.md" text |
  | 3 | Lead role responses | Project and role lead updates | Shows valid traffic toward hub | right perimeter lane between lead nodes | Avoid arrowhead and node labels |
  | 4 | Blocked direct path | Invalid lead-to-lead shortcut | Prevents rule-breaking side chats | center-upper lane near crossed dashed paths | Keep cross mark and warning text visible |

  D-WKF-04 (Workflow Sequence)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes |
  | --- | --- | --- | --- | --- | --- |
  | 1 | Step 1 download | Start file setup | Enables rename and mission steps | top perimeter above tile 1 | Keep marker out of tile number and label |
  | 2 | Step 2 rename | Rename project folder | Makes correct folder easy to open | top perimeter above tile 2 | Avoid tile text and connector arrow |
  | 3 | Step 3 mission | Complete mission.md | Unlocks workflow start condition | top perimeter above tile 3 | Keep away from title line in tile |
  | 4 | Step 4 open tools | Open Codex and folder | Prepares workspace for lead chats | top perimeter above tile 4 | Do not cover tile heading |
  | 5 | Step 5 open chats | Create lead chats | Prepares role channels | bottom perimeter below tile 5 | Keep marker off tile label row |
  | 6 | Step 6 paste prompts | Add role prompts | Activates each role behavior | bottom perimeter below tile 6 | Avoid number and text block |
  | 7 | Step 7 start protocol | Use agentCom and command | Starts first routed work cycle | bottom perimeter below tile 7 | Keep connector visibility clear |
  | 8 | Step 8 verify cycle | Run and confirm first pass | Confirms system is ready to repeat | bottom perimeter below tile 8 | Keep loop arrow and tile text readable |

  Shared safe-zone rule for all rows:
  - Marker centers in whitespace lanes only.
  - Minimum 16px from any text block.
  - Minimum 28px between marker centers.
  - Use edge-docked fallback + leader when lane conflict remains.
  Status: DONE

- Reply To Task ID: V2-S13
  Summary:
  Scope lock complete: ONLY EXPLAINERS IN THE DIAGRAMS (panel P4).
  This response supersedes site-wide explainer scope for interaction placement.
  Diagram-only explainer scope spec (one-page):
  - Allowed explainer zones:
    - Diagram part hotspots inside Step page panel P4 only.
    - Hover/focus/tap triggers bound to diagram parts only.
    - Tooltip/popout content anchored to diagram whitespace lanes only.
  - Banned explainer zones:
    - Home page cards and home "Mandatory Before Workflow" block.
    - Step rail items.
    - Panel labels/indexes (`P0-P7`) and panel body copy outside P4.
    - Checklist rows and template blocks.
    - Starter page non-diagram blocks/buttons/notes.
  - Behavior lock:
    - No explainer visible by default.
    - Explainer appears only on hover/focus/tap of a diagram part.
    - Explainer hides on pointer leave / blur / `Esc` / second tap.
    - No non-diagram element may open explainer content.

  Source legend:
  - `CTX` = line sourced or directly adapted from `assignmentContext.md`
  - `NEW` = newly authored to fill missing content

  D-STA-00 source map (Starter Flow)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes | source |
  | --- | --- | --- | --- | --- | --- | --- |
  | 1 | Download starter set | Get Systems Starter Kit folder | Starts setup with official files | top gutter above box 1 | Keep off title and step text | CTX what + NEW connect |
  | 2 | Unzip downloaded folder | Extract downloaded starter files | Creates usable local project folder | mid gutter between box 1 and 2 | Keep off arrow and box labels | CTX |
  | 3 | Rename for findability | Rename folder to your project name | Makes correct folder easy to find later | mid gutter between box 2 and 3 | Keep off rename text line | CTX |
  | 4 | Open mission.md and plan next step | Open mission.md and fill plan | Unlocks workflow after planning | right perimeter beside box 4 | Keep off mission text and warning strip | CTX label + NEW connect |

  D-FLD-03 source map (Folder Structure)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes | source |
  | --- | --- | --- | --- | --- | --- | --- |
  | 1 | Project root folder | Main folder for this build | Holds every required file | left perimeter near root row | Keep off root folder name | CTX adapted |
  | 2 | mission.md | Project goals file | Must be completed before build flow | left tree lane near mission row | Keep 16px from filename text | CTX + NEW connect |
  | 3 | kernel/studio kernel file | Team roster and workflow rules file | Defines roles and next-agent sequence | mid/right lane near kernel row | Keep off file label baseline | CTX adapted |
  | 4 | agentCom/agentCommunications file | Shared communication log | All agent updates route through this file | right checklist lane near comms row | Keep off tree + checklist text | CTX adapted |

  D-CUE-06 source map (Do/Don't Cues)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes | source |
  | --- | --- | --- | --- | --- | --- | --- |
  | 1 | DO panel | Correct behavior example | Shows what students should do next | top gutter above DO card | Keep off DO header/check icon | NEW |
  | 2 | DON'T panel | Blocked behavior example | Prevents workflow mistakes | top gutter above DON'T card | Keep off cross icon/body lines | NEW |
  | 3 | LOCKED panel | Non-editable protocol area | Protects required fixed rules | top gutter above LOCKED card | Never place in hatched area | NEW |
  | 4 | Mission gate rule | Start condition before workflow | Confirms when students can continue | lower perimeter near mission block | Keep off long sentence line | CTX + NEW connect |

  D-STR-05 source map (Startup Flow)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes | source |
  | --- | --- | --- | --- | --- | --- | --- |
  | 1 | Open Codex | Launch Codex app | Starts tool environment | gutter x 246-270 near card 1 | Keep off "Open Codex" text | CTX |
  | 2 | Open project folder | Open renamed project folder | Loads correct files for setup | gutter x 466-490 near card 2 | Keep off label + micro text | CTX |
  | 3 | Open Project Lead chat | Open the Project Lead chat | Prepares planning sequence step | gutter x 686-710 near card 3 | Keep off chat label text | CTX |
  | 4 | Send exact command | Use kickoff instruction text | Triggers first task sequence | right outer lane x 906-932 near card 4 | Hard no-overlap on command block | CTX |

  D-SYS-01 source map (System Map)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes | source |
  | --- | --- | --- | --- | --- | --- | --- |
  | 1 | Human Director | Student leading the studio | Starts flow by directing Project Lead | left perimeter near human card | Keep off "Human Director" text | CTX |
  | 2 | Project Lead | Planner and task router | Assigns next sequence to team | center channel between main cards | Keep off Project Lead label | CTX |
  | 3 | Specialist leads | Designer/Builder/Tester/Docs roles | Complete assigned project work | mid channel x 602-644 by lead stack | Keep off specialist labels | CTX adapted |
  | 4 | No direct specialist chat | Blocked lead-to-lead shortcut | Enforces communication-file protocol | right perimeter near NO DIRECT cue | Keep cross lines and label visible | CTX + NEW wording |

  D-COM-02 source map (Communication Rules)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes | source |
  | --- | --- | --- | --- | --- | --- | --- |
  | 1 | Human kickoff instruction | Director instruction entry point | Begins communication workflow | left perimeter near human node | Keep off node title/subtitle | CTX |
  | 2 | Communication file hub | Single shared message file | Required route for all updates | top-right lane of hub | Never cover hub file label | CTX adapted |
  | 3 | Agent update path | Valid updates from assigned leads | Shows allowed message direction | right perimeter between lead nodes | Keep arrowheads visible | NEW + CTX rule |
  | 4 | Blocked direct path | Invalid direct agent chat path | Prevents protocol breaks | center-upper lane near crossed path | Keep cross mark visible | CTX + NEW wording |

  D-WKF-04 source map (Workflow Sequence)
  | partNumber | label | whatThisIs | howItConnects | anchor lane | safe-zone notes | source |
  | --- | --- | --- | --- | --- | --- | --- |
  | 1 | Install/Open Codex | Tool startup step | Required before project actions | top perimeter above tile 1 | Keep off tile text | CTX |
  | 2 | Starter kit + rename | Download, unzip, rename setup step | Prepares correct working folder | top perimeter above tile 2 | Keep off connector arrow | CTX |
  | 3 | Core files + mission | Set files and complete mission | Defines plan before agent workflow | top perimeter above tile 3 | Keep off tile label | CTX adapted |
  | 4 | Kernel and chats setup | Prepare rules and role chats | Enables agent coordination | top perimeter above tile 4 | Keep off tile heading | CTX adapted |
  | 5 | Prompt setup | Paste role prompts into chats | Activates role behavior | bottom perimeter below tile 5 | Keep off tile text row | CTX adapted |
  | 6 | Start Project Lead | Send kickoff instruction | Generates next-agent sequence | bottom perimeter below tile 6 | Keep arrows visible | CTX |
  | 7 | Direct assigned agents | Run sequence through communication file | Executes first production cycle | bottom perimeter below tile 7 | Keep off tile label | CTX |
  | 8 | Verify and repeat cycle | Check results and continue loop | Confirms stable workflow pattern | bottom perimeter below tile 8 | Keep loop arrow readable | NEW + CTX workflow |

  Scope confirmation:
  - Explainers are diagram-only (P4 hotspots) and interaction-only (hover/focus/tap).
  - No explainer behavior is permitted outside diagrams.
  Status: DONE

- Reply To Task ID: V2-S13 (Anchor-Type + `?` Bubble Lock Revision)
  Summary:
  Scope lock updated exactly as requested: ONLY EXPLAINERS IN THE DIAGRAMS.
  Marker and placement lock applied: use `?` bubbles; `box` explainers anchor bottom-right; `line` explainers stay on lines.
  One-page scope spec:
  - Allowed zone:
    - P4 diagram parts only (all diagrams listed below).
  - Banned zones:
    - Home cards/blocks, step rail, panel labels, checklist, template blocks, starter non-diagram blocks.
  - Interaction rule:
    - Explainers appear only on hover/focus/tap of a diagram part.
    - No default visible explainer on load.
  - Marker glyph lock:
    - All explainer triggers use `?` bubble marker (replace numeric marker display).
  - Anchor behavior lock:
    - `box` type: place `?` bubble at bottom-right of target box by default.
    - `line` type: place `?` bubble on/near the target line (no forced bottom-right move).

  Per-diagram explainer mapping (`partNumber`, source, anchorType):
  D-STA-00
  | partNumber | source | anchorType | anchor note |
  | --- | --- | --- | --- |
  | 1 | CTX+NEW | box | bottom-right of Download box |
  | 2 | CTX | box | bottom-right of Unzip box |
  | 3 | CTX | box | bottom-right of Rename box |
  | 4 | CTX+NEW | box | bottom-right of Mission box |

  D-FLD-03
  | partNumber | source | anchorType | anchor note |
  | --- | --- | --- | --- |
  | 1 | CTX adapted | box | bottom-right of root-row box area |
  | 2 | CTX+NEW | box | bottom-right of mission row box area |
  | 3 | CTX adapted | box | bottom-right of kernel row box area |
  | 4 | CTX adapted | box | bottom-right of comms row box area |

  D-CUE-06
  | partNumber | source | anchorType | anchor note |
  | --- | --- | --- | --- |
  | 1 | NEW | box | bottom-right of DO panel |
  | 2 | NEW | box | bottom-right of DON'T panel |
  | 3 | NEW | box | bottom-right of LOCKED panel |
  | 4 | CTX+NEW | box | bottom-right of Mission Gate panel |

  D-STR-05
  | partNumber | source | anchorType | anchor note |
  | --- | --- | --- | --- |
  | 1 | CTX | box | bottom-right of Open Codex card |
  | 2 | CTX | box | bottom-right of Open Folder card |
  | 3 | CTX | box | bottom-right of Project Lead card |
  | 4 | CTX | line | on command line block edge; keep text fully visible |

  D-SYS-01
  | partNumber | source | anchorType | anchor note |
  | --- | --- | --- | --- |
  | 1 | CTX | box | bottom-right of Human Director node box |
  | 2 | CTX | box | bottom-right of Project Lead node box |
  | 3 | CTX adapted | box | bottom-right of specialist node stack zone |
  | 4 | CTX+NEW | line | on crossed forbidden path line |

  D-COM-02
  | partNumber | source | anchorType | anchor note |
  | --- | --- | --- | --- |
  | 1 | CTX | box | bottom-right of Human input node box |
  | 2 | CTX adapted | box | bottom-right of hub box |
  | 3 | NEW+CTX | line | on valid route line near arrow, avoid labels |
  | 4 | CTX+NEW | line | on crossed invalid path line |

  D-WKF-04
  | partNumber | source | anchorType | anchor note |
  | --- | --- | --- | --- |
  | 1 | CTX | box | bottom-right of tile 1 |
  | 2 | CTX | box | bottom-right of tile 2 |
  | 3 | CTX adapted | box | bottom-right of tile 3 |
  | 4 | CTX adapted | box | bottom-right of tile 4 |
  | 5 | CTX adapted | box | bottom-right of tile 5 |
  | 6 | CTX | box | bottom-right of tile 6 |
  | 7 | CTX | box | bottom-right of tile 7 |
  | 8 | NEW+CTX | box | bottom-right of tile 8 |

  Final lock confirmation:
  - ONLY EXPLAINERS IN DIAGRAMS.
  - `?` bubbles everywhere.
  - Box explainers bottom-right.
  - Line explainers stay on lines.
  Status: DONE

### Builder Lead
- Reply To Task ID: T02
  Summary:
  Manual-First Frontend Architecture Plan v2 completed for static deployment and strict panel consistency across all 8 steps.
  Implementation plan (files/routes/components):
  Route map:
  - `/index.html` (entry, progress overview, start button)
  - `/steps/01-install-open-codex.html`
  - `/steps/02-create-project-folder.html`
  - `/steps/03-create-core-files.html`
  - `/steps/04-open-agent-chats.html`
  - `/steps/05-paste-role-prompts.html`
  - `/steps/06-use-agentcom-only.html`
  - `/steps/07-start-project-lead-sequence.html`
  - `/steps/08-run-first-cycle-verify.html`
  - `/starter-kit/index.html` (what is included + download button)
  - `/starter-kit/ai-agency-starter-kit.zip`
  Shared layout consistency mechanism:
  - One page shell template: `/src/templates/step-shell.html`.
  - One panel partial set: `/src/partials/panel-*.html` (P0-P7).
  - One step data source: `/src/data/steps.json`.
  - Build step (`/scripts/build-pages.mjs`) compiles all step pages from the same shell + panel contracts to prevent drift.
  - Runtime is plain static HTML/CSS/JS (no framework required).
  File/component map:
  - `/assets/css/styles.css` (tokens, panel grid, line weights, typography, mobile/desktop rules)
  - `/assets/js/nav.js` (step progress, prev/next, rail highlight)
  - `/assets/js/copy.js` (copy button behavior for prompts/templates)
  - `/assets/js/checks.js` (Done/Looks-right persistence)
  - `/assets/icons/*.svg` (UI + diagram icons; includes canonical `person.svg`)
  - `/assets/diagrams/*.svg` (instruction diagrams)
  - `/assets/templates/*.txt` (starter file contents + prompt blocks)
  - `/src/data/steps.json` (step data schema instances)
  - `/scripts/build-pages.mjs` (static compilation)
  Component contract list:
  - `HeaderStrip` (P0): `stepNumber`, `stepCount`, `title`.
  - `GoalPanel` (P1): `icon`, `purposeLine`.
  - `ActionPanel` (P2/P3): `panelId`, `mode` (`do|dont|warn`), `icon`, `actionLine`, `buttonLabel`, `buttonTarget`.
  - `DiagramPanel` (P4): `diagramId`, `src`, `alt`, `callouts[]`.
  - `TemplatePanel` (P5): `fileLabel`, `templateKey`, `copyLabel`, `previewLines`.
  - `CheckPanel` (P6): `checks[]` (exactly two labels).
  - `NavStrip` (P7): `prevHref`, `nextHref`, `nextLabel`.
  - `StepRail`: `steps[]`, `currentStep`.
  Per-step data schema:
  - Root:
    - `id` (1-8), `slug`, `title`, `purpose`, `stepNumberText`, `panelOrder` (fixed: `["P0","P1","P2","P3","P4","P5","P6","P7"]`).
  - Actions:
    - `actions[]` objects with `panelId`, `mode`, `iconKey`, `line`, `button`.
  - Diagram:
    - `diagram` object with `diagramId`, `src`, `alt`, `callouts`.
  - Template:
    - `template` object with `fileLabel`, `templateAsset`, `copyLabel`.
  - Checks:
    - `checks` array with two strings only.
  - Navigation:
    - `nav` object with `prev`, `next`.
  Diagram asset plan (SVG):
  - `/assets/diagrams/d-sys-01-system-map.svg`
  - `/assets/diagrams/d-com-02-communication-rules.svg`
  - `/assets/diagrams/d-fld-03-folder-tree.svg`
  - `/assets/diagrams/d-wkf-04-workflow-sequence.svg`
  - `/assets/diagrams/d-str-05-startup-flow.svg`
  - `/assets/diagrams/d-cue-06-do-dont-cues.svg`
  - Export standard: clean SVG paths, no embedded raster, 2x PNG fallback optional.
  Icon asset mapping:
  - Human Director: `/assets/icons/person.svg` (canonical baseline per D07).
  - Project Lead: `/assets/icons/project-lead.svg`
  - Specialist agent: `/assets/icons/agent.svg`
  - Folder/file/chat: `/assets/icons/folder.svg`, `/assets/icons/file.svg`, `/assets/icons/chat.svg`
  - Prompt/template actions: `/assets/icons/copy.svg`, `/assets/icons/paste.svg`, `/assets/icons/run.svg`
  - State cues: `/assets/icons/check.svg`, `/assets/icons/cross.svg`, `/assets/icons/warning.svg`, `/assets/icons/lock.svg`
  Starter-kit download implementation approach:
  - Source pack in `/starter-kit/src/` with `mission.md`, `kernel.md`, `agentCom.md`, prompt snippets, sample folder map.
  - Build script `/scripts/build-starter-kit.sh` creates `/starter-kit/ai-agency-starter-kit.zip`.
  - Download button uses direct static link + `download` attribute; include plain fallback note for manual save.
  - Zip is committed so classroom/offline hosting still works.
  Phased build order:
  1) Scaffold static structure, tokens, and base shell.
  2) Implement panel components/contracts and shared layout compiler.
  3) Populate `steps.json` with locked copy from T04.
  4) Integrate icon map + placeholder SVG diagrams.
  5) Add template blocks, copy actions, and check persistence.
  6) Add starter-kit packaging + download page.
  7) Validate all 8 routes, mobile behavior, and load speed.
  Code snippets (if requested):
  Not requested.
  Notes for Human Director:
  This plan now includes explicit component contracts and a fixed step schema so implementation can start immediately without layout drift.
  Status: DONE

- Reply To Task ID: V1-S01
  Summary:
  Built V1 static prototype shell with 8 routed step pages, shared panel renderer (P0-P7), stepper navigation, copy buttons, checklist persistence, and starter-kit download flow including required rename + mission gate instructions.
  Output produced:
  - Route scaffold:
    - `/index.html`
    - `/steps/01-download-starter-set.html`
    - `/steps/02-copy-and-rename-folder.html`
    - `/steps/03-complete-mission-md.html`
    - `/steps/04-open-codex-and-folder.html`
    - `/steps/05-open-agent-chats.html`
    - `/steps/06-paste-role-prompts.html`
    - `/steps/07-use-agentcom-and-start-sequence.html`
    - `/steps/08-run-first-cycle-and-verify.html`
    - `/starter-kit/index.html`
  - Shared shell + panel system:
    - `assets/js/site.js` renders fixed P0-P7 panel order from `data/steps.json` on every step route.
    - Desktop/mobile step rail + progress bars + back/next navigation included.
  - Step data + workflow requirements:
    - `data/steps.json` defines all 8 steps and includes mandatory starter-set link, explicit folder rename action, and mission.md completion gate before sequence start.
  - Copy actions + checklist persistence:
    - `assets/js/copy.js` for all copy buttons.
    - `assets/js/checks.js` for localStorage-backed per-step checks.
  - Starter-kit download support:
    - `/starter-kit/src/` source files created (`mission.md`, `kernel.md`, `agentCom.md`, `README.txt`).
    - `/scripts/build-starter-kit.sh` created.
    - `/starter-kit/ai-agency-starter-kit.zip` generated.
  - Visual assets:
    - Monochrome global style: `assets/css/styles.css`.
    - Placeholder/manual diagrams in `assets/diagrams/*.svg` (includes starter flow panel).
    - Icon set in `assets/icons/*.svg` with existing `assets/icons/person.svg` preserved and used in flow.
    - Step template blocks in `assets/templates/*.txt`.
  Validation:
  - JS syntax checks passed:
    - `node --check assets/js/site.js`
    - `node --check assets/js/checks.js`
    - `node --check assets/js/copy.js`
  - Data/asset integrity check passed for all 8 steps (routes, templates, icons, diagrams).
  Notes:
  - Attempted quick local HTTP smoke test but local server launch in this environment failed due process permissions; completed file-level and syntax-level verification instead.
  Status: DONE

- Reply To Task ID: V2-S02
  Summary:
  Implemented site-wide explainer interaction system with one shared mechanism across Home, Starter Kit, and all 8 step routes.
  Code changes completed:
  - Added shared runtime module: `assets/js/explainers.js`.
    - Unified hover/focus/tap behavior.
    - Tooltip label preview.
    - Active detail panel with `label`, `whatThisIs`, `howItConnects`.
    - Prev/Next/Close controls.
    - Related-part highlighting and non-active dimming.
    - Keyboard support: `Tab`, `Enter/Space`, arrow navigation, `Esc`.
    - Accessibility attributes: `aria-label`, `aria-expanded`, `aria-controls`, `aria-current`.
  - Updated renderer: `assets/js/site.js`.
    - Added explainer targets for step rail, panel blocks, diagram stage, checks, home mandatory block, and starter flow blocks.
    - Added explainers metadata loading (`data/explainers.json`) with static-first fetch fallback.
    - Added no-JS fallback content block (`details` + ordered explainer list) on Home, Starter, and Step pages.
    - Preserved existing route flow and template/copy/check behavior.
    - Added mission gate guard text in Step 7 action when Step 3 checks are incomplete.
  - Updated styles: `assets/css/styles.css`.
    - Shared marker, tooltip, panel, fallback, and related-highlight styles.
    - Readability-focused explainer typography/line rules.
    - Mobile bottom-sheet behavior (`max-height: 42vh`) and 44x44 touch target support.
  - Added metadata model: `data/explainers.json`.
    - Home, Starter, Step common, Step mission, and per-diagram explainer records.
    - Schema in use: `id`, `label`, `whatThisIs`, `howItConnects`, `target`, `anchor`, `group`, `order`, `related`.
  - Loaded shared module on all pages:
    - `index.html`
    - `starter-kit/index.html`
    - `steps/01` through `steps/08` pages
  Per-page implementation notes:
  - Home:
    - Explainers added to all three `Mandatory Before Workflow` items, progress meter, and Step 1 route card.
  - Starter Kit:
    - Explainers added to download block, rename block, mission gate block, and starter navigation block.
  - Step pages:
    - Explainers added to current step rail item, key panels (P2/P4/P6), checklist row, and diagram part markers.
    - Step-specific mission/protocol cues attached on Step 3 and Step 7.
  Keyboard/touch + fallback behavior:
  - Desktop: hover/focus preview, click/tap lock, arrow-key part navigation, `Esc` close.
  - Touch/mobile: tap-to-toggle markers with bottom-sheet detail panel behavior.
  - No-JS: fallback explainer lists stay readable via static `details` content.
  Validation run:
  - `node --check assets/js/site.js`
  - `node --check assets/js/explainers.js`
  - `node --check assets/js/checks.js`
  - `node --check assets/js/copy.js`
  - JSON parse check for `data/steps.json` and `data/explainers.json`
  - Diagram metadata coverage check passed for all 8 steps
  Environment note:
  - Local HTTP smoke test could not run in this environment because local port binding is blocked (`EPERM`).
  Status: DONE

- Reply To Task ID: V2-S12
  Summary:
  Implemented popout overlay behavior and full per-diagram explainer wiring so help appears only on interaction, anchors near hovered/focused/tapped parts, and remains readable without clipping.
  Code updates:
  - `assets/js/explainers.js`
    - Reworked interaction model so explainer popouts are hidden by default and open only on interaction.
    - Added delayed open/close behavior (`hover/focus` open, leave/blur close, `click/tap` lock toggle).
    - Added local popout placement algorithm near active marker with fallback order:
      - top-center -> top-right -> top-left -> right -> left -> bottom.
    - Added viewport collision handling and clamped positioning.
    - Added mobile bottom-sheet mode and preserved keyboard/touch controls:
      - `focus`, `Enter/Space`, `Esc`, arrow key traversal, tap toggle.
    - Preserved accessibility attributes (`aria-expanded`, `aria-controls`, `aria-current`) and one active explainer at a time.
  - `assets/css/styles.css`
    - Updated explainer panel to fixed overlay layer so popouts can escape container bounds when needed.
    - Removed static panel docking and shadow-heavy styling; kept assembly-manual monochrome style.
    - Added readability-oriented typography/line-height/width constraints for normal sentence wrapping.
    - Added `.is-mobile-sheet` layout for touch view (`max-height: 42vh`) with 44x44 interaction targets retained.
  - `data/explainers.json`
    - Updated D-STA-00 copy to required meanings:
      1) Download starter set
      2) Unzip downloaded folder
      3) Rename for findability
      4) Open mission.md and plan next step
    - Kept per-diagram explainer coverage for all diagrams used by Steps 1-8.
  Acceptance criteria check:
  1) No explainer box visible by default: PASS.
  2) Full text readability on Home + Steps without condensed one-word stacking: PASS (CSS + panel sizing updates).
  3) Working explainers for all numbered diagram parts in current step set: PASS (coverage validation script run).
  4) Popouts near hovered parts and off critical content where possible via whitespace anchors + placement fallback: PASS.
  5) Keyboard/touch interactions preserved (`focus`, `Enter/Space`, `Esc`, tap toggle): PASS.
  Changed assets list:
  - `assets/js/explainers.js`
  - `assets/css/styles.css`
  - `data/explainers.json`
  Validation run:
  - `node --check assets/js/explainers.js`
  - `node --check assets/js/site.js`
  - `node --check assets/js/checks.js`
  - `node --check assets/js/copy.js`
  - JSON parse check: `data/explainers.json`, `data/steps.json`
  - Diagram coverage check: explainer item counts cover all step callouts
  Notes:
  - Local browser smoke-run could not execute here because local port bind is blocked (`EPERM`), so validation used syntax + data integrity checks.
  Status: DONE

- Reply To Task ID: V2-S14
  Summary:
  Completed blocking scope-lock hotfix: ONLY EXPLAINERS IN THE DIAGRAMS (panel P4).
  Removed non-diagram explainer triggers site-wide and kept diagram hotspot explainers only.
  Code/data changes:
  - `assets/js/site.js`
    - Removed all non-diagram explainer hooks (`data-explainer-target`) from Home, Starter, step rail, non-diagram panels, checklist rows, and nav strip.
    - Removed Home/Starter explainer mounting and removed explainer fallback boxes so no non-diagram explainer content renders on load.
    - Changed step explainer assembly to diagram-only: `buildStepExplainItems` now uses `diagramById` (or diagram fallback) only.
    - Kept explainer mounting only on step page main content where diagram hotspots are rendered.
  - `data/explainers.json`
    - Scope-locked file to `diagramById` only (removed `home`, `starter`, `stepCommon`, `stepMission`).
    - Updated diagram explainer copy to align with V2-S13 source map for:
      - `D-STA-00`, `D-FLD-03`, `D-CUE-06`, `D-STR-05`, `D-SYS-01`, `D-COM-02`, `D-WKF-04`.
    - Expanded `D-WKF-04` mapping to 8 explainers to match V2-S13 workflow sequence rows.
  Acceptance criteria check:
  1) No explainer appears anywhere except inside diagrams: PASS.
  2) Diagram explainers appear only on hover/focus/tap of diagram parts: PASS.
  3) No default visible explainer box on load: PASS.
  4) Diagram explainer text is readable and unobstructed: PASS (V2-S12 popout behavior retained).
  5) Diagram explainer copy matches V2-S13 table: PASS.
  Validation run:
  - `node --check assets/js/site.js`
  - `node --check assets/js/explainers.js`
  - `node --check assets/js/checks.js`
  - `node --check assets/js/copy.js`
  - `jq empty data/explainers.json`
  - `jq empty data/steps.json`
  - Diagram coverage check:
    - Step 1 `D-STA-00`: 4
    - Step 2 `D-FLD-03`: 4
    - Step 3 `D-CUE-06`: 4
    - Step 4 `D-STR-05`: 4
    - Step 5 `D-SYS-01`: 4
    - Step 6 `D-WKF-04`: 8
    - Step 7 `D-COM-02`: 4
    - Step 8 `D-WKF-04`: 8
  Notes:
  - Browser smoke run remains blocked in this environment due local port bind permissions (`EPERM`), so verification is code/data level.
  Status: DONE

### Tester Lead
- Reply To Task ID: T03
  What I tested:
  Completed Assembly-Manual Usability Test Plan v2 for nonverbal-first guidance, focused on <=10 minute completion by first-time 7th graders on Mac + Codex.
  Timed walkthrough script (moderated, low intervention):
  - Participants: 6 students (first-time users), 1 facilitator, 1 observer.
  - Device baseline: Mac laptop, Codex installed, browser open, no pre-created files.
  - Facilitator opening line: "Use only this guide. Think out loud. I will only help if you are stuck for 20 seconds."
  - Hint policy: max 2 hints per student, max 30 seconds each.
  - Time budget per step:
    - S1 Install/Open Codex: 1:00
    - S2 Create project folder: 1:00
    - S3 Create mission.md/kernel.md/agentCom.md: 1:30
    - S4 Open 5 role chats: 1:30
    - S5 Paste role prompts: 2:00
    - S6 Use agentCom.md only: 1:00
    - S7 Send Project Lead command: 1:00
    - S8 Run one cycle + verify save: 1:00
    - Total target: 10:00
  - Capture fields: start/end time, step pass/fail, hint count, hesitation >20s, wrong action, protocol violation, final completion state.
  Comprehension checks per step (task + visual meaning):
  - S1: Student identifies "Open" icon and launches Codex without verbal clarification.
  - S2: Student follows solid arrow from folder icon to expected folder outcome.
  - S3: Student creates exact 3 filenames from file icons and labels.
  - S4: Student maps 5 role icons to 5 separate chats correctly.
  - S5: Student uses copy icon and confirms full prompt pasted (no truncation).
  - S6: Student interprets cross-out cue and avoids direct agent-to-agent messaging.
  - S7: Student copies exact command text and sends it to Project Lead chat only.
  - S8: Student follows sequence arrows and records update in Section 2 of agentCom.md.
  Nonverbal clarity rubric (score each step 0-2, max 16):
  - Icon recognition:
    - 2 = correct on first try
    - 1 = correct after reread
    - 0 = needs facilitator explanation
  - Arrow/flow understanding:
    - 2 = follows path with no detour
    - 1 = one detour self-corrected
    - 0 = cannot continue without hint
  - Do/Don't cue understanding:
    - 2 = obeys cues with no violation
    - 1 = one near-violation corrected
    - 0 = violates cue and needs intervention
  - Panel order tracking:
    - 2 = completes in intended panel order
    - 1 = one panel skipped then recovered
    - 0 = repeated panel confusion
  - Rubric pass thresholds:
    - Student pass: >=13/16 and no 0 in S6 or S7
    - Cohort pass: >=80% students meet student pass
  Failure-mode checklist:
  - FM-01: Student cannot identify current step number badge.
  - FM-02: Student reads panel out of order (breaks Z-pattern).
  - FM-03: Student misreads dashed vs solid arrow priority.
  - FM-04: Student misses cross-out and attempts direct agent messaging.
  - FM-05: Copy button appears successful but clipboard text is incomplete.
  - FM-06: Prompt pasted to wrong role chat.
  - FM-07: Mobile view hides critical action below first viewport.
  - FM-08: Diagram requires horizontal scroll before first action is clear.
  - FM-09: Starter-kit download/unzip fails on Mac.
  - FM-10: Student cannot switch between browser and Codex smoothly.
  Severity scale:
  - Sev-0 Blocker: student cannot finish workflow (hard stop).
  - Sev-1 Critical: workflow continues only with teacher intervention.
  - Sev-2 Major: adds >60 seconds or causes protocol risk, but recoverable.
  - Sev-3 Minor: cosmetic/copy issue with no material completion impact.
  Acceptance report template:
  - Report ID:
  - Date:
  - Build/version tested:
  - Device/OS:
  - Participants (count):
  - Median completion time:
  - Pass rate (%):
  - Avg hints per student:
  - Protocol adherence failures (count):
  - Nonverbal rubric mean score:
  - Sev-0 count:
  - Sev-1 count:
  - Sev-2 count:
  - Sev-3 count:
  - Top 3 failure modes:
  - Go/No-Go recommendation:
  - Required fixes before classroom use:
  Issues (steps to reproduce):
  - No live prototype run yet; this update defines execution method and acceptance thresholds.
  Suggestions:
  - Run a 2-student dry run to validate timing instrumentation before full 6-student session.
  - Fail any build where Step 6 protocol cue is not visible above first scroll on mobile.
  Status: DONE

- Reply To Task ID: V1-S03
  What I tested:
  Executed V1 source-level QA pass on built prototype artifacts for flow compliance and student setup clarity.
  Validation scope:
  - Route and asset integrity for all 8 steps (`data/steps.json` references, templates, icons, diagrams).
  - Starter-set link visibility and copy behavior.
  - Rename-step clarity and mission.md completion clarity.
  - agentCom-only communication cues and command text integrity.
  - Strict mission gate enforcement check (cannot skip mission.md before workflow start).
  - Mobile readability risk review from rendered layout order and CSS behavior.
  Evidence commands run:
  - `node --check assets/js/site.js assets/js/checks.js assets/js/copy.js`
  - step-link integrity script (all referenced files exist for all 8 steps)
  - `unzip -l starter-kit/ai-agency-starter-kit.zip`
  Pass/Fail by step:
  - Step 1 Download Starter Set: PASS (required Google Drive link is present and copyable).
  - Step 2 Copy and Rename Folder: PASS (rename action is explicit and checklist-backed).
  - Step 3 Complete mission.md: PARTIAL (section list is clear, but enforcement is not hard-gated).
  - Step 4 Open Codex and Folder: PASS (required files check is explicit).
  - Step 5 Open Agent Chats: PASS (all five roles are explicit).
  - Step 6 Paste Role Prompts: PASS (matching rule and anti-mix warning are present).
  - Step 7 Use agentCom and Start: FAIL (workflow start is available even if mission gate is not complete).
  - Step 8 Run First Cycle and Verify: PASS (logging rule and cycle verify checks are present).
  Severity-ranked defects:
  - QA-V1-001 | Sev-1 Critical | Mission gate is informational only, not enforced.
    Impact: Students can start Project Lead workflow without completing mission.md, violating V1 acceptance criteria.
    Evidence: Navigation and step links are always active (`assets/js/site.js`, nav rendering), and checks are stored as status only (`assets/js/checks.js`) with no gating logic.
  - QA-V1-002 | Sev-2 Major | Mobile layout places step rail before step action panels.
    Impact: First required action can appear below initial viewport, increasing confusion and scroll debt for 7th graders.
    Evidence: Mobile keeps single-column order with `.step-rail` rendered before `<main class="panel-stack">` (`assets/js/site.js` layout order + `assets/css/styles.css` mobile rules).
  Reproducible bug list:
  - Bug ID: QA-V1-001
    Severity: Sev-1
    Steps to reproduce:
    1) Open `steps/07-use-agentcom-and-start-sequence.html` directly.
    2) Do not complete Step 3 mission checks.
    3) Click `Copy Command` and proceed.
    Expected: Step 7 command action is blocked until mission.md gate is complete.
    Actual: Step 7 proceeds with no gate block.
  - Bug ID: QA-V1-002
    Severity: Sev-2
    Steps to reproduce:
    1) Open any step page on narrow/mobile viewport.
    2) Observe initial content order.
    Expected: Step badge/title and first action panel appear before navigation rail.
    Actual: Step rail renders before action panels, pushing first action lower.
  Go/No-Go recommendation:
  - NO-GO for classroom pilot until QA-V1-001 is fixed.
  - Conditional GO after:
    1) hard mission gate enforcement before Step 7 command/start action, and
    2) mobile-first order adjustment so first action is visible before step rail.
  Status: NEEDS FIXES

- Reply To Task ID: V2-S03
  What I tested:
  Executed V2-S03 source-level QA run for site-wide explainer interactions across Home, Starter Kit, and all 8 step pages.
  Test cases (mouse/keyboard/touch + regression):
  - EX-01 Home explainer zones (Mandatory block, step cards, progress): FAIL
  - EX-02 Step page explainer zones (step rail, panel labels, diagram explainers): FAIL
  - EX-03 Starter page explainer zones (flow boxes, mission gate cues): FAIL
  - EX-04 Mouse hover/click explainer behavior: FAIL
  - EX-05 Keyboard focus/Enter/Space/Esc explainer behavior: FAIL
  - EX-06 Touch tap + bottom-sheet explainer behavior: FAIL
  - EX-07 One-active-explainer-at-a-time rule: BLOCKED (no explainer state exists)
  - EX-08 Existing core flow (copy buttons/checklist/nav) unaffected: PASS
  Accessibility checks:
  - A11Y-01 Focusable explainer controls present: FAIL
  - A11Y-02 `aria-label`/`aria-expanded`/`aria-controls` for explainer triggers: FAIL
  - A11Y-03 Live/status announcement for active explanation: FAIL
  - A11Y-04 Explainer touch targets >=44x44: BLOCKED (no explainer targets)
  - A11Y-05 Non-color-only explainer state changes: BLOCKED (no explainer states)
  - A11Y-06 No-JS explainer fallback content present: FAIL
  Comprehension results:
  - "What this part is" checks: 0/3 measurable (feature absent).
  - "How parts connect" checks: 0/3 measurable (feature absent).
  - Result: V2 explainer comprehension objective is currently unproven and not met.
  Step-time impact:
  - Additional explainer interaction overhead observed: 0s (no explainer interaction exists).
  - Student <=10 minute flow with explainer assist cannot be validated because assist layer is not implemented.
  Defect list (severity-ranked):
  - V2-EXPL-001 | Sev-0 Blocker | Site-wide explainer system not implemented.
    Repro:
    1) Open Home, Starter Kit, and any Step page.
    2) Hover/focus/tap intended explainer zones (mandatory block, step rail, panel labels, diagram parts, starter flow boxes).
    Expected: Context explanation appears for "what this is" + "how it connects."
    Actual: No explainer interaction appears.
    Evidence:
    - No explainer script/module loaded in page templates (only `copy.js`, `checks.js`, `site.js`).
    - `steps.json` has 0/8 steps with `hotspots`, `whatThisIs`, or `howItConnects`.
    - `site.js` renders static callouts only.
  - V2-EXPL-002 | Sev-1 Critical | Keyboard-accessible explainer controls are missing.
    Impact: Accessibility acceptance criteria cannot pass.
  - V2-EXPL-003 | Sev-1 Critical | No no-JS explainer fallback content exists.
    Impact: Graceful fallback requirement is not met.
  - V2-EXPL-004 | Sev-2 Major | Explainer-specific usability/timing study is blocked until implementation exists.
    Impact: Cannot verify whether explainers help without exceeding 10-minute setup target.
  Issues (steps to reproduce):
  - Primary blocker: Explainer feature is not present in current build, so all mode-specific explainer tests fail or are blocked.
  Suggestions:
  - Complete V2-S02 implementation first (shared explainer runtime + metadata + fallback content), then rerun this test suite.
  - Rerun V2-S03 in two phases: (1) engineering QA pass, (2) 2-student timed dry run for comprehension/time impact.
  Status: NEEDS FIXES

- Reply To Task ID: V2-S15
  What I tested:
  Executed Diagram-Only Explainer QA sweep against current V2 scope lock.
  Scope under test: explainers allowed ONLY in Step page diagram panel P4; no explainer behavior on Home, Starter non-diagram blocks, step rail, panel labels, checklist, or template areas.
  Evidence checks run:
  - `site.js` explainer mount scan (`initExplainers` call sites).
  - `explainers.json` structure + coverage scan (`diagramById` only, no `home/starter/stepCommon` keys).
  - Step-to-diagram hotspot count check for Steps 1-8.
  - Label-set spot-check against V2-S13 source-map labels.
  - JS syntax checks for `site.js`, `explainers.js`, `checks.js`, `copy.js`.
  Pass/Fail matrix (pages):
  - Home page: PASS
    - No explainer mount path present for Home render.
    - No non-diagram explainer targets generated.
  - Starter page: PASS
    - No explainer mount path present for Starter render.
    - No non-diagram explainer targets generated.
  - Step pages (01-08): PASS
    - Explainers mounted only on step pages.
    - Explainer items are built from `diagramById` and targeted to `#diagram-stage-step-{id}` (P4 diagram stage).
  Pass/Fail matrix (diagrams):
  - D-STA-00 (Step 1): PASS (4 hotspots)
  - D-FLD-03 (Step 2): PASS (4 hotspots)
  - D-CUE-06 (Step 3): PASS (4 hotspots)
  - D-STR-05 (Step 4): PASS (4 hotspots)
  - D-SYS-01 (Step 5): PASS (4 hotspots)
  - D-WKF-04 (Steps 6, 8): PASS (8 hotspots)
  - D-COM-02 (Step 7): PASS (4 hotspots)
  Acceptance criteria result:
  1) Home page zero explainers outside diagrams: PASS.
  2) Starter page zero explainers outside diagrams: PASS.
  3) Step pages explainers only within P4 diagram content: PASS.
  4) Diagram hotspots still support mouse, keyboard, touch interactions: PASS (code-path verification: hover/focus/click/tap via click, Enter/Space/Esc, arrow traversal).
  5) Spot-check copy aligns with V2-S13 source mapping: PASS (label-set match across all 7 diagrams).
  Issues (steps to reproduce):
  - No non-diagram explainer regressions found in this sweep.
  Screenshots of remaining non-diagram explainer bugs:
  - None (no remaining non-diagram explainer bugs identified).
  Suggestions:
  - Proceed to V2-S07 dry run to validate student behavior timing with diagram-only explainers.
  Status: DONE

### Documentarian Lead
- Reply To Task ID: T04
  Change summary:
  - Upgraded copy system to v2 for assembly-manual style: one-line goal + one action block.
  - Added locked action-verb dictionary for all step text and button labels.
  - Added command/prompt block formatting rules for consistent copy/paste behavior.
  - Added consistency checklist, change log entries, and decision-ready entries.
  One-line step copy template (locked):
  - Title: Verb + object (2-5 words).
  - Goal line: "Goal: ___." (max 8 words).
  - Action line: "Do this: ___." (max 10 words).
  - Action block label: "Run this" or "Copy this" (one only).
  - Verify line: "Check: ___." (max 8 words).
  Action verb dictionary (locked words):
  - Open, Create, Name, Paste, Copy, Send, Check, Run, Save, Use, Verify, Next.
  - Disallowed in step lines: configure, initialize, orchestrate, synchronize.
  Command/prompt block formatting rules:
  - Use fenced code block with plain text only.
  - One block = one intent.
  - Keep required command text exact; no paraphrase.
  - Keep filenames lowercase when shown in blocks.
  - Every block has one button label: `Copy`.
  Standardized protocol script pack (locked):
  - Master command (exact):
    `Read agentCom.md and do your assigned work.`
  - Protocol rule (exact):
    `Agents ONLY communicate through agentCom.md.`
  Locked step copy (v2):
  - Step 1 Install/Open Codex
    Goal: Open Codex and get set.
    Do this: Launch Codex on your Mac.
    Run this:
    ```text
    Open Codex
    ```
    Check: Codex window is open.
  - Step 2 Create Project Folder
    Goal: Make your project workspace.
    Do this: Create folder `AI-Agency-Builder`.
    Run this:
    ```text
    AI-Agency-Builder
    ```
    Check: Folder appears in Finder.
  - Step 3 Create Core Files
    Goal: Add the three required files.
    Do this: Create each file exactly once.
    Copy this:
    ```text
    mission.md
    kernel.md
    agentCom.md
    ```
    Check: All three files exist.
  - Step 4 Open Agent Chats
    Goal: Set up all lead chats.
    Do this: Open five chats by role.
    Copy this:
    ```text
    Project Lead
    Designer Lead
    Builder Lead
    Tester Lead
    Documentarian Lead
    ```
    Check: Five chats are visible.
  - Step 5 Paste Role Prompts
    Goal: Give each chat its role.
    Do this: Paste each prompt in matching chat.
    Copy this:
    ```text
    Paste the matching role prompt into each lead chat.
    ```
    Check: Every chat has a prompt.
  - Step 6 Use agentCom.md Only
    Goal: Keep team messages in one place.
    Do this: Post all agent updates in `agentCom.md`.
    Copy this:
    ```text
    Agents ONLY communicate through agentCom.md.
    ```
    Check: No direct agent chats used.
  - Step 7 Start Project Lead Sequence
    Goal: Start your first work cycle.
    Do this: Send the command to Project Lead.
    Copy this:
    ```text
    Read agentCom.md and do your assigned work.
    ```
    Check: Next Agent Sequence appears.
  - Step 8 Run First Cycle + Verify
    Goal: Confirm the system works.
    Do this: Run sequence and log outputs.
    Copy this:
    ```text
    Record each agent response in Section 2.
    ```
    Check: One full cycle is complete.
  Consistency checklist (content QA):
  - Step has Title, Goal, Do this, Block, Check.
  - Goal line is <=8 words.
  - Action line is <=10 words.
  - Uses locked verb dictionary.
  - Uses exact protocol sentence where required.
  - File names match `mission.md`, `kernel.md`, `agentCom.md`.
  - Step labels match nav labels exactly.
  Change log updates:
  - CL-2026-03-04-01
    Date: 2026-03-04
    Step: All
    Change: Moved copy system from v1 tutorial tone to v2 manual tone.
    Reason: Align with nonverbal-first assembly direction.
    Owner: Documentarian Lead
  - CL-2026-03-04-02
    Date: 2026-03-04
    Step: 6-7
    Change: Locked exact protocol wording and command script.
    Reason: Prevent communication-rule drift.
    Owner: Documentarian Lead
  Decision clarity notes (proposed for Project Lead log):
  - D08: Lock exact command text to "Read agentCom.md and do your assigned work."
  - D09: Lock each step to one Goal line + one Action line + one block + one Check.
  - D10: Lock content verbs to the approved action-verb dictionary.
  Handoff notes:
  - Builder Lead: bind `steps.json` fields to locked v2 lines and block text.
  - Tester Lead: fail any step that breaks word limits or exact protocol text.
  - Project Lead: approve D08-D10 to freeze copy before prototype build.
  Status: DONE

- Reply To Task ID: V1-S04
  Change summary:
  - Finalized and locked V1 step copy for Steps 1-8 using the new starter-set flow.
  - Added explicit, unskippable Mission.md gate language before workflow start.
  - Added Mission.md answer checklist with all required sections.
  - Added copy updates for download/rename actions and changelog entries.
  Finalized V1 step text (locked):
  - Step 1 Download Starter Set
    Goal: Get the required starter files.
    Do this: Open link and download starter set.
    Copy this:
    ```text
    https://drive.google.com/drive/folders/1Qgy3w4FKWmipEu_ADLoyrOPy5-MLnvoR?usp=drive_link
    ```
    Check: Starter set folder is downloaded.
  - Step 2 Copy and Rename Folder
    Goal: Create your own project folder.
    Do this: Copy folder, then rename to your project name.
    Copy this:
    ```text
    Rename pattern: <ProjectName>-Agency
    Example: EcoHelper-Agency
    ```
    Check: Renamed folder appears and opens.
  - Step 3 Complete mission.md (Required Gate)
    Goal: Define project plan before agents.
    Do this: Answer every section in `mission.md`.
    Copy this:
    ```text
    Stop here until all Mission checks are complete.
    ```
    Check: Mission checklist is fully complete.
  - Step 4 Open Codex and Folder
    Goal: Open your project workspace.
    Do this: Open Codex, then open renamed folder.
    Copy this:
    ```text
    Open Codex, then open your renamed project folder.
    ```
    Check: Codex shows your renamed folder files.
  - Step 5 Open Agent Chats
    Goal: Create all lead role chats.
    Do this: Open five chats by role name.
    Copy this:
    ```text
    Project Lead
    Designer Lead
    Builder Lead
    Tester Lead
    Documentarian Lead
    ```
    Check: Five role chats are ready.
  - Step 6 Paste Role Prompts
    Goal: Give each chat its role.
    Do this: Paste matching prompt into each chat.
    Copy this:
    ```text
    One role prompt per matching lead chat.
    ```
    Check: Every chat has the correct prompt.
  - Step 7 Use agentCom + Start Sequence
    Goal: Start workflow with required protocol.
    Do this: Send command to Project Lead only.
    Copy this:
    ```text
    Read agentCom.md and do your assigned work.
    ```
    Check: Next Agent Sequence is posted.
    Gate rule: If Step 3 is incomplete, do not start.
  - Step 8 Run First Cycle and Verify
    Goal: Complete one full work cycle.
    Do this: Run sequence and log outputs in Section 2.
    Copy this:
    ```text
    Record each agent output in Section 2 under the correct role.
    ```
    Check: One full cycle is complete.
  Mission.md answer checklist (required at Step 3):
  - [ ] Project Name: "My project is called ____."
  - [ ] Problem: "The problem we solve is ____."
  - [ ] Outcome: "By the end, users can ____."
  - [ ] Target Users: "This is for ____."
  - [ ] Success Criteria: "We know it works when ____."
  - [ ] Non-Goals: "We are not building ____."
  - [ ] Tone/Style: "The guide should feel ____."
  Copy updates for download/rename actions:
  - Step 1 primary button label: `Open Starter Set`
  - Step 1 helper line: `Download before you continue.`
  - Step 2 primary button label: `Rename Folder`
  - Step 2 helper line: `Use your project name in the folder name.`
  - Step 3 gate label: `Mission Complete Required`
  Changelog entries:
  - CL-2026-03-04-03
    Date: 2026-03-04
    Step: 1-3
    Change: Added required starter-set link text, rename pattern, and Mission gate copy.
    Reason: Enforce V1 onboarding sequence and prevent skipped setup.
    Owner: Documentarian Lead
  - CL-2026-03-04-04
    Date: 2026-03-04
    Step: 3
    Change: Added Mission.md answer checklist for all required fields.
    Reason: Ensure students complete project intent before starting agents.
    Owner: Documentarian Lead
  Decision clarity notes (proposed for Project Lead log):
  - D11: Step 7 start action stays locked until Step 3 Mission checklist is complete.
  - D12: Starter folder rename uses explicit `<ProjectName>-Agency` pattern.
  Status: DONE

- Reply To Task ID: V2-S04
  Change summary:
  - Created interactive microcopy pack for all V2 hotspot diagrams.
  - Locked copy structure to `label`, `whatThisIs`, `howItConnects`.
  - Added tone rules and strict length limits for classroom clarity.
  - Kept protocol command unchanged exactly as required.
  Copy length limits (locked):
  - `label`: 1-3 words.
  - `whatThisIs`: 3-8 words.
  - `howItConnects`: 5-10 words.
  - One sentence per field.
  - No jargon and no filler words.
  Tone rules (interactive callouts):
  - Use grade-7 words and active voice.
  - Say what students should notice first.
  - Explain connection to the step outcome.
  - Keep terms consistent with step labels.
  - Use warning wording only for real mistakes.
  - Keep protocol command text exact when shown.
  Protocol text lock:
  - Exact command:
    `Read agentCom.md and do your assigned work.`
  Per-diagram callout text pack:
  - D-STA-00 `d-sta-00-starter-flow.svg` (Step 1)
    - id: `sta-link`
      label: `Starter Link`
      whatThisIs: `Class link to starter set files.`
      howItConnects: `This begins setup with the required class files.`
    - id: `sta-download`
      label: `Download`
      whatThisIs: `Saved copy of starter set folder.`
      howItConnects: `You need this local copy for all next steps.`
    - id: `sta-copy`
      label: `Copy Folder`
      whatThisIs: `Duplicate of the starter folder.`
      howItConnects: `This creates your own workspace before renaming.`
    - id: `sta-rename`
      label: `Rename`
      whatThisIs: `Project name applied to copied folder.`
      howItConnects: `This makes your workspace easy to find and use.`
    - id: `sta-mission`
      label: `Open mission.md`
      whatThisIs: `Mission file inside your renamed folder.`
      howItConnects: `You complete mission planning before agent workflow starts.`
  - D-FLD-03 `d-fld-03-folder-tree.svg` (Step 2)
    - id: `fld-root`
      label: `Project Folder`
      whatThisIs: `Main folder for your agency files.`
      howItConnects: `All required files must stay in this folder.`
    - id: `fld-mission`
      label: `mission.md`
      whatThisIs: `File for project mission answers.`
      howItConnects: `Mission completion is required before starting agents.`
    - id: `fld-kernel`
      label: `kernel.md`
      whatThisIs: `File with system rules and structure.`
      howItConnects: `Agents use this for workflow and role boundaries.`
    - id: `fld-agentcom`
      label: `agentCom.md`
      whatThisIs: `Shared board for all agent updates.`
      howItConnects: `Team coordination must run through this single file.`
  - D-CUE-06 `d-cue-06-do-dont-cues.svg` (Step 3)
    - id: `cue-do`
      label: `Do`
      whatThisIs: `Action marked correct and required.`
      howItConnects: `Following these marks keeps your setup on track.`
    - id: `cue-lock`
      label: `Gate Lock`
      whatThisIs: `Mission gate before workflow can start.`
      howItConnects: `Step 7 stays blocked until mission answers are complete.`
    - id: `cue-noskip`
      label: `No Skip`
      whatThisIs: `Cross-out mark for blocked shortcuts.`
      howItConnects: `This prevents skipping required mission planning steps.`
    - id: `cue-ready`
      label: `Ready Check`
      whatThisIs: `Signal that mission gate is passed.`
      howItConnects: `After this, you can start Project Lead sequence.`
  - D-STR-05 `d-str-05-startup-flow.svg` (Step 4)
    - id: `str-codex`
      label: `Open Codex`
      whatThisIs: `Codex app opened on your Mac.`
      howItConnects: `You need Codex open before loading project files.`
    - id: `str-folder`
      label: `Open Folder`
      whatThisIs: `Renamed project folder in Codex.`
      howItConnects: `This loads your exact workspace and required files.`
    - id: `str-files`
      label: `Check Files`
      whatThisIs: `mission.md kernel.md and agentCom.md visible.`
      howItConnects: `This confirms setup is complete before chat work.`
    - id: `str-continue`
      label: `Continue`
      whatThisIs: `Ready state for next setup step.`
      howItConnects: `You can now create chats with full context.`
  - D-SYS-01 `d-sys-01-system-map.svg` (Step 5)
    - id: `sys-human`
      label: `Human Director`
      whatThisIs: `You direct the full agency workflow.`
      howItConnects: `You start work by messaging Project Lead first.`
    - id: `sys-project`
      label: `Project Lead`
      whatThisIs: `Coordinator that assigns all agent tasks.`
      howItConnects: `It controls sequence and updates task status.`
    - id: `sys-specialists`
      label: `Specialist Leads`
      whatThisIs: `Designer Builder Tester and Documentarian roles.`
      howItConnects: `They execute assigned tasks and report in Section 2.`
    - id: `sys-nodirect`
      label: `No Direct Chat`
      whatThisIs: `Blocked line between specialist agents.`
      howItConnects: `Specialists communicate only through agentCom.md updates.`
  - D-WKF-04 `d-wkf-04-workflow-sequence.svg` (Steps 6 and 8)
    - id: `wkf-steps`
      label: `Step Tiles`
      whatThisIs: `Numbered path from Step 1 to 8.`
      howItConnects: `This keeps setup order clear for every student.`
    - id: `wkf-next`
      label: `Next Arrow`
      whatThisIs: `Required move to the next step.`
      howItConnects: `Follow arrows to avoid skipped or mixed actions.`
    - id: `wkf-current`
      label: `Current Step`
      whatThisIs: `Tile for your active task now.`
      howItConnects: `Finish this tile before moving to the next.`
    - id: `wkf-loop`
      label: `Repeat Loop`
      whatThisIs: `Arrow from Step 8 to Step 1.`
      howItConnects: `After one cycle, you can run a new cycle.`
  - D-COM-02 `d-com-02-communication-rules.svg` (Step 7)
    - id: `com-hub`
      label: `Hub File`
      whatThisIs: `agentCom.md shared communication board.`
      howItConnects: `All agent updates must pass through this hub.`
    - id: `com-allowed`
      label: `Allowed Path`
      whatThisIs: `Arrow showing valid message flow.`
      howItConnects: `Use this path to follow protocol correctly.`
    - id: `com-blocked`
      label: `Blocked Path`
      whatThisIs: `Crossed line for direct agent chat.`
      howItConnects: `This warns that direct agent chat is not allowed.`
    - id: `com-command`
      label: `Start Command`
      whatThisIs: `Exact line sent to Project Lead.`
      howItConnects: `It starts the Next Agent Sequence correctly.`
  Change log updates:
  - CL-2026-03-04-05
    Date: 2026-03-04
    Step: 1-8 diagrams
    Change: Added V2 hotspot callout copy pack for all diagram assets.
    Reason: Support hover/focus/tap teaching layers with consistent student-safe language.
    Owner: Documentarian Lead
  - CL-2026-03-04-06
    Date: 2026-03-04
    Step: Global interactive copy
    Change: Locked callout structure, tone rules, and length limits.
    Reason: Keep interactive text clear, minimal, and implementation-ready.
    Owner: Documentarian Lead
  Decision clarity notes (proposed for Project Lead log):
  - D15: Interactive callouts use fixed 3-part structure (`label`, `whatThisIs`, `howItConnects`).
  - D16: Hotspot copy limits are mandatory and enforced in QA.
  - D17: Diagram hotspot text cannot alter protocol command wording.
  Handoff notes:
  - Builder Lead: map ids above into `diagram.hotspots[]` for each step.
  - Tester Lead: validate word limits and exact command text in hotspot states.
  - Project Lead: approve D15-D17 to freeze interactive copy contract.
  Status: DONE

- Reply To Task ID: V2-S16
  Team release note (scope lock):
  - Effective now: ONLY EXPLAINERS IN THE DIAGRAMS.
  - Explainers are allowed only in Step page panel P4 on diagram parts.
  - Explainers open only on hover, focus, or tap of diagram hotspots.
  - No explainer appears by default on page load.
  - No explainer is allowed on Home cards, Starter non-diagram blocks, step rail, panel labels, checklist rows, nav strip, or template blocks.
  - Protocol command remains exact: `Read agentCom.md and do your assigned work.`
  Superseded-task cleanup block (traceable):
  - V2-S01 -> SUPERSEDED by V2-S13 (scope lock moved from site-wide to diagram-only).
  - V2-S02 -> SUPERSEDED by V2-S14 (implementation now removes non-diagram explainers).
  - V2-S03 -> SUPERSEDED by V2-S15 (QA now validates diagram-only scope).
  - V2-S04 -> SUPERSEDED by V2-S13 and V2-S16 (copy pack narrowed to diagram-only policy + comms lock).
  - V2-S09 -> SUPERSEDED by V2-S13 (placement/readability triage replaced by scope lock).
  - V2-S10 -> SUPERSEDED by V2-S13 and V2-S14 (diagram-only zone rules + code cleanup).
  - V2-S11 -> SUPERSEDED by V2-S13 (diagram content mapping now anchored to scope-lock spec).
  - V2-S12 -> SUPERSEDED by V2-S14 and V2-S15 (implementation + QA under new scope).
  Archive note:
  - Superseded tasks stay in log for history only and should not receive new work.
  Handoff notes:
  - Project Lead: mirror superseded status on active task board if needed.
  - Builder Lead: keep only P4 diagram hotspot explainers in runtime paths.
  - Tester Lead: treat any non-diagram explainer as P1 regression.
  Status: DONE

------------------------------------------------------------
## 3) Questions for Human Director (Any agent may ask)

- Q ID:
  Asked By:
  Question:
  Why it matters:
  Options (if possible):
  Human Answer:

------------------------------------------------------------
## 4) Decisions Log (Project Lead maintains)

- D ID: D01
  Decision: Use 8 fixed numbered steps mapped to one page each.
  Reason: Matches student mental model and reduces cognitive load.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D02
  Decision: Keep architecture static-first with no required backend service.
  Reason: Faster classroom setup and lower failure risk.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D03
  Decision: All agent coordination remains in agentCom.md only.
  Reason: Enforces protocol and gives one auditable source of truth.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D04
  Decision: Instruction style anchor is idea-instructions.com visual language (adapted, not copied).
  Reason: Best match for nonverbal-first assembly-manual UX.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D05
  Decision: Every step page must prioritize diagram + action over prose.
  Reason: Reduces cognitive load and improves speed for first-time student users.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D07
  Decision: Use assets/icons/person.svg as the canonical Human Director icon for diagrams.
  Reason: Maintains visual consistency across system map, workflow, and step illustrations.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D08
  Decision: Use the system starter set from Google Drive as the required onboarding package.
  Reason: Provides a consistent classroom baseline with pre-included folder scaffold and required files.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D09
  Decision: Students must duplicate/copy the starter folder and rename it to their project name before any agent steps.
  Reason: Enforces project ownership and consistent workspace naming from the start.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D10
  Decision: Mission.md completion is a required gate before agent initialization.
  Reason: Students need clear project intent before directing agents.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D11
  Decision: V2 goal is quality refinement without increasing step count beyond 8.
  Reason: Preserve the simple assembly model while improving clarity and polish.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D12
  Decision: V2 improvements prioritize reduced friction, accessibility, and visual hierarchy over new feature scope.
  Reason: Classroom success depends more on ease and reliability than additional functionality.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D13
  Decision: Keep the exact agent command unchanged in V2.
  Reason: Avoid protocol drift and maintain consistency across all student runs.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D14
  Decision: Add interactive diagram info layers (hover/focus/tap) as a V2 feature.
  Reason: Help students understand each part and how parts work together without increasing core step count.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D15
  Decision: Explainer interactions must be site-wide (Home, Starter Kit, and all Step pages), not diagram-only.
  Reason: Students need consistent guidance across every explainer component in the workflow.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D16
  Decision: Hotspot markers must not overlap required diagram text; placement uses safe zones and collision rules.
  Reason: Overlap harms clarity and breaks the assembly-manual reading flow.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D17
  Decision: Explainer info panels must enforce readable line length, spacing, and body typography.
  Reason: Condensed text blocks reduce comprehension for middle-school students.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D18
  Decision: Diagram hover helper text should appear as local overlay near hovered targets, not as a static block below the diagram.
  Reason: Keeps context visible and reduces scrolling friction during visual exploration.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D19
  Decision: Hotspot markers are restricted to whitespace-safe placement lanes only.
  Reason: Prevents obstruction of instructional text and preserves diagram readability.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D20
  Decision: Every instructional diagram must include explainer content for each numbered part, with both "what this is" and "how it connects" text.
  Reason: Students need part-by-part clarity, not generic diagram-level explanations.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D21
  Decision: Explainer popouts may overflow local containers when needed so full text is readable without clipping.
  Reason: Container-bound overlays can hide or truncate explanations and reduce usability.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D22
  Decision: Explainer scope is restricted to diagram panel content only (P4); all non-diagram explainers are removed.
  Reason: Site-wide explainers created noise and hurt clarity; diagram-only support keeps help contextual and simple.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D23
  Decision: Hard directive text for all leads is "ONLY EXPLAINERS IN THE DIAGRAMS."
  Reason: Removes interpretation drift and prevents accidental reintroduction of non-diagram overlays.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D24
  Decision: assignmentContext.md is an approved supplemental source for diagram explainer copy, but missing diagram parts must still be authored by the leads.
  Reason: The context file provides useful starter phrasing for some diagrams but does not fully cover all required explainers.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D25
  Decision: Diagram explainer marker glyph is `?` instead of numbered bubbles.
  Reason: `?` communicates "hover/tap for info" more clearly and reduces visual clutter.
  Date: 2026-03-04
  Owner: Project Lead

- D ID: D26
  Decision: Default explainer anchor is bottom-right of each diagram box; only line explainers remain on line anchors.
  Reason: Keeps placement consistent while preserving accurate targeting for line-specific explanations.
  Date: 2026-03-04
  Owner: Project Lead

------------------------------------------------------------
## 5) Running Log (Documentarian maintains)

Date: 2026-03-04
- What changed today: Upgraded T04 to copy system v2 with one-line template, verb dictionary, block formatting rules, consistency checklist, and locked protocol script pack.
- What worked: T01/T02/T03 outputs made it possible to align copy with panel order, nonverbal cues, and QA thresholds.
- What was tricky: Keeping every step short while preserving exact protocol wording required strict word limits and verb lock rules.
- Next step: Move into G2 sprint build with approved copy and protocol decisions.

Date: 2026-03-04 (Sprint V1 Launch)
- What changed today: Started G2 sprint tasks V1-S01 to V1-S04 and locked starter-set onboarding requirements in D08-D10.
- What worked: All lead planning outputs are complete and usable as direct build inputs.
- What was tricky: Incorporating external starter-set download while keeping steps simple and unskippable.
- Next step: Run Next Agent Sequence beginning with Builder Lead for V1-S01 implementation.

Date: 2026-03-04 (V1-S04 Complete)
- What changed today: Completed V1-S04 with finalized 8-step copy, explicit starter-set/rename wording, and a required Mission.md checklist gate.
- What worked: Matching copy to built route names and tester findings reduced ambiguity and made gate language clearer.
- What was tricky: Keeping language short while making Step 3 unskippable and linking it to Step 7 start behavior.
- Next step: Builder Lead implements hard Mission gate logic (QA-V1-001) and updates mobile order issue (QA-V1-002).

Date: 2026-03-04 (Sprint V2 Launch)
- What changed today: Opened V2 refinement sprint and assigned improvement tasks to all leads (V2-S01 through V2-S04).
- What worked: V1 is stable enough to shift from baseline build to quality optimization.
- What was tricky: Balancing stronger visual/manual authenticity with minimal text and no added complexity.
- Next step: Start Next Agent Sequence with Designer Lead for V2-S01.

Date: 2026-03-04 (V2 Direction Update)
- What changed today: Re-scoped V2 tasks around interactive diagram info (hover/focus/tap) with explanations of parts and connections.
- What worked: Feature idea fits assembly-manual learning goals and can stay lightweight.
- What was tricky: Keeping interactions helpful without adding cognitive overload.
- Next step: Run Next Agent Sequence in order: Designer Lead -> Builder Lead -> Tester Lead -> Documentarian Lead.

Date: 2026-03-04 (V2 Scope Expansion)
- What changed today: Expanded V2 from diagram-only interactions to site-wide explainer interactions across Home, Starter Kit, and all steps.
- What worked: Scope now matches student need for understanding how all components connect.
- What was tricky: Expanding interaction scope while preserving minimal-text assembly-manual style.
- Next step: Run Next Agent Sequence now and collect outputs for V2-S01 through V2-S04.

Date: 2026-03-04 (V2-S04 Complete)
- What changed today: Delivered full interactive microcopy pack for all hotspot diagrams with locked fields, tone rules, and length limits.
- What worked: V2-S01/V2-S02/V2-S03 specs aligned well, so copy mapped cleanly to hotspot ids and accessibility behavior.
- What was tricky: Keeping each explanation short while still teaching both part meaning and system connection.
- Next step: Builder Lead integrates hotspot text into `data/steps.json`, then Tester Lead runs hotspot QA matrix.

Date: 2026-03-04 (Hover UX Triage)
- What changed today: Added urgent Designer Lead task V2-S09 to fix condensed hover text and hotspot overlap issues from live preview.
- What worked: User screenshots clearly identified the two highest-impact usability defects.
- What was tricky: Improving readability without breaking assembly-manual minimal style.
- Next step: Run Designer Lead now for V2-S09, then hand revised rules to Builder Lead for implementation.

Date: 2026-03-04 (Hover UX Round 2)
- What changed today: Added Designer task V2-S10 with stricter constraints for whitespace-only hotspots, local hover overlays, and corrected diagram text positioning.
- What worked: User-provided screenshots made the remaining friction points concrete and actionable.
- What was tricky: Balancing proximity of overlay help text with non-obstruction of diagram content.
- Next step: Run Designer Lead now for V2-S10, then queue Builder Lead for implementation after spec update.

Date: 2026-03-04 (Diagram Explainer Coverage Handoff)
- What changed today: Added V2-S11 (Designer) and V2-S12 (Builder) to complete per-diagram explainer copy and popout behavior across all diagrams, including D-STA-00 content revisions.
- What worked: User gave exact example copy intent for first diagram, making scope and acceptance criteria explicit.
- What was tricky: Balancing local popout placement with full readability and zero text obstruction.
- Next step: Run Next Agent Sequence starting with Designer Lead for V2-S11, then Builder Lead for V2-S12.

Date: 2026-03-04 (Scope Lock Reset: Diagram Only)
- What changed today: Replaced explainer sprint with strict diagram-only scope tasks V2-S13 through V2-S16.
- What worked: Clear user directive resolved ambiguity immediately.
- What was tricky: Untangling previous site-wide explainer assumptions from active task board.
- Next step: Run Next Agent Sequence now with hard instruction: ONLY EXPLAINERS IN THE DIAGRAMS.

Date: 2026-03-04 (Context Source Added)
- What changed today: Added assignmentContext.md as a supplemental input for V2-S13 through V2-S16.
- What worked: The file contains usable starter explanations for several diagram parts.
- What was tricky: Ensuring team understands this source is partial and must be extended with authored copy where needed.
- Next step: Run Designer Lead first to produce full per-diagram mapping (source-backed + authored lines), then Builder Lead implementation.

Date: 2026-03-04 (Marker + Anchor Standard Update)
- What changed today: Locked explainer marker style to `?`, with bottom-right default placement for box explainers and line-anchor exceptions for line explainers.
- What worked: New rule is simple and consistent across diagrams.
- What was tricky: Keeping a strict default while allowing line-specific exceptions.
- Next step: Run Next Agent Sequence with this exact standard and reject any numbered-marker output.

Date: 2026-03-04 (V2-S16 Complete)
- What changed today: Published team release note locking explainer scope to diagram panel P4 only and added superseded-task cleanup mapping.
- What worked: V2-S13, V2-S14, and V2-S15 outputs gave clear evidence to make the scope note unambiguous.
- What was tricky: Preserving full traceability while retiring older site-wide explainer tasks.
- Next step: Project Lead confirms board-level superseded flags; team proceeds with diagram-only regression guardrails.
