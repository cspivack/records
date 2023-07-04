<script>
import RecordPreview from '$lib/components/RecordPreview.svelte'
export let data
</script>

<h1>Records</h1>

<div class="artists">
	{#each data.artists as artist}
	<RecordPreview name={artist.name} url={artist.url} />
	{/each}
</div>