import React, { useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import NavDropdown from '../dropdown'
import Button from 'react-bootstrap/Button';
import CustomModal from '../CustomModal';
function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState("");
  const [otp, setOTP] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(mobile, otp)
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg main-navbar">
      <div style={{width:"50px"}}>
          <Link className="navbar-brand logo" to={"/home"}>
          <img src='img/fern.png' style={{width:"100%",height:"100%",transform: "rotate(20deg)"}}/></Link>
          </div>
        <div className="container-fluid container-navbar">
         
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse farm_nav" id="navbarNavDropdown">
            <ul className="navbar-nav farm_gap">
              <li className="nav-item">
                <Link className="nav-link link-color" aria-current="page" to={"/home"}>Home</Link>
              </li>
              <li className="nav-item farm-info">
                <Link className="nav-link link-color" to="/">General Information</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link link-color" aria-current="page" to="/chemical" >Chemical</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-color" aria-current="page" to="/" >Seed</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-color" aria-current="page" to="/soiltesting">Soil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-color" aria-current="page" to="/" >Weather</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link link-color" to="/">Production Chart</Link>
              </li>
            </ul>

          </div>
          <div className='button-container'>
            <li className="nav-item active dropdown drop-registration">

              <NavDropdown />
            </li>
            <li className="nav-item active dropdown">
              <Button className='log-btn' variant="success" onClick={() => setOpen(true)}>Login</Button>
            </li>
            </div>
            <div style={{overflow:'hidden',marginRight:"30px",width:"50px"}}>
             <Link to={"/account"} ><img src='img/account.png' style={{width:"100%",height:"100%",borderRadius:"50%",backgroundColor:"white"}}/> </Link>
              </div>
        </div>
      </nav>
      <CustomModal open={open} setOpen={setOpen}>
        <div className="container d-flex justify-content-center align-items-center p-4">
          <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
            <h4 className="text-center mb-3">Farmer Login</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="text" className="form-control" onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile number" maxLength="10" required />
              </div>
              <div className="mb-3">
                <label className="form-label">OTP</label>
                <input type="tel" className="form-control" onChange={(e) => setOTP(e.target.value)} placeholder="Enter password" required />
              </div>

              <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
          </div>
        </div>

      </CustomModal>
    </>



  )
}

export default Navbar
