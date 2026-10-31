import type { CSSProperties, ReactNode } from "react";

export function ConsoleShell({ hue = 235, children, bg }: { hue?: number; children: ReactNode; bg?: string }) {
  return (
    <div className="console-shell fixed inset-0 select-none overflow-hidden bg-console-background text-console-foreground" style={{ "--console-hue": hue, "--console-secondary": (hue + 60) % 360 } as CSSProperties}>
      <div className="pointer-events-none absolute inset-0" style={{ background: bg ?? "var(--console-scene)" }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
}