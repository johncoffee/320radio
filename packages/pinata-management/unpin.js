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

  console.log(`looking for _dnslink.${process.env.IPFS_DEPLOY_CLOUDFLARE__ZONE}`)

  const p = list.rows
    .filter(v => v.metadata &&
      typeof v.metadata.name === 'string' &&
      v.metadata.name.includes(`_dnslink.${process.env.IPFS_DEPLOY_CLOUDFLARE__ZONE}`)
    )
    .map(v => pinata.unpin(v.ipfs_pin_hash))

  await Promise.all(p)

  console.log("unpinned "+p.length)
}())
