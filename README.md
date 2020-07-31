# comicposter
Solution to post webcomics to Discord via webhooks

## Creating configs
To create the config files required to get up and running:

* Create the `config` folder.
* Create the `config/last.json` file with the contents `{}`
* Create and modify the `config/config.js` file:
```js
let config = {
    'webhook': /* Discord webhook URL */,
    'interval': /* Polling interval in seconds (e.g. 3600) */, 
    'delay': /* Delay between each comic's poll in seconds (e.g. 10) */
}

let comics = [
    /* Repeat the following line for each comic you want to be posted.
       See the /comics/ folder for valid comic scripts.
       e.g:
       require('../comics/housepets'),
       require('../comics/xkcd')
    */
    require('../comics/COMIC'),
]

module.exports = {config, comics}
```
