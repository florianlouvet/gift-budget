<script context="module">
	import { on_submit_action } from '$lib/on_submit';
	export const prerender = true;
</script>

<script>
	import supabase from '$lib/supabase';
	let signed_up = false;
	let error;
	let loading = false;
</script>

<div>
	{#if !signed_up}
		<form
			class="new"
			use:on_submit_action={{
				pending: () => (loading = true),
				action: async ({ data }) => {
					const { error } = await supabase.auth.signUp(data);
					console.log(error);
					return { ok: !error, data, error };
				},
				result: async ({ form }) => {
					loading = false;
					form.reset();
					signed_up = true;
				},
				error: ({ res }) => {
					loading = false;
					error = res.error.message;
				},
			}}
		>
			{#if error}
				<p>{error}</p>
			{/if}
			<input name="email" aria-label="Email" placeholder="your@email.com" />
			<input
				type="password"
				name="password"
				aria-label="Password"
				placeholder="Password"
			/>
			<button type="submit">
				{#if loading}
					Loading...
				{:else}
					Submit
				{/if}
			</button>
		</form>
	{:else}
		<p>
			You have been signed up, you should receive an email to activate your
			account.
		</p>
	{/if}
</div>
