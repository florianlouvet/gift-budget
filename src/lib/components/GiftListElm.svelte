<script>
	export let description = '';
	export let family_user = '';
	export let price = 0;
</script>

<div class="flex my-1 mx-2 bg-base-300 py-2 px-4 flex-row items-center place-content-between rounded">
	<div class="flex flex-col">
		<p class="text-lg">{description}</p>
		<p class="text-sm">{family_user.alias}'s family</p>
	</div>
	<div>
		<p class="text-lg">{price}€</p>
	</div>
</div>
