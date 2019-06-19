const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const info = {
    'id': 'twokinds',
    'name': 'Twokinds',
    'image': 'facebook:twokinds',
    'feed': 'http://twokinds.keenspot.com/feed.xml'
}

const parse = item => new Promise((res, rej) => {
    JSDOM.fromURL(item.link).then(dom => {
        const doc = dom.window.document

        res({
            'title': item.title,
            'url': item.link,
            'image': doc.querySelector('.comic img[alt="Comic Page"]').src
        })
    }).catch(rej) 
})

module.exports = {info, parse}
