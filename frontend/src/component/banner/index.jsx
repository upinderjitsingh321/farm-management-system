import React from 'react'
import "./banner.css"

    const Banner = () => {
      return (
        <section className="container-fluid  text-center py-5 banner">
          <div className="container banner-padding">
            <h2 className="fw-bold text-success">
              Welcome to Agri Management
            </h2>
            <h4 className="text-muted">Growing Agriculture, Growing Futures!</h4>
            <p className="mt-3">
              Empowering farmers with knowledge, tools, and resources for sustainable growth and higher yields.
            </p>
            <p>Let’s cultivate success—together!</p>
            <img src="img/favicon.png" alt="Favicon" className="mt-4 img-fluid"  />
          </div>
        </section>
      );
    };
  
    

export default Banner
