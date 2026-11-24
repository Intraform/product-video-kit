    const PROMPT = "An app to approve expense reports, with a status filter and an Approve button.";
    q("#um").textContent = PROMPT;
    gsap.set("#sideW", { opacity: 0 }); gsap.set("#sideS", { opacity: 1 });
    const camOn = (sel, s, t, d = 0.7, dx = 0, dy = 0) => tl.to("#cam", { x: () => 640 - s * (at(sel).cx + dx), y: () => 380 - s * (at(sel).cy + dy), scale: s, duration: d, ease: MOVE }, t);
    const dia = (id, t0, t1) => { camReset(t0 - 0.6, 0.45); tl.fromTo(id, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.45, immediateRender: false }, t0); tl.to(id, { opacity: 0, duration: 0.4 }, t1); };
    const ftab = (on, t) => { ["#ftApp", "#ftRun", "#pvTab"].forEach((s) => tl.set(s, { className: s === "#ftRun" ? (on === s ? "bk on" : "bk") : s === "#pvTab" ? (on === s ? "on pv2" : "pv2") : (on === s ? "on" : "") }, t)); };

    // 0. the result first: the app, running next to the chat
    gsap.set(["#um", "#r0", "#r1", "#r2", "#r3", "#r5", "#appv", "#tabT", "#rae"], { opacity: 1 }); gsap.set(["#starter", "#pvEmpty"], { opacity: 0 });
    gsap.set("#sessName", { textContent: "Expense approvals app" }); gsap.set("#ph", { textContent: "Ask followup" });
    tl.to(["#late", "#tabT", "#rae"], { opacity: 0, duration: 0.35 }, L2 - 0.9);
    tl.set(["#um", "#r0", "#r1", "#r2", "#r3", "#r5", "#appv", "#tabT", "#rae"], { opacity: 0 }, L2 - 0.5);
    tl.set("#late", { opacity: 1 }, L2 - 0.5);
    tl.set("#starter", { opacity: 1 }, L2 - 0.5);
    tl.set("#sessName", { textContent: "New session" }, L2 - 0.5); tl.set("#ph", { textContent: "Ask anything..." }, L2 - 0.5);
    tl.to("#pvEmpty", { opacity: 1, duration: 0.3 }, L2 - 0.4);

    // 1. describe it: the AI creates the app as a draft and opens it in the preview
    stepTo(1, "Describe it", L2 - 0.3);
    const rComp = R("#comp");
    cam(rComp.cx + 40, rComp.cy - 70, 1.5, L2 - 0.2, 0.7);
    tl.to("#ph", { opacity: 0, duration: 0.15 }, L2 + 0.5);
    const typed = type("#ptext", PROMPT, L2 + 0.55, 0.026, 330);
    near("#bSend", 60, 50, typed - 0.7);
    click("#bSend", typed + 0.25);
    tl.to("#ptext", { opacity: 0, duration: 0.15 }, typed + 0.4);
    tl.set("#ph", { textContent: "Ask followup" }, typed + 0.4); tl.to("#ph", { opacity: 1, duration: 0.3 }, typed + 0.7);
    show("#um", typed + 0.4, { y: 16 }); cue("send", typed + 0.4, { x: 330 });
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, typed + 0.55);
    camReset(typed + 0.6, 0.7);
    show("#r0", L2 + 4.0, { y: 4 }); cue("pop", L2 + 4.0, { x: 300, gain: 0.6 });
    tl.to("#pvEmpty", { opacity: 0, duration: 0.2 }, L2 + 4.5);
    tl.to(["#tabT", "#rae"], { opacity: 1, duration: 0.35 }, L2 + 4.6);
    tl.set("#sessName", { textContent: "Expense approvals app" }, L2 + 5.0);

    // 2. frontend files and backend runnables
    stepTo(2, "Frontend and backend", L3 - 0.3);
    [["#r1", 0.3], ["#r2", 1.5], ["#r3", 2.4]].forEach(([r, d]) => { show(r, L3 + d, { y: 4 }); cue("pop", L3 + d, { x: 300, gain: 0.6 }); });
    tl.to("#starter", { opacity: 0, duration: 0.3 }, L3 + 3.0);
    tl.fromTo("#appv", { opacity: 0 }, { opacity: 0.55, duration: 0.4, immediateRender: false }, L3 + 3.1);

    // 3. a backend runnable: code on a worker, with a resource the browser never sees
    stepTo(3, "A backend runnable", L4 - 0.3);
    near("#ftRun", -60, 60, L4 - 0.2);
    click("#ftRun", L4 + 0.6);
    ftab("#ftRun", L4 + 0.75);
    tl.to("#rcode", { opacity: 1, duration: 0.3 }, L4 + 0.8);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L4 + 1.1);
    camOn("#rcode", 1.45, L4 + 1.4, 0.7, 0, -20);
    tl.fromTo(".cQ", { backgroundColor: "rgba(44,91,235,0)" }, { backgroundColor: "rgba(44,91,235,.09)", duration: 0.3, immediateRender: false }, L4 + 4.6);
    tl.to(".cQ", { backgroundColor: "rgba(44,91,235,0)", duration: 0.3 }, L4 + 7.2);
    ring("#sinp", L4 + 7.6, 2.6);
    camReset(L4 + 10.0, 0.7);

    // 4. the page calls it like a function; Windmill runs it as a job
    stepTo(4, "Called from the page", L5 - 0.3);
    ftab("#pvTab", L5 - 0.5); tl.to("#rcode", { opacity: 0, duration: 0.2 }, L5 - 0.5);
    dia("#dCall", L5 + 0.2, L6 - 0.5);
    show("#lbA", L5 + 2.4, { y: 4 });
    tl.fromTo("#kA", { opacity: 0, left: 400 }, { opacity: 1, left: 800, duration: 1.3, ease: "power1.inOut", immediateRender: false }, L5 + 2.4);
    tl.to("#kA", { opacity: 0, duration: 0.2 }, L5 + 3.7);
    show("#lbB", L5 + 4.4, { y: 4 });
    tl.fromTo("#kB", { opacity: 0, left: 800 }, { opacity: 1, left: 400, duration: 1.3, ease: "power1.inOut", immediateRender: false }, L5 + 4.4);
    tl.to("#kB", { opacity: 0, duration: 0.2 }, L5 + 5.7);

    // 5. a failed build: the AI reads the logs and fixes it in the same turn
    stepTo(5, "It fixes its own build", L6 - 0.3);
    tl.set("#pvTab", { className: "on pv2 bad" }, L6 + 0.4);
    show("#bfail", L6 + 0.4, { y: -6 }); cue("pop", L6 + 0.4, { x: 900, gain: 0.6 });
    show("#r4", L6 + 0.8, { y: 4 });
    tl.set("#r4t", { textContent: "App build failed" }, L6 + 1.8);
    cam(880, 220, 1.3, L6 + 0.7, 0.7);
    camReset(L6 + 4.0, 0.6);
    show("#r5", L6 + 3.6, { y: 4 }); cue("pop", L6 + 3.6, { x: 300, gain: 0.6 });
    tl.to("#bfail", { opacity: 0, duration: 0.3 }, L6 + 4.4);
    tl.set("#pvTab", { className: "on pv2" }, L6 + 4.4);
    tl.to("#appv", { opacity: 1, duration: 0.4 }, L6 + 4.5);
    cue("tick", L6 + 4.5, { x: 900 });

    // 6. try it, then deploy from the editor's header
    stepTo(6, "Try it, deploy it", L7 - 0.3);
    near("#ab1", -70, 60, L7 - 0.2);
    click("#ab1", L7 + 0.7);
    tl.set("#st1", { className: "st a", textContent: "Approved" }, L7 + 0.85);
    click("#bDep", L7 + 2.2);
    tl.fromTo("#ddrw", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35, immediateRender: false }, L7 + 2.35);
    click("#bDep2", L7 + 3.9);
    tl.to("#ddrw", { opacity: 0, duration: 0.25 }, L7 + 4.1);
    tl.to("#dB", { opacity: 0, duration: 0.2 }, L7 + 4.2);
    cue("tick", L7 + 4.25, { x: 900 });
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L7 + 4.4);
