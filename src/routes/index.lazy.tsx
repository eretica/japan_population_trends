import { createLazyFileRoute } from "@tanstack/react-router";
import { RootPage } from "@/pages/root/root.page.tsx";

export const Route = createLazyFileRoute("/")({
  component: RootPage,
});
