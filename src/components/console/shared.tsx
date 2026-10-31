import { artStyle, type ConsoleGame } from "@/lib/console/catalog";
import type { Lib } from "@/lib/console/store";
import { cn } from "@/lib/utils";

export function GameArt({ game, className, title = true, titleClass }: { game: ConsoleGame; className?: string; title?: boolean; titleClass?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={artStyle(game.hue)}>
      {title && <span className={cn("absolute inset-x-2 top-1/3 text-center text-sm font-extrabold uppercase leading-tight drop-shadow md:text-lg", titleClass)}>{game.title}</span>}
    </div>
  );
}

export function statusOf(g: ConsoleGame, lib: Lib) {
  if (lib.installed.includes(g.id)) return "Installed";
  if (g.id in lib.progress) return `Installing ${Math.floor(lib.progress[g.id])}%`;
  return g.badge;
}

export function Avatar({ initial, className }: { initial: string; className?: string }) {
  return <span className={cn("flex items-center justify-center rounded-full bg-console-foreground/20 font-semibold", className)}>{initial}</span>;
}