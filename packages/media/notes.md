emulate the IPFS path:

rm -r ipfs; mkdir -p public ipfs
ipfs add -Qrnw ./public/*.(jpg|html) | xargs -I % sh -c 'ln -s ../public ./ipfs/%'

----

SC source

Master list

url: https://soundcloud.com/stems320colab/stmsrnd02trck03-keufe 
cover: https://images.unsplash.com/photo-1594765461268-0246d240df5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60
  
url: https://www.youtube.com/watch?v=4TKcz5AqcnQ

# How to make a playlist

1. find soundcloud songs and/or playlists
2. download the music and place it in tmp
3. enter tmp and `ipfs add -wQ public/*.mp3` IPFS the files to IPFS, note the root hash
4. export the files to a plain text list `ipfs ls Qm.. > /tmp/playlist.txt` 
5. generate a playlist from the root hash `node files-to-playlist.js /tmp/playlist.txt`

Then use the playlist `cp /tmp/playlist.json ../webapp/src/data`