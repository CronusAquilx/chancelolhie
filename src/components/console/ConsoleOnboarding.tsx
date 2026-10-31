import { useState } from "react";
import { Monitor, Smartphone, Tablet, Gamepad2, LayoutGrid, ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { usePrefs, setPrefs, type Prefs } from "@/lib/astra/prefs";
import { ConsoleShell } from "./ConsoleShell";
import { useConsoleInput } from "@/lib/console/nav";
export function ConsoleOnboarding() {
  const p = usePrefs(); const navigate = useNavigate(); const [selected, setSelected] = useState(0);
  const deviceStep = !p.device;
  const choices = deviceStep ? [
    { label: "Laptop / desktop", icon: Monitor, value: "desktop" }, { label: "Phone", icon: Smartphone, value: "phone" }, { label: "Tablet", icon: Tablet, value: "tablet" },
  ] : [
    { label: "Sony Console", icon: Gamepad2, value: "sony" }, { label: "Classic", icon: LayoutGrid, value: "classic" }, { label: "Launcher", icon: Monitor, value: "launcher" },
  ];
  const choose = (n: number) => {
    const c = choices[n]; if (!c) return;
    if (deviceStep) { setPrefs({ device: c.value as Prefs["device"] }); setSelected(0); }
    else { const sony = c.value === "sony"; setPrefs({ console: sony ? "sony" : "off", layout: c.value === "launcher" ? "launcher" : p.layout, consoleSetup: true, ...(sony ? { focus: "all" as const } : {}) }); void navigate({ to: sony ? "/console" : "/home", replace: true }); }
  };
  useConsoleInput(a => { if (a === "left") setSelected(Math.max(0, selected - 1)); if (a === "right") setSelected(Math.min(2, selected + 1)); if (a === "select") choose(selected); });
  return <ConsoleShell><div className="console-boot mx-auto flex min-h-dvh max-w-4xl flex-col justify-center px-6 py-12"><span className="mb-8 text-sm text-console-foreground/60">BIRCHBLOCK / WELCOME</span><h1 className="text-4xl font-light md:text-5xl">{deviceStep ? "What are you playing on?" : "Make yourself at home."}</h1><p className="mt-4 text-console-foreground/65">{deviceStep ? "Choose your device." : "Choose your layout."}</p><div className="mt-10 grid gap-4 sm:grid-cols-3">{choices.map((c,n)=><Button key={c.value} variant="console" size="console" onClick={()=>choose(n)} onFocus={()=>setSelected(n)} className={`flex min-h-44 flex-col items-start justify-between rounded-lg border border-console-foreground/20 bg-console-panel/60 p-6 text-left ${n===selected ? "ring-2 ring-console-foreground" : ""}`}><c.icon className="size-9"/><span className="text-lg">{c.label}</span></Button>)}</div><div className="mt-8 flex justify-between text-sm text-console-foreground/50"><span>{deviceStep ? "01" : "02"} / 02</span>{!deviceStep && <Button variant="console" size="console" onClick={()=>setPrefs({device:""})}><ArrowLeft/>Device</Button>}</div></div></ConsoleShell>;
}
