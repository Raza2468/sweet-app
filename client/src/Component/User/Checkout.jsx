import React from 'react'
import { useGlobalState, useGlobalStateUpdate } from '../../Context/globaleContext';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import url from '../../core/index'
import { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
const history = useHistory()
    const globalState = useGlobalState();
    const globalStateUpdate = useGlobalStateUpdate();

    const uname = useRef();
    const number = useRef();
    const address = useRef();
    const remarks = useRef();

    // console.log(globalState.cart, "total price")
    function hanldCheck(event) {
        event.preventDefault();
        
        axios({
            method: 'post',
            url: url + "/order",
            
            data: {
                name: uname.current.value,
                phonenumber: number.current.value,
                address: address.current.value,
                remarks: remarks.current.value,
                orderscart: globalState.cart,
                totalPrice: globalState.cart.itemsPrice
            }, withCredentials: true
        }).then((response) => {
            console.log(response,"res");
            alert(response.data.message);

            globalStateUpdate(prev => ({
                //   // console.log(prev,"faf")  
                ...prev,
                cart: []
            }))
            history.push('\Pendding')
            // ls empty
        }).catch((error) => {
            console.log(error,"error");
        });
        
        // console.log( uname.current.value," name: uname.current.value,");
        // console.log( number.current.value,"phonenumber: number.current.value,");
        // console.log(address.current.value,"address: address.current.value,");
        // console.log( globalState.cart,"orders: globalState.cart,");
        // console.log( globalState.cart.itemsPrice,"totalPrice: globalState.cart.totalPrice");

    }
        // console.log("d", globalStateUpdate(prev => ({
        //     //   console.log(prev,"faf")  
        //     ...prev,
        //     cart: []
        // })));
       
        //     //     
        //     //     
        //     //     
        //     //     


    return (
        
        <div>
            User Uder
            <MDBRow>
                <MDBCol md="6">
                    <form className="formcenter" onSubmit={hanldCheck}>
                        <p className="h4 text-center mb-4">Check Out Form</p>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                            Your name
                 </label>
                        <input type="text" className="form-control" required ref={uname} placeholder="Your Name" />
                        <br />
                        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                            Phone Number
                    </label>
                        <input type="text" className="form-control" required ref={number} placeholder="Phone Number" />
                        <br />
                        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                            Address
                    </label>
                        <input type="text" className="form-control" required ref={address} placeholder="Address" />
                        <br />
                        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                            Remarks
                    </label>
                        <input type="text" className="form-control" required ref={remarks} placeholder="Remarks" />

                        <div className="text-center mt-4">
                            <MDBBtn color="unique" type="submit">
                                Confirm Order
                        </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </div>
    )

}
export default Checkout