import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card1 from './Card1'
import FoodCards from './FoodCards'

function Foods() {

    let [foods, setFoods] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3500/foods-api/get-food")
            .then(res => setFoods(res.data.payload))
            .catch(err => console.log("error is : ", err))
    }, [])
    
    return (
        <div className='d-flex' style={{ justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            {foods !== null && foods.map((data, index = data._id) => <FoodCards {...data} />)}
        </div>
    )
}

export default Foods