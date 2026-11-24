// The pieces a thumbnail illustration is drawn with: product elements (cards, chat
// bubbles, flow nodes, mono paths, pills, toggles), never icon tiles or sparkles.
// Lucide icon paths, for the few functional icons (a lock on a pill, a check).
export const I = {
  code: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
  flow: '<path d="M3 6h11"/><path d="M8 12h13"/><path d="M3 18h11"/>',
  app: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  cal: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  key: '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  spark: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2Z"/><path d="M19 2v4M17 4h4"/>',
  up: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  reply: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  clip: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  plug: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  msgs: '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  gear: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
};
export const ic = (n, c = "currentColor", s = 24, w = 2) => `<svg viewBox="0 0 24 24" style="width:${s}px;height:${s}px;flex:none;fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round">${I[n]}</svg>`;
export const BLUE = "#2563eb";
export const at = (x, y, inner, st = "") => `<div style="position:absolute;left:${x}px;top:${y}px;${st}">${inner}</div>`;
export const card = (x, y, w, h, inner, st = "") => at(x, y, inner, `width:${w}px;height:${h}px;background:#fff;border:1px solid #e5e7eb;border-radius:22px;box-shadow:0 30px 60px -36px rgba(17,24,39,.35);${st}`);
export const sk = (w, h = 14, c = "#e5e7eb") => `<div style="width:${w}px;height:${h}px;border-radius:${h / 2}px;background:${c};flex:none"></div>`;
export const M = "font-family:'JetBrains Mono',monospace";
export const pill = (t, bg, fg, s = 18) => `<span style="display:inline-flex;align-items:center;gap:6px;height:${Math.round(s * 1.8)}px;padding:0 ${Math.round(s * 0.7)}px;border-radius:${Math.round(s * 0.45)}px;background:${bg};color:${fg};font-size:${s}px;font-weight:600;flex:none">${t}</span>`;
export const bub = (t, me, s = 22) => `<div style="align-self:${me ? "flex-end" : "flex-start"};max-width:400px;padding:14px 20px;border-radius:18px;${me ? `border-bottom-right-radius:6px;background:${BLUE};color:#fff` : "border-bottom-left-radius:6px;background:#f1f2f5;color:#111827"};font-size:${s}px;line-height:1.35">${t}</div>`;
export const node = (x, y, w, t, k, fill = "#fff") => at(x, y, `<span style="${M};font-size:21px;color:#111827">${t}</span>${k ? `<span style="position:absolute;right:16px;${M};font-size:15px;color:#6b7280;background:#eef0f6;border-radius:6px;padding:2px 8px">${k}</span>` : ""}`, `width:${w}px;height:64px;border-radius:12px;background:${fill};border:1px solid #e5e7eb;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px -18px rgba(17,24,39,.35)`);
export const row = (inner, last) => `<div style="display:flex;align-items:center;gap:16px;padding:0 30px;height:100%;${last ? "" : "border-bottom:1px solid #f1f2f4"}">${inner}</div>`;
export const toggle = (on) => `<div style="width:64px;height:36px;border-radius:18px;background:${on ? BLUE : "#d1d5db"};position:relative;flex:none"><i style="position:absolute;top:4px;left:${on ? 32 : 4}px;width:28px;height:28px;border-radius:50%;background:#fff;display:block"></i></div>`;
