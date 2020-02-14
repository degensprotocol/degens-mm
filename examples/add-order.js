const ethers = require('ethers');

const DegensClient = require('../jslib/DegensClient');
const DegensUtils = require('../jslib/DegensUtils');
const DegensContractLib = require('../jslib/DegensContractLib');


let privateKey = 'REPLACE_ME';

let contractAddr = '0x8888888883585b9a8202Db34D8b09d7252bfc61C';
let tokenAddr = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI
let chainId = 1;


let dc = new DegensClient({
    endpoint: 'wss://degens.com/ws',
    version: 'example code 1.0',
});


let now = DegensUtils.getCurrTime();

let o = new DegensContractLib.Order({
    maker: (new ethers.Wallet(privateKey)).address,
    taker: 0,
    token: tokenAddr,
    matchId: '0xca0e7732eab21f8d2a9aaa7a9677f9355283a438efae60c72dae993bbc202e7c',
    amount: ethers.utils.parseEther("10"),
    price: 350000000,
    direction: 1,
    expiry: now + (5 * 60),
    timestamp: now,
    orderGroup: 123456,
});


let packedOrder = o.asTransportPacked(o.signWithPrivateKey(privateKey, contractAddr, chainId));

dc.oc.send("put", [{ order: packedOrder, }], (err, r) => {
    if (err) console.log(`ERROR SENDING ORDER: ${err}`);
    else console.log("Sent.");

    process.exit();
});
