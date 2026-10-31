import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SETTINGS, runSetting, settingDetail } from "@/lib/console/skins";
import { useConsoleInput } from "@/lib/console/nav";
import { useConsoleCtx } from "@/lib/console/ctx";
import { ConsoleShell } from "../ConsoleShell";
import { cn } from "@/lib/utils";
export function SonySettings() {
  const { go, p, lib, name } = useConsoleCtx();
  const [i, setI] = useState(5);
  const [note, setNote] = useState("");
  const act = (n: number) => setNote(runSetting(SETTINGS[n].id, p, go));
  useConsoleInput((a) => {
    if (a === "up") setI(Math.max(0, i - 1));
    else if (a === "down") setI(Math.min(SETTINGS.length - 1, i + 1));
    else if (a === "select") act(i);
    else if (a === "back" || a === "menu") go("/console");
  });
  return (
    <ConsoleShell hue={240}>
      <div className="mx-auto flex h-full max-w-4xl flex-col justify-center overflow-y-auto px-4 py-6">
        {SETTINGS.map((r, n) => <Button variant="console" size="console" key={r.id} onClick={() => (n === i ? act(n) : setI(n))} className={cn("flex items-center gap-6 border-b border-console-foreground/10 px-6 py-3.5 text-left text-lg md:py-4 md:text-2xl", n === i && "rounded-sm outline outline-[3px] outline-console-foreground/90")}>
          <r.icon className="size-7 shrink-0 md:size-9" /><span className="flex-1">{r.label}</span>
          {n === i && <span className="hidden max-w-[40%] truncate text-sm text-console-foreground/60 md:block">{settingDetail(r.id, p, lib.installed.length, name)}</span>}
        </Button>)}
        <p className="h-8 px-6 pt-3 text-sm text-console-foreground/70">{note || settingDetail(SETTINGS[i].id, p, lib.installed.length, name)}</p>
      </div>
    </ConsoleShell>
  );
}
