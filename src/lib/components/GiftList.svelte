<script>
	import GiftListElm from './GiftListElm.svelte';
	import { convertArrayToObject } from '$lib/utils';
	export let gifts = [];
	export let users = [];
	const internal_gifts = [...gifts];
	const users_as_obj = convertArrayToObject(users, 'id');
	internal_gifts.forEach(element => {
		element.family_user = users_as_obj[element.family_user_id]
	});
</script>

<div class="flex flex-col flex-auto overflow-y-auto min-h-0 my-1">
	{#each gifts as gift}
		<GiftListElm {...gift} />
	{/each}
</div>
