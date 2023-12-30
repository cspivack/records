<script>
  import { PrismicRichText } from '@prismicio/svelte'
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

{#if img && img.url }
<figure class="item record-view">
    <img class="cover{ record.border ? ' border' : '' }" src="{img.url}" width="{img.width}" height="{img.height}" alt="Cover for {record.title} by {artist.name}" loading="lazy" />
</figure>
{/if}

<div class="record-info">
  <div class="line"><strong>Released</strong><br />{record.date}</div>
  {#if record.notes}
    <div class="line">
      <strong>Notes</strong>
      <div class="notes-wrapper">
        <PrismicRichText field="{record.notes}" />
      </div>
    </div>
  {/if}
</div>
