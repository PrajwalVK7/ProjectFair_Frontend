import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';
function Header({ logout }) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)

  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    navigate('/')
  }
  return (
    <>
      <Navbar className="sticky-top" style={{ backgroundColor: '#31a248' }}>
        <Container>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Navbar.Brand className='text-light ms-5' style={{ fontSize: '30px', fontWeight: '500' }}>
              <img
                alt="Project Fair"
                src="https://i.pinimg.com/originals/6b/44/56/6b4456453c7cef0cc8be1dc34d5597f8.png"
                width="40"
                height="40"
                className="d-inline-block align-top me-2"
              />
              Project Fair
            </Navbar.Brand>
          </Link>
          {
            logout &&
            <button onClick={handleLogout} className='btn btn-warning rounded text-black'>Logout</button>

          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header
