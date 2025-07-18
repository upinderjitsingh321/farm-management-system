import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"
function SoilForm() {
   const [farmersname, setFarmerName] = useState("") 
   const [contactinformation, setContactInformation] = useState("") 
   const [soillocation, setSoilLocation] = useState("") 
   const [soiltype, setSoilType] = useState("") 
   const [soilcondition, setSoilCondition] = useState("") 
   const [soillevel, setSoilLevel] = useState("") 
   const [issuesfaced, setIssuesFaced] = useState("") 
   const [soilmoisture, setSoilMoisture] = useState("") 
   const [moistureunit, setMoistureUnit] = useState("") 
   const [soiltexture, setSoilTexture] = useState("") 
   const [electricalconductivity, setElectricalConductivity] = useState("") 
   const [organiclevel, setOrganicLevel] = useState("") 
   const [soilsalinity, setSoilSalinity] = useState("") 
   const [n, setN] = useState("") 
   const [p, setP] = useState("") 
   const [k, setK] = useState("") 
   const [so4, setSO4] = useState("") 
   const [cl, setCL] = useState("") 
   const [cu, setCU] = useState("") 
   const [b, setB] = useState("") 
   const [ca, setCA] = useState("") 
   const [mg, setMG] = useState("") 
   const [fe, setFE] = useState("") 
   const [zn, setZN] = useState("") 
   const [mn, setMN] = useState("") 
   
     
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(farmersname,contactinformation,soillocation,soiltype,soilcondition,soillevel,issuesfaced,soilmoisture,moistureunit,soiltexture,electricalconductivity,organiclevel,soilsalinity,n,p,k,so4,cu,b,mg,zn,cl,ca,fe,mn)
  }
  
    return (
        <>
            <section className="container mt-5 p-4">
                <form onSubmit={handleSubmit} className="registration_form shadow p-4 bg-white rounded reg-padding">
                    <h2 className="text-center mb-4 text-dark">Soil Statistics Form</h2>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label for="farmer_name" className="form-label">Farmer Name</label>
                            <input type="text" className="form-control" id="farmer_name"  onChange={(e) => setFarmerName(e.target.value)}/>
                        </div>
                        <div className="col-md-6">
                            <label for="contact" className="form-label">Contact Information:</label>
                            <input type="email" className="form-control" id="contact"  onChange={(e) => setContactInformation(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">

                        <div className="col-md-6">
                            <label for="location" className="form-label">Soil Location:</label>
                            <input type="text" className="form-control" id="location" name="location"
                                placeholder="Enter location or GPS coordinates" required  onChange={(e) => setSoilLocation(e.target.value)} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label" for="soilType">Soil Type:</label>
                            <select className="form-control" id="soilType" name="soilType" required  onChange={(e) => setSoilType(e.target.value)}>
                                <option value="">Select Soil Type</option>
                                <option value="sandy">Sandy</option>
                                <option value="clay">Clay</option>
                                <option value="loamy">Loamy</option>
                                <option value="silt">Silt</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">

                        <div className="col-md-6">
                            <label className="form-label" for="condition">Soil Condition:</label>
                            <select className="form-control" id="condition" name="condition" required  onChange={(e) => setSoilCondition(e.target.value)}>
                                <option value="">Select Condition</option>
                                <option value="dry">Dry</option>
                                <option value="moist">Moist</option>
                                <option value="wet">Wet</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label" for="ph">Soil pH Level (optional):</label>
                            <input className="form-control" for="text" id="ph" name="ph" placeholder="Enter pH level if known"  onChange={(e) => setSoilLevel(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mb-3">

                        <div className="col-md-6">
                            <label className="form-label" for="issues">Issues Faced:</label>
                            <select className="form-control" id="issues" name="issues" required  onChange={(e) => setIssuesFaced(e.target.value)}>
                                <option value="">Select</option>
                                <option value="low_fertility">Low Fertility</option>
                                <option value="erosion">Erosion</option>
                                <option value="pests">Pests</option>
                                <option value="weeds">Weeds</option>
                                <option value="salinity">Salinity</option>
                            </select>
                        </div>


                        <div className="col-md-6">
                            <label className="form-label" for="moisture">Soil Moisture :</label>
                            <div className="soil_moisture row">
                                <div className="col-md-6">
                                    <input className="form-control " type="number" id="moisture" name="moisture" min="0" step="0.01"
                                        placeholder="Enter value"  onChange={(e) => setSoilMoisture(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <select className="form-control" id="moisture" name="moisture" required  onChange={(e) => setMoistureUnit(e.target.value)}>
                                        <option value="">Select Unit</option>
                                        <option value="fc">FC(%)</option>
                                        <option value="pwp">PWP(%)</option>
                                        <option value="taw">TAW(%)</option>
                                    </select>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="row mb-3">

                        <div className="col-md-6">
                            <label className="form-label" for="texture"> Soil Texture</label>
                            <select className="form-control" id="texture" name="texture"  onChange={(e) => setSoilTexture(e.target.value)}>
                                <option>Select</option>
                                <option>Sand</option>
                                <option>Loam</option>
                                <option>Silt</option>
                                <option>Clay</option>
                                <option>Sandy Loam</option>
                                <option>Sandy Clay</option>
                                <option>Loamy Sand </option>
                                <option>Clay Loam</option>
                                <option>Silt Loam</option>
                                <option>Silty Clay</option>
                                <option>Silty Clay Loam</option>
                                <option>Sandy Clay Loam</option>

                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" for="ec">Electrical Conductivity (dS/m):</label>
                            <input className="form-control" type="number" id="ec" name="ec" min="0" step="0.01"
                                placeholder="Enter EC value"  onChange={(e) => setElectricalConductivity(e.target.value)}/>

                        </div>
                    </div>
                    <div className="row mb-3">

                        <div className="col-md-6">
                            <label className="form-label" for="organic_level">Organic Level</label>
                            <select className="form-control" id="organic_level" name="organic_level"  onChange={(e) => setOrganicLevel(e.target.value)}>
                                <option>Select</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label" for="salinity">Soil Salinity</label>
                            <input className="form-control" type="number" id="salinity" name="salinity" min="0" step="0.01"
                                placeholder="Enter Salinity (e.g., 2.5)" onChange={(e) => setSoilSalinity(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label className="form-label" for="nutrientanalysis">Nutrient Analysis</label>
                        </div>
                        <div className="row nutrient_border">
                            <div className="col-md-2 nutrient_padding"><label>N</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder="" onChange={(e) => setN(e.target.value)} /></div>
                            <div className="col-md-2 nutrient_padding"><label>P</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder="" onChange={(e) => setP(e.target.value)} /></div>
                            <div className="col-md-2 nutrient_padding"><label>K</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder="" onChange={(e) => setK(e.target.value)} /></div>
                            <div className="col-md-2 nutrient_padding"><label>SO<sub>4</sub></label><input className="input_size_nutrient"
                                type="number" min="0" step="0.01" placeholder=""  onChange={(e) => setSO4(e.target.value)}/></div>
                            <div className="col-md-2 nutrient_padding"><label>Cl</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder=""  onChange={(e) => setCL(e.target.value)}/>
                            </div>
                            <div className="col-md-2 nutrient_padding"><label>Cu</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder="" onChange={(e) => setCU(e.target.value)} />
                            </div>
                            <div className="col-md-2 nutrient_padding"><label>B</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder="" onChange={(e) => setB(e.target.value)} /></div>
                            <div className="col-md-2 nutrient_padding"><label>Ca</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder="" onChange={(e) => setCA(e.target.value)} />
                            </div>
                            <div className="col-md-2 nutrient_padding"><label>Mg</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder=""  onChange={(e) => setMG(e.target.value)}/>
                            </div>
                            <div className="col-md-2 nutrient_padding"><label>Fe</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder=""  onChange={(e) => setFE(e.target.value)}/>
                            </div>
                            <div className="col-md-2 nutrient_padding"><label>Zn</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder=""  onChange={(e) => setZN(e.target.value)}/>
                            </div>
                            <div className="col-md-2 nutrient_padding"><label>Mn</label><input className="input_size_nutrient" type="number"
                                min="0" step="0.01" placeholder="" onChange={(e) => setMN(e.target.value)} />
                            </div>
                        </div>

                    </div>


                    <div className="comman_div_button text-center">
                        <button type="submit" className="btn btn-success px-4 py-2 rounded-pill">Submit</button>

                    </div>
                </form>
            </section>
        </>
    )
}

export default SoilForm
