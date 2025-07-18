import React from 'react'
import "./footer.css"
const Footer = () => {
    return (
      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <h5>Green Revolution</h5>
              </div>
              <p>
                "Farmers sow seeds of hope, reaping not just crops but the
                sustenance of humanity."
              </p>
              <ul className="d-flex justify-content-center gap-3">
                <li className='icon-footor'>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="img/facebook-logo.png" alt="Facebook" width="40" />
                </a>
                </li>
                <li className='icon-footor'> 
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="img/twitter_icon.png" alt="Twitter" width="40" />
                </a>
                </li>
                <li className='icon-footor'>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="img/instagram.png" alt="Instagram" width="40" />
                </a>
                </li>

              </ul>
            </div>
            <div className="col">
              <h5>Contact Company</h5>
              <table className="table text-white ">
                <tbody>
                  <tr>
                    <td className="w-25 text-end bg-dark">
                      <img src="img/phone_icon.png" alt="Phone" />
                    </td >
                    <td className="w-50 text-start bg-dark text-white">9781617288</td>
                  </tr>
                  <tr>
                    <td className='bg-dark'></td>
                    <td className='text-start bg-dark text-white'>9781617288</td>
                  </tr>
                  <tr>
                    <td className='w-25 text-end bg-dark'>
                      <img src="img/mail_icon.png" alt="Email" />
                    </td>
                    <td className='w-50 text-start bg-dark text-white'>upinderjitsingh32@gmail.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li className='list-items'>Home</li>
                <li className='list-items'>About</li>
                <li className='list-items'>Help us</li>
                <li className='list-items'>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  