<script>
import RecordPreview from '$lib/components/RecordPreview.svelte'
export let data
</script>

<h1>Bands</h1>

<div class="artists">
	{#each data.artists as artist}
	<RecordPreview name={artist.name} url={artist.url} record={artist.record} />
	{/each}
</div>