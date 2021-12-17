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
</script>

<h1 class="text-primary text-2xl m-4">Login</h1>
{#if error}
	<div class="alert alert-error m-4">
		<div class="flex-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="w-6 h-6 mx-2 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
				/>
			</svg>
			<label>{error}</label>
		</div>
	</div>
{/if}
<form action="/signin.json" method="post" class="flex flex-col items-stretch">
	<div class="px-6 card bordered">
		<div class="form-control my-3">
			<label class="label" for="email">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				class="input input-bordered"
				name="email"
				id="email"
				aria-label="Email"
				placeholder="your@email.com"
			/>
		</div>
		<div class="form-control my-3">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input
				class="input input-bordered"
				type="password"
				name="password"
				aria-label="Password"
				placeholder="Password"
				id="password"
			/>
		</div>
		<button class="btn btn-primary" type="submit">Login</button>
	</div>
</form>
