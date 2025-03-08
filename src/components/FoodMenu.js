import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Params, useParams } from 'react-router-dom'

function FoodMenu() {

    const params = useParams();
    const [menu, setMenu] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3500/foods-api/get-food")
            .then(res => setMenu(res.data.payload.filter((data) => (data.restaurant === params.restaurant))))
            .catch(err => console.log(err))
    }, [])

    console.log(menu)

    let obj = menu[0];
    console.log(obj)


    return (
        <div>
            <div className='container' style={{backgroundColor:"gray"}}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>FoodName</th>
                            <th>foodType</th>
                            <th>calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {obj?.foodItems.map(data =>
                            <tr>
                                <td>{data.foodName}</td>
                                <td>{data.foodType}</td>
                                <td>{data.calories}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FoodMenu