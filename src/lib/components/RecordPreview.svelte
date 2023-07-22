<script>
export let artist
export let name
export let url
export let record

const img = record.cover ? record.cover[0].thumbnails.large : null
</script>

<figure class="item">
	{#if record.cover}
		<a href={url}>
			<img class="cover" src="{img.url}" width="{img.width}" height="{img.height}" alt="Cover for {record.title} by {artist}" />
		</a>
	{/if}
	<figcaption>
		<a href={url} class="link">{name}</a>
	</figcaption>
</figure>