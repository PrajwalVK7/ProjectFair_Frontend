import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import { Col, Row } from 'react-bootstrap';
import ProjectCards from '../components/ProjectCards';
import { getAllProjectAPI } from '../services/allAPI';
function Project() {
  const [token, setToken] = useState('');
  const [projects, setProjects] = useState([])
  const [searchkey,setsearchKey] = useState('')
  useEffect(() => {
    if (sessionStorage.token) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])
  const getAllProjects = async () => {
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    };
    // console.log("token", token)
    const result = await getAllProjectAPI(searchkey,reqHeader)
    if (result.status === 200) {
      setProjects(result.data)
    }
    
  }
  useEffect(() => {
    getAllProjects()
  }, [token,searchkey])
  // console.log("projects", projects)
  // console.log("Search key",searchkey)
  return (
    <>
      <Header />
      <div className='d-flex justify-content-center align-items-center flex-column' >
        <h3>All Project</h3>
        <div className='d-flex mt-5 w-25  align-items-center '>
          <input type="text" className='form-control' placeholder='Search Project using technology ' onChange={(e)=>setsearchKey(e.target.value)} />
          <i class="fa-solid fa-magnifying-glass " style={{ marginLeft: '-40px', color: 'lightblue' }}></i>
        </div>
      </div>
      <Row className='mt-5 mb-5'>
        {projects?.length > 0 ?
          projects.map((item) => (
            <Col md={6} lg={4} >
              <ProjectCards project={item} />
            </Col>
          )) :             <Col md={6} lg={4} ><p>No data</p></Col>

          }

      </Row>
    </>
  )
}

export default Project
