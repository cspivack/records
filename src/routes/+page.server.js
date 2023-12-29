import Prismic from '$lib/plugins/prismic'

export async function load() {
  const artists = await Prismic.artists()
  return {
    artists
  }
}
