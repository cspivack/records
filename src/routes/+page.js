import { kebabCase, map } from 'lodash'
import artists from '$lib/data/artists.json'

export async function load() {
	const mapped = map(artists, (a) => {
		return {
			name: a.name,
			url: '/' + kebabCase(a.name)
		}
	})

	return {
		artists: mapped
	}
}