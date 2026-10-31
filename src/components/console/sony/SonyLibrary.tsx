import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownUp, Heart, Search, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATALOG, artStyle } from "@/lib/console/catalog";
import { actOn, toggleWishlist } from "@/lib/console/store";
import { moveGrid, useCols, useConsoleInput } from "@/lib/console/nav";
import { useConsoleCtx } from "@/lib/console/ctx";
import { statusOf } from "../shared";
import { ConsoleShell } from "../ConsoleShell";
import { cn } from "@/lib/utils";
const CHIPS = ["All", "Installed", "Wishlist", "Free", "Included"] as const;
export function SonyLibrary() {
  const { go, lib, p } = useConsoleCtx();
  const cols = useCols(5, 3, 2);
  const [chip, setChip] = useState(0);
  const [byName, setByName] = useState(true);
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const games = useMemo(() => {
    let g = [...CATALOG]; const c = CHIPS[chip];
    if (c === "Installed") g = g.filter((x) => lib.installed.includes(x.id));
    if (c === "Wishlist") g = g.filter((x) => lib.wishlist.includes(x.id));
    if (c === "Free") g = g.filter((x) => x.badge === "Free");
    if (c === "Included") g = g.filter((x) => x.badge === "Included");
    if (byName) g.sort((a, b) => a.title.localeCompare(b.title));
    return g;
  }, [chip, byName, lib.installed, lib.wishlist]);
  const idx = Math.min(i, Math.max(0, games.length - 1));
  useEffect(() => { refs.current[idx]?.scrollIntoView({ block: "nearest", behavior: p.reduceMotion ? "auto" : "smooth" }); }, [idx, p.reduceMotion]);
  useConsoleInput((a) => {
    if (a === "back" || a === "menu") go("/console");
    else if (a === "prev") { setChip((c) => (c + CHIPS.length - 1) % CHIPS.length); setI(0); }
    else if (a === "next") { setChip((c) => (c + 1) % CHIPS.length); setI(0); }
    else if (a === "options") { const g = games[idx]; if (g) toggleWishlist(g.id); }
    else if (a === "select") { const g = games[idx]; if (g) actOn(g, lib); }
    else setI(moveGrid(idx, games.length, cols, a));
  });
  return (
    <ConsoleShell hue={games[idx]?.hue ?? 260}>
      <div className="flex h-full gap-4 px-4 pt-6 md:gap-8 md:px-10 md:pt-8">
        <aside className="flex w-12 shrink-0 flex-col items-center gap-4 md:w-14">
          <Button variant="console" size="console" title="Wishlist" onClick={() => { setChip(2); setI(0); }} className="flex size-12 items-center justify-center rounded-xl bg-console-foreground/15"><Heart className="size-6" /></Button>
          <Button variant="console" size="console" title="Search store" onClick={() => go("/console/store")} className="flex size-12 items-center justify-center rounded-full bg-console-foreground/10"><Search className="size-5" /></Button>
          <Button variant="console" size="console" title="Sort" onClick={() => setByName((v) => !v)} className="flex size-12 items-center justify-center rounded-full bg-console-foreground/10"><ArrowDownUp className="size-5" /></Button>
          <Button variant="console" size="console" title="Store" onClick={() => go("/console/store")} className="flex size-12 items-center justify-center rounded-full bg-console-foreground/10"><Store className="size-5" /></Button>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <h1 className="text-xl md:text-2xl">Library</h1>
          <div className="mt-3 flex gap-3 overflow-x-auto text-sm md:text-base [scrollbar-width:none]">{CHIPS.map((c, n) => <Button variant="console" size="console" key={c} onClick={() => { setChip(n); setI(0); }} className={cn("shrink-0 rounded-full px-5 py-1.5", n === chip ? "bg-console-foreground text-console-ink" : "bg-console-foreground/10")}>{c}</Button>)}</div>
          <div className="mt-4 flex justify-between text-sm text-console-foreground/80"><span>Games: {games.length}</span><span>Sort by: {byName ? "Name (A - Z)" : "Default"}</span></div>
          {games.length === 0 && <p className="mt-16 text-center text-console-foreground/60">Nothing here yet. Press O on a game to wishlist it, or visit the store.</p>}
          <div className="mt-3 grid flex-1 content-start gap-3 overflow-y-auto pb-24 md:gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {games.map((g, n) => <Button variant="console" size="console" key={g.id} ref={(el) => { refs.current[n] = el; }} onClick={() => (n === idx ? actOn(g, lib) : setI(n))} className={cn("relative aspect-[4/5] overflow-hidden rounded-lg text-left", n === idx ? "z-10 ring-2 ring-console-foreground" : "opacity-90")} style={artStyle(g.hue)}>
              <span className="absolute inset-x-2 top-1/3 text-center text-base font-extrabold uppercase leading-tight drop-shadow md:text-xl">{g.title}</span>
              {lib.wishlist.includes(g.id) && <Heart className="absolute right-2 top-2 size-4 fill-console-foreground" />}
              <span className="absolute bottom-2 left-2 text-xs font-semibold drop-shadow">{statusOf(g, lib)}</span>
            </Button>)}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 rounded-lg bg-console-ink/60 px-4 py-2 text-xs backdrop-blur md:bottom-6 md:right-10 md:text-sm">O: Wishlist &nbsp;&nbsp; Q / E: Filter</div>
    </ConsoleShell>
  );
}
