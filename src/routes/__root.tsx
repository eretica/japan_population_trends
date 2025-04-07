import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AppHeader } from "@/components/AppHeader";

export const Route = createRootRoute({
  component: () => (
    <>
      <AppHeader />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
