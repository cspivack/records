import { error } from '@sveltejs/kit'
import Airtable from '$lib/plugins/airtable'

export async function load({ params }) {
  const artist = await Airtable.artist(params.artist)

  if (artist) {
    const record = await Airtable.record(artist, params)

    if (record) {
      return {
        artist: {
          name: artist.get('Name'),
          url: '/' + params.artist
        },
        record
      }
    }
  }

  throw error(404, 'Not found');
}
