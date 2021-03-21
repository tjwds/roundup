const fetch = require('node-fetch');
const { tokens } = require('./tokens');

const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 8)

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const date = String(now.getDate()).padStart(2, '0');
console.log(`+++
title="article roundup: ${year}${month}${date}"
date=${year}-${month}-${date}
+++
`);
fetch(`https://api.pinboard.in/v1/posts/recent?auth_token=${tokens.apiPhrase}&format=json&tag=${tokens.tagName}`)
    .then(res => res.json())
    .then(res => {
        res.posts.forEach(post => {
            if (new Date(post.time) > weekAgo) {
                const tags = post.tags.split(' ').filter(x => x !== tokens.tagName).join(', ')
                console.log(`[${post.description}](${post.href})  `)
                if (post.extended) {
                    console.log(post.extended + '  ');
                }
                if (tags) {
                    console.log(`Filed under: ${tags}`);
                }
                console.log('');
            }
        })
    })
