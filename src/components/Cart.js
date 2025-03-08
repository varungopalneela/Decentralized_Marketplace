import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './cart.css';
const { web3, contract } = require('./backend.js');


function Cart() {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  async function createOrder(item_ids,item_quan,item_cost) {
    try {
      let accounts = await web3.eth.getAccounts();
      console.log(accounts)
      const sender = accounts[0]; // First account from MetaMask
      console.log(sender)
  
      /*uint256 _order_id,
      uint256[] memory _item_ids,
      uint256[] memory _item_quantities,
      uint256[] memory _item_cost*/
      const tx = await contract.methods.createOrder(item_ids,item_quan,item_cost);
      console.log(26,tx)
      let total = item_quan.reduce((sum, value, index) => sum + (value * item_cost[index]), 0);
      total = Math.floor((total * 1e18) / 230508); // Convert to Wei before division (matches Solidity)
      total = total.toString()
      console.log("total in Wei:", total);
      console.log("total in ETH:", web3.utils.fromWei(total.toString(), "ether"));

      const gas = await tx.estimateGas({ from: sender, value: total
      });
      console.log(30,gas)
      const transaction = await tx.send({
          from: sender,
          value: total,
          gas:  gas, // Adjust gas as needed
      });
      console.log(transaction)
  
      console.log("Transaction successful:", transaction);
      console.log("Order created!");
      
      
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }


 


  let removeItem = (id) => {
    setLoading(true);

    // Optimistic rendering
    let updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);

    let username = localStorage.getItem("ExistUser");
    let product = {
      name: username,
      id: id
    };

    axios.post('http://localhost:3500/users-api/removeItem', { product })
      .then(res => {
        // The server response can be logged or handled as needed
        console.log("Item removed successfully:", res.data);
      })
      .catch(err => {
        console.log(err);
        // If there is an error, revert the local state to the previous state
        setCart(cart);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  async function payment(){
    let item_ids=[];
    let item_quantities = [];
    let item_costs = [];
    console.log(cart)
    { cart?.map(data =>{ 
      item_ids.push(data.id)
      item_quantities.push(data.quantity)
      item_costs.push(data.price)
    }) }

    console.log(item_ids,item_quantities,item_costs)
    createOrder(item_ids,item_quantities,item_costs)

    contract.events.OrderCreated().on('data', (event) => {
    console.log("Order Created:", event.returnValues);
    navigate('/orders')
    })
    .on('error', console.error);

  }

  useEffect(() => {
    let username = localStorage.getItem("ExistUser");
    
    axios.post('http://localhost:3500/users-api/showCart', { username })
      .then(res => {
        // Ensure cart is not undefined before updating the state
        if (res.data.data !== undefined) {
          setCart(res.data.data);
        }
      })
      .catch(err => console.log(err));
  }, [setCart]);

  return (
    <div className='container'>
      {loading && <div>Loading...</div>}
      {(cart !== undefined && cart?.length !== 0) &&
        <div>
          <div className="cart">
            <table className="table">
              <thead>
                <tr>
                  <th>name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>description</th>
                  <th>Sub total</th>
                  <th>category</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map(data =>
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.price}</td>
                    <td>{data.quantity}</td>
                    <td>{data.description}</td>
                    <td>{(data.quantity) * (data.price)}</td>
                    <td>{data.category}</td>
                    <Link onClick={() => removeItem(data.id)}>
                      <i className="bi bi-trash3-fill remove"></i>
                    </Link>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div align="center">
            <button onClick={payment} className='btn btn' style={{ color: "black", backgroundColor: "skyblue" }}>place order</button>
          </div>
        </div>
      }
      {((cart === undefined) || (cart?.length === 0)) && <h1 align="center">Cart is Empty !!!!!</h1>}
    </div>
  );
}

export default Cart;