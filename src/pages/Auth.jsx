import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import authImg from '../assets/WhatsApp_Image_2024-01-10_at_10.02.59_AM__2_-removebg-preview.png'
import { Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../services/allAPI';


// Single page for login And Register

function Auth({ register }) {
  const registerForm = register ? true : false;
  const navigate = useNavigate()
  // console.log(registerForm)
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  // console.log("user data", userData)
  //
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData
    if (!username || !email || !password) {
      alert("Please add all detials")
    }
    else {
      try {
        const response = await registerAPI(userData);
        // console.log("user reg result ===")
        // console.log(response.status)
        if (response.status === 200) {
          alert("Registration Success");
          setUserData({
            username: "",
            email: "",
            password: ""
          })
          navigate('/login')
        }
        else {
          alert(response.response.data)
        }

      }
      catch (err) {
        console.log(err)
      }
    }
  }

  //// login
  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = userData
    if (!email || !password) {
      alert("Please fill the form completely");

    }
    else {
      const loginResult = await loginAPI(userData);
      if (loginResult.status === 200) {
        sessionStorage.setItem("existingUser",JSON.stringify(loginResult.data.existingUser));
        sessionStorage.setItem("token",loginResult.data.token)
        navigate('/')
      }
      else {
        alert(loginResult.response.data)
      }

    }

  }


  return (
    <>
      <Header />
      <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "100vh" }}>
        <div className='container w-75'>
          <Link to='/' style={{ textDecoration: 'none', color: 'blue' }}><i class="fa-solid fa-arrow-left me-2"></i>Back to Home </Link>
          <div className='card p-5 rounded ' style={{ backgroundColor: '#31a248' }} >
            <div className='row align-items-center'>
              <div className='col-md-6 col-md-6'>
                <img src={authImg} alt="auth" width={"100%"} />
              </div>
              <div className='col-md-6 col-md-6'>
                <div className='d-flex align-items-center flex-column'>
                  <h3 className='text-gray'>Project Fair</h3>
                  <h5 className='text-gray mt-3'>{registerForm ? "Signup your Accound" : "Signin Your Accound"}
                  </h5>
                  <Form className='mt-3'>
                    {registerForm &&
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"
                          value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })} />

                      </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                    </Form.Group>
                    {
                      registerForm ?
                        <div>
                          <button className='btn btn-warning round mt-3 w-75 mb-2'
                            onClick={handleRegister}>Register</button>
                          <p>Already a User Click here to  <Link to='/login' style={{ textDecoration: 'none', color: 'blue' }}>Login</Link></p>
                        </div> :
                        <div>
                          <Link to='/dashboard'><button className='btn btn-warning round mt-3 mb-2' onClick={handleLogin}>Login</button></Link>
                          <p> New User ? Click here to <Link to='/register' style={{ textDecoration: 'none', color: 'blue' }}>Register</Link></p>

                        </div>

                    }


                  </Form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
