import React from 'react'
import axios from 'axios'
import url from '../../core/index'
import socket from '../../config/socket'
import { Link } from 'react-router-dom';
import { Button, } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useGlobalState, useGlobalStateUpdate } from "../../Context/globaleContext";
import "./Dashbard.css"
import Basket from './Basket'
import Checkout from './Checkout'



export default function Dashbard() {

    const [produt, setProducts] = useState([]);
    const [realTime, setRealTime] = useState(false);
    // const [cart, setCart] = useState([]);
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    const [show, ShowHide] = useState(true);
    // const [sweetadd, setSweet] = useState();
    // const [loading, setLoading] = useState(false)
    // const sweetRef = useRef();


    useEffect(() => {

        axios({
            method: 'get',
            url: url + "/userProductAll",
        }).then((response) => {

            setProducts(response.data.tweet)

        }, (error) => {
            console.log(error, "an error occured");
        })

        socket.on('All_product', (data) => {
            // console.log(data,"sf");
            setRealTime(!realTime);

        })
    }, [realTime])

    // function userProductAll() {

    //     axios({
    //         method: 'get',
    //         url: url + "/userProductAll",
    //         // headers: { 'Content-Type': 'multipart/form-data' }
    //     })
    //         .then((response) => {

    //             setProducts(response.data.tweet)

    //             // setRealTime(!realTime);
    //         })
    //         .catch(err => {

    //             console.log(err);
    //         })
    // }

    // async function handlerSubmit(e) {
    //     e.preventDefault()
    //     if (sweetRef.current.value) {

    //     }
    //     try {
    //         setSweet("")
    //         setLoading(true)
    //         await sweetRef.current.value
    //         // history.push("/")
    //     } catch {
    //         setSweet("Failed To login")
    //     }
    //     setLoading(false)
    // }
    // addCart = (id) => {


    // }

    function AddtoCart(e) {
        console.log(":eee", e)
        // e.qty = 1
        setGlobalState((prev) => {
            let cartItems = prev.cart
            cartItems = [...cartItems, e]

            var found = prev.cart.filter((eachCartItem, i) => eachCartItem._id === e._id);
            var newState;

            if (found.length) {
                newState = { ...prev }
                // alert("card allredy access")
            }
            else {
                newState = { ...prev, cart: cartItems }
            }

            localStorage.setItem("cart", JSON.stringify(newState.cart));
            return newState


        })

    }
    function changeState() {
        ShowHide(Prev => !Prev)
    }

    return (

        <div>
            {/* <a className="btn btn-outline-success" onClick={changeState}
        style={{ float: 'right' }} href><i class="fas fa-cart-plus mr-3" /><span>{globalState.cart.length}</span><span className="sr-only">(current)</span></a> */}
           {/* <br /> */}
           {/* Sweet */}
            {/* <h1>Show All User Product</h1> */}
          {/* <div className="sweetlogo">
           <img src="https://cdn.worldvectorlogo.com/logos/sweet-candy.svg" className="sweetlogo" alt="sweet" height="90px" width="200px"/>

          </div> */}
          <br />
           {/* <img src="https://d1hbpr09pwz0sk.cloudfront.net/logo_url/sweet-candy-company-59f75af2"  alt="sweet" height="90px" width="200px"/> */}
            <div className="nav-cart" id="basket">
                <a href="#"></a>
                <Link to="/Basket" onClick={changeState}>
                    <span>{globalState.cart.length}</span>
                    <i class="fa fa-shopping-cart" ></i>
                </Link>
            </div>

            {/* <Button onClick={userProductAll}>All Product</Button> */}
            {show === true ?


                <div id="produt" >

                    {
                        produt.map((e, index) => (
                            <div className="card" key={index}>
                                <div className="bg-image hover-zoom">
                                    <img src={e.profileUrl} alt={e.productname} className="img-fluid" height=""/>
                                </div>

                                <div className="content">
                                    <h3>
                                        {e.productname}
                                    </h3>
                                    <span>PKR: {e.price}/-Per kg</span>
                                    <p><b>Description:</b>{e.description}</p>
                                    <p><b>stock:</b>{e.stock}</p>
                                    {/* <p>{e.productKey}</p> */}
                                    <Button onClick={() => AddtoCart(e)}>Add to Cart</Button>
                                </div>

                            </div>
                        ))}

                </div> :
                <Basket />
            }
            {/* {'===>' + JSON.stringify(globalState.cart)} */}
        </div>
    )
}

