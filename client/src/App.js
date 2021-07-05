import React from "react";
import './App.css';
import Home from './Component/Home';
import Signup from './Component/Signup';
import Login from './Component/Login'
import Dashbard from './Component/User/Dashbard'
import AdminDashboard from './Component/Admin/AdminDashboard'
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import LogoutButton from './Component/LogoutButton';
import { Navbar, Form, FormControl, Nav, Button } from 'react-bootstrap';
import { useGlobalState } from './Context/globaleContext'
import AddProduct from './Component/Admin/AddProduct';
import ShowAllProduct from './Component/Admin/ShowAllProduct';
// import AdminDashboard from "./components/AdminDashboard";
import Checkout from './Component/User/Checkout';
import Basket from './Component/User/Basket';
import Pendding from './Component/User/Pendding'
import Conform from './Component/User/Conform'
import Cancle from './Component/User/Cancle'


function App() {
  const globalState = useGlobalState();
  // console.log("globalState: ", globalState);
  return (
    <>
      <nav >
        <Navbar className="nav" bg="f1f1f1">
          {(globalState.role === 'admin') ?
            <>
              <Nav className="mr-auto">

                <Nav.Link><Link to="/">Admin Dashboard</Link></Nav.Link>
                <Nav.Link><Link to="/ShowAllProduct">Show All User Product</Link></Nav.Link>
                <Nav.Link><Link to="/AddProduct">Add Product</Link></Nav.Link>

              </Nav>
              <LogoutButton />
            </> : null
          }

          {(globalState.role === 'user') ?
            <>
              <Nav className="mr-auto">
                <div className="sweetlogo">
                  <img src="https://cdn.worldvectorlogo.com/logos/sweet-candy.svg" className="" alt="sweet" height="50px" width="170px" />

                  {/* <img src="https://d1hbpr09pwz0sk.cloudfront.net/logo_url/sweet-candy-company-59f75af2"  alt="sweet" height="90px" width="200px"/> */}
                </div>
                <Nav.Link><Link to="/">user Dashboard</Link></Nav.Link>

                {/* <Nav.Link><Link to="/order">MY Order</Link></Nav.Link> */}
                {/* <Nav.Link><Link to="/pendding">Pendding  </Link></Nav.Link>
                <Nav.Link><Link to="/Conform">Conform Order</Link></Nav.Link>
                <Nav.Link><Link to="/Cancel">Cancel Order</Link></Nav.Link> */}

                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <span className="mr-2">MY Order</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <Nav.Link><Link to="/pendding"> <MDBDropdownItem>Pendding</MDBDropdownItem></Link></Nav.Link>
                      <Nav.Link><Link to="/Conform"><MDBDropdownItem>Conform Order</MDBDropdownItem></Link></Nav.Link>
                      <Nav.Link><Link to="/cancle"><MDBDropdownItem>Cancle Order</MDBDropdownItem></Link></Nav.Link>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>

                {/* <Nav.Link><Link to="/pendding">Pendding  </Link></Nav.Link>
                <Nav.Link><Link to="/basket">Basket</Link></Nav.Link> */}

              </Nav>

              <LogoutButton />

            </> : null

          }

          {(globalState.role === 'loggedout') ?
            <>
              <Nav className="mr-auto">
                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                <Nav.Link><Link to="/signup">Signup</Link></Nav.Link>
                <Nav.Link><Link to="/login">Login</Link></Nav.Link>
              </Nav>
            </> : null
          }
        </Navbar>
      </nav>

      {/* ROLE NULL////////////////////////////////////// */}

      {(globalState.role === null) ?
        <Switch>
          <Route path="*" ><h1>LOADING......</h1></Route>
        </Switch>
        : null
      }

      {/* ROLE LOGGEDOUT////////////////////////////////////// */}

      {(globalState.role === "loggedout") ?
        <Switch>
          <Route exact path="/"><Home /></Route>

          <Route path="/signup"><Signup /></Route>

          <Route path="/login"><Login /></Route>

          <Route path="*" ><Redirect to="/" /></Route>

        </Switch>

        : null
      }



      {/* ROLE USER ////////////////////////////////////// */}
      {(globalState.role === "user") ?
        <Switch>
          <Route exact path="/"><Dashbard /></Route>

          <Route path="/basket"><Basket /></Route>

          <Route path="/Checkout"><Checkout /></Route>

          <Route path="/pendding"><Pendding /></Route>
          <Route path="/conform"><Conform /></Route>
          <Route path="/cancle"><Cancle /></Route>

          {/* <Route path="/order"><Order /></Route> */}

          <Route path="*"><Redirect to="/" /></Route>
        </Switch>
        : null
      }

      {/* ROLE ADMIN ////////////////////////////////////// */}
      {
        (globalState.role === "admin") ?
          <Switch>

            <Route exact path="/"><AdminDashboard /></Route>
            <Route exact path="/AddProduct"><AddProduct /></Route>
            <Route exact path="/ShowAllProduct"><ShowAllProduct /></Route>

            {/* <Route path="/addproducts"><AddProduct /></Route> */}

            <Route path="*" ><Redirect to="/" /></Route>

            <Route path="*" ><h1>404! Page Not Found</h1></Route>

          </Switch>
          : null
      }

      {/* ADMIN ROUTES REGISTERED/////////////////////////////////////////// */}
      {/* {a === "admin" ?
        <Switch>
          <Route exact path="/" ><h2>ADMIn found successfully</h2></Route>
          <Route exact path="/abc" ><h2>ADMIn found abc</h2></Route>
          <Route path="*" ><h2>ADMIN not found</h2></Route>
        </Switch>
        : null
      } */}

      {/* USER ROUTES REGISTERED/////////////////////////////////////////// */}

      {/* {a === "user" ?
        <Switch>
          <Route exact path="/" ><h2>USER found successfully</h2></Route>
          <Route exact path="/abc" ><h2>USER found abc</h2></Route>
          <Route path="*" ><h2>USER not found</h2></Route>
        </Switch>
        : null
      } */}

    </>
  )
}

export default App;
