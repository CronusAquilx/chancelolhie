import { useMemo, useState } from "react";
import { Plus, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsoleInput } from "@/lib/console/nav";
import { useConsoleCtx } from "@/lib/console/ctx";
import { ConsoleShell } from "../ConsoleShell";
import { cn } from "@/lib/utils";
export function SonyProfile() {
  const { go, name, initial, clock, signOut } = useConsoleCtx();
  const [sel, setSel] = useState(1);
  const [menu, setMenu] = useState(false);
  const dots = useMemo(() => Array.from({ length: 46 }, (_, k) => ({ l: (k * 37) % 100, t: (k * 53) % 100, s: 3 + (k % 5) * 2, d: (k % 7) * 0.6 })), []);
  const act = (n: number) => { if (n === 0) go("/auth"); else if (n === 1) go("/console"); else go("/home"); };
  useConsoleInput((a) => {
    if (menu) { if (a === "back" || a === "options") setMenu(false); else if (a === "select") void signOut(); return; }
    if (a === "left" && sel === 1) setSel(0);
    else if (a === "right" && sel === 0) setSel(1);
    else if (a === "down" && sel !== 2) setSel(2);
    else if (a === "up" && sel === 2) setSel(1);
    else if (a === "select") act(sel);
    else if (a === "options") setMenu(true);
    else if (a === "back") go("/console");
  });
  return (
    <ConsoleShell bg="var(--console-profile-scene)">
      {dots.map((d, k) => <span key={k} className="pointer-events-none absolute animate-pulse rounded-full bg-console-particle/50" style={{ left: `${d.l}%`, top: `${d.t}%`, width: d.s, height: d.s, animationDelay: `${d.d}s` }} />)}
      <span className="absolute right-6 top-6 text-lg md:right-10 md:text-xl">{clock}</span>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-5xl">Welcome Back</h1><p className="mt-3 text-console-foreground/70">Who&apos;s using this controller?</p>
        <div className="mt-10 flex items-center gap-8 md:gap-16">
          <div className="flex flex-col items-center gap-3"><Button variant="console" size="console" title="Add user" onClick={() => (sel === 0 ? act(0) : setSel(0))} className={cn("flex size-20 items-center justify-center rounded-full bg-console-foreground/10 md:size-32", sel === 0 && "ring-2 ring-console-foreground")}><Plus className="size-8" /></Button><span className="text-console-foreground/70">Add User</span></div>
          <div className="flex flex-col items-center gap-3">
            <Button variant="console" size="console" onClick={() => (sel === 1 ? act(1) : setSel(1))} className={cn("flex size-28 items-center justify-center rounded-full border-2 border-console-foreground/60 text-5xl font-bold md:size-44 md:text-7xl", sel === 1 && "ring-4 ring-console-foreground/80 ring-offset-4 ring-offset-transparent")} style={{ background: "var(--console-avatar)" }}>{initial}</Button>
            <span className="text-lg">{name}</span><Button variant="console" size="console" onClick={() => setMenu(true)} className="rounded bg-console-foreground/10 px-3 py-1 text-sm">O: Options</Button>
          </div>
        </div>
        <Button variant="console" size="console" title="Exit Console Mode" onClick={() => act(2)} className={cn("mt-12 flex size-14 items-center justify-center rounded-full bg-console-foreground/10", sel === 2 && "ring-2 ring-console-foreground")}><Power className="size-6" /></Button>
      </div>
      {menu && <div className="absolute inset-0 flex items-center justify-center bg-console-ink/60" onClick={() => setMenu(false)}>
        <div className="w-72 rounded-2xl bg-console-panel p-5 text-center" onClick={(e) => e.stopPropagation()}>
          <p className="mb-4 text-lg">{name}</p><Button variant="console" size="console" onClick={() => void signOut()} className="w-full rounded-xl bg-console-foreground/15 py-3 ring-2 ring-console-foreground">Sign out</Button><Button variant="console" size="console" onClick={() => setMenu(false)} className="mt-3 w-full rounded-xl bg-console-foreground/5 py-3">Cancel</Button>
        </div>
      </div>}
    </ConsoleShell>
  );
}
