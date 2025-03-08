const Web3 = require('web3');
const testABI = require('./ans.json').abi; // Replace with the path to your ABI
//console.log(testABI)
const contractAddress = "0x9012586827832Df6896533B823560fCCE1635714"

// Connect to Ganache
let web3 = new Web3(window.ethereum); // Connect to MetaMask
;
// Create a contract instance
const contract = new web3.eth.Contract(testABI, contractAddress);
console.log(11,"from backend.js")
module.exports = { web3, contract };
