<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, page }) {
		const error = page.query.get('error');
		const res = await fetch('/users.json');

		if (res.ok) {
			return {
				props: {
					users: await res.json(),
					error: error,
				},
			};
		}

		const { message: error_message } = await res.json();
		return {
			status: res.status,
			error: new Error(error_message),
		};
	}
</script>

<script>
	export let users = null;
	export let error = null;
</script>

<h1 class="text-primary text-2xl m-4">Add a new gift</h1>
{#if error}
<div class="alert alert-error m-4">
	<div class="flex-1">
	  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">    
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
	  </svg> 
	  <label>{error}</label>
	</div>
  </div>
{/if}
<form action="/gifts.json" method="post" class="flex flex-col items-stretch">
	<div class="px-6 card bordered">
		<div class="form-control my-3">
			<label class="label" for="description">
				<span class="label-text">Description</span>
			</label>
			<textarea
				class="textarea h-24 textarea-bordered"
				placeholder="Description"
				name="description"
			/>
		</div>
		<div class="form-control my-3">
			{#each users as user}
				<label class="cursor-pointer label">
					<span class="label-text">{user.alias}'s family</span>
					<input
						type="radio"
						name="family_user_id"
						class="radio"
						value={user.id}
					/>
				</label>
			{/each}
		</div>
		<div class="form-control my-3">
			<label class="label" for="price">
				<span class="label-text">Price</span>
			</label>
			<label class="input-group input-group-md">
				<input type="text" name="price" class="input input-bordered input-md flex-1" />
				<span>€</span>
			</label>
		</div>
        <button class="btn btn-primary">Save</button>
	</div>
</form>
