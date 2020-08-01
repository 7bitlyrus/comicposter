const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const info = {
    'id': 'savestate',
    'name': 'Savestate',
    'image': 'facebook:savestatecomic',
    'feed': 'http://savestatecomic.com/feed'
}

const parse = item => new Promise(res => {
    img = JSDOM.fragment(item.content).querySelector('img')
    desc = JSDOM.fragment(item['content:encoded']).querySelector('p:nth-of-type(2)')

    res({
        'title': item.title,
        'url': item.link,
        'desc': desc.textContent,
        'image': img.src.replace('-150x150', '')
    })
})

module.exports = {info, parse}
