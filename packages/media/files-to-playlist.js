const {readFileSync, writeFileSync} = require('fs')

const filepath = process.argv[2]

const buffer = readFileSync(filepath)
const lines = buffer.toString().trim().split(/\n/)

const dataColumns = lines.filter(l => !!l)
.filter(line => line.endsWith('.mp3')).map(line => {
  const hash = line.substr(0,line.indexOf(' '))
  const result = line.match(/ \d+ /)
  const size = (result[0] || '').trim()
  const filename = line.replace(hash, '').replace(size, '').trim()
  const [artist, title] = filename.split(' - ')
  const mp3 = `/ipfs/${hash}`
  return {
    mp3,
    artist,
    title: title.replace(/\-\d+\.mp3$/,'')
  }
})

// console.log(dataColumns)
writeFileSync('/tmp/playlist.json', JSON.stringify(dataColumns, null, 2))
