let jsdom = require('jsdom');
let {JSDOM} = jsdom;

let info = {
    'id': 'prequel',
    'name': 'Prequel',
    'image': 'twitter:prequelcomic',
    'feed': 'https://prequeladventure.com/feed'
}

let parse = item => new Promise((res, rej) => {
    img = JSDOM.fragment(item['content:encoded']).querySelector('img')
    desc = JSDOM.fragment(item.content)

    res({
        'title': item.title,
        'desc': desc.textContent,
        'url': item.link,
        'footer': "Preview",
        'thumbnail': `https://prequeladventure.com${img.src}`,
    })
})

module.exports = {info, parse}
