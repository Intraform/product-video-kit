    gsap.set("#sideW", { opacity: 0 }); gsap.set("#sideS", { opacity: 1 });
    const camOn = (sel, s, t, d = 0.7, dx = 0, dy = 0) => tl.to("#cam", { x: () => 640 - s * (at(sel).cx + dx), y: () => 380 - s * (at(sel).cy + dy), scale: s, duration: d, ease: MOVE }, t);
    const views = ["#vA", "#vF", "#vS", "#vR"], tabsel = ["#tA", "#tF", "#tS", "#tR"];
    const crumbs = { "#vA": ["#i-app", "#f97316", "f/finance", "refunds"], "#vF": ["#i-flow", "#14b8a6", "f/finance", "refunds_report"], "#vS": ["#i-code", "#3b82f6", "f/finance", "fetch_refunds"], "#vR": ["#i-playt", "#16a34a", "Runs", "3f2a91c0"] };
    const openTab = (i, t, fresh) => {
      if (fresh) { tl.set(tabsel[i], { display: "flex" }, t); tl.fromTo(tabsel[i], { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, t); }
      tabsel.forEach((s, j) => tl.set(s, { className: j === i ? "tab" : "tab off" }, t));
      views.forEach((v, j) => tl.to(v, { opacity: j === i ? 1 : 0, duration: 0.3 }, t + 0.05));
      const c = crumbs[views[i]];
      tl.set("#crI use", { attr: { href: c[0] } }, t); tl.set("#crI", { attr: { style: `color:${c[1]}` } }, t); tl.set("#crP", { textContent: c[2] }, t); tl.set("#crN", { textContent: c[3] }, t);
    };

    // 1. the panel and its tabs
    stepTo(1, "Tabs next to the chat", L1 + 0.3);
    ring("#pv", L1 + 1.0, 2.4);
    ring("#tabs", L1 + 4.0, 1.8);

    // 2. a draft opens its editor here; editor tabs end with (edit)
    stepTo(2, "Editors", L2 - 0.3);
    show("#rFlow", L2 + 0.3, { y: 4 }); cue("pop", L2 + 0.3, { x: 300, gain: 0.6 });
    openTab(1, L2 + 0.9, true);
    camOn("#tF", 1.7, L2 + 1.9, 0.6, 60, 70);
    ring("#tFe", L2 + 2.7, 1.8);
    camReset(L2 + 5.4, 0.7);

    // 3. an item's deployed page: run form, triggers, versions
    stepTo(3, "Deployed page", L3 - 0.3);
    near("#cScript", -60, 60, L3 + 0.0);
    click("#cScript", L3 + 0.9);
    openTab(2, L3 + 1.1, true);
    ring("#bxTrig", L3 + 2.6, 1.3);
    ring("#bxVer", L3 + 4.0, 1.3);
    click("#bRun", L3 + 6.0);

    // 4. each run opens its own tab
    stepTo(4, "Runs", L4 - 0.3);
    openTab(3, L3 + 6.3, true); cue("tick", L3 + 6.6, { x: 900 });
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L4 + 0.2);
    ring("#res", L4 + 1.4, 2.0);

    // 5. the picker: any page of the workspace, and what this session changed
    stepTo(5, "The picker", L5 - 0.3);
    near("#crumbB", 80, 60, L5 - 0.4);
    click("#crumbB", L5 + 0.4);
    show("#pk", L5 + 0.55, { y: 4, d: 0.2 });
    camOn("#pk", 1.45, L5 + 0.9, 0.7, 0, 80);
    click("#kPages", L5 + 1.9);
    tl.set("#lv0", { display: "none" }, L5 + 2.05); tl.set("#lv1", { display: "flex" }, L5 + 2.05);
    click("#kBack", L5 + 5.0);
    tl.set("#lv1", { display: "none" }, L5 + 5.15); tl.set("#lv0", { display: "flex" }, L5 + 5.15);
    click("#kFin", L5 + 5.9);
    tl.set("#lv0", { display: "none" }, L5 + 6.05); tl.set("#lv2", { display: "flex" }, L5 + 6.05);
    ring("#lv2", L5 + 7.0, 1.6);
    tl.to("#pk", { opacity: 0, duration: 0.2 }, L5 + 8.9);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L5 + 8.9);
    camReset(L5 + 9.0, 0.7);

    // 6. leave the session, or take the whole window
    stepTo(6, "Open or expand", L6 - 0.3);
    near("#bExt", -60, 60, L6 - 0.2);
    tl.to("#cursor", { x: () => at("#bExt").cx - 3, y: () => at("#bExt").cy - 2, duration: 0.6, ease: "power2.inOut" }, L6 + 0.3);
    show("#tipE", L6 + 0.9, { y: 3, d: 0.2 });
    tl.to("#tipE", { opacity: 0, duration: 0.15 }, L6 + 2.2);
    click("#bMax", L6 + 3.0);
    tl.to("#chat", { opacity: 0, duration: 0.3 }, L6 + 3.15);
    tl.to("#pv", { left: 12, duration: 0.6, ease: "power2.inOut", lazy: false }, L6 + 3.2);
    tl.to("#cursor", { opacity: 0, duration: 0.2 }, L6 + 3.5);
