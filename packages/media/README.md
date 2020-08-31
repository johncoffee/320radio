# Create and add a playlist

`node packages/media/add-playlist-to-app.js`

# How to make a playlist (manual step by step)

1. Download/gather songs, place them in tmp/songs  
   `cd tmp/songs` then
   `youtube-dl https://soundcloud.com/some-artist-x/sets/some-nice-songs`
2. add only the mp3 files, then output the list of songs to a temp file
   `echo "$(ipfs add -wQ *.mp3)" | ipfs ls > /tmp/playlist.txt`    
3. generate a playlist from the temp file 
   `node ../../files-to-playlist.js /tmp/playlist.txt`
4. move the playlist to the web app 
   `mv /tmp/playlist.json ../../../webapp/src/data/`
5. Deploy the web app again with the playlist baked in
6. Pin the songs to Pinata (either by pinning the root hash from step 3, or using 
   `npm run deploy-media` (project root))

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