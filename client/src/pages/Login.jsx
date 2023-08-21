import React from 'react'

const Login = () => {
  return (
    <div className='container'>
        <form className='form-container'>
            <h1>Login</h1>
            <input type="text" placeholder="Username" autoFocus />
            <input type="password" placeholder="Password"/>
            <input type="submit" value="Login" />
        </form>
    </div>
  )
}

export default Login