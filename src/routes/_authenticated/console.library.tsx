import { createFileRoute } from "@tanstack/react-router";
import { ConsoleScreen } from "@/components/console/ConsoleScreen";

export const Route = createFileRoute("/_authenticated/console/library")({
  head: () => ({ meta: [{ title: "Console Library — BirchBlock" }, { name: "description", content: "View your installed console demos and wishlist." }, { property: "og:title", content: "Console Library — BirchBlock" }, { property: "og:description", content: "View your installed console demos and wishlist." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: () => <ConsoleScreen screen="library" />,
});