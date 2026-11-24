    gsap.set("#sideW", { opacity: 0 }); gsap.set("#sideS", { opacity: 1 });
    const PROMPT = "Every morning, post yesterday's Stripe refunds to #finance, and build an app to browse them.";
    q("#um").textContent = PROMPT;
    const VIEWS = ["#empty", "#vS", "#vF", "#vA", "#vP"], TABS = ["#tbS", "#tbF", "#tbA", "#tbP"];
    const showTab = (tb, view, t) => {
      tl.set(tb, { display: "flex" }, t);
      TABS.filter((x) => x !== tb).forEach((x) => tl.set(x, { className: "tab off" }, t));
      tl.set(tb, { className: "tab" }, t);
      tl.to(VIEWS.filter((x) => x !== view), { opacity: 0, duration: 0.2 }, t);
      tl.to(view, { opacity: 1, duration: 0.3 }, t + 0.05);
    };
    const dia = (id, t0, t1) => { camReset(t0 - 0.6, 0.45); tl.fromTo(id, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.45, immediateRender: false }, t0); tl.to(id, { opacity: 0, duration: 0.4 }, t1); };
    const appState = (code, t) => { tl.set("#sgC", { className: code ? "on" : "" }, t); tl.set("#sgP", { className: code ? "" : "on" }, t); tl.set("#aCode", { opacity: code ? 1 : 0 }, t); tl.set("#aPrev", { opacity: code ? 0 : 1 }, t); };

    // 0. the result first: the script's code, the flow's graph, the app running
    gsap.set(["#um", "#r1", "#r2", "#r3", "#r4", "#cbar"], { opacity: 1 });
    gsap.set(["#tbS", "#tbF", "#tbA"], { display: "flex" }); gsap.set("#empty", { opacity: 0 }); gsap.set("#vS", { opacity: 1 });
    gsap.set(["#tbF", "#tbA"], { className: "tab off" });
    gsap.set(["#aCode"], { opacity: 0 }); gsap.set("#aPrev", { opacity: 1 }); gsap.set("#sgC", { className: "" }); gsap.set("#sgP", { className: "on" });
    showTab("#tbF", "#vF", L1 + 3.0);
    showTab("#tbA", "#vA", L1 + 6.4);
    // back to an empty session
    tl.to(["#um", "#r1", "#r2", "#r3", "#r4", "#cbar", "#vA"], { opacity: 0, duration: 0.35 }, L2 - 0.9);
    tl.set(["#tbS", "#tbF", "#tbA"], { display: "none" }, L2 - 0.55);
    appState(true, L2 - 0.55);
    tl.to("#empty", { opacity: 1, duration: 0.3 }, L2 - 0.5);
    camReset(L2 - 0.9, 0.7);

    // 1. one message
    stepTo(1, "One message", L2 - 0.6);
    const rComp = R("#comp");
    cam(rComp.cx + 40, rComp.cy - 70, 1.5, L2 - 0.2);
    tl.to("#ph", { opacity: 0, duration: 0.15 }, L2 + 0.4);
    const typed = type("#ptext", PROMPT, L2 + 0.45, 0.033, 330);
    near("#bSend", 60, 50, typed - 0.7);
    click("#bSend", typed + 0.25);
    tl.to("#ptext", { opacity: 0, duration: 0.15 }, typed + 0.4);
    tl.to("#ph", { opacity: 1, duration: 0.3 }, typed + 0.7);
    show("#um", typed + 0.4, { y: 16 });
    cue("send", typed + 0.4, { x: 330 });
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, typed + 0.55);
    camReset(typed + 0.55, 0.7);

    // 2. the script: more than twenty languages, then TypeScript
    stepTo(2, "The script", L3 - 0.3);
    show("#r1", L3 + 0.2, { y: 6 }); cue("pop", L3 + 0.2, { x: 300 });
    near("#c1", -60, 60, L3 + 0.3);
    click("#c1", L3 + 1.1);
    showTab("#tbS", "#vS", L3 + 1.3);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L3 + 1.5);
    tl.fromTo("#langs", { opacity: 0 }, { opacity: 1, duration: 0.35, immediateRender: false }, L3 + 1.9);
    tl.fromTo("#langs .lg2", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, immediateRender: false }, L3 + 2.0);
    [["#lg-bun", 4.4], ["#lg-python3", 5.2], ["#lg-go", 5.9], ["#lg-postgresql", 6.6], ["#lg-bash", 7.2]].forEach(([l, d]) => ring(l, L3 + d, 0.6));
    tl.to("#langs", { opacity: 0, duration: 0.35 }, L4 - 0.2);
    cam(860, 250, 1.35, L4 + 0.6, 0.9);
    ring("#sig", L4 + 2.0, 3.0);
    camReset(L5 - 0.6, 0.7);

    // 3. the flow: its graph first, then its YAML
    stepTo(3, "The flow", L5 - 0.3);
    show("#r2", L5 + 0.2, { y: 6 }); cue("pop", L5 + 0.2, { x: 300 });
    near("#c2", -60, 60, L5 + 0.3);
    click("#c2", L5 + 1.1);
    showTab("#tbF", "#vF", L5 + 1.3);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L5 + 1.5);
    ring("#gA", L5 + 3.4, 0.9); ring("#gB", L5 + 4.3, 0.9);
    near("#fMenuB", 30, 60, L5 + 4.7);
    click("#fMenuB", L5 + 5.4);
    show("#fMenu", L5 + 5.55, { y: 4, d: 0.2 });
    click("#miYaml", L5 + 6.2);
    tl.to("#fMenu", { opacity: 0, duration: 0.15 }, L5 + 6.35);
    tl.fromTo("#fY", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", immediateRender: false }, L5 + 6.35);
    cue("whoosh", L5 + 6.35, { d: 0.4, x0: 1200, x1: 900, level: 0.02 });
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L5 + 6.6);
    ring("#yPath", L5 + 7.6, 1.3);

    // 4. the schedule: a cron, and the flow it runs
    stepTo(4, "The schedule", L6 - 0.3);
    show("#r3", L6, { y: 6 }); cue("pop", L6, { x: 300 });
    near("#r3t", 60, 40, L6 + 0.1);
    click("#r3t", L6 + 0.7);
    show("#p3", L6 + 0.85, { y: 6, d: 0.3 });
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L6 + 1.0);

    // 5. the app: a React project, its preview live, searchable
    stepTo(5, "The app", L7 - 0.3);
    show("#r4", L7, { y: 6 }); cue("pop", L7, { x: 300 });
    near("#c4", -60, 60, L7 + 0.1);
    click("#c4", L7 + 0.8);
    showTab("#tbA", "#vA", L7 + 1.0);
    near("#sgP", -40, 50, L7 + 1.3);
    click("#sgP", L7 + 2.3);
    appState(false, L7 + 2.45);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L7 + 2.6);
    tl.set("#srchPh", { display: "none" }, L7 + 4.35);
    type("#srch", "Maya", L7 + 4.4, 0.1, 900);
    tl.set("#aPrev tr:nth-child(n+3)", { display: "none" }, L7 + 4.9);
    tl.set("#aPrev .kp b", { textContent: (i) => ["1", "$120.00", "$120.00"][i] }, L7 + 4.9);

    // 6. a draft lives above the deployed version
    stepTo(6, "Drafts", L8 - 0.3);
    show("#cbar", L8 - 0.4, { y: 4 });
    dia("#dDraft", L8, L9 - 0.5);
    tl.fromTo("#bxD", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, immediateRender: false }, L8 + 0.3);
    tl.fromTo("#bxV", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, immediateRender: false }, L8 + 3.6);
    tl.fromTo(["#arD", "#lbD"], { opacity: 0 }, { opacity: 1, duration: 0.4, immediateRender: false }, L8 + 3.9);

    // 7. the test runs in the open editor, step by step on its graph
    stepTo(7, "Test on the graph", L9 - 0.3);
    showTab("#tbF", "#vF", L9 - 0.4);
    tl.set("#fY", { opacity: 0 }, L9 - 0.4);
    show("#cTest", L9 - 0.3); cue("pop", L9 - 0.3, { x: 330 });
    near("#bRun", -120, 70, L9);
    click("#bRun", L9 + 1.1);
    tl.set("#tActs", { display: "none" }, L9 + 1.25);
    tl.set("#tHead", { textContent: "Testing f/finance/refunds_report" }, L9 + 1.25);
    tl.set("#tStart", { display: "block" }, L9 + 1.25);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L9 + 1.4);
    cam(870, 250, 1.25, L9 + 1.4, 0.8);
    tl.set("#gA", { className: "fnode run" }, L9 + 2.8); cue("tick", L9 + 2.8, { x: 900, gain: 0.4 });
    tl.set("#gA", { className: "fnode ok2" }, L9 + 4.2); cue("tick", L9 + 4.2, { x: 900, gain: 0.6 });
    tl.set("#gB", { className: "fnode run" }, L9 + 4.3);
    tl.set("#gB", { className: "fnode ok2" }, L9 + 5.6); cue("tick", L9 + 5.6, { x: 900, gain: 0.6 });
    camReset(L9 + 5.9, 0.6);
    tl.set("#tHead", { textContent: "Tested f/finance/refunds_report" }, L9 + 6.4);
    tl.set("#tStart", { display: "none" }, L9 + 6.4);
    tl.set("#tRes", { display: "block" }, L9 + 6.4);
    show("#tRes", L9 + 6.45, { y: 4 });
    ring("#tRes", L9 + 6.8, 1.6);

    // 8. AI agents: a flow step that calls a model, with your scripts as tools
    stepTo(8, "AI agents", L10 - 0.3);
    camReset(L10 - 0.4, 0.6);
    tl.to(["#um", "#r1", "#r2", "#r3", "#p3", "#r4", "#cTest"], { y: -120, opacity: 0, duration: 0.5, ease: "power2.in" }, L10 - 0.4);
    show("#u2", L10, { y: 16 }); cue("send", L10, { x: 330 });
    show("#r5", L10 + 1.0, { y: 4 }); cue("pop", L10 + 1.0, { x: 300, gain: 0.6 });
    showTab("#tbF", "#vF", L10 + 1.3);
    tl.set(["#fY", "#fG"], { opacity: 0 }, L10 + 1.3); tl.to("#fA", { opacity: 1, duration: 0.3 }, L10 + 1.35);
    tl.fromTo("#agNode", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)", immediateRender: false }, L10 + 1.8);
    tl.fromTo("#agTools", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, L10 + 3.6);
    cue("land", L10 + 1.8, { x: 900 }); cue("pop", L10 + 3.6, { x: 900, gain: 0.6 });
    cam(860, 260, 1.3, L10 + 1.8, 0.9);
    ring("#agNode", L10 + 2.2, 1.2);
    ring("#agToolsBox", L10 + 3.9, 1.6);

    // 9. data pipelines, in alpha: scripts chained by the data they read and write
    stepTo(9, "Data pipelines", L11 - 0.3);
    camReset(L11 - 0.4, 0.6);
    tl.to(["#u2", "#r5"], { opacity: 0.35, duration: 0.3 }, L11 - 0.3);
    show("#u3", L11, { y: 12 }); cue("send", L11, { x: 330 });
    show("#a3", L11 + 0.8, { y: 4 });
    tl.set("#tbS", { display: "none" }, L11 + 1.0);
    showTab("#tbP", "#vP", L11 + 1.1);
    [["#r6", 1.4], ["#r7", 2.0]].forEach(([r, d]) => { show(r, L11 + d, { y: 4 }); cue("pop", L11 + d, { x: 300, gain: 0.5 }); });
    [["#pn1", 1.5], ["#pa1", 2.0], ["#pn2", 2.5], ["#pa2", 3.0]].forEach(([n, d]) => show(n, L11 + d, { y: 6, d: 0.35 }));
    ring("#pa1", L11 + 3.2, 1.0);
    show("#anno", L11 + 3.6, { y: 8, d: 0.35 });

    // 10. everything it built, side by side in one workspace
    stepTo("✓", "One workspace", L12 - 0.3);
    // the workspace settles into place as the session gives way to it: one move, of the page only
    tl.fromTo("#pHome", { scale: 1.06 }, { scale: 1, duration: 1.6, ease: MOVE, immediateRender: false }, L12 - 0.1);
    page("#pSess", "#pHome", L12 - 0.1);
    tl.to("#sideS", { opacity: 0, duration: 0.3 }, L12 - 0.1);
    tl.set("#sideW .nv", { className: "nv" }, L12 - 0.1);
    tl.set("#sideW .nv:first-child", { className: "nv on" }, L12 - 0.1);
    tl.to("#sideW", { opacity: 1, duration: 0.3 }, L12);
    cue("whoosh", L12 - 0.1, { d: 1.6, x0: 640, x1: 640, level: 0.04 });
    tl.fromTo("#hmList .hm-row.nw", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.18, immediateRender: false }, L12 + 1.2);
    ring("#hmList", L12 + 3.0, 2.0);
