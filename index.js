// imports web3 requirements
const Web3 = require('web3');
const abi = require('./abi.json');
const web3 = new Web3('ws://localhost:7545');
require('dotenv').config();

// initialize require data
web3.eth.defaultAccount = process.env.DEFAULT_WALLET_ADDRESS || '0x43dd88e9858846401A2aBE3F57F2422d8c65D008';
const contractAddress = process.env.CONTRACT_ADDRESS || '0x88172DBe28E77e47060E42c0B8ed5EC245Bf1f3f';
const walletFor = process.env.TARGET_WALLET || "0x6E84150012Fd6D571C33C266424fcDEcF80E3274";
const contract = new web3.eth.Contract(abi, contractAddress);


// async function to execute 
(async function () {
    // checks default account
    console.log(process.env.DEFAULT_WALLET_ADDRESS);

    // catching pending request from rhe block chain, and send mint method.
    var subscription = web3.eth.subscribe('pendingTransactions', function (error, result) {
        if (!error)
            console.log("result:");
    })
        .on("data", function (transaction) {
            console.log(transaction);
            web3.eth.getTransaction(transaction, function (err, data) {
                if (err) return console.log(err);
                // console.log(data);
                data.from === walletFor && contract.methods.mint().send({
                    from: web3.eth.defaultAccount,
                    gas: data.gas * 2,
                    gasPrice: (parseInt(data.gas) + 1000).toString()
                })
            })
        });



    // catching transfer event from rhe block chain
    contract.events.Transfer({
    }, function (error, event) { console.log("event"); })
        .on("connected", function (subscriptionId) {
            console.log(subscriptionId);
        })
        .on('data', function (event) {
            console.log(event);
        })

})();