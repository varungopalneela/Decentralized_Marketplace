import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'




function Signup() {
  let navigate = useNavigate();

  let [mandatory, setMandatory] = useState("");

  let [Error, setError] = useState("");

  let { register, handleSubmit } = useForm()


  let submitData = (data) => {
    console.log(data)
    if ((data.email === "") || (data.username === "") || (data.password === "")) {
      setMandatory("*Username, email, and password are mandatory fields")
    }
    else{
    axios
      .post("http://localhost:3500/users-api/signup", data)
      .then((res) => {
        if (res.status === 201) {
          navigate('/signin')
        }
        else {
          setError(res.data.message)
        }
      })
      .catch(err => console.error(err))
    }
  }
  return (
    <div align="center">
            <h1 className='profile-heading'>Profile</h1>

      {Error.length !== 0 && (<h1 className='text-danger'>{Error}</h1>)}
      <div className='col-11 col-sm-8 col-md-6 col-lg-3' >
        <form onSubmit={handleSubmit(submitData)} className='form-control mt-3' style={{ backgroundColor: "skyblue" }} >
          <div>
            <input {...register("email")} type="email" className='form-control mt-3' placeholder='Enter Email-id' />
            <label>Email-id</label>
          </div>
          <div>
            <input {...register("username")} type="text" className='form-control mt-4' placeholder='Enter Username' />
            <label className='mb-4'>Username</label>
          </div>
          <div>
            <h5>Select Gender</h5>
            <input {...register("gender")} type="radio" name="gender" value="male" />Male
            <input {...register("gender")} type="radio" name="gender" value="fmale" className='' />Female
          </div>
          <div>
            <input {...register("password")} type="password" className='form-control mt-3 mb-4' placeholder='Enter password' />
            <label>Password</label>
          </div>
          <button type='submit' className='mt-3 mb-3 btn btn-success'>Signup</button>
          {mandatory && <p className='' style={{color:"red"}}>{mandatory}</p>}
        </form>
      </div>
    </div>
  )
}

export default Signup