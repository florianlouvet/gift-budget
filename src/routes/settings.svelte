<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, page }) {
		const error = page.query.get('error');
		const settings_response = await fetch('/settings.json');
		const user_response = await fetch('/users.json');

		let error_message = null;
		let status = 200;
		if (settings_response.ok) {
			if (user_response.ok) {
				return {
					props: {
						settings: await settings_response.json(),
						users: await user_response.json(),
						error: error,
					},
				};
			} else {
				error_message = await user_response.json().message;
				status = user_response.status;
			}
		} else {
			error_message = await settings_response.json().message;
			status = settings_response.status;
		}
		return {
			status: status,
			error: new Error(error_message),
		};
	}
</script>

<script>
	import { convertArrayToObject } from '$lib/utils';
	export let users = null;
	export let settings = null;
	export let error = null;
	const users_as_obj = convertArrayToObject(users, 'id');
</script>


<h1 class="text-primary text-2xl m-4">Settings</h1>
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
<form action="/settings.json" method="post" class="flex flex-col items-stretch">
	<div class="px-6 card bordered">
		{#each settings as setting}
			<div class="form-control my-3">
				<label class="label" for="flo-perc">
					<span class="label-text">{users_as_obj[setting.user_id].alias}'s weight</span>
				</label>
				<label class="input-group input-group-md">
					<input type="text" name={setting.id} class="input input-bordered input-md flex-1" value={setting.weight} />
					<span>%</span>
				</label>
			</div>
		{/each}
        <button class="btn btn-primary">Save</button>
	</div>
</form>
