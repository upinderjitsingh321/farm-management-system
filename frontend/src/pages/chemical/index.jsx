import { useState } from "react";

export default function ChemicalPage() {
  const [chemicals, setChemicals] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", dosage: "", activeIngredient: "", applicationDate: "", expiryDate: "", manufacturer: "", cropType: "" });

  const addChemical = (e) => {
    e.preventDefault()
    setChemicals([...chemicals, form]);
    setForm({ name: "", type: "", dosage: "", activeIngredient: "", applicationDate: "", expiryDate: "", manufacturer: "", cropType: "" });
  };

  console.log(chemicals)
  return (
    <section className="container mt-5 p-4">
      
      
        <form onSubmit={addChemical} className="registration_form shadow p-4 bg-white rounded reg-padding">
        <h2 className="text-center mb-4 text-dark">Chemical Management</h2>

        <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Chemical Name</label>
          <input className="form-control" type="text" placeholder="Chemical Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="col-md-6">
          <label className="form-label">Type</label>
          <input className="form-control" type="text" placeholder="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          </div>
          </div>
          <div className="row mb-3">
          <div className="col-md-6">
          <label className="form-label">Dosage per Acre</label>
          <input className="form-control" type="text" placeholder="Dosage" value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} />
          </div>
          <div className="col-md-6">
          <label className="form-label">Active Ingredient</label>
          <input className="form-control" type="text" placeholder="Active Ingredient" value={form.activeIngredient} onChange={(e) => setForm({ ...form, activeIngredient: e.target.value })} />
          </div>
          </div>
          <div className="row mb-3">
          <div className="col-md-6">
          <label className="form-label">Application Date</label>
          <input className="form-control" type="date" value={form.applicationDate} onChange={(e) => setForm({ ...form, applicationDate: e.target.value })} />
          </div>
          <div className="col-md-6">
          <label className="form-label">Expiry Date</label>
          <input className="form-control" type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
          </div>
          </div>
          <div className="row mb-3">
          <div className="col-md-6">
          <label className="form-label">Manufacturer</label>
          <input className="form-control" type="text" placeholder="Manufacturer" value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} />
          </div>
          <div className="col-md-6">
          <label className="form-label">Crop Type</label>
          <input className="form-control" type="text" placeholder="Crop Type" value={form.cropType} onChange={(e) => setForm({ ...form, cropType: e.target.value })} />
          </div>
          </div>
          <div className="comman_div_button text-center">
          <button type="submit" className="btn btn-success px-4 py-2 rounded-pill">Add Chemical</button>
        </div>
                </form>
      
      <div style={{margin:"0px 50px"}}>
      <table border="1" width="100%" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Dosage</th>
            <th>Active Ingredient</th>
            <th>Application Date</th>
            <th>Expiry Date</th>
            <th>Manufacturer</th>
            <th>Crop Type</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chem, index) => (
            <tr key={index}>
              <td>{chem.name}</td>
              <td>{chem.type}</td>
              <td>{chem.dosage}</td>
              <td>{chem.activeIngredient}</td>
              <td>{chem.applicationDate}</td>
              <td>{chem.expiryDate}</td>
              <td>{chem.manufacturer}</td>
              <td>{chem.cropType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </section>
  );
}
