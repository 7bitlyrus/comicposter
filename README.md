# comicposter
Solution to post webcomics to Discord via webhooks

## Config
Eventually, hopefully, a config file creation script will be written, until then you will have to create
the config files by hand, using the following steps:

* Create the `config` folder.
* Create the `config/last.json` file with the contents `{}`
* Create and modify the `config/config.js` file:
```js
let config = {
    'webhook': /*webhook url*/,
    'interval': /*polling interval in seconds*/, 
    'delay': /*delay between each comic's poll in seconds*/
}

let comics = [
    require('../comics/<comic name>'),
    // repeat for each comic
]

module.exports = {config, comics}
```
