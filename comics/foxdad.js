let jsdom = require('jsdom');
let {JSDOM} = jsdom;

let info = {
    'id': 'foxdad',
    'name': 'Fox Dad',
    'image': 'tumblr:foxdadcomic',
    'feed': 'http://foxdad.com/rss'
}

let parse = item => new Promise((res, rej) => {
    frag = JSDOM.fragment(item.content)

    res({
        'title': frag.querySelector('p').textContent.replace(/\n/g,''),
        'url': item.link,
        'image': frag.querySelector('img').src.replace('_500', '_1280')
    })
})

module.exports = {info, parse}
