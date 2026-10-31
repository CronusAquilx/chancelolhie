import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownUp, Heart, MoreHorizontal, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATALOG, artStyle } from "@/lib/console/catalog";
import { actOn } from "@/lib/console/store";
import { moveGrid, useCols, useConsoleInput } from "@/lib/console/nav";
import { useConsoleCtx } from "@/lib/console/ctx";
import { statusOf } from "../shared";
import { ConsoleShell } from "../ConsoleShell";
import { cn } from "@/lib/utils";
const TABS = ["Latest", "Collections", "Deals", "Subscriptions", "Browse"] as const;
export function SonyStore() {
  const { go, lib, p } = useConsoleCtx();
  const cols = useCols(5, 3, 2);
  const [tab, setTab] = useState(4);
  const [byName, setByName] = useState(false);
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const games = useMemo(() => {
    let g = [...CATALOG]; const t = TABS[tab];
    if (t === "Latest") g.reverse();
    if (t === "Collections") g.sort((a, b) => a.genre.localeCompare(b.genre));
    if (t === "Deals") g = g.filter((x) => x.badge === "Free");
    if (t === "Subscriptions") g = g.filter((x) => x.badge === "Included");
    if (byName) g.sort((a, b) => a.title.localeCompare(b.title));
    return g;
  }, [tab, byName]);
  const idx = Math.min(i, Math.max(0, games.length - 1));
  useEffect(() => { refs.current[idx]?.scrollIntoView({ block: "nearest", behavior: p.reduceMotion ? "auto" : "smooth" }); }, [idx, p.reduceMotion]);
  useConsoleInput((a) => {
    if (a === "back" || a === "menu") go("/console");
    else if (a === "prev") { setTab((t) => (t + TABS.length - 1) % TABS.length); setI(0); }
    else if (a === "next") { setTab((t) => (t + 1) % TABS.length); setI(0); }
    else if (a === "options") setByName((v) => !v);
    else if (a === "select") { const g = games[idx]; if (g) actOn(g, lib); }
    else setI(moveGrid(idx, games.length, cols, a));
  });
  return (
    <ConsoleShell hue={games[idx]?.hue ?? 235}>
      <div className="flex h-full flex-col px-6 pt-6 md:px-14 md:pt-8">
        <div className="flex items-center gap-5">
          <Button variant="console" size="console" title="Console home" onClick={() => go("/console")} className="flex size-12 items-center justify-center rounded-xl bg-console-foreground/10 md:size-14"><ShoppingBag className="size-6" /></Button>
          <h1 className="text-2xl md:text-3xl">Console Store</h1>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <nav className="flex gap-5 overflow-x-auto text-base md:gap-9 md:text-xl [scrollbar-width:none]">{TABS.map((t, n) => <Button variant="console" size="console" key={t} onClick={() => { setTab(n); setI(0); }} className={cn("shrink-0", n === tab ? "text-console-foreground" : "text-console-foreground/45")}>{t}</Button>)}</nav>
          <div className="hidden items-center gap-7 md:flex"><Search className="size-6" /><Button variant="console" size="console" title="Wishlist" onClick={() => go("/console/library")}><Heart className="size-6" /></Button><ShoppingCart className="size-6" /><MoreHorizontal className="size-6" /></div>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-console-foreground/80 md:text-base"><span>All games</span><span>Sort by: {byName ? "Name (A-Z)" : "Best selling"}</span></div>
        <div className="mt-3 flex min-h-0 flex-1 gap-4 md:gap-6">
          <Button variant="console" size="console" title="Sort" onClick={() => setByName((v) => !v)} className="mt-1 hidden size-12 shrink-0 items-center justify-center rounded-full bg-console-foreground/10 md:flex"><ArrowDownUp className="size-5" /></Button>
          <div className="grid flex-1 content-start gap-3 overflow-y-auto pb-24 md:gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {games.map((g, n) => <Button variant="console" size="console" key={g.id} ref={(el) => { refs.current[n] = el; }} onClick={() => (n === idx ? actOn(g, lib) : setI(n))} className={cn("relative aspect-[4/5] overflow-hidden rounded-xl text-left transition-transform", n === idx ? "z-10 scale-[1.03] ring-2 ring-console-foreground" : "opacity-90")} style={artStyle(g.hue)}>
              <span className="absolute inset-x-3 top-1/3 text-center text-lg font-extrabold uppercase leading-tight drop-shadow md:text-2xl">{g.title}</span>
              <span className="absolute bottom-3 left-3 text-sm font-semibold drop-shadow">{statusOf(g, lib)}</span>
              {g.id in lib.progress && <span className="absolute bottom-0 left-0 h-1.5 bg-console-foreground/80" style={{ width: `${lib.progress[g.id]}%` }} />}
            </Button>)}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 rounded-lg bg-console-ink/60 px-4 py-2 text-xs backdrop-blur md:bottom-6 md:right-10 md:text-sm">O: Sort &nbsp;&nbsp; Q / E (L1 / R1): Switch Tabs</div>
    </ConsoleShell>
  );
}
