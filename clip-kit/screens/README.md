# Screens

Windmill's screens redrawn once from the app's code, so a scene copies the markup and CSS
from here instead of re-reading the frontend. Each page is static and self-contained: open
it in a browser to see the screen at 1280×720, at the state a scene usually shows it.

| Page | What it is | Read from (`frontend/src/` on `main`) | Checked at |
|---|---|---|---|
| `workspace-home.html` | Home: sidebar with the Workspace / AI Sessions switch, breadcrumb, kind toggles (All, Scripts, Flows, Apps, Agents), search, New, item rows | `routes/(root)/(logged)/+page.svelte`, `lib/components/home/ItemsList.svelte`, `Item.svelte`, `common/table/Row.svelte`, `RowIcon.svelte`, `routes/(root)/(logged)/+layout.svelte`, `SessionModeSwitch.svelte` | 1.829.0, 2026-10-09 |
| `ai-session.html` | An AI session in split view: chat (prompt, tool rows, AI text, test-run confirm, changes bar, composer) and the preview panel with a flow tab | `routes/(root)/(logged)/sessions/+page.svelte`, `SessionWrapper.svelte`, `AIChatInput.svelte`, `AIChatMessage.svelte`, `SessionChangesBar.svelte`, `ToolPreviewCard.svelte`, `SessionWorkspaceBar.svelte` | `92af345d05`, 2026-10-09 |
| `runs.html` | Runs: breadcrumb, status toggles, Filter runs..., Latest runs, the Duration scatter (log scale), the job list with day separators | `lib/components/RunsPage.svelte`, `RunChart.svelte`, `runs/RunsTable.svelte`, `runs/RunRow.svelte`, `runs/runs-grid.css`, `runs/JobStatusIcon.svelte` | `92af345d05`, 2026-10-09 |
| `flow-graph.html` | A flow's steps as the flow editor draws them (node 275×34, radius 6, Input/Result `#dce0f1`, edges `#b1b1b7`), with run panels beside each step | `lib/components/graph/` | 2026-10-09 |
| `app.html` | A full-code app a user would build (support desk: a ticket, a drafted reply, Draft reply / Send) | not a Windmill screen | — |
| `session-review.html` | An AI session's review: the Edits chip (`3 drafts`), its popover (Edited this session, Draft badges, the Review & deploy diff button), the diff drawer (Edited during session, side-by-side diff, Deploy) and a pull request opened by git sync when a fork's items are deployed. Popover and drawer shown together; the PR card is a clip device | `lib/components/sessions/SessionChangesBar.svelte`, `SessionDiffDrawer.svelte`, `WorkspaceDiffDrawer.svelte`, `sessionDeployModel.ts`; the PR: `backend/windmill-worker/src/result_processor.rs` (git sync, `fork_open_prs`, EE) | 2026-10-20 |
| `session-context.html` | An AI session building in its fork ("Acting on wm-fork-nadia"): the request, the session's own "Read folder instructions · write_script held until read" and `Read skill "retry-payments"` rows, the tool rows and the flow it wrote | `lib/components/copilot/chat/shared.ts`, `folderInstructions.ts`, `global/core.ts` (`read_skill`), `ToolExecutionDisplay.svelte` | 2026-10-21 |
| `folders.html` | Folders, a folder's editor drawer open (Summary, Members, the Viewer / Writer / Admin role per member) and its "Add member" popover (User or group, Role, Add). A non-admin only sees the folders shared with them | `routes/(root)/(logged)/folders/+page.svelte`, `lib/components/FolderEditor.svelte`; `backend/windmill-api-groups/src/folders.rs` | 2026-10-21 |
| `resources.html` | Resources, Workspace tab: integrations, databases, MCP connections (`mcp`), skills (`ai_skill`) and folder instructions (`ai_instruction`), each a resource of its folder | `lib/components/resources/ResourcesList.svelte`, `copilot/chat/skills/skillResources.ts`, `folderInstructions.ts`, `AssistantMcpSection.svelte` | 2026-10-21 |
| `session-terminal.html` | `wmill init` writing `AGENTS.md`, `CLAUDE.md`, `.claude/skills/` and `.agents/skills/` (Codex), then Claude Code doing the same request as a session beside it | `cli/src/guidance/writer.ts`, `system_prompts/README.md` | 2026-10-20 |
| `parts.html` | Small pieces: a support ticket, a Slack message, the agent card and its tool chips (with their resource's logo), script cards with the resource they use | agent card from the AI agent editor; the rest are clip devices | 2026-10-09 |

## Using a screen in a scene

- Copy the screen's CSS block and markup into the scene, under the scene's camera. The
  pages share the kit's `icons.js` (product and language logos, through `data-icon`) and
  inline the lucide symbols they use.
- Each page ends its `<style>` with the state it shows (for example the session in split
  view, the run done). A scene sets those states with its timeline instead.
- Things the app draws that a page leaves out on purpose, to keep the shot readable, are
  noted in the page's top comment (for example the Runs page's Tag column, which the app
  itself drops under 700 px).

## Keeping them true

Before reusing a screen, check whether its source files changed on `main` since the date
in the table (`git log --since=<date> origin/main -- <files>`). Re-read the code only if they
did, update the page, and the date here.

Liberties a scene took with a screen are written in the page's top comment, so the next
scene knows which details are the app's and which are the video's.
