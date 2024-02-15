import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import ProjectCards from '../components/ProjectCards'
import Lottie from 'lottie-react'
import animation from '../assets/Animation - 1704696002727.json'
import { Link } from 'react-router-dom'
import { getHomeProjectsAPI } from '../services/allAPI'
function Home() {
  const [isLogin, setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    }
  }, [])
  const getHomeProject = async () => {
    const result = await getHomeProjectsAPI();
    // console.log('Home project', result)
    if (result.status === 200) {
      setHomeProject(result.data)
    }
  }
  useEffect(() => {
    getHomeProject()
  }, [])
// console.log("data",homeProject)
  return (
    <>
      <div className=' mb-4' style={{ width: '100%', height: '100%', backgroundColor: '#31a248' }}>
        <div className='container-fluid' rounded>
          <Row className=' align-items-center p-5'>
            <Col lg={6} md={6}>
              <h1 className='text-white mb-4 mt-5' style={{ fontSize: '60px', fontWeight: '700' }}>Project Fair</h1>
              <p>One stop destination for all software development projects</p>
              {isLogin === true ?
                < Link to="/dashboard"><Button className='shadow mb-5 text-black mt-3' variant='warning'>Manage Projects<i class="fa-solid fa-arrow-right ms-2"></i></Button>
                </Link> :
                <Link to="/login"><Button className='shadow mb-5 text-black mt-3' variant='warning'>Get Started <i class="fa-solid fa-arrow-right ms-2"></i></Button>
                </Link>
              }
            </Col>
            <Col lg={6} md={6} className=''>
              {/* <img src="https://149695847.v2..com/wp-content/uploads/2020/01/top-10-DS-projects.png" alt="" height={"300px"} /> */}
              <Lottie animationData={animation} />
            </Col>
          </Row>
        </div>
      </div >
      <div className='mt-2 allProject'>
        <div className='text-center'>
          <h1>Explore Our Project</h1>
          {/* <marquee scrollAmount={17}> */}
          <div className='d-flex justify-content-center container-fluid' >
            <Row>
              {
                homeProject?.length>0 ?
                homeProject.map((item)=>(
                  <Col className='mb-3' lg={4} md={4} sm={4} ><ProjectCards project={item}  /></Col>
                )):
                <Col className='mb-3' lg={4} md={4} sm={4} ><p>No project Found</p></Col>

              }
            </Row>
          </div>
          {/* </marquee> */}
        </div>
        <div className='text-center mt-5 text-danger' style={{ fontWeight: '600', cursor: 'pointer' }}>
          <Link to='/project'>See More</Link>
        </div>
      </div>
    </>
  )
}

export default Home
