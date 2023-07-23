<script>
  import RecordPreview from '$lib/components/RecordPreview.svelte'
  export let data
  const artist = data.artist
  const record = data.record

  const img = record.cover || null
</script>

<svelte:head>
  <title>{artist.name} – {record.title} | Record Collection</title>
</svelte:head>

<h1><a href={artist.url} class="link">{artist.name}</a> / {record.title}</h1>

{#if record.cover}
<figure class="item record-view">
    <img class="cover" src="{img.url}" width="{img.width}" height="{img.height}" alt="Cover for {record.title} by {artist.name}" loading="lazy" />
</figure>
{/if}

<div>
  Released: {record.date}<br />
  {#if record.notes}
    Notes: {record.notes}
  {/if}
</div>
