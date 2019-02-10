let jsdom = require('jsdom');
let {JSDOM} = jsdom;

let info = {
    'id': 'housepets',
    'name': 'Housepets!',
    'image': 'twitter:housepetscomic',
    'feed': 'http://housepetscomic.com/feed'
}

let parse = item => new Promise((res, rej) => {
    JSDOM.fromURL(item.link).then(dom => {
        let doc = dom.window.document

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
