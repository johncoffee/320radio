
# How to make a playlist

1. find soundcloud songs and/or playlists
2. download the music and place it in tmp
3. enter tmp and `ipfs add -wQ *.mp3` IPFS the files to IPFS, note down the root hash
4. export the files to a plain text list `ipfs ls Qm.. > /tmp/playlist.txt` 
5. generate a playlist `node files-to-playlist.js /tmp/playlist.txt`
6. use the playlist in the web app `cp /tmp/playlist.json ../webapp/src/data`

Then you might want to pin the root hash of the mp3 files on Pinata

# development

Emulate the IPFS path of the default media library:

`
rm -r ipfs; mkdir -p public ipfs
`

`
ipfs add -Qnw ./public/*.(jpg|html) | xargs -I % sh -c 'ln -s ../public ./ipfs/%'
`

 

# TODO 

use ipfs object get --enc json