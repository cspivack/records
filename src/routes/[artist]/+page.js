import { error } from '@sveltejs/kit'
import { find, kebabCase, map } from 'lodash'
import artists from '$lib/data/artists.json'

export async function load({ params }) {
  const artist = find(artists, a => params.artist === kebabCase(a.name))

  if (artist) {
    const records = map(artist.records, (r) => {
      return {
        title: r.title,
        url: '/' + params.artist + '/' + kebabCase(r.title)
      }
    })
    return {
      artist: artist.name,
      slug: params.artist,
      records
    }
  }

  throw error(404, 'Not found');
}