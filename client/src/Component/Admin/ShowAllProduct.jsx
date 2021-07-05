import React from 'react'
import axios from 'axios'
import url from '../../core/index'
import socket from '../../config/socket'
import { useState, useRef, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
import { Card, Button, Alert } from 'react-bootstrap';



export default function ShowAllProduct() {

    const [produt, setProducts] = useState([]);
    const [realTime, setRealTime] = useState(false);



    useEffect(() => {

        axios({
            method: 'get',
            url: url + "/userProductAll",
        }).then((response) => {

            // console.log(response, "response");
            setProducts(response.data.tweet)

        }, (error) => {
            console.log("an error occured");
        })

        socket.on('chat-connect', (data) => {
            setRealTime(!realTime);
            console.log(data, "dataaa");
        })
        
    }, [realTime])

    function removeAddProduct(e) {

        axios({
            method: 'post',
            url: url + '/UserDeletAllCart',

            data: {
                _id: e._id,

            },
            withCredentials: true,

        })
            .then((response) => {

                if (response) {
                    alert(response.data)
                    // userProductAll()
                    setRealTime(!realTime);
                } else {

                    alert(response.data)
                }

            }, (error) => {
                console.log(error.message);
            });
    }

    function userProductAll() {

        axios({
            method: 'get',
            url: url + "/userProductAll",
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {

                setProducts(res.data.tweet)

            })
            .catch(err => {

                console.log(err);
            })
    }

    return (
        <div>
            <h1>Show All User Product</h1>
            <Button onClick={userProductAll}>All Product</Button>
            <div id="produt">
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
                                    {/* <Button onClick={() => AddtoCart(e)}>Add to Cart</Button> */}
                                <Button className="btn btn-danger w-100" onClick={() => removeAddProduct(e)}>Dellet</Button>
                                </div>

                            </div>
                        ))}

            </div>

        </div>
    )
}

