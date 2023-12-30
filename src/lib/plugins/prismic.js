import lodash from 'lodash'
import * as prismic from '@prismicio/client'
import { format, parseISO } from 'date-fns'
import { PRISMIC_API_REPO as repositoryName, PRISMIC_API_TOKEN as accessToken } from '$env/static/private'
const { find, map, shuffle } = lodash

class Prismic {
  constructor() {
    this.client = prismic.createClient(repositoryName, { accessToken })
  }

  async artists () {
    const artistsResponse = await this.client.getAllByType('artist', {
      orderings: {
        field: 'my.artist.sort_name',
        direction: 'asc',
      }
    })
    const records = await this.client.getAllByType('record')
    const shuffledRecords = shuffle(records)

    const artists = []

    for (let i=0; i<artistsResponse.length; i++) {
      const a = artistsResponse[i]
      const record = find(shuffledRecords, r => r.data.artist.uid === a.uid)
      artists.push({
        name: a.data.name,
        url: '/' + a.uid,
        record: record ? { title: record.data.title, cover: record.data.cover, border: record.data.add_border } : { title: null, cover: null, border: null }
      })
    }
    return artists
  }

  async artist (name) {
    return await this.client.getByUID('artist', name)
  }

  async records () {
    return await this.client.getAllByType('record')
  }

  async recordsBy (name) {
    const artist = await this.client.getByUID('artist', name)
    const records = await this.client.getAllByType('record', {
      filters: [prismic.filter.at('my.record.artist', artist.id)],
      orderings: {
        field: 'my.record.release_date',
        direction: 'asc',
      }
    })

    return map(records, r => {
      return {
        title: r.data.title,
        cover: r.data.cover,
        url: '/' + name + '/' + r.uid,
        border: r.data.add_border,
      }
    })
  }

  async record (artist, record) {
    const r = await this.client.getByUID('record', record, {
      filters: [prismic.filter.at('my.record.artist', artist.id)]
    })
    return {
      title: r.data.title,
      cover: r.data.cover,
      border: r.data.add_border,
      date: format(parseISO(r.data.release_date), 'LLLL do, Y'),
      notes: r.data.notes.length ? r.data.notes : null,
    }
  }
}
export default new Prismic()
