import adapterStatic from "@sveltejs/adapter-static";
import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import { sequence } from "@sveltejs/kit/hooks";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";


const preprocess = sveltePreprocess({
	postcss: {
		plugins: [autoprefixer]
	}
});
const config = {
	preprocess: [sequence([preprocess, vitePreprocess()]), vitePreprocess({ })],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapterStatic()
	}
};

export default config;
