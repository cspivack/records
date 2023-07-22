<script>
import RecordPreview from '$lib/components/RecordPreview.svelte'
export let data
</script>

<svelte:head>
  <title>Record Collection</title>
</svelte:head>

<h1>Bands</h1>

<div class="artists">
	{#each data.artists as artist}
	<RecordPreview artist={artist.name} name="{artist.name}" url={artist.url} record={artist.record} />
	{/each}
</div>
