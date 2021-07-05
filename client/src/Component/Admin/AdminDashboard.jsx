import React from 'react'
import { Table, Button, Card, Accordion, NavItem } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import url from '../../core/index'
import moment from 'moment';
import socket from '../../config/socket'

export default function AdminDashboard() {

    const [checkStatus, setCheckStatus] = useState(false);
    const [pending, setPending] = useState([]);
    const [realTime, setRealTime] = useState(true);
    // const globalState = useGlobalState();
    // const setGlobalState = useSetGlobalState();

    useEffect(() => {
        axios({
            method: 'get',
            url: url + "/AllOrder",
        })
            .then((res) => {
                setPending(res.data.data)
            })
            .catch((err) => console.log(err, "err"));

        // socket.on('chat-connect', (data) => {
        socket.on('All_Order', (data) => {
            console.log('data is', data);
            setRealTime(!realTime);
        })

    }, [realTime])

    // console.log("order details", res);
    //   setGlobalState((prevState) => ({
    //     ...prevState,
    //     allOrders: res.data.orders,
    // totalAmount:res.data.orderTotal
    //   }));
    // setRealTime(!realTime);






    //   console.log(pendingOrders,"Oen");

    // console.log(pendding, "pendding");

    function acceptOrder(_id) {


        axios({
            method: 'POST',
            url: url + "/OrderAccepted",
            data: {
                id: _id
            }, withCredentials: true
        }).then((res) => {
            // console.log("order details", res);
            setRealTime(!realTime);
            alert(res.data.message)
        }).catch((err) => console.log(err, "err"));

        // alert("acceptOrder",_id)
        // console.log(_id);
    }
    function cancleOrder(_id) {
        // useEffect(() => {},[])
        axios({
            method: 'POST',
            url: url + "/OrderCancel",
            data: {
                id: _id
            }, withCredentials: true
        }).then((res) => {
            // console.log("order details", res.data.message);
            alert(res.data.message)
            setRealTime(!realTime);
        }).catch((err) => console.log(err, "err"));

        // alert("cancleOrder", _id)
        // console.log(_id);

    }
    // console.log(globalState.allOrders);
    // const pendingOrders = globalState.allOrders.filter((getStatus) => {
    //   return getStatus.status === "accepted";
    // });

    const pendingOrders = pending.filter((getStatus) => {
        return getStatus.status === "Is Review";
    })
    console.log(pendingOrders,"Arry");

    return (
        <>            <h1>Recent Orders</h1>
            {pendingOrders.length > 0 ? (
                <div className="d-flex flex-column-reverse">
                    {pendingOrders.map(
                        ({ itemsPrice, _id, orderscart, v, createdOn, status, remarks, address, phonenumber, name, email, }, index) => {
                            return (
                                <Accordion key={index} >
                                    <Accordion.Toggle
                                        class="accordion-button"
                                        as={Card.Header}
                                        eventKey="0"
                                        style={{ color: "red", cursor: "pointer" }}
                                        data-mdb-toggle="collapse"
                                    >
                                        New Order #{index}
                                    </Accordion.Toggle >

                                    <Accordion.Collapse eventKey="0" >

                                        <div className="p-4"   >
                                            <div class="pull-left">
                                                <h4 >Order Details</h4>
                                            </div>

                                            <div class="pull-right">
                                                {/* <Button variant="btn-success">Accept Order</Button> */}
                                                <button type="button" onClick={() => acceptOrder(_id)} class="btn btn-success btn-rounded">Accept Order</button>
                                                <button type="button" onClick={() => cancleOrder(_id)} class="btn btn-danger btn-rounded">Order Cancle</button>
                                                {/* <Button variant="danger">Order Cancle</Button> */}
                                            </div>

                                            <div>
                                                <Table striped bordered hover size="sm" >
                                                    {orderscart.map((v, i) => {
                                                        return (
                                                            <>
                                                                <thead key={i}>
                                                                    <tr>
                                                                        <th>ProductCode</th>
                                                                        <th>Sweet Name</th>
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

                                                                <h4>User Details</h4>
                                                                <tfoot>
                                                                    <tr>
                                                                        <th>Total Amount</th>
                                                                        <td colSpan="3">{v.itemsPrice}$</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Status</th>
                                                                        <td colSpan="3">{status}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <td colSpan="3">{name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Email</th>
                                                                        <td colSpan="3">{email}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Address</th>
                                                                        <td colSpan="3">{address}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Phone Number</th>
                                                                        <td colSpan="3">{phonenumber}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Remarks</th>
                                                                        <td colSpan="3">{remarks}</td>
                                                                    </tr>
                                                                </tfoot>

                                                            </>

                                                        )
                                                    })}

                                                </Table>
                                            </div>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                            )
                        })}
                </div>
            ) : (
                "No Orders"
            )}
        </>

    )
}
