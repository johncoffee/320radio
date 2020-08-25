require('dotenv').config({ path: '../../.env' })
const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK(process.env.IPFS_DEPLOY_PINATA__API_KEY, process.env.IPFS_DEPLOY_PINATA__SECRET_API_KEY);

// pinata.testAuthentication().then((result) => {
//   //handle successful authentication here
//   console.log(result);
// }).catch((err) => {
//   //handle error here
//   console.log(err);
// });

(async function () {

  const list = await pinata.pinList({
    status: 'pinned'
  })

  const p = list.rows
    .filter(v => v.metadata)
    .filter(v => v.metadata.name === "_dnslink.zerosleep.dk")
    .map(v => pinata.unpin(v.ipfs_pin_hash))

  await Promise.all(p)

  console.log("unpinned "+p.length)
}())
