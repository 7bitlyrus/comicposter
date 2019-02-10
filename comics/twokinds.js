let jsdom = require('jsdom');
let {JSDOM} = jsdom;

let info = {
    'id': 'twokinds',
    'name': 'Twokinds',
    'image': 'facebook:twokinds',
    'feed': 'http://twokinds.keenspot.com/feed.xml'
}

let parse = item => new Promise((res, rej) => {
    JSDOM.fromURL(item.link).then(dom => {
        let doc = dom.window.document

        res({
            'title': item.title,
            'url': item.link,
            'image': doc.querySelector('.comic img').src
        })
    }).catch(rej) 
})

module.exports = {info, parse}
