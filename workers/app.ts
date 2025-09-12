import {
	createContext,
	createRequestHandler,
	RouterContextProvider,
} from "react-router";

export const CloudflareContext = createContext<{
	cloudflare: {
		env: Env;
		ctx: ExecutionContext;
	};
}>();

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request, env, ctx) {
		const context = new RouterContextProvider();
		context.set(CloudflareContext, {
			cloudflare: { env, ctx },
		});
		return requestHandler(request, context);
	},
} satisfies ExportedHandler<Env>;
