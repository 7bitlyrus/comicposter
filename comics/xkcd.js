let request = require('request-promise-native');

let info = {
    'id': 'xkcd',
    'name': 'xkcd',
    'image': 'twitter:xkcdcomic',
}

let getItem = item => new Promise((res, rej) => {
    request('https://xkcd.com/info.0.json').then(response => {
        json = JSON.parse(response)
        res({
            'pubDate': new Date(Date.UTC(json.year,json.month-1,json.day,5)),
            'title': json.safe_title,
            'url': `https://xkcd.com/${json.num}`,
            'footer': json.alt,
            'image': json.img,
        })
    }).catch(rej)
})

let parse = item => new Promise(res => res(item))

module.exports = {info, parse, getItem}

/* Older RSS implementation:
let jsdom = require('jsdom');
let {JSDOM} = jsdom;

let info = {
    'id': 'xkcd',
    'name': 'xkcd',
    'image': 'twitter:xkcdcomic',
    'feed': 'https://xkcd.com/rss.xml'
}

let parse = item => new Promise(res => {
    img = JSDOM.fragment(item.content).querySelector('img')

    res({
        'title': item.title,
        'url': item.link,
        'footer': img.title,
        'image': img.src
    })
})

module.exports = {info, parse}
*/
