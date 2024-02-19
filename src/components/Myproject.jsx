import React from 'react'
import Addproject from './Addproject'
import { useState,useEffect,useContext } from 'react';
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPI';
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare';
import EditProject from './EditProject';
function Myproject() {
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext);
  const {editProjectResponse,seteditProjectResponse}= useContext(editProjectResponseContext)

const [deleteStatus,setDeleteStatus] = useState()
  // const [token, setToken] = useState('');
const [projects, setProjects] = useState([])

const getAllProjects = async () => {
  const token = sessionStorage.getItem("token")
  const reqHeader = {
    "Content-Type":"application/json",
    "Authorization": `Bearer ${token}`
  };
  console.log("token", token)
  const result = await getUserProjectAPI(reqHeader)
  if (result.status === 200) {
    setProjects(result.data)
  }
}
useEffect(() => {
  getAllProjects()
}, [addProjectResponse,deleteStatus,editProjectResponse])
// console.log("projects", projects)


const handleDelete =async(id)=>{
  const token = sessionStorage.getItem("token")
  const reqHeader = {
    "Content-Type":'application/json',
    "Authorization": `Bearer ${token}`
  };

  const result = await deleteProjectAPI(id,reqHeader)
  if(result.status===200){
    setDeleteStatus(result)
    alert("Project Deleted Successfully");

  }
  else{
    console.log(result.response.data)
  }
  console.log(result)

}

  return (
    <>
      <div className='card shadow container-fluid p-5 mb-5 ms-3 '>
        <div className="d-flex">
          <h3 className='text-success'>My Projects</h3>
          <div className='ms-auto'>
            <Addproject  />
          </div>
        </div>
        <div className='mt-5'>
          {projects?.length>0?
          projects.map((item)=>(<div className='border d-flex align-items-center mt-2 rounded p-2'>
          <h5>{item.title}</h5>
          <div className='ms-auto'>
            <EditProject project={item}/>
            <a href={item.github} target='_blank' className='btn  ms-3'><i class="fa-brands fa-github text-success"></i></a>
            <button className='btn  ms-3' onClick={()=>handleDelete(item._id)}><i class="fa-solid fa-trash text-danger"></i></button>
          </div>
        </div>
          )):    <p className='text-danger fw-bolder fs- mt-3'>No Project Uploaded yet</p>
}
          </div>

      </div>
    </>
  )
}

export default Myproject
