import { error } from '@sveltejs/kit'
import Airtable from '$lib/plugins/airtable'

export async function load({ params }) {
  const artist = await Airtable.artist(params.artist)

  if (artist) {
    const records = await Airtable.records(artist, params.artist)

    return {
      artist: artist.get('Name'),
      slug: params.artist,
      records
    }
  }

  throw error(404, 'Not found');
}
