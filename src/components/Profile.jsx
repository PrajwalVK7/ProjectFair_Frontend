import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { getUpdatedProfile, updateProfileAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';

function Profile() {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState('')
    const [updateStatus,setUpdateStatus] = useState(false)
    const [userProfile, setUserProfile] = useState({
        github: "",
        linkedin: "",
        profile: ""
    })


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            profile: selectedFile,
        }));
    
        setPreview(URL.createObjectURL(selectedFile));
    };
    

    console.log(userProfile)
    const fetchUpdatedProfile = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        };

        const newData = await getUpdatedProfile(reqHeader)
        if(newData.status===200){
            setUserProfile({
                github:newData.data.github,
                linkedin:newData.data.linkedin,
                profile:newData.data.profile
            })
        }
    }
    useEffect(() => {
        fetchUpdatedProfile()
        setUpdateStatus(false)
    }, [updateStatus])
    const handleUpdate = async (e) => {
        e.preventDefault();
        const { github, linkedin, profile } = userProfile;
        if (!github || !linkedin || !profile) {
            alert("Please Add All Details");
        }
        else {
            try {
                const token = sessionStorage.getItem("token")

                const reqBody = new FormData();
                reqBody.append("github", github);
                reqBody.append("linkedin", linkedin);
                reqBody.append("profile", profile);
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                };

                const response = await updateProfileAPI(reqBody, reqHeader);
                if (response.status === 200) {
                    alert("Profile Updated")
                    setUpdateStatus(true)
                }
                else{
                    console.log(response.response.data)
                }
            }
            catch (err) {
                console.log(err)
            }
        }

    }
    return (
        <>
            <div className=' card shadow p-5 mb-5'>
                <div className='d-flex justify-content-between'>
                    <h2>Profile</h2>
                    <button className='btn btn-outline-info' onClick={() => setOpen(!open)}
                        aria-controls="profile-edit"
                        aria-expanded={open}><i class="fa-solid fa-angle-down" ></i></button>
                </div>
                <Collapse in={open}>
                    <div className='row justify-content-center mt-5' id='profile-edit'>
                        <label htmlFor="profile">
                        <input type="file" id="profile" style={{ display: 'none' }} onChange={handleFileChange} />
                            <img value={userProfile.profile} className='img-fluid rounded-circle' style={{ height: '200px' }} src={preview ? preview :`${BASE_URL}/uploads/${userProfile.profile}` }
                                alt="" />
                        </label>
                        <div>
                            <input value={userProfile.github} type='text' className='form-control mt-3' placeholder='Github Link'
                                onChange={(e) => setUserProfile({ ...userProfile, github: e.target.value })} />
                        </div>
                        <div>
                            <input value={userProfile.linkedin} type='text' className='form-control mt-3 ' placeholder='Linkdin Link'
                                onChange={(e) => setUserProfile({ ...userProfile, linkedin: e.target.value })} />
                        </div>
                        <div className='mt-3 mb-1'>
                            <button className='btn btn-success w-100 rounded' onClick={handleUpdate}>update</button>
                        </div>
                    </div>
                </Collapse>

            </div>
        </>
    )
}

export default Profile
