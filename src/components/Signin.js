import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

import { loginContext } from '../contexts/loginContext';
import axios from 'axios';

function Signin() {

    let {register,handleSubmit,formState : {errors}}=useForm()
 
    const navigate=useNavigate();

    let [currentUser,loginUser,error,loginStatus]=useContext(loginContext)


    let submitData=(data) => {
        loginUser(data)
    }



    useEffect(() => {
        if(loginStatus===true){
            // console.log("if",loginStatus)
            navigate(`/profile`)
        }
        else{
            // console.log("else",loginStatus)
            navigate('/signin')
        }
    },[loginStatus])

    return (
        <div className="conatiner" align="center" >
                  <h1 className='profile-heading'>Profile</h1>

            <div className='col-11 col-sm-8 col-md-6 col-lg-3'>
                <h3 className='text-danger' style={{fontSize:"35px"}}>{error}</h3>
                <form onSubmit={handleSubmit(submitData)} className='form-control ' style={{backgroundColor:"skyblue",opacity:"1"}}>
                    

                    <div className="form-outline mb-4 mt-4">
                        <input placeholder='Enter username' {...register("username")} type="text" id="username" className="form-control" />
                        <label className="form-label" htmlFor="username">Enter Username</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input placeholder='Enter password' {...register("password")} type="password" id="form2Example2" className="form-control" />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>

                 
                    <div align="center">
                        <button type="submit" className="btn btn-primary btn-block mb-5 " >Sign in</button>

                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Signin