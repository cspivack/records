import { error } from '@sveltejs/kit'
import lodash from 'lodash'
import artists from '$lib/data/artists.json'

const { find, kebabCase } = lodash

export async function load({ params }) {
  const artist = find(artists, a => params.artist === kebabCase(a.name))

  if (artist) {
    const album = find(artist.records, a => params.album === kebabCase(a.title))
    return {
      artist: {
        name: artist.name,
        url: '/' + params.artist
      },
      album
    }
  }

  throw error(404, 'Not found');
}