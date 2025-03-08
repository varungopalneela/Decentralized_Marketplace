import React, { useEffect, useState } from 'react';
import axios from 'axios'

const { web3, contract } = require('./backend.js');


const OrderPage = () => {
    let [ord,setOrd] = useState([])
    let [orderCount,setCount] = useState(0)
    let [ordcost,setOrdcost] = useState([])
    let [ordids,setOrdid] = useState([])
    let [products, setProducts] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3500/products-api/get-products");
                setProducts(res.data.payload);
            } catch (err) {
                console.log("Error is:", err);
            }
        };
    
        fetchData();
    }, []);
    
    // Run after products are updated
    useEffect(() => {
        if (products?.length > 0) {  // Ensures accounts are only fetched after products are set
            const fetchAccounts = async () => {
                try {
                    const accounts = await web3.eth.getAccounts();
                    await getOrderDetails(accounts[0]);
                } catch (err) {
                    console.log("Error fetching accounts:", err);
                }
            };
    
            fetchAccounts();
        }
    }, [products]); // Runs only when products update
    
    

  async function getOrderDetails(sender) {
    try {
            let orderCount = Number(await contract.methods.orderCount(sender).call()); // Call the method properly
            console.log(49,orderCount)
            setCount(orderCount)
            let o = []
            let ordid = []
            let ordc = []

            let allObjids = new Set()
            for (let i = 1; i <= orderCount; i++)  // Loop should go up to orderCount
            {
            ordid.push(i)

      // Fetch the order details from the smart contract
            const order = await contract.methods.displayOrder(i).call({from : sender});
            console.log(order);
            let objs = []
            order.items.map(objss => {
                let obj = parseInt(objss, 10); // Converts string to integer

                console.log(31,obj)
                let obj_id = Math.floor(obj / 100) ; // Extracting 100
                let obj_quan = obj % 10; // Extracting 1 from obj_quan place
                let p = products[obj_id-1]
                console.log(48,p)
                objs.push([obj_id,obj_quan,p['name'],p['price'],p['image'],p['category'],p['description']])
                allObjids.add(obj_id)
            }
            )
            ordc.push(order.order_cost)
            console.log(39,ordc)
            o.push(objs)
            console.log(42,o)
            }
            setOrd(o)
            setOrdid(ordid)
            setOrdcost(ordc)
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  }


  return (
    <div>
        {orderCount === 0 ? <div>No order yet</div> :  <div>
            {ordids.map(id => <div key={id} style={{border : '5px solid black ', backgroundColor: 'white', margin : '5px', padding : '5px'}} >
                <h1>Order id : {id}</h1>
                <div style={{display:'flex'}}>
                <div className="mt-2 p-2 rounded-md shadow-md ">
            <table className="min-w-full border-collapse table table-striped border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Object Id</th>
                        <th className="border p-2">Object Quantity</th>
                        <th className="border p-2">Object Name</th>
                        <th className="border p-2">Object Cost</th>
                        <th className="border p-2">Object Category</th>
                        <th className="border p-2">Object Description</th>
                    </tr>
                </thead>
                <tbody>
                    {ord[id - 1].map((obj) => (
                        <tr key={obj.index} className="border">
                            <td className="border p-2">
                                <img src={obj[4]} width="50" height="50" alt="Object" />
                            </td>
                            <td className="border p-2">{obj[0]}</td>
                            <td className="border p-2">{obj[1]}</td>
                            <td className="border p-2">{obj[2]}</td>
                            <td className="border p-2">{obj[3]}</td>
                            <td className="border p-2">{obj[5]}</td>
                            <td className="border p-2">{obj[6]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
                <div className='w-25 d-flex justify-content-center align-items-center'> <h3> Order Cost : {ordcost[id-1]}</h3></div>
                </div>
            </div>)
            }
            </div>}
    </div>

)
};

export default OrderPage;
 
