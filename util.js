let avatar = uri => {
    arr = uri.split(':', 2)

    switch(arr[0]) {
        case 'http':
        case 'https':
            return uri

        case 'twitter':
            return `https://twitter.com/${arr[1]}/profile_image?size=original`

        case 'tumblr':
            return `https://api.tumblr.com/v2/blog/${arr[1]}/avatar/512`

        case 'facebook':
            return `https://graph.facebook.com/${arr[1]}/picture?type=large`
    }
}

let log = (prefix, obj, error) => {
    pre = [`[${new Date().toJSON()}]`]
    if(prefix) pre.push(`[${typeof prefix === 'string' ? prefix : prefix.info.id}]`)
    error ? console.error(...pre, obj) : console.log(...pre, obj)
}

let err = prefix => { 
    return obj => log(prefix, obj, true)
}

module.exports = {avatar, log, err}
