import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { uploadProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';

function Addproject() {
  // useContext( hook is used to access context api)
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext);
  
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  });
  const [preview, setPreview] = useState("")

  const [token, setToken] = useState("")
  useEffect(() => {
    if (sessionStorage.token) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])
  //console.log(token)

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])
  const handleClear = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
    setPreview("")
  }
  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, language, github, website, projectImage, overview } = projectDetails;
    if (!title || !language || !github || !website || !overview || !projectImage) {
      alert("Please Fill The Form completly")
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
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };
        // console.log("Token:", token);

        // console.log("Request Headers:", reqHeader);
        const response = await uploadProjectAPI(reqBody, reqHeader);
        
        // console.log(response)

        if (response.status === 200) {
          alert("Project added successfully")
          setProjectDetails({
            title: "",
            language: "",
            github: "",
            website: "",
            overview: "",
            projectImage: ""
          })
          setPreview("")
          setAddProjectResponse(response)
          setAddProjectResponse()
          handleClose()
        }
        else{
          alert(response.response.data)
        }

      }
      catch (err) {
        console.log("Error in handleAdd:", err);
        
      }

    }
  }
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Project
      </Button>
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
                <img height={"200px"} width={"200"} src={preview ? preview : "https://cdn3.iconfinder.com/data/icons/photo-tools/65/upload-1024.png"} alt="Profile Image" />
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
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addproject
