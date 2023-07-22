<script>
  import RecordPreview from '$lib/components/RecordPreview.svelte'
  export let data
  const artist = data.artist
  const record = data.record

  const img = record.cover ? record.cover[0].thumbnails.large : null
</script>

<h1><a href={artist.url} class="link">{artist.name}</a> / {record.title}</h1>

{#if record.cover}
<figure class="item">
    <img class="cover" src="{img.url}" width="{img.width}" height="{img.height}" alt="Cover for {record.title} by {artist}" />
</figure>
{/if}

<div>
  Released: {record.date}<br />
  {#if record.notes}
    Notes: {record.notes}
  {/if}
</div>
