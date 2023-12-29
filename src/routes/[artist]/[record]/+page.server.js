import { error } from '@sveltejs/kit'
import Prismic from '$lib/plugins/prismic'

export async function load({ params }) {
  try {
    const artist = await Prismic.artist(params.artist)

    const record = await Prismic.record(artist, params.record)

    return {
      artist: {
        name: artist.data.name,
        url: '/' + params.artist,
      },
      record
    }
  } catch (e) {
    throw error(404, 'Not found')
  }
}
