import lodash from 'lodash'
import artists from '$lib/data/artists.json'

const { kebabCase, map } = lodash

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