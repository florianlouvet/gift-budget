<script context="module">
	export async function load({ page }) {
		const error = page.query.get('error');
		if (error) {
			return {
				props: {
					error: error,
				},
			};
		}
		return {};
	}
</script>

<script>
	export let error = null;
	let loading = false;
</script>

<div>
	<form class="new" action="/signin.json" method="post">
		{#if error}
			<p>{error}</p>
		{/if}
		<input
			name="email"
			id="email"
			aria-label="Email"
			placeholder="your@email.com"
		/>
		<input
			type="password"
			name="password"
			aria-label="Password"
			placeholder="Password"
			id="password"
		/>
		<button type="submit">
			{#if loading}
				Loading...
			{:else}
				Submit
			{/if}
		</button>
	</form>
</div>
