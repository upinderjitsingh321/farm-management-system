import React from 'react'
import "./Features.css"
import Card from '../../../component/Card/Card';
import { Link } from 'react-router';


const AgriFeatures = ({ aggriArray }) => {

  return (
    <section className="container text-center my-5">
      <div className="row row-cols-1 row-cols-md-2 g-4">

        {
          aggriArray.map((item, index) => (
            <div key={index} className="col text-start">
              <div className="p-3 ">
                <img className='icons-item' src={item.icon} />
                <Link to={`/details/${item.heading}`}>


                  <Card
                    head={item.heading} para={item.paragraph} />
                </Link>
              </div>
            </div>
          ))
        }


      </div >
    </section >
  );
};

export default AgriFeatures;
