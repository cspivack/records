import https from 'https'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import lodash from 'lodash'

const { kebabCase } = lodash

const prepareCover = (cover, filename) => {
  return {
    url: '/covers/' + filename,
    width: cover.width,
    height: cover.height
  }
}

class Downloader {
  async cover(artist, record) {
    const cover = record.get('Cover')

    if (cover) {
      const extension = path.extname(cover[0].filename)
      const filename = kebabCase(artist.get('Name') + ' ' + record.get('Title')) + extension
      const pathname = 'static/covers/' + filename

      const thumbnail = cover[0].thumbnails.large

      if (fs.existsSync(pathname)) {
        return prepareCover(thumbnail, filename)
      }

      https.get(thumbnail.url, (res) => {
          const fileStream = fs.createWriteStream(pathname)
          res.pipe(fileStream);

          fileStream.on('finish', () => {
              fileStream.close()
              return prepareCover(thumbnail, filename)
          })
      })
    }

    return null
  }
}

export default new Downloader()
