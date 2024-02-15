import React from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
    const [open, setOpen] = useState(false);

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
                            <input type="file" id="profile" style={{ display: 'none' }} />
                            <img className='img-fluid rounded-circle' style={{ height: '200px' }} src="https://th.bing.com/th/id/OIP.3YFWg1dLNAGBR8KRGlEVzgAAAA?rs=1&pid=ImgDetMain" alt="" />
                        </label>
                        <div>
                            <input type='text' className='form-control mt-3' placeholder='Github Link' />
                        </div>
                        <div>
                            <input type='text' className='form-control mt-3 ' placeholder='Linkdin Link' />
                        </div>
                        <div className='mt-3 mb-1'>
                            <button className='btn btn-success w-100 rounded'>update</button>
                        </div>
                    </div>
                </Collapse>

            </div>
        </>
    )
}

export default Profile
