import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'
import { getUserProjectAPI } from '../services/allAPI'
function Dashboard() {
const [userName,setUserName]=useState("")
useEffect(()=>{
  const existingUserData = JSON.parse(sessionStorage.getItem("existingUser"))
  console.log(existingUserData)
  setUserName(existingUserData.username)
},[])

  return (
    <>
     <Header logout={"logout"}/>
     <h2 className='mt-5 ms-3'>Welcome <span style={{color:'orange'}}>{userName}</span></h2>
    <Row className='container-fluid mt-5'>
      <Col  md={8} >
        <Myproject/>
      
      </Col>
      <Col  md={4}>
      <Profile/>
      </Col>
    </Row>
    </>
  )
}

export default Dashboard
