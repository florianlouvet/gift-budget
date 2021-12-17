<script context="module" lang="ts">
	const publicPages = ['/signin'];
	export async function load({ page, session }) {
		const { path } = page;
		if (!session.user) {
			if (publicPages.includes(path)) {
				return {};
			}
			return { status: 302, redirect: '/signin' };
		}
		return {};
	}
</script>

<script>
	import '../app.css';
	import Menu from '$lib/components/Menu.svelte';
	import { navigating } from '$app/stores';
</script>

<div class="flex flex-col h-screen">
	<Menu />
	{#if $navigating}
		<p>Loading...</p>
	{:else}
		<slot />
	{/if}
</div>
