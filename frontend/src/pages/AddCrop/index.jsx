import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

function AddCrop() {
    const [farmersname, setFarmersName] = useState("")  
    const [address, setAddress] = useState("")  
    const [aadharnumber, setAadharNumber] = useState("")  
    const [mobilenumber, setMobileNumber] = useState("")  
    const [productname, setProductName] = useState("")  
    const [registration, setRegistrationNo] = useState("")  
    const [producttype, setProductType] = useState("")  
    const [variety, setVariety] = useState("")  
    const [season, setSeason] = useState("")  
    const [farmarea, setFarmArea] = useState("")  
    const [production, setProduction] = useState("")  
    const [datesnowing, setDateSnowing] = useState("")  
    const [remark, setRemark] = useState("")  
    console.log(farmersname,address,aadharnumber,mobilenumber,productname,registration,producttype,variety,season,farmarea,production,datesnowing,remark)
    return (
        <>
            <section className="container mt-5 p-4 ">
                <form className=" shadow p-4 bg-white rounded farm-padding">
                    <h2 className="text-center mb-4 text-dark">Add Crop Detail</h2>
                    <div className=" mb-3 fw-bold">Farmer Information</div>

                    <div className="row">
                        <div className="col-md-6">
                            <label for="farmer_name" class="form-label">Farmer Name</label>
                            <input type="email" class="form-control" id="farmer_name" aria-describedby="emailHelp"onChange={(e) => setFarmersName(e.target.value)} />

                        </div>
                        <div class="col-md-6">
                            <label for="farmer_address" class="form-label">Address</label>
                            <input type="type" class="form-control" id="farmer_address" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Aadhar No.</label>
                            <input type="text" className="form-control" onChange={(e) => setAadharNumber(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mobile no.</label>
                            <input className="form-control" type="number" placeholder="0000000000" onChange={(e) => setMobileNumber(e.target.value)} />
                        </div>
                    </div>

                    <div className="ident_info mb-3 fw-bold">Product Infomation</div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="product_name" class="form-label">Product Name</label>
                            <input type="type" class="form-control" id="product_name" onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div class="col-md-6">
                            <label for="registration_no" class="form-label">Farm Registration No.</label>
                            <input type="type" class="form-control" id="registration_no" onChange={(e) => setRegistrationNo(e.target.value)} />
                        </div>

                    </div>
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <label for="select_product" class="form-label common_select">Product Type</label>
                            <select class="form-select form-select-sm" onChange={(e) => setProductType(e.target.value)}>
                                <option selected>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="select_season" class="form-label common_select">Season</label>
                            <select class="form-select form-select-sm" onChange={(e) => setSeason(e.target.value)}>
                                <option selected>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="select_variety" class="form-label">Variety</label>
                            <select class="form-select form-select-sm" onChange={(e) => setVariety(e.target.value)}>
                                <option selected>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="farm_area" class="form-label">Farm Area in(Ha.)</label>
                            <input type="type" class="form-control" id="farm_area" placeholder="0" onChange={(e) => setFarmArea(e.target.value)}/>
                        </div>
                        <div class="col-md-6">
                            <label for="production" class="form-label">Likely Production</label>
                            <input type="type" class="form-control" id="production"onChange={(e) => setProduction(e.target.value)} />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="snowing" class="form-label">Date of Snowing</label>
                            <input type="date" class="form-control" id="snowing"onChange={(e) => setDateSnowing(e.target.value)} />
                        </div>
                        <div class="col-md-12">
                            <label for="remarks" class="form-label">Remarks</label>
                            <input type="type" class="form-control" id="remarks" onChange={(e) => setRemark(e.target.value)}/>
                        </div>
                    </div>
                    <div className=" text-center">
                        <button type="submit" className="btn btn-success px-4 py-2 rounded-pill">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddCrop
