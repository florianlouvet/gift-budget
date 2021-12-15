import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: vercel(),
		target: '#svelte',
		// ssr: false
	},

	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};
