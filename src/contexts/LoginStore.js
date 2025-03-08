import { useEffect, useState } from 'react'
import { loginContext } from './loginContext'
import axios from 'axios'
function LoginStore({ children }) {


    let [currentUser, setCurrentUser] = useState({})
    let [error, setError] = useState("");
    let [loginStatus, setLoginStatus] = useState(false)

    let loginUser = (credentials) => {
        axios.post("http://localhost:3500/users-api/signin", credentials)
            .then((res) => {

                if (res.data.message === "success") {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("ExistUser", res.data.user.username)
                    setCurrentUser({ ...res.data.user })
                    setLoginStatus(true)
                    localStorage.setItem("loginStatus", true)
                }
                else {
                    localStorage.setItem("loginStatus", false)
                    setError(res.data.message)
                }
            })
    }

    return (
        <loginContext.Provider value={[currentUser, loginUser, error, loginStatus, setLoginStatus]}>
            {children}
        </loginContext.Provider>
    )
}

export default LoginStore