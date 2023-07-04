<script>
  import RecordPreview from '$lib/components/RecordPreview.svelte'
  export let data
  const artist = data.artist
  const album = data.album
</script>

<h1><a href={artist.url}>{artist.name}</a> / {album.title}</h1>

<div>
  Released: {album.year}<br />
  {#if album.notes}
    Notes: {album.notes}
  {/if}
</div>