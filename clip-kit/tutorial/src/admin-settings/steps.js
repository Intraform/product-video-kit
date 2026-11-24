    gsap.set("#sideW .nv", { className: "nv" });
    const camOn = (sel, s, t, d = 0.7, dx = 0, dy = 0) => tl.to("#cam", { x: () => 640 - s * (at(sel).cx + dx), y: () => 380 - s * (at(sel).cy + dy), scale: s, duration: d, ease: MOVE }, t);
    const dia = (id, t0, t1) => { camReset(t0 - 0.6, 0.45); tl.fromTo(id, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.45, immediateRender: false }, t0); tl.to(id, { opacity: 0, duration: 0.4 }, t1); };

    // 1. workspace settings, Windmill AI
    stepTo(1, "Windmill AI settings", L1 + 0.3);
    near("#tAI", -40, 80, L1 + 1.2);
    click("#tAI", L1 + 3.4);
    tl.set("#tAI", { className: "on" }, L1 + 3.55);
    tl.to("#bOther", { opacity: 0, duration: 0.2 }, L1 + 3.55); tl.to("#bAI", { opacity: 1, duration: 0.3 }, L1 + 3.6);
    tl.set("#bOther", { display: "none" }, L1 + 3.8);

    // 2. custom system prompts: your team's rules in every session
    stepTo(2, "Custom system prompts", L2 - 0.3);
    click("#bCfg", L2 + 0.6);
    tl.fromTo("#pmod", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, L2 + 0.75);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L2 + 0.9);
    camOn("#ta2", 1.55, L2 + 1.2, 0.7, 0, 0);
    tl.to("#ph2", { opacity: 0, duration: 0.1 }, L2 + 1.9);
    tl.set("#ph2", { display: "none" }, L2 + 2.0);
    const p = type("#pt", "Use zod and date-fns in TypeScript scripts.\nWrite new items under f/<team>/, never u/.\nPost to Slack with $res:f/ops/slack.", L2 + 2.0, 0.028, 640);
    tl.to("#pmod", { opacity: 0, duration: 0.3 }, L3 - 2.1);
    camReset(L3 - 2.1, 0.6);

    // 3. backups and retention
    stepTo(3, "Backups and retention", L3 - 0.3);
    camOn("#cB .tg", 1.5, L3 + 1.1, 0.6, 170, 30);
    ring("#cB .tg", L3 + 1.8, 1.9);
    tl.set("#retV", { textContent: "90", color: "#1d2430" }, L3 + 4.0);
    ring("#ret", L3 + 4.0, 2.0);
    camReset(L3 + 6.4, 0.6);

    // 4. hide AI sessions: every AI button goes, AI steps in flows stay
    stepTo(4, "Hide AI sessions", L4 - 0.3);
    near("#tgHi", 60, 50, L4 - 0.2);
    click("#tgHi", L4 + 0.6);
    tl.set("#tgHi", { backgroundColor: "#2c5beb" }, L4 + 0.7); tl.to("#tgHb", { left: 15, duration: 0.15 }, L4 + 0.7);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L4 + 1.1);
    tl.to("#sideW .nv", { opacity: 1, duration: 0.01 }, L4 + 0.8);
    dia("#dHide", L4 + 2.0, DURATION - 2.9);
