import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BASE_URL } from '../services/baseurl';
import { editUserProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({ project }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState("")
const {editProjectResponse,seteditProjectResponse}= useContext(editProjectResponseContext)
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage: ""
  });

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  const handleReset = () => {
    setProjectDetails({
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectImage: ""
    })
    setPreview("")
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, language, github, website, overview, projectImage, id } = projectDetails
    if (!id || !title || !github || !language || !website || !overview ) {
      alert("Please the form completely")
    }
    else {
      try {
        const reqBody = new FormData();
        reqBody.append("title", title);
        reqBody.append("language", language);
        reqBody.append("github", github);
        reqBody.append("website", website);
        reqBody.append("overview", overview);
        reqBody.append("projectImage", projectImage);
        const token = sessionStorage.getItem("token")
        if (preview) {
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          };
          const response = await editUserProjectAPI(id, reqBody, reqHeader);
          if(response.status===200){
            handleClose()
            alert("Project Updated Successfully");
            seteditProjectResponse(response)
          }else{
            console.log(response.response.data)
          }


        }
        else {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          };
          const response = await editUserProjectAPI(id, reqBody, reqHeader);
          if(response.status===200){
            handleClose()
            alert("Project Updated Successfully");
            seteditProjectResponse(response)

          }
          else{
            console.log(response.response.data)
          }

        }


      }
      catch (err) {
        console.log(err)
      }
    }


  }
  return (
    <>
      <button onClick={handleShow} className='btn  ms-3'><i class="fa-solid fa-pen-to-square text-info"></i></button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6 col-md-5'>
              <label htmlFor="img" className='btn' > Upload Image
                <input type="file" id='img' style={{ display: 'none' }}
                  onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                <img height={"200px"} width={"200"} src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`} alt="Profile Image" />
              </label>
            </div>
            <div className='col-lg-6 col-md-5 d-flex align-items-center justify-content-center flex-column'>
              <div className='mb-3 mt-3 w-100'>
                <input value={projectDetails.title} type="text" onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} className='form-control' placeholder='Project Title' />
              </div>
              <div className='mb-3 mt-3 w-100'>
                <input value={projectDetails.language} type="text" className='form-control' placeholder='Technology Used'
                  onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
              </div>
              <div className='mb-3 mt-3 w-100'>
                <input value={projectDetails.github} type="text" className='form-control' placeholder='Github Link'
                  onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
              </div>
              <div className='mb-3 mt-3 w-100'>
                <input type="text" value={projectDetails.website} className='form-control' placeholder='Website Link'
                  onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              </div>
              <div className='mb-3 mt-3 w-100'>
                <textarea name="" id="" cols="15" rows="10" className='form-control' placeholder='Project Description'
                  value={projectDetails.overview}
                  onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} >

                </textarea>
              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset} >
            Reset
          </Button>
          <Button variant="primary" onClick={handleUpdate }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject
