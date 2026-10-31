import { createFileRoute } from "@tanstack/react-router";
import { ConsoleScreen } from "@/components/console/ConsoleScreen";

export const Route = createFileRoute("/_authenticated/console/profile")({
  head: () => ({ meta: [{ title: "Console Profile — BirchBlock" }, { name: "description", content: "Your BirchBlock console player profile." }, { property: "og:title", content: "Console Profile — BirchBlock" }, { property: "og:description", content: "Your BirchBlock console player profile." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: () => <ConsoleScreen screen="profile" />,
});