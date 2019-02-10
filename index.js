let fs = require('fs');
let RSSparser = require('rss-parser');
let request = require('request-promise-native');
let parser = new RSSparser();

let {log, err, avatar} = require('./util');
let {config, comics} = require('./config/config');

let LAST_JSON = './config/last.json'
let last = require(LAST_JSON);

let lastFlag = false;

let poll = () => {
    comics.forEach((comic, i) => {
        setTimeout(comic => {
            log(comic, 'Polling')

            if(comic.info.feed) {
                parser.parseURL(comic.info.feed)
                .then(feed => check(comic, feed.items[0]))
                .catch(err(comic))
            } else {
                comic.getItem()
                .then(item => check(comic, item))
                .catch(err(comic))
            }
        }, config.delay*i*1000, comic)
    })

    setTimeout(() => {
        if(lastFlag) {
            lastFlag = false;
            log(null, "Flushing last known comic data to disk")

            fs.writeFile(LAST_JSON, JSON.stringify(last), 'utf8', e => {
                e ? err()(e) : log(null, "Last known comic data saved")
            })
        } else {
            log(null, "No new last known comic data to flush")
        }
    }, config.delay*comics.length*1000)
}

let check = (comic, item) => {
    let pubDate = new Date(item.pubDate)

    if(!last[comic.info.id] || pubDate > new Date(last[comic.info.id])) {
        log(comic, `New comic published at ${pubDate.toJSON()}`)

        comic.parse(item).then(parsed => {
            let data = {
                'username': comic.info.name,
                'avatar_url': avatar(comic.info.image),
                'embeds': [{
                    'title': parsed.title,
                    'description': parsed.desc,
                    'url': parsed.url,
                    'timestamp': pubDate.toJSON(),
                    'footer': {'text': parsed.footer},
                    'image': {'url': parsed.image},
                    'thumbnail': {'url': parsed.thumbnail}
                }]
            }

            log(comic, `Posting new comic, ${parsed.title}`)

            request({
                url: config.webhook,
                method: 'POST',
                json: data
            }).then(() => {
                log(comic,`Posted ${parsed.title}`)
                last[comic.info.id] = pubDate
                lastFlag = true
            }).catch(err(comic))
        }).catch(err(comic))
    } else {
        log(comic, 'No new comic')
    }
}

if((config.delay * comics.length) > (config.interval / 1.5))
    throw new Error("Interval is too short for configured delay and comic amount")

poll()
setInterval(poll, config.interval*1000)
