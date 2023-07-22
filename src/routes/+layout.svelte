<script>
import Header from '$lib/components/Header.svelte'
import '$lib/styles/styles.scss'
</script>

<svelte:head>
<link rel="preconnect" href="https://fonts.bunny.net">
<link href="https://fonts.bunny.net/css?family=jost:400,600" rel="stylesheet" />
</svelte:head>

<Header />

<main id="main">
	<div class="container">
		<slot />
	</div>
</main>