import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddFarm.css"
function FarmerForm() {
   const [farmersName, setFarmersName] = useState("")  
   const [address, setAddress] = useState("")  
   const [aadharnumber, setAadharNumber] = useState("")  
   const [mobilenumber, setMobileNumber] = useState("")  
   const [seasonyear, setSeasonYear] = useState("")  
   const [dateofregistration, setDateOfRegistration] = useState("")  
   const [farmarea, setFarmArea] = useState("")  
   const [khasranumber, setKhasraNumber] = useState("")  
   const [landmark, setLandmark] = useState("")  
   const [farmpractices, setFarmPractices] = useState("")  
   const [longitude, setLongitude] = useState("")  
   const [latitude, setLatitude] = useState("")  
   const handleSubmit = (e) => {
    e.preventDefault()
    console.log(farmersName,address,aadharnumber,mobilenumber,seasonyear,dateofregistration,farmarea,landmark,khasranumber,farmpractices,longitude,latitude)
   }
  return (
    <>
    <section className="container mt-5 p-4 ">
      <form onSubmit={handleSubmit} className=" shadow p-4 bg-white rounded farm-padding">
      <h2 className="text-center mb-4 text-dark">Add Land Detail</h2>
      <div className=" mb-3 fw-bold">Farmer Information</div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Farmer Name</label>
            <input className="form-control" type="text" placeholder="Full Name" onChange={(e) => setFarmersName(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)}/>
          </div>
          </div>
          <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Aadhar No.</label>
            <input type="text" className="form-control" onChange={(e) => setAadharNumber(e.target.value)}/>
          </div>
          <div className="col-md-6">
            <label className="form-label">Mobile no.</label>
            <input className="form-control" type="number" placeholder="0000000000" onChange={(e) => setMobileNumber(e.target.value)} />
          </div>
        </div>

        <div className="ident_info mb-3 fw-bold">Farm Information</div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Season Year</label>
            <input type="text" className="form-control" placeholder="2024-2025" onChange={(e) => setSeasonYear(e.target.value)}/>
          </div>
          <div className="col-md-6">
            <label className="form-label">Date of Registration</label>
            <input type="date" className="form-control" onChange={(e) => setDateOfRegistration(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Farm Area (in Ha.)</label>
            <input type="text" className="form-control" placeholder="0" onChange={(e) => setFarmArea(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Landmark</label>
            <input type="text" className="form-control" onChange={(e) => setLandmark(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Khasra NO.</label>
            <input type="text" className="form-control" onChange={(e) => setKhasraNumber(e.target.value)}/>
          </div>
          <div className="col-md-6">
            <label className="form-label">Farm Practices</label>
            <input type="text" className="form-control" onChange={(e) => setFarmPractices(e.target.value)}/>
          </div>
        </div>

        <div className="ident_info mb-3 fw-bold">Farm Location</div>
        <div className="row mb-3">
          <div className="col-md-6 mb-3">
            <label className="form-label common_padd">Latitude</label>
            <input type="text" className="form-control common_1" onChange={(e) => setLatitude(e.target.value)} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label common_padd">Longitude</label>
            <input type="text" className="form-control common_1" onChange={(e) => setLongitude(e.target.value)} />
          </div>
        </div>

        <div className=" text-center gap">
          <button type="submit" className="btn btn-success px-4 py-2 rounded-pill">Submit</button>
          <button type="submit" className="btn btn-success px-4 py-2 rounded-pill">Submit and Proceed to Add Products</button>
          <button type="reset" className="btn btn-success px-4 py-2 rounded-pill">Reset</button>


        </div>
      </form>
    </section>
    </>
  );
}

export default FarmerForm
