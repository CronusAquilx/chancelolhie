import { createFileRoute } from "@tanstack/react-router";
import { ConsoleScreen } from "@/components/console/ConsoleScreen";

export const Route = createFileRoute("/_authenticated/console/store")({
  head: () => ({ meta: [{ title: "Console Store — BirchBlock" }, { name: "description", content: "Browse the original BirchBlock console demo catalog." }, { property: "og:title", content: "Console Store — BirchBlock" }, { property: "og:description", content: "Browse the original BirchBlock console demo catalog." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: () => <ConsoleScreen screen="store" />,
});