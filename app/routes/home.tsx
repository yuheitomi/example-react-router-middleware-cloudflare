import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { CloudflareContext } from "workers/app";
import { unstable_createContext } from "react-router";
import { env } from "cloudflare:workers"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const UserContext = unstable_createContext<{ user: { id: string } }>();

const authMiddleware: Route.unstable_MiddlewareFunction = async ({ request, context }) => {
  const user = { id: "12345" };
  context.set(UserContext, { user });
}

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [authMiddleware];

export function loader({ context }: Route.LoaderArgs) {
  const cfContext = context.get(CloudflareContext);
  const { user } = context.get(UserContext);
  console.log(`User ID: ${user.id}`)
  console.log(env.VALUE_FROM_CLOUDFLARE); // you can instead refer to the env directly
  return { message: cfContext.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome message={loaderData.message} />;
}
