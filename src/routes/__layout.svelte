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
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<Header/>
<slot />
