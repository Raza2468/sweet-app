import React from 'react'
import url from '../../core/index'
import { Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios'
import moment from 'moment';
import socket from '../../config/socket'
import { useGlobalState, useGlobalStateUpdate } from "../../Context/globaleContext";



function Order() {

    const [product, setProducts] = useState([]);
    const [realTime, setRealTime] = useState(false);
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();
    // console.log(produt, "produt");
    // console.log(produt.itemsPrice, "produtcart");
    useEffect(() => {

        axios({
            method: 'get',
            url: url + "/AllDataStatusIsReview",
        }).then((response) => {

            setProducts(response.data.data)
            console.log(response, "an responseror response");
            // console.log(response.data.order,"serverdtaa");
            // setGlobalState((prevState) => ({
            //   ...prevState,
            //   allOrders: response.data.order,
            //   // console.log();

            // }));


        }, (error) => {
            console.log(error, "an error occured");
        })

        socket.on('All_product', (data) => {

            setRealTime(!realTime);

        })
    }, [])
    console.log(product, "globalStateAll");
    // console.log(globalState.allOrders.map((v) => { console.log(v) }), "All");

    return (
        <div>
            <div className="p-4">
                <h1 className="text-center">Review orders </h1>
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
                                        <h3 className="text-right "><button type="button" class="btn btn-warning btn-rounded">Order Status : {status}</button></h3>

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
    )
}


export default Order