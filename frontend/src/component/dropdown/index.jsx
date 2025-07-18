import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import "./style.css"

function NavDropdown() {
    return (
      <Dropdown as={ButtonGroup}>
        <Button className='drop-btn ' variant="success"><Link className='color-register' to={"/register"}>New Registration</Link></Button>
       
  
        <Dropdown.Toggle className='drop-btn' split variant="success" id="dropdown-split-basic" />
  
        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item className="dropdown-item" ><Link className='color-list' to={"/addland"}>Add farm</Link></Dropdown.Item>
          <Dropdown.Item className="dropdown-item" ><Link className='color-list' to={"/addcrop"}>Add crop</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  export default NavDropdown;