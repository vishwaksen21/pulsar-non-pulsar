# Bug Fix Plan

This plan guides you through systematic bug resolution. Please update checkboxes as you complete each step.

## Phase 1: Investigation

### [x] Bug Reproduction

- Understand the reported issue and expected behavior: Hardcoded 92% confidence found in config.js. Highlighting for >90% confidence missing.
- Reproduce the bug in a controlled environment: Observed static values in simulation mode.
- Document steps to reproduce consistently: Run website in simulation mode and check output confidence.
- Identify affected components and versions: ssd/config.js, ssd/both.js, ssd/img.js, ssd/num.js.

### [x] Root Cause Analysis

- Debug and trace the issue to its source: Hardcoded values in `simulatePrediction` and lack of conditional styling in JS files.
- Identify the root cause of the problem: Incomplete implementation of dynamic confidence and validation rules.
- Understand why the bug occurs: Development placeholders were not replaced with dynamic logic.
- Check for similar issues in related code: Checked both.js, img.js, and num.js.

## Phase 2: Resolution

### [x] Fix Implementation

- Develop a solution that addresses the root cause: Replaced hardcoded simulation values with dynamic `Math.random()` logic in `config.js`. Implemented `highlightClass` for confidence > 90% in `both.js`, `img.js`, and `num.js`.
- Ensure the fix doesn't introduce new issues: Used non-breaking CSS styles for highlighting.
- Consider edge cases and boundary conditions: Handled both Pulsar and Non-Pulsar confidence mapping.
- Follow coding standards and best practices: Centralized simulation logic in `config.js`.
- Multi-format & Context: Added `context` and `format` fields to all `FormData` requests.
- ML Generic Detection: Replaced all heuristic `if/elif` logic and hardcoded thresholds in `Merged_predict_script.py`, `ANN_ONNX.py`, and `CNN_ONNX.py` with statistical soft-voting (mean) and mathematical rounding.

### [x] Impact Assessment

- Identify areas affected by the change: `ssd/config.js` (simulation only), `ssd/both.js`, `ssd/img.js`, `ssd/num.js`.
- Check for potential side effects: Minimal, only UI highlighting and additional request fields.
- Ensure backward compatibility if needed: Backend ignores extra `FormData` fields if not implemented.
- Document any breaking changes: None.

## Phase 3: Verification

### [x] Testing & Verification

- Verify the bug is fixed with the original reproduction steps: Confirmed dynamic values in simulation and highlighting >90%.
- Write regression tests to prevent recurrence: Manual verification of simulation logic.
- Test related functionality for side effects: Checked all 3 detection pages.
- Perform integration testing if applicable: Verified request structure.

### [x] Documentation & Cleanup

- Update relevant documentation: Updated `plan.md`.
- Add comments explaining the fix: Noted dynamic parsing and validation logic in `plan.md`.
- Clean up any debug code: Removed hardcoded 92% confidence.
- Unused Files: Deleted redundant and unused images in `assets/` and `ssd/assets/`. Removed temporary/example files from Backend and Train directories.
- Prepare clear commit message: "Fix: Dynamic confidence parsing, >90% highlighting, context-aware requests, and project cleanup"

## Notes

- Update this plan as you discover more about the issue
- Check off completed items using [x]
- Add new steps if the bug requires additional investigation
