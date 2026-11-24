// The AI Sessions tutorials playlist: one entry per video (its title lines, the phrase
// in Windmill blue, and the illustration on the right, in 580×520 px).
import { ic, BLUE, at, card, sk, M, pill, bub, node, row, toggle } from "./parts.mjs";

const LESSONS = ["Build a flow by chatting", "Deploy what the AI built", "Build an app with a backend", "Plan, Ask or Yolo", "Add files, @mentions, skills", "Act with your permissions", "Test drafts in the preview", "Resume a past session", "Share an artifact by link"];
export default {
  // the playlist image (square), then a 16:9 version of it
  cover: { title: ["AI Sessions", "tutorials"], accent: "tutorials", lessons: LESSONS },
  playlist: { title: ["AI Sessions", "tutorials"], accent: "tutorials", art:
    card(10, 10, 560, 500, LESSONS.map((t, k) => `<div style="display:flex;align-items:center;gap:20px;height:62px;padding:0 28px;${k === 0 ? "background:#eff6ff;" : ""}border-bottom:1px solid #f1f2f4"><span style="${M};font-size:19px;width:26px;color:${k === 0 ? BLUE : "#9ca3af"}">${k + 1}</span><span style="font-size:23px;font-weight:500;color:${k === 0 ? "#1e40af" : "#111827"}">${t}</span></div>`).join(""),
      "overflow:hidden;-webkit-mask-image:linear-gradient(to bottom,#000 72%,transparent 100%)") },
  team: { title: ["AI Sessions", "in Windmill"], accent: "in Windmill", art:
    card(20, 40, 540, 200, `<div style="padding:28px;display:flex;flex-direction:column;gap:14px">${bub("Fetch this week's deals", 1)}${bub("42 deals from Salesforce.", 0)}</div>`)
    + card(60, 290, 480, 160, `<div style="padding:30px 32px;display:flex;flex-direction:column;gap:16px"><span style="${M};font-size:17px;letter-spacing:.06em;color:#6b7280">SALESFORCE_TOKEN</span><div style="display:flex;align-items:center"><span style="font-size:34px;letter-spacing:.12em;color:#111827;line-height:1">••••••••••••</span><span style="flex:1"></span>${pill(ic("lock", "#374151", 16) + "Admins only", "#f3f4f6", "#374151")}</div></div>`) },
  motion: { title: ["Introducing", "AI Sessions"], accent: "AI Sessions", art:
    card(20, 80, 540, 380, `<div style="padding:30px;display:flex;flex-direction:column;gap:22px">${bub("Post weekly sales to #sales every Monday", 1)}
      <div style="display:flex;flex-direction:column;border:1px solid #eef0f3;border-radius:14px">${[["fetch_sales", "script"], ["weekly_report", "flow"], ["mondays_9am", "schedule"]].map(([n, k], i) => `<div style="display:flex;align-items:center;gap:14px;height:72px;padding:0 22px;${i < 2 ? "border-bottom:1px solid #f1f2f4" : ""}"><span style="${M};font-size:21px;color:#111827">${n}</span><span style="font-size:18px;color:#9ca3af">${k}</span><span style="flex:1"></span>${pill("Draft", "#dbeafe", "#1e40af", 16)}</div>`).join("")}</div></div>`) },
  build: { title: ["Build a flow", "by chatting", "with the AI"], accent: "Build a flow", art:
    `<svg style="position:absolute;left:0;top:0" width="580" height="520"><path d="M290 124 V 172 M290 236 V 284 M290 348 V 396" stroke="#cbd5e1" stroke-width="2"/></svg>`
    + node(110, 60, 360, "Input", "", "#eef0f6") + node(110, 172, 360, "fetch_refunds", "a") + node(110, 284, 360, "summarize", "b") + node(110, 396, 360, "post_to_slack", "c") },
  deploy: { title: ["Deploy what", "the AI built"], accent: "Deploy", art:
    `<svg style="position:absolute;left:0;top:0" width="580" height="520"><path d="M70 260 H 290" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="8 8"/><path d="M290 260 H 510" stroke="${BLUE}" stroke-width="3"/>
      <circle cx="70" cy="260" r="17" fill="#f8f9fb" stroke="#9ca3af" stroke-width="3"/><circle cx="290" cy="260" r="17" fill="${BLUE}"/><circle cx="510" cy="260" r="22" fill="#16a34a"/><path d="M500 260 l7 7 l13 -14" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    + [[70, "draft", "AI session"], [290, "review", "you approve"], [510, "production", "live"]].map(([x, t, s]) => at(x - 110, 182, `<span style="font-size:19px;color:#9ca3af">${s}</span>`, "width:220px;text-align:center") + at(x - 110, 304, `<span style="${M};font-size:23px;color:#111827">${t}</span>`, "width:220px;text-align:center")).join("") },
  app: { title: ["Build an app", "with a backend"], accent: "Build an app", art:
    card(20, 30, 540, 450, `<div style="height:58px;border-bottom:1px solid #eef0f3;display:flex;gap:9px;align-items:center;padding:0 24px">${'<i style="width:12px;height:12px;border-radius:50%;background:#e5e7eb;display:block"></i>'.repeat(3)}</div>
      <div style="padding:26px 30px 8px;font-size:26px;font-weight:600;letter-spacing:-.01em">Expense reports</div>
      ${[0, 1, 2].map((k) => `<div style="display:flex;align-items:center;gap:20px;height:108px;padding:0 30px;${k < 2 ? "border-bottom:1px solid #f1f2f4" : ""}"><div style="display:flex;flex-direction:column;gap:12px">${sk([170, 140, 190][k], 14, "#d1d5db")}${sk([100, 120, 80][k], 12)}</div><span style="flex:1"></span>${k === 0 ? pill("Approved", "#dcfce7", "#166534", 18) : `<span style="height:44px;padding:0 20px;border-radius:10px;background:${BLUE};color:#fff;font-size:19px;font-weight:600;display:inline-flex;align-items:center">Approve</span>`}</div>`).join("")}`) },
  autonomy: { title: ["Plan, Ask", "or Yolo:", "pick a mode"], accent: "pick a mode", art:
    at(0, 170, `<div style="width:580px;height:120px;border-radius:24px;background:#eceef2;padding:9px;display:flex;gap:8px">${["Plan", "Ask", "Yolo"].map((t, k) => `<div style="flex:1;border-radius:17px;display:grid;place-items:center;font-size:32px;font-weight:600;letter-spacing:-.01em;${k === 1 ? `background:#fff;color:${BLUE};box-shadow:0 10px 26px -16px rgba(17,24,39,.4)` : "color:#6b7280"}">${t}</div>`).join("")}</div>`)
    + at(0, 316, `<div style="width:580px;display:flex">${["reads only", "asks first", "just does it"].map((t) => `<div style="flex:1;text-align:center;font-size:20px;color:#9ca3af">${t}</div>`).join("")}</div>`) },
  sources: { title: ["Add files,", "@mentions", "and skills"], accent: "@mentions", art:
    card(40, 40, 230, 170, `<div style="padding:18px;display:flex;flex-direction:column;gap:10px;height:100%"><div style="height:16px;border-radius:5px;background:#e5e7eb;width:80px"></div><div style="flex:1;border-radius:10px;background:#eff6ff;display:flex;align-items:flex-end;gap:10px;padding:14px">${[40, 70, 55, 90].map((h) => `<i style="display:block;flex:1;height:${h}%;border-radius:4px;background:#93c5fd"></i>`).join("")}</div></div>`, "transform:rotate(-4deg)")
    + at(300, 70, pill("@refunds_report", "#fff", "#1e40af", 21), "box-shadow:0 0 0 1px #e5e7eb,0 10px 24px -16px rgba(17,24,39,.35);border-radius:10px")
    + at(330, 150, pill("skill · slack-style", "#fff", "#374151", 21), "box-shadow:0 0 0 1px #e5e7eb,0 10px 24px -16px rgba(17,24,39,.35);border-radius:10px")
    + card(20, 290, 540, 150, `<div style="padding:26px 28px;display:flex;flex-direction:column;gap:18px"><div style="display:flex;gap:10px">${pill("screenshot.png", "#f3f4f6", "#374151", 17)}${pill("@refunds_report", "#dbeafe", "#1e40af", 17)}</div><div style="font-size:24px;color:#111827">Match this design<span style="display:inline-block;width:2px;height:26px;background:${BLUE};vertical-align:-4px;margin-left:3px"></span></div></div>`) },
  context: { title: ["The AI acts", "with your", "permissions"], accent: "permissions", art:
    card(20, 80, 540, 360, [["f/finance/", "Write", "#dcfce7", "#166534", "#111827"], ["u/marc/", "Write", "#dcfce7", "#166534", "#111827"], ["f/hr/", ic("lock", "#6b7280", 16) + "No access", "#f3f4f6", "#4b5563", "#9ca3af"]].map(([p, t, b, f, c], k) => `<div style="height:120px">${row(`<span style="${M};font-size:26px;color:${c}">${p}</span><span style="flex:1"></span>${pill(t, b, f, 19)}`, k === 2)}</div>`).join("")) },
  preview: { title: ["Test drafts", "in the", "preview panel"], accent: "Test drafts", art:
    card(0, 40, 580, 430, `<div style="display:flex;height:100%"><div style="width:210px;border-right:1px solid #eef0f3;background:#fafbfc;border-radius:22px 0 0 22px;padding:30px 22px;display:flex;flex-direction:column;gap:16px">
      <div style="align-self:flex-end;width:140px;height:50px;border-radius:16px 16px 6px 16px;background:${BLUE}"></div>
      <div style="width:160px;height:84px;border-radius:16px 16px 16px 6px;background:#f1f2f5;padding:20px;display:flex;flex-direction:column;gap:12px">${sk(110, 12, "#d1d5db")}${sk(80, 12, "#d1d5db")}</div>
      <div style="align-self:flex-end;width:110px;height:50px;border-radius:16px 16px 6px 16px;background:${BLUE}"></div></div>
      <div style="flex:1;padding:32px 34px;display:flex;flex-direction:column;gap:26px"><div style="font-size:24px;font-weight:600;letter-spacing:-.01em">Refunds this week</div>
      <div style="flex:1;display:flex;align-items:flex-end;gap:18px;padding:0 6px;border-bottom:2px solid #e5e7eb">${[90, 150, 120, 200, 170, 230].map((h, k) => `<div style="flex:1;height:${h}px;border-radius:7px 7px 0 0;background:${k === 5 ? BLUE : "#bfdbfe"}"></div>`).join("")}</div></div></div>`) },
  resume: { title: ["Resume", "a past session"], accent: "Resume", art:
    card(90, 30, 400, 300, "", "opacity:.5")
    + card(60, 70, 460, 320, "", "opacity:.8")
    + card(30, 115, 520, 350, `<div style="padding:36px;display:flex;flex-direction:column;height:100%"><div style="font-size:28px;font-weight:600;letter-spacing:-.01em">Refunds to #finance</div><div style="font-size:19px;color:#9ca3af;margin-top:8px">2 days ago</div>
      <div style="display:flex;flex-direction:column;gap:16px;margin-top:30px">${sk(420, 14)}${sk(330, 14)}</div><span style="flex:1"></span><div style="display:flex;justify-content:flex-end"><span style="height:52px;padding:0 24px;border-radius:12px;background:${BLUE};color:#fff;font-size:21px;font-weight:600;display:inline-flex;align-items:center">Continue</span></div></div>`) },
  share: { title: ["Share", "an artifact", "by link"], accent: "Share", art:
    card(20, 30, 340, 420, `<div style="padding:36px 34px;display:flex;flex-direction:column;gap:18px"><div style="font-size:26px;font-weight:600;letter-spacing:-.01em;margin-bottom:8px">Refunds spec</div>${[260, 240, 270, 190, 250, 220, 150].map((w) => sk(w, 12)).join("")}</div>`)
    + card(170, 320, 410, 110, `<div style="display:flex;align-items:center;gap:14px;height:100%;padding:0 18px 0 26px"><span style="${M};font-size:20px;color:#111827">windmill.dev/a/7Kq2xW</span><span style="flex:1"></span><span style="height:46px;padding:0 18px;border-radius:10px;background:${BLUE};color:#fff;font-size:19px;font-weight:600;display:inline-flex;align-items:center">Copy</span></div>`) },
  admin: { title: ["Configure", "AI Sessions", "as an admin"], accent: "Configure", art:
    card(20, 80, 540, 360, [
      ["Custom system prompts", `<span style="height:44px;padding:0 18px;border-radius:10px;border:1px solid #e5e7eb;font-size:19px;font-weight:600;color:#1f2937;display:inline-flex;align-items:center">Configure</span>`],
      ["Hide AI sessions", toggle(0)],
      ["AI session retention", `<span style="${M};font-size:20px;padding:8px 14px;border:1px solid #e5e7eb;border-radius:9px;color:#111827">90</span><span style="font-size:19px;color:#9ca3af">days</span>`],
    ].map(([t, c], k) => `<div style="height:120px">${row(`<span style="font-size:25px;font-weight:500;color:#111827">${t}</span><span style="flex:1"></span>${c}`, k === 2)}</div>`).join("")) },
  debug: { title: ["Fix a", "failed run", "with AI"], accent: "Fix", art:
    card(20, 75, 540, 366, `<div style="height:104px">${row(`<i style="width:14px;height:14px;border-radius:50%;background:#dc2626;display:block"></i><span style="${M};font-size:23px">run 1042</span><span style="flex:1"></span>${pill("Failed", "#fee2e2", "#991b1b", 18)}`)}</div>
      <div style="margin:26px 30px;border:1px solid #eef0f3;border-radius:12px;overflow:hidden;${M};font-size:19px;line-height:52px"><div style="background:#fef2f2;color:#991b1b;padding:0 18px">- total += inv.amount.value</div><div style="background:#f0fdf4;color:#166534;padding:0 18px">+ total += inv.amount?.value ?? 0</div></div>
      <div style="height:104px;border-top:1px solid #f1f2f4">${row(`<i style="width:14px;height:14px;border-radius:50%;background:#16a34a;display:block"></i><span style="${M};font-size:23px">run 1043</span><span style="flex:1"></span>${pill("Success", "#dcfce7", "#166534", 18)}`, 1)}</div>`) },
};
