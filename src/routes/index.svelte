<script context="module">
	import {
		sumByGroup,
		smallestValue,
		fetchURLs,
		convertArrayToObject,
	} from '$lib/utils';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const {
			ok,
			status,
			content: { gifts, users, settings },
			errors,
		} = await fetchURLs(fetch, [
			{ key: 'gifts', url: '/gifts.json' },
			{ key: 'users', url: '/users.json' },
			{ key: 'settings', url: '/settings.json' },
		]);

		if (ok) {
			const user_balance = Object.fromEntries(
				users.map((user) => [user.id, 0])
			);
			if (gifts.length > 0) {
				const sum_by_user = sumByGroup(gifts, 'family_user_id', 'price');
				const common_ammount = smallestValue(sum_by_user, 'price').price;
				const settings_as_obj = convertArrayToObject(settings, 'user_id');
				for (const sum of sum_by_user) {
					user_balance[sum.family_user_id] = Math.round(
						sum.price -
							common_ammount +
							common_ammount *
								2 *
								(settings_as_obj[sum.family_user_id].weight / 100)
					);
				}
			}
			return {
				props: {
					gifts: gifts,
					users: users,
					user_balance: user_balance,
				},
			};
		}
		const error_message = Object.keys(errors).reduce(
			(res, curr) => `${res}\n${errors[curr]}`,
			''
		);
		return {
			status: status,
			error: new Error(error_message),
		};
	}
</script>

<script>
	import GiftList from '$lib/components/GiftList.svelte';

	export let gifts = null;
	export let users = null;
	export let user_balance = null;
</script>

<div>
	<div class="w-full shadow flex flex-row">
		{#each users as user}
			<div class="stat place-items-center place-content-center">
				<div class="stat-title">{user.alias}</div>
				<div class="stat-value text-primary">{user_balance[user.id]}€</div>
			</div>
		{/each}
	</div>
</div>

{#if gifts && gifts.length > 0}
	<GiftList {...{ gifts, users }} />
{:else}
	No gifts yet
{/if}

<div class="fixed bottom-4 right-4">
	<ul class="menu shadow-lg bg-primary rounded-box horizontal">
		<li>
			<a href="/add">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
			</a>
		</li>
	</ul>
</div>

<style>
	svg {
		@apply text-primary-content;
	}
</style>
