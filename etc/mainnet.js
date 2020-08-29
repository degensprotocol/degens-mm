module.exports = {
  privateKey: 'REPLACE_ME',

  // Orderbook connection

  orderbookEndpoint: 'wss://degens.com/ws',
  versionName: 'REPLACE_ME',

  // Reflector connection

  reflectorUrl: 'https://book.degens.com/reflector/',
  reflectorApiKey: 'IlC9fsLudbyYLCcqQVyPgS',

  // Network config

  chainId: 1,
  contractAddr: '0x8888888883585b9a8202Db34D8b09d7252bfc61C',
  tokenAddr: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  //tokenAddr: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH

  // Order config

  orderExpiryTimeSeconds: 60 * 10,
  orderRefreshTimeSeconds: 60,

  marketTypeLimits: {
      spread: 2,
      total: 2,
  },

  defaultStrategy: {
      oddsLimit: 1.2,
  },

  strategies: [
    {
      sport: (v) => v !== 'Soccer',
      oddsSource: 'bet365',
      baseAmount: 50,
      markupMult: 1,
    },
    {
      sport: 'Soccer',
      oddsSource: 'betfair',
      baseAmount: 40,
      markupMult: 1.01,
    }
  ],
};
