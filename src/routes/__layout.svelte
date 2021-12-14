<script context="module" lang="ts">
	const publicPages = ['/', '/signin', '/signup'];
	export async function load({ page, session }) {
		const { path } = page;
		if (!session.user) {
			if (publicPages.includes(path)) {
				return {};
			}
			return { status: 403, error: new Error('Forbidden') };
		}
		return {};
	}
</script>

<script>
	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
