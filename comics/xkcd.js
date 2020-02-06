const request = require('request-promise-native');

const info = {
    'id': 'xkcd',
    'name': 'xkcd',
    'image': 'https://i.imgur.com/y7nJZQc.png',
}

const getItem = item => new Promise((res, rej) => {
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

const parse = item => new Promise(res => res(item))

module.exports = {info, parse, getItem}