# Degens Market Maker


## Setup

Init submodules:

    git submodule update --init

Install npm packages:

    npm i

Create the DB:

    sqlite3 mainnet.db < schema.sqlite3

Edit the `etc/mainnet.js` config file:

* Everywhere it says `REPLACE_ME` should be replaced with your own values:
  * `privateKey`: Your private key as a hexadecimal number. This should map to an address that already has its token approved for trading on the degens contract.
  * `versionName`: Your market maker bot's name, your company's name, or some other identifier for this connection to the order book.
  * `reflectorUrl` and `reflectorApiKey`: If you would like to use our odds reflector, ask us for these values.
* Configure the order policies and the strategy search list (see below).

Run the bot:

    node mm.js ./etc/mainnet.js ./mainnet.db


## Strategies

When figuring out what order to post, the bot will search through the list of strategies and pick the first one that matches various conditions:

* `oddsSource`: The name of the odds source (ie `betfair`).
* `sport`: The sport (ie `Soccer`).
* `league`: The league (ie `NFL`).
* `marketType`: The type of the market (`1x2`, `spread`, or `total`)

The above can also be specified as arrays, to match multiple: `league: ['NFL', 'NCAAF']`

Or as functions, for example `(v) => v === 'NFL' || v === 'NCAAF'`

The matched strategy should also have various other parameters specified:

* `baseAmount`: The size of orders to make, in token units (by default, DAI)
* `markupMult`: A multiplier to apply to the markup from the received odds. A markup of `1.01` will apply a 1% markup, and `0.99` will apply a 1% discount.
* `oddsLimit`: A limit on the odds that the bot will post. `1.5` or `3` mean the same thing: don't post odds less than `1.5` or `3` (decimal)
* `maxPriceBand`: Normally when the bot's order is totally filled, it will re-post an order at a higher price and smaller amount. This will limit how many times it does that. Set it to `0` to stop it from re-posting at all.

### Custom modifiers

You can run custom code to modify your strategy by passing a function to the `custom` field.

For example, here is how to stop making orders an hour before kickoff:

    custom: (strat, info) => {
        if (info.timeToKickoff <= 60*60) strat.baseAmount = 0;
    },


## Market type limits

Often there are many different point spreads and totals available. If you prefer to not have markets up on all of them (maybe because the possible exposure per match would be too high), you can use `marketTypeLimits` to limit the number of markets to make per event.
