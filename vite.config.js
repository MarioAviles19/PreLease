import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
const pkg = require('./package.json');

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		//noExternal: Object.keys(pkg.dependencies || {})
	  },
	 
});
