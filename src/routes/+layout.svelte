<script>
import Header from '$lib/components/Header.svelte'
import '$lib/styles/styles.scss'
</script>

<Header />

<main id="main">
	<div class="container">
		<slot />
	</div>
</main>