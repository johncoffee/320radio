require('dotenv').config({ path: '../../.env' })
const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK(process.env.IPFS_DEPLOY_PINATA__API_KEY, process.env.IPFS_DEPLOY_PINATA__SECRET_API_KEY);

(async function () {

  const list = await pinata.pinList({
    status: 'pinned'
  })

  const p = list.rows
    .map(v => pinata.unpin(v.ipfs_pin_hash))

  await Promise.all(p)

  console.log("unpinned "+p.length)
}())
