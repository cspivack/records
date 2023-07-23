import lodash from 'lodash'
import AirtableCore from 'airtable'
import { format, parseISO } from 'date-fns'
import { AIRTABLE_TOKEN, BASE_ID } from '$env/static/private'
import Downloader from '$lib/plugins/downloader'

const { find, kebabCase, map, shuffle } = lodash

class Airtable {
  constructor() {
    this.base = new AirtableCore({ apiKey: AIRTABLE_TOKEN }).base(BASE_ID)
  }

  async artists () {
    const results = await this.allArtists()

    const records = await this.base('Records').select().all()
    const shuffledRecords = shuffle(records)

    const artists = []

    for (let i=0; i<results.length; i++) {
      const result = results[i]
      const name = result.get('Name')
      const record = find(shuffledRecords, r => r.get('Artist')[0] === result.id)

      const cover = await Downloader.cover(result, record)

      artists.push({
        name,
        url: '/' + kebabCase(name),
        record: { title: record.get('Title'), cover }
      })
    }

    return artists
  }

  async artist (slug) {
    const artists = await this.allArtists()

    return find(artists, a => slug === kebabCase(a.get('Name')))
  }

  async records (artist, artistSlug) {
    const results = await this.artistRecords(artist)

    const records = []

    for (let i=0; i<results.length; i++) {
      const r = results[i]

      const title = r.get('Title')
      const cover = await Downloader.cover(artist, r)

      records.push({
        title,
        url: '/' + artistSlug + '/' + kebabCase(title),
        cover
      })
    }

    return records
  }

  async record (artist, params) {
    const records = await this.artistRecords(artist)
    const record = find(records, r => kebabCase(r.get('Title')) === params.record)

    const cover = await Downloader.cover(artist, record)

    if (record) {
      return {
        title: record.get('Title'),
        cover,
        date: format(parseISO(record.get('Release date')), 'LLL do, Y'),
        dupe: record.get('Duplicate'),
        notes: record.get('Notes')
      }
    }

    return null
  }

  async allArtists () {
    return await this.base('Artists').select({
      sort: [ { field: 'Sort name', direction: 'asc' } ]
    }).all()
  }

  async artistRecords (artist) {
    return await this.base('Records').select({
      sort: [ { field: 'Release date', direction: 'asc' } ],
      filterByFormula: 'IF(Artist = \'' + artist.get('Name') + '\', TRUE(), FALSE())'
    }).all()
  }
}

export default new Airtable()
