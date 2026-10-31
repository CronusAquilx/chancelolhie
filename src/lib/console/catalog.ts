import type { CSSProperties } from "react";

export type ConsoleGame = {
  id: string;
  title: string;
  tagline: string;
  genre: string;
  hue: number;
  badge: "Free" | "Included" | "New";
  /** Optional launch link. Add your own games here. */
  url?: string;
};

// Original demo catalog. Replace/extend with your own games.
export const CATALOG: ConsoleGame[] = [
  { id: "neon-drift", title: "Neon Drift", tagline: "Slide through the city after midnight.", genre: "Racing", hue: 290, badge: "Free" },
  { id: "skyline-siege", title: "Skyline Siege", tagline: "Hold the rooftops. Hold the line.", genre: "Strategy", hue: 210, badge: "Included" },
  { id: "ember-vault", title: "Ember Vault", tagline: "Something old is burning below.", genre: "Adventure", hue: 18, badge: "New" },
  { id: "tidebreaker", title: "Tidebreaker", tagline: "Ride the storm to the edge of the map.", genre: "Action", hue: 190, badge: "Free" },
  { id: "lumen-run", title: "Lumen Run", tagline: "Outrun the dark, one light at a time.", genre: "Platformer", hue: 55, badge: "Included" },
  { id: "hollow-peaks", title: "Hollow Peaks", tagline: "Climb together. Fall together.", genre: "Co-op", hue: 150, badge: "Free" },
  { id: "orbit-smith", title: "Orbit Smith", tagline: "Build a station. Survive the silence.", genre: "Sim", hue: 250, badge: "Included" },
  { id: "pixel-harbor", title: "Pixel Harbor", tagline: "A cozy port town needs a captain.", genre: "Sim", hue: 175, badge: "Free" },
  { id: "glasswing", title: "Glasswing", tagline: "Fragile wings. Fearless flight.", genre: "Adventure", hue: 320, badge: "New" },
  { id: "cinder-court", title: "Cinder Court", tagline: "Settle it on the sand.", genre: "Fighting", hue: 5, badge: "Free" },
  { id: "moss-and-mortar", title: "Moss & Mortar", tagline: "Rebuild the ruins, stone by stone.", genre: "Puzzle", hue: 120, badge: "Included" },
  { id: "static-bloom", title: "Static Bloom", tagline: "Tune in. Something is growing.", genre: "Puzzle", hue: 270, badge: "Free" },
];

export const gameById = (id: string | null | undefined) => (id ? CATALOG.find((g) => g.id === id) : undefined);

export function artStyle(hue: number): CSSProperties {
  return { "--console-art-hue": hue, "--console-art-secondary": (hue + 50) % 360, backgroundImage: "var(--console-art)" } as CSSProperties;
}