import { useEffect, useMemo, useRef, useState } from "react";
import { LayoutGrid, MoreHorizontal, Search, Settings, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { artStyle, gameById, type ConsoleGame } from "@/lib/console/catalog";
import { playGame } from "@/lib/console/store";
import { useConsoleInput } from "@/lib/console/nav";
import { useConsoleCtx } from "@/lib/console/ctx";
import { ConsoleShell } from "../ConsoleShell";
import { cn } from "@/lib/utils";

type Item = { kind: "store" } | { kind: "library" } | { kind: "game"; game: ConsoleGame };

export function SonyHome() {
  const { go, lib, p, clock, initial } = useConsoleCtx();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const items = useMemo<Item[]>(() => {
    const list: Item[] = [{ kind: "store" }];
    for (const id of lib.installed) { const g = gameById(id); if (g) list.push({ kind: "game", game: g }); }
    list.push({ kind: "library" });
    return list;
  }, [lib.installed]);
  const [i, setI] = useState(1);
  const idx = Math.min(i, items.length - 1);
  const cur = items[idx];
  const hero = cur.kind === "game" ? cur.game : null;
  const activate = (n: number) => {
    const it = items[n];
    if (!it) return;
    if (it.kind === "store") go("/console/store");
    else if (it.kind === "library") go("/console/library");
    else playGame(it.game);
  };
  useEffect(() => { refs.current[idx]?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: p.reduceMotion ? "auto" : "smooth" }); }, [idx, p.reduceMotion]);
  useConsoleInput((a) => {
    if (a === "left") setI(Math.max(0, idx - 1));
    else if (a === "right") setI(Math.min(items.length - 1, idx + 1));
    else if (a === "select") activate(idx);
    else if (a === "options") go("/console/settings");
    else if (a === "back" || a === "menu") go("/home");
  });
  const label = cur.kind === "store" ? "Console Store" : cur.kind === "library" ? "Game Library" : cur.game.title;
  return (
    <ConsoleShell hue={hero?.hue ?? 235}>
      <header className="flex items-start justify-between px-6 pt-6 md:px-12 md:pt-8">
        <nav className="flex gap-8 text-xl md:text-2xl">
          <span className="font-medium">Games</span>
          <Button variant="console" size="console" onClick={() => go("/movies")} className="text-console-foreground/45">Media</Button>
        </nav>
        <div className="flex items-start gap-4 md:gap-6">
          <Button variant="console" size="console" onClick={() => go("/console/store")} className="flex flex-col items-center gap-1 text-xs text-console-foreground/80">
            <span className="flex size-10 items-center justify-center rounded-full bg-console-foreground/15"><Search className="size-5" /></span>
            <span className="hidden md:block">Search</span>
          </Button>
          <Button variant="console" size="console" title="Settings" onClick={() => go("/console/settings")} className="flex size-10 items-center justify-center"><Settings className="size-6" /></Button>
          <Button variant="console" size="console" title="Profile" onClick={() => go("/console/profile")} className="relative flex size-10 items-center justify-center rounded-full bg-console-foreground/20 text-sm font-semibold">
            {initial}<span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-console-background bg-console-online" />
          </Button>
          <span className="pt-1.5 text-xl md:text-2xl">{clock}</span>
        </div>
      </header>
      <div className="mt-6 flex items-end gap-3 overflow-x-auto px-6 pb-2 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it, n) => {
          const focused = n === idx;
          return (
            <div key={it.kind === "game" ? it.game.id : it.kind} ref={(el) => { refs.current[n] = el; }} className="flex shrink-0 items-end gap-3">
              <Button variant="console" size="console" onClick={() => (focused ? activate(n) : setI(n))} className={cn("flex items-center justify-center overflow-hidden rounded-2xl bg-console-foreground/10 transition-all", p.reduceMotion ? "" : "duration-200", focused ? "size-24 ring-2 ring-console-foreground/90 md:size-32" : "size-14 opacity-80 md:size-16")} style={it.kind === "game" ? artStyle(it.game.hue) : undefined}>
                {it.kind === "store" ? <ShoppingBag className={focused ? "size-10" : "size-6"} /> : it.kind === "library" ? <LayoutGrid className={focused ? "size-10" : "size-6"} /> : <span className={cn("px-1 text-center font-bold leading-tight", focused ? "text-sm" : "text-[10px]")}>{focused ? it.game.title : it.game.title.split(" ").map((w) => w[0]).join("")}</span>}
              </Button>
              {focused && <span className="pb-1 text-base md:text-xl">{label}</span>}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-10 left-6 max-w-xl md:bottom-16 md:left-12">
        <h1 className="text-4xl font-bold md:text-6xl">{hero ? hero.title : label}</h1>
        <p className="mt-2 text-base text-console-foreground/80 md:text-lg">{hero ? hero.tagline : cur.kind === "library" ? "Everything you own, wishlisted or installed." : lib.installed.length ? "Browse and install new games." : "Nothing installed yet. Open the store to get your first game."}</p>
        <div className="mt-6 flex items-center gap-3">
          <Button variant="console" size="console" onClick={() => activate(idx)} className="rounded-full bg-console-foreground/15 px-12 py-3 text-lg font-medium backdrop-blur hover:bg-console-foreground/25 md:px-20">{hero ? "Play" : "Open"}</Button>
          <Button variant="console" size="console" title="Options" onClick={() => go("/console/settings")} className="flex size-12 items-center justify-center rounded-full bg-console-foreground/15 backdrop-blur hover:bg-console-foreground/25"><MoreHorizontal className="size-6" /></Button>
        </div>
      </div>
    </ConsoleShell>
  );
}
