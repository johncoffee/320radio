const {readFileSync, writeFileSync} = require('fs')

const filepath = process.argv[2] || './playlist.txt'

const buffer = readFileSync(filepath)
const lines = buffer.toString().trim().split(/\n/)

const dataColumns = lines.filter(l => !!l).map(line => {
  const hash = line.substr(0,line.indexOf(' '))
  const result = line.match(/ \d+ /)
  const size = (result[0] || '').trim()
  const filename = line.replace(hash, '').replace(size, '').trim()
  const [artist, title] = filename.split(' - ')
  const mp3 = `/ipfs/${hash}`
  return {
    hash, size , filename, artist, mp3,
    title: title.replace(/\-\d+\.mp3$/,'')
  }
})

// console.log(dataColumns)
writeFileSync('/tmp/playlist.json', JSON.stringify(dataColumns, null, 2))