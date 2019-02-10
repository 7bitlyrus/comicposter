let jsdom = require('jsdom');
let {JSDOM} = jsdom;

let info = {
    'id': 'stupidfox',
    'name': 'StupidFox',
    'image': 'twitter:stupidfoxcomic',
}

let getItem = item => new Promise((res, rej) => {
    JSDOM.fromURL('https://stupidfox.net/').then(dom => {
        let doc = dom.window.document

        let date = doc.querySelector('.stand_high small').textContent.split(' ')
        date[0] = date[0].slice(0, -2)

        res({
            'pubDate': new Date(`${date.join(' ')} 5:00 +0`),
            'title': doc.querySelector('.stand_high h1').textContent,
            'url': doc.querySelector('.spritePerma').parentElement.href,
            'desc': doc.querySelector('.stand_high').textContent.replace(/  /g,'').split('\n\n\n')[1],
            'image': doc.querySelector('.comicmid img').src,
        })
    }).catch(rej) 
})

let parse = item => new Promise(res => res(item))

module.exports = {info, parse, getItem}
