import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className=''style={{backgroundColor:'#31a248'}} >
            <div className=" container-fluid footer row  w-100 mb-2 mt-5" >
                <div className='col-lg-3 text-center mt-3' >
                    <Link to='/' style={{textDecoration:'none'}}><h4 href="#home" style={{ fontSize: "20px",color:"black" }}>
                        <img className='img-fluid me-3' style={{ height: '35px' }} src="https://i.pinimg.com/originals/6b/44/56/6b4456453c7cef0cc8be1dc34d5597f8.png" alt="Project fair" />
                        Project Fair
                    </h4></Link>
                    <h6 >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus voluptatum saepe eveniet iusto. Ad sunt molestias atque, labore natus et nulla eaque quaerat hic porro, mollitia voluptate unde assumenda itaque.
                    </h6>
                </div>
                <div className='col-lg-3 text-center mt-3 '>
                    <h4 className=''>Links</h4>
                    <div className='text-black'>
                        <Link  style={{ textDecoration: "none" }} to={'/'}><h6 className='text-black' >Home</h6></Link>
                        <Link  style={{textDecoration:"none"}} to={'/login'}><h6 className='text-black' >login</h6></Link>
                        <Link  style={{textDecoration:"none"}} to={'/register'}><h6 className='text-black' >Register</h6></Link>
                    </div>
                </div>
                <div className='col-lg-3  text-center mt-3'>
                    <div>
                        <h4>Guides</h4>
                        <h6>React</h6>
                        <h6>Bootsrap</h6>
                        <h6>Guides</h6>
                    </div>
                </div>
                <div className='col-lg-3 text-center mt-3'>
                    <h4>Contact Us</h4>
                    <div className='d-flex'>
                        <input className='form-control' placeholder='Enter Your Email' type="text" />
                        <button className='btn btn-warning ms-2'>Subscribe</button>
                    </div>
                    <div className="icons d-flex justify-content-evenly pt-4">
                        <i class="fa-brands fa-instagram"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-linkedin"></i>
                        <i class="fa-brands fa-facebook"></i>
                    </div>
                </div>
            </div>
            <div className='text-center mb-3'>
                <p>Copyright &#169; 2024, Project Fair built with react</p>
            </div>


        </div>
    )
}

export default Footer
