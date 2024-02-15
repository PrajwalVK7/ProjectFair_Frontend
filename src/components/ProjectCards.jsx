import React from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import mediaImg from '../assets/WhatsApp Image 2024-01-10 at 10.03.00 AM.jpeg'
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
function ProjectCards({project}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className='d-flex justify-content-center'>
        <Card style={{ width: '18rem' }} onClick={handleShow}>
          <Card.Img variant="top" src={`${BASE_URL}/uploads/${project.projectImage}`} />
          <Card.Body>
            <Card.Title>{project.title}</Card.Title>
          </Card.Body>
        </Card>


        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{project.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6} lg={6}>
              <Card.Img variant="top" src={`${BASE_URL}/uploads/${project.projectImage}`} />              </Col>
              <Col md={6} lg={6}>
                <h4>description</h4>
                <p>{project.overview}</p>
                <p><span className='fw-bolder'>Technologies :</span>{project.language}</p>
              </Col>

            </Row>
            <div className='d-flex justify-content-evenly mt-3'>
              <a href={project.website}  target='_blank' rel="noreferrer" style={{ fontSize: '25px' }}><i class="fa-solid fa-globe text-black "></i></a>
              <a href={project.github} target='_blank' rel="noreferrer" style={{ fontSize: '25px' }}><i class="fa-brands fa-github text-black "></i></a>
            </div>
          </Modal.Body>

        </Modal>
      </div>
    </>

  )
}

export default ProjectCards
