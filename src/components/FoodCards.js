import React from 'react'
import { useNavigate } from 'react-router-dom'


function FoodCards(props) {


    const navigate = useNavigate()
    const showMenu = () => {
        // console.log(props.foodItems)
        navigate(`/foods/${props.restaurant}`)
    }
    return (
        <div>
            <div className="card" style={{ width: "18rem", margin: "15px", maxHeight: "400px", height: "200px", backgroundColor: "lightgrey" }}>
                <div className="card-body">
                    <h5 className="card-title">{props.restaurant}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button onClick={showMenu} type='submit' className='btn btn-success'>View Menu</button>
                </div>
            </div>
        </div>
    )
}

export default FoodCards