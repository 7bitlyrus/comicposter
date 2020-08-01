const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const info = {
    'id': 'prequel',
    'name': 'Prequel',
    'image': 'https://i.imgur.com/xjymQki.png',
    'feed': 'https://prequeladventure.com/feed'
}

const parse = item => new Promise((res, rej) => {
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
