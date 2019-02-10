let jsdom = require('jsdom');
let {JSDOM} = jsdom;

let info = {
    'id': 'savestate',
    'name': 'Savestate',
    'image': 'twitter:savestatecomic',
    'feed': 'http://savestatecomic.com/feed'
}

let parse = item => new Promise(res => {
    img = JSDOM.fragment(item.content).querySelector('img')
    desc = JSDOM.fragment(item['content:encoded']).querySelector('p')

    res({
        'title': item.title,
        'url': item.link,
        'desc': desc.textContent,
        'image': img.src.replace('comics-rss', 'comics')
    })
})

module.exports = {info, parse}
