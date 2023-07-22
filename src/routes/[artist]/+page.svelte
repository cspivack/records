<script>
  import RecordPreview from '$lib/components/RecordPreview.svelte'
  export let data
  const artist = data.artist
  const slug = data.slug
  const records = data.records
</script>

<h1>{artist}</h1>

<div class="records">
	{#each records as record}
		<RecordPreview artist="{artist}" name="{record.title}" url="{record.url}" record="{record}" />
	{/each}
</div>