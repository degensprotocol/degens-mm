const ethers = require('ethers');

const DegensClient = require('../jslib/DegensClient');
const DegensUtils = require('../jslib/DegensUtils');
const DegensContractLib = require('../jslib/DegensContractLib');


let dc; dc = new DegensClient({
    endpoint: 'wss://degens.com/ws',
    version: 'example code 1.0',
    onUpdate: () => {
        printEvents(Object.values(dc.data.events.recs));
        process.exit();
    },
});

dc.subscribeEvents();


function printEvents(events) {
    for (let event of events) {
        console.log(JSON.stringify(event.event));
        for (let matchId of Object.keys(event.markets)) {
            console.log(' ', matchId, ':', JSON.stringify(event.markets[matchId].info));
        }
    }
}
