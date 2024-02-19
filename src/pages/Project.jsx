import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import { Col, Row } from 'react-bootstrap';
import ProjectCards from '../components/ProjectCards';
import { getAllProjectAPI } from '../services/allAPI';
import { Link } from 'react-router-dom';
function Project() {
  const [token, setToken] = useState('');
  const [projects, setProjects] = useState([])
  const [searchkey, setsearchKey] = useState('')
  const [isToken, setIstoken] = useState(false)
  useEffect(() => {
    if (sessionStorage.token) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])
  const getAllProjects = async () => {
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    // console.log("token", token)
    const result = await getAllProjectAPI(searchkey, reqHeader)
    if (result.status === 200) {
      setProjects(result.data)
    }

  }
  useEffect(() => {
    getAllProjects()
  }, [token, searchkey])
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIstoken(true)
    }
  }, [])
  // console.log("projects", projects)
  // console.log("Search key",searchkey)
  return (
    <>
      <Header />
      <div className='d-flex justify-content-center align-items-center flex-column' >
        <h3>All Project</h3>
        <div className='d-flex mt-5 w-25  align-items-center '>
          <input type="text" className='form-control' placeholder='Search Project using technology ' onChange={(e) => setsearchKey(e.target.value)} />
          <i class="fa-solid fa-magnifying-glass " style={{ marginLeft: '-40px', color: 'lightblue' }}></i>
        </div>
      </div>
      <Row className='mt-5 mb-5'>
        {projects?.length > 0 ?
          projects.map((item) => (
            <Col md={6} lg={4} >
              <ProjectCards project={item} />
            </Col>
          )) : <div>
            {
              isToken ?
                <p>No Project Uploaded Yet</p> :
                <div className='d-flex justify-content-center align-items-center'>
                  <img src="https://th.bing.com/th/id/R.87e87fa8cb1c4d332a64470d5c3acd89?rik=vuWahGaWKYN5CQ&riu=http%3a%2f%2fdli-eduventure.um.ac.id%2fassets%2fimg%2flogin.png&ehk=hPJNQY6rdxBzsCPJa9ahwTJgf6KEPNQdNr1lfqo1NTk%3d&risl=&pid=ImgRaw&r=0" height={"300px"} alt="" />
                  <p className='text-danger fs-3 mt-4 '>Please
                    <Link to={'/login'}>
                    Login</Link> to view The Projects</p>
                </div>
            }
          </div>

        }

      </Row>
    </>
  )
}

export default Project
