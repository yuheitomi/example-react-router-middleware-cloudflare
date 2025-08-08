import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { CloudflareContext } from "workers/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  const cfContext = context.get(CloudflareContext);
  return { message: cfContext.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome message={loaderData.message} />;
}
