const request = require('request-promise-native');

const avatar = uri => new Promise((res) => {
    arr = uri.split(':', 2)

    switch(arr[0]) {
        case 'http':
        case 'https':
            res(uri)
            break

        case 'twitter':
            console.warn(`Attempt to use removed twitter avatar resolver: ${uri}`)
            res('https://cdn.discordapp.com/embed/avatars/4.png')
            break

        case 'tumblr':
            res(`https://api.tumblr.com/v2/blog/${arr[1]}/avatar/512`)
            break

        case 'facebook':
            res(`https://graph.facebook.com/${arr[1]}/picture?type=large`)
            break

        default:
            res('https://cdn.discordapp.com/embed/avatars/0.png')
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
