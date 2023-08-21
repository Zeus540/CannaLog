import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './reducers/authReducer.js'

function Login() {
  const dispatch = useDispatch()

  const [userObj, setUserObj] = useState({
    name: '',
    password: ''
  })

  const handleChange = (type, e) => {
    switch (type) {
      case "name":
        setUserObj({ ...userObj, name: e.target.value })
        break;
      case "password":
        setUserObj({ ...userObj, password: e.target.value })
        break;
      default:
        break;
    }
  }

  const handleSumbit = () => {
    dispatch(login(userObj))
  }

  return (
    <>
      <input type="text" name="" id="" onChange={(e) => handleChange("name", e)} />
      <input type="password" name="" id="" onChange={(e) => handleChange("password", e)} />
      <button type="button" onClick={() => handleSumbit()}>Submit</button>
    </>
  )
}

export default Login
