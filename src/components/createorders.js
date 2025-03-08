import Web3 from 'web3';

//console.log(testABI)
const contractAddress = "0x1e222B915d2DAa4638C9B13966664911789F5569"

// Connect to Ganache
const web3 = new Web3("http://127.0.0.1:7545"); // Ganache default URL

let testABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "order_id",
        "type": "uint256"
      }
    ],
    "name": "OrderCreated",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "orderCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userOrders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "order_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "order_cost",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_item_ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_item_quantities",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_item_cost",
        "type": "uint256[]"
      }
    ],
    "name": "createOrder",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_order_id",
        "type": "uint256"
      }
    ],
    "name": "displayOrder",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "order_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "order_cost",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "items",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "total_order_count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

// Create a contract instance
const contract = new web3.eth.Contract(testABI, contractAddress);



async function createOrder() {
  try {
    const accounts = await web3.eth.requestAccounts(); // Requests MetaMask to select an account
    const sender = accounts[0]; // First account from MetaMask


    /*uint256 _order_id,
    uint256[] memory _item_ids,
    uint256[] memory _item_quantities,
    uint256[] memory _item_cost*/
    const tx = await contract.methods.createOrder([1,2,4],[3,1,2],[2,3,4]);
    const gas = await tx.estimateGas({ from: sender });

    const transaction = await tx.send({
        from: sender,
        gas: gas, // Adjust gas as needed
    });

    console.log("Transaction successful:", transaction);
    console.log("Order created!");
  } catch (error) {
    console.error("Error creating order:", error);
  }
}

// async function getOrders() {
//   try {
//     const orderCount = await contract.methods.orderCount().call();
//     console.log("Total Orders:", orderCount);
//     return orderCount

//   } catch (error) {
//     console.error("Error fetching orders:", error);
//   }
  
// }


await web3.eth.getAccounts().then(async (acc) => {
  const sender = acc[2]; // First account from MetaMask
  let orderCount = await contract.methods.orderCount(sender).call(); // Call the method properly
  console.log(orderCount,sender,acc)
  for (let i = 1; i <= orderCount; i++) { // Loop should go up to orderCount
      getOrderDetails(sender, i);
  }

});

async function getOrderDetails(address,orderId) {
    try {
      // Fetch the order details from the smart contract
      const order = await contract.methods.displayOrder(address,orderId).call();
      console.log(order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  }



  
  // Example: Get the details of order 1
//getOrderDetails(5);

//   async function deleteOrder(orderId) {
//     try {
//       const accounts = await web3.eth.getAccounts();
//       await contract.methods.deleteOrder(orderId).send({ from: accounts[0] });
//       console.log(`Order ${orderId} deleted successfully!`);
//     } catch (error) {
//       console.error("Error deleting order:", error);
//     }
//   }
  
//   // Example: Delete order with ID 1
  
  
  