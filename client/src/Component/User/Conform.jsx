import React from 'react'
import url from '../../core/index'
import { Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios'
import moment from 'moment';
import socket from '../../config/socket'
import { useGlobalState, useGlobalStateUpdate } from "../../Context/globaleContext";





export default function Conform() {

    const [product, setProducts] = useState([]);
    const [realTime, setRealTime] = useState(false);
    const [toggle, settoggle] = useState(false);
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    // console.log(produt, "produt");
    // console.log(produt.itemsPrice, "produtcart");

    useEffect(() => {

        axios({
            method: 'get',
            url: url + "/AllDataStatusOrderAccepted",
        }).then((response) => {

            setProducts(response.data.data)
            console.log(response, "an responseror response");

            // console.log(response.data.order,"serverdtaa");
            // setGlobalState((prevState) => ({
            //   ...prevState,
            //   allOrders: response.data.order,
            //   // console.log();

            // setRealTime(realTime);
            // }));
            socket.on('All_Accept', (data) => {
                // console.log(data, "dataaa");
                setRealTime(!realTime);
            })

        }, (error) => {
            console.log(error, "an error occured");
        })


    }, [realTime])

    // const pendingOrders = product.allOrders.filter((getStatus) => {
    //     return getStatus.status === "Is Review";
    //   });

    //   console.log(pendingOrders,"oen");
    // setRealTime(!realTime);
    //     var a =() => {
    //        // setRealTime(!realTime);
    //        settoggle(!toggle)

    //    }





    return (
        <div>
            {/* <h1>Conform</h1> */}
            <div>
                <div className="p-4">
                    <h1 className="text-center">Conform orders</h1>
                    <div className="d-flex flex-column-reverse">
                        {product.map(
                            ({ orderDetails, itemsPrice, orderscart, cart, message, createdOn, orderTotal, status, remarks, address, phonenumber, price, }, index) => {
                                // console.log(orderscart. itemsPrice, "nahi mil raha hai");
                                return (
                                    <div key={index}>
                                        <div>
                                            {console.log(itemsPrice, cart, "itemsPrice")}
                                            <h3>Order#{index}</h3>
                                            {/* <h3 className="text-right">Order Status : {status}</h3> */}
                                            <h3 className="text-right "><button type="button" class="btn btn-success btn-rounded">Order Status : {status}</button></h3>

                                        </div>
                                        <div>
                                            <Table striped bordered hover size="sm">
                                                {orderscart.map((v, i) => {
                                                    return (
                                                        <>
                                                            <thead key={i}>
                                                                <tr>
                                                                    <th>ProductCode</th>
                                                                    <th>Name</th>
                                                                    <th>Quantity</th>
                                                                    <th>Amount</th>
                                                                    <th>Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {v.cart.map((v, i) => {
                                                                    return (
                                                                        <tr >

                                                                            <td>{v.productKey}</td>
                                                                            {/* <td>{v.message}ccc</td> */}
                                                                            <td>{v.productname}</td>
                                                                            <td>{v.qty} KG</td>
                                                                            <td>{v.price} $</td>
                                                                            <td>{moment(v.createdOn).format('LLLL')}</td>

                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                            <br />


                                                            <tfoot>
                                                                <tr>
                                                                    <th>Address</th>
                                                                    <td colSpan="2">{address}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Phone</th>
                                                                    <td colSpan="2">{phonenumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Total Amount</th>
                                                                    <td colSpan="2">{v.itemsPrice}$</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Remarks</th>
                                                                    <td colSpan="2">{remarks}</td>
                                                                </tr>
                                                            </tfoot>

                                                        </>

                                                    )
                                                })}
                                                <br />
                                            </Table>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}
