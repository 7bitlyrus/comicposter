const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const info = {
    'id': 'housepets',
    'name': 'Housepets!',
    'image': 'twitter:housepetscomic',
    'feed': 'http://housepetscomic.com/feed'
}

const parse = item => new Promise((res, rej) => {
    JSDOM.fromURL(item.link).then(dom => {
        const doc = dom.window.document

        res({
            'title': item.title,
            'desc': doc.querySelector('.entry-content p') ? doc.querySelector('.entry-content p').textContent : '',
            'url': item.link,
            'footer': doc.querySelector('#comic img').title,
            'image': doc.querySelector('#comic img').src
        })
    }).catch(rej) 
})

module.exports = {info, parse}
