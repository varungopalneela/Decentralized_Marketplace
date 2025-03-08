import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { loginContext } from '../contexts/loginContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom'
import { hover } from '@testing-library/user-event/dist/hover';
import './navbar.css'
import { useForm } from 'react-hook-form';
import Electronics from './Electronics';

function Navbar1() {

    let { register, handleSubmit } = useForm();

    let [searchValue, setSearchValue] = useState("null");


    const navigate = useNavigate();
    let [currentUser, loginUser, error] = useContext(loginContext)

    let [loginStatus, setLoginStatus] = useState('')

    const handleOptionSelect = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption === 'Electronics') {
            navigate('/electronics');
        }
        else if (selectedOption === "Groceries") {
            navigate('/foods')
        }
    }
    // useEffect(() => {
    //     // setLoginStatus(localStorage.getItem("loginStatus"))
    //     console.log(loginStatus)
    // },[])

    let removeToken = () => {
        localStorage.clear()
    }

    useEffect(() => {
        setLoginStatus(localStorage.getItem("loginStatus"))
    })

    let submitData = (data) => {
        setSearchValue(data.searchValue)
        navigate('/electronics',{state: {data}})
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand style={{border:"1px solid black",borderRadius:'50%', padding : "5px"}}>Buyit</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link className='nav-link' href="/">Home</Nav.Link>
                        {loginStatus === "true" ? <Nav.Link className='nav-link' href='/signin' onClick={removeToken} >Logout</Nav.Link> : <Nav.Link className='nav-link' href="/signin">Login</Nav.Link>}

                        <Nav.Link className='nav-link' href="/signup">Signup</Nav.Link>
                        <Nav.Link className='nav-link' href="/profile">Profile</Nav.Link>
                        <Nav.Link className='nav-link' href="/orders">My Orders</Nav.Link>

                    </Nav>

                    <div >
                        <Link to='/cart'>
                            <i className="bi bi-cart-check-fill icon-medium" ></i>

                        </Link>
                    </div>
                    <div className='p-2'>


                        <div className="btn btn-secondary ">

                            <select defaultValue="Select" onChange={handleOptionSelect} className='btn btn-secondary'>

                                <option disabled >Select</option>

                                <option value="Electronics">Electronics</option>

                                <option value="Groceries">Foods Menu</option>


                            </select>

                        </div>
                    </div>



                    <form onSubmit={handleSubmit(submitData)} className="d-flex">
                        <input
                            {...register("searchValue")}
                            type="search"
                            placeholder="Search"
                            className="me-2 form-control"
                            aria-label="Search"
                        />
                        <button type='submit' className='btn btn-success'>Search</button>
                    </form>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
}

export default Navbar1