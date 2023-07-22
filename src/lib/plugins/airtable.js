import lodash from 'lodash'
import AirtableCore from 'airtable'
import { format, parseISO } from 'date-fns'
import { AIRTABLE_TOKEN, BASE_ID } from '$env/static/private'

const { find, kebabCase, map, shuffle } = lodash

class Airtable {
  constructor() {
    this.base = new AirtableCore({ apiKey: AIRTABLE_TOKEN }).base(BASE_ID)
  }

  async artists () {
    const results = await this.allArtists()

    const records = await this.base('Records').select().all()
    const shuffledRecords = shuffle(records)

    return map(results, (result) => {
      const name = result.get('Name')
      const record = find(shuffledRecords, r => r.get('Artist')[0] === result.id)
      return {
        name,
        url: '/' + kebabCase(name),
        record: { cover: record.get('Cover') }
      }
    })
  }

  async artist (slug) {
    const artists = await this.allArtists()

    return find(artists, a => slug === kebabCase(a.get('Name')))
  }

  async records (artist, artistSlug) {
    const records = await this.artistRecords(artist)

    return map(records, (r) => {
      const title = r.get('Title')
      return {
        title,
        url: '/' + artistSlug + '/' + kebabCase(title),
        cover: r.get('Cover')
      }
    })
  }

  async record (artist, params) {
    const records = await this.artistRecords(artist)
    const record = find(records, r => kebabCase(r.get('Title')) === params.record)

    if (record) {
      return {
        title: record.get('Title'),
        cover: record.get('Cover'),
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
