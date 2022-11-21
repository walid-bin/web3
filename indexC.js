const Web3 = require('web3-eth');
const abi = require('./abi.json');
const web3 = new Web3('ws://127.0.0.1:7545');
const contractAddress = '0x6ccd4D73Ad2A62c8259cD88Ca386ab18b3E460aC';
const contract = new web3.Contract(abi, contractAddress);
(async function () {
    let owner = await contract.methods.getOwner().call();
    console.log(owner);
    // await contract.methods.changeOwner('0x6E84150012Fd6D571C33C266424fcDEcF80E3274').send({ from: owner });
    // owner = await contract.methods.getOwner().call();
    // console.log(owner);
    // contract.once('OwnerSet', {
    // }, function (error, event) { console.log(event); });

    contract.events.OwnerSet({
    }, function (error, event) { console.log(event); })
        .on("connected", function (subscriptionId) {
            console.log(subscriptionId, '1');
        })
        .on('data', function (event) {
            console.log(event, '2'); // same results as the optional callback above
        })
        .on('changed', function (event) {
            console.log(event, '3');
            // remove event from local database
        })
        .on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log(error, '4');
        });


})()