<script>
export let artist
export let name
export let url
export let record
const img = record.cover || null
</script>

<figure class="item">
	{#if img && img.url}
		<a href={url}>
			<img class="cover{ record.border ? ' border' : '' }" src="{img.url}" width="{img.width}" height="{img.height}" alt="Cover for “{record.title}” by {artist}" loading="lazy" />
		</a>
	{/if}
	<figcaption>
		<a href={url} class="link">{name}</a>
	</figcaption>
</figure>
