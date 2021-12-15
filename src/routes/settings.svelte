<script>
	export let error = null;
</script>

<h1>Settings</h1>

<div>
	<form class="new" action="/signin.json" method="post">
		{#if error}
			<p>{error}</p>
		{/if}
		<label for="flo-percentage">Florian's percentage</label>
		<input
			name="email"
			id="email"
			aria-label="Email"
			placeholder="your@email.com"
		/>
        <p>For who's family</p>
		<input type="radio" id="html" name="fav_language" value="HTML">
		<label for="html">HTML</label><br>
		<input type="radio" id="css" name="fav_language" value="CSS">
		<label for="css">CSS</label><br>
		<input type="radio" id="javascript" name="fav_language" value="JavaScript">
		<label for="javascript">JavaScript</label>
		<button type="Add">
			{#if loading}
				Loading...
			{:else}
				Submit
			{/if}
		</button>
	</form>
</div>
