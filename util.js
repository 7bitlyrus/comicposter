// Public Twitter Bearer Token
T_BEARER = "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"

const request = require('request-promise-native');

const avatar = uri => new Promise((res) => {
    arr = uri.split(':', 2)

    switch(arr[0]) {
        case 'http':
        case 'https':
            res(uri)
            break

        case 'twitter':
            token_opts = {
                'method': 'POST',
                'uri': 'https://api.twitter.com/1.1/guest/activate.json',
                'auth': {'bearer': T_BEARER}
            }
    
            request(token_opts).then(t => {
                const user_opts = {
                    'uri': `https://api.twitter.com/1.1/users/show.json?screen_name=${arr[1]}`,
                    'auth': {'bearer': T_BEARER},
                    'headers': {'x-guest-token': t.guest_token}
                }

                request(user_opts).then(user => res(JSON.parse(user).profile_image_url_https))
            })
            break

        case 'tumblr':
            res(`https://api.tumblr.com/v2/blog/${arr[1]}/avatar/512`)
            break

        case 'facebook':
            res(`https://graph.facebook.com/${arr[1]}/picture?type=large`)
            break
    }
})

const log = (prefix, obj, error) => {
    pre = [`[${new Date().toJSON()}]`]
    if(prefix) pre.push(`[${typeof prefix === 'string' ? prefix : prefix.info.id}]`)
    error ? console.error(...pre, obj) : console.log(...pre, obj)
}

const err = prefix => { 
    return obj => log(prefix, obj, true)
}

module.exports = {avatar, log, err}
