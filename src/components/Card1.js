import React, { useEffect, useState } from 'react'
import './card.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cart from './Cart';

function Card1(props) {
    let [quantity, setQuantity] = useState(1)
    let increment = () => {
        setQuantity(quantity + 1)
    }
    let decrement = () => {
        setQuantity(quantity - 1)

    }


    const navigate = useNavigate();

    let SetCart = (id) => {
        if (localStorage.getItem("ExistUser") !== null) {
            let username = localStorage.getItem("ExistUser")
            let product = {}
            product.name = username
            product.id = id
            product.quantity = quantity
            console.log(product)
            // useEffect(() => {
            axios.post(`http://localhost:3500/users-api/cartList`, { product })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            // }, [product])
            navigate('/cart')
        }
        else {
            navigate('/signin')
        }
    }

    return (

        <div className='card1-content'>
            <div className='container' >
                <div className="card" style={{ height: "550px", margin: "3px", padding: "4px" }}>
                    <img className="card-img-top" src={props.image} alt="Card image cap0" />
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div className='align-center' style={{ justifyContent: "center", alignContent: "center" }}>
                            <h6>${props.price}</h6>
                        </div>
                        <div className='inline' style={{ padding: "3px", margin: "2px black", marginBottom: "5px" }} >
                            <button onClick={increment} style={{ backgroundColor: "lightgrey", marginRight: "7px" }} className='btn btn'>+</button>
                            {quantity}
                            <button onClick={decrement} style={{ backgroundColor: "lightgrey", marginLeft: "7px" }} className='btn btn'>-</button>
                        </div>
                        <button onClick={() => SetCart(props.id)} className='btn btn-success'>Add to Cart</button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Card1