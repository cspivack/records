import Airtable from '$lib/plugins/airtable'

export async function load() {
  const artists = await Airtable.artists()

  return {
    artists
  }
}
