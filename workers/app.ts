import { createRequestHandler, unstable_createContext, unstable_RouterContextProvider } from "react-router";

export const CloudflareContext = unstable_createContext<{
  cloudflare: {
    env: Env;
    ctx: ExecutionContext;
  };
}>();

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    const context = new unstable_RouterContextProvider();
    context.set(CloudflareContext, {
      cloudflare: { env, ctx },
    });
    return requestHandler(request, context);
  },
} satisfies ExportedHandler<Env>;
