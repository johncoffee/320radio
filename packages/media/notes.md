emulate the IPFS path:

rm -r ipfs; mkdir -p public ipfs
ipfs add -Qrnw ./public/*.(jpg|html) | xargs -I % sh -c 'ln -s ../public ./ipfs/%'
