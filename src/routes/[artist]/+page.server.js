import { error } from '@sveltejs/kit'
import Prismic from '$lib/plugins/prismic'

export async function load({ params }) {
  const artist = await Prismic.artist(params.artist)

  if (artist) {
    const records = await Prismic.recordsBy(params.artist)

    return {
      artist: artist.data.name,
      slug: params.artist,
      records
    }
  }

  throw error(404, 'Not found')
}
