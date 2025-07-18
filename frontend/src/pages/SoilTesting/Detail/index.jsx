import React from 'react'
import { Link } from 'react-router-dom'


function Detail({ arraycontent }) {
  return (
    <div>
      <section className="container mt-4">
        {
          arraycontent.map((item, index) => (
            <div className="row first_section">

              <div className="col-md-6 soil_imp">

                <h2 key={index}>{item.mainheading}</h2>
                {
                  item.innerItems.map((item) => (
                    <div className="soil_imp_list">
                      <div><span className="soil_imp_heading">{item.heading}</span> <span className="soil_para">{item.paragraph}</span></div>

                    </div>
                  ))
                }


              </div>
              <div className="col-md-6">
                <img src={item.photo} alt="Soil Test" className="img-fluid" />
              </div>
            </div>
          ))

        }

      </section>
      <section className="container mt-4">
        <div className="row first_section">
          <div className="col-md-6 soil_imp">
            <h2>Types Of Soil Testing</h2>
            <ul className="soil_imp_list">
              <li>Mineral content</li>
              <li>PH level</li>
              <li>Soil moisture</li>
              <li>Salinity</li>
              <li>Pesticides and chemical contamination</li>
              <li>Structure and texture</li>
            </ul>
            <div className="view_more">
              <Link to="/seemore" className="btn btn-primary">View More</Link>
            </div>
          </div>
          <div className="col-md-6">
            <img src="img/soiltest1.jpg" alt="Soil Test" className="img-fluid" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Detail
