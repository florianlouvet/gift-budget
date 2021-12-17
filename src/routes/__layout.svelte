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
	import HearthLoader from '$lib/components/HearthLoader.svelte';
</script>

<div class="flex flex-col h-screen w-full">
	<Menu />
	{#if $navigating}
		<HearthLoader />
	{:else}
		<slot />
	{/if}
</div>
