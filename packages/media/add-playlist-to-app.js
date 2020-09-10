const { writeFileSync } = require('fs')
const { join } = require('path')
const { exec } = require('child_process')

const songsDir = join(__dirname, 'tmp/songs')

run()

function run () {
  exec(`echo "$(ipfs add -wnQ ${songsDir}/*.mp3)" | ipfs ls`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }

    const lines = stdout.trim().split(/\n/)

    const dataColumns = lines.filter(l => !!l)
      .filter(line => line.endsWith('.mp3')).map(line => {
        const hash = line.substr(0, line.indexOf(' '))
        const result = line.match(/ \d+ /)
        const size = (result[0] || '').trim()
        const filename = line.replace(hash, '').replace(size, '').trim()
        const [artist, title] = filename.split(' - ')
        const mp3 = `/ipfs/${hash}`
        return {
          coverImage: "/ipfs/QmTkrWU7snLwQC8VG16GwMWJT82tYrFfb5CjHoVHJQL2xk",
          mp3,
          artist,
          title: title.replace(/\-\d+\.mp3$/, '')
        }
      })

    writeFileSync(join(__dirname, '../webapp/src/data/playlist.json'),
      JSON.stringify(dataColumns, null, 2))

    console.log(`wrote ${dataColumns.length} songs to ` +join(__dirname, '../webapp/src/data/playlist.json'))
  })
}
