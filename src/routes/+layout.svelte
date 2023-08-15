<script>
import { fade } from 'svelte/transition'
import Header from '$lib/components/Header.svelte'
import '$lib/styles/styles.scss'

export let data
$: pathname = data.pathname
</script>

<svelte:head>
<link rel="preconnect" href="https://fonts.bunny.net">
<link href="https://fonts.bunny.net/css?family=jost:400,600" rel="stylesheet" />
</svelte:head>

<Header />

<main id="main">
	<div class="container">
    {#key pathname}
  		<div
        in:fade={{ duration: 200, delay: 300 }}
        out:fade={{ duration: 200 }}
      >
        <slot />
      </div>
    {/key}
	</div>
</main>
