import React from 'react'
import axios from 'axios'
import url from '../../core/index'
import socket from '../../config/socket'
import { useState, useRef, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
import { Card, Button, Alert } from 'react-bootstrap';

export default function AddProduct() {
    const [produt, setProducts] = useState([]);
    const productname = useRef();
    const price = useRef();
    const stock = useRef();
    const description = useRef();
    const fileInput = useRef();
    const productKey = useRef();
    const [realTime, setRealTime] = useState(false);
    // getRequest()

    function handler(event) {
        event.preventDefault();

        // console.log('handler is=>', socket);
        axios({
            method: 'post',
            url: url + '/profilePOST',
            data: {
                productKey:productKey.current.value,
                productname: productname.current.value,
                price: price.current.value,
                stock: stock.current.value,
                description: description.current.value,
                img: fileInput.current.value,

            }, withCredentials: true
        }).then((response) => {
            // console.log(response,"response");
            if (response.data.status === 200) {
                alert(response.data.message)
                console.log(response.data.message, "prodact Detail error");
            } else {
                alert(response.data.message);
                productKey.current.value=""
                productname.current.value = ""
                price.current.value = ""
                stock.current.value = ""
                description.current.value = ""
                fileInput.current.value = ""
                // getRequest();
                console.log(response.data, "upload card");
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    useEffect(() => {
        // console.log(produt, "Effect");
        // getRequest()
        axios({
            method: 'get',
            url: url + "/realtimechat",
        }).then((response) => {
            setProducts(response.data.tweet)
            // console.log(response, "response");

        }, (error) => {
            console.log("an error occured");
        })
        socket.on('chat-connect', (data) => {
        
            setRealTime(!realTime);
            console.log(data, "dataaa");
            console.log(realTime, "realTime");
        })
    }, [realTime])

    function upload() {

        var fileInput = document.getElementById("fileInput");
        let formData = new FormData();

        // console.log("fileInput: ", fileInput);
        // console.log("fileInput: ", fileInput.files[0]);

        formData.append("myFile", fileInput.files[0]);
        formData.append("myName", "malik");
        formData.append("myDetails",
            JSON.stringify({

                "subject": "Science",
                "year": "2021"
            })
        );

        axios({
            method: 'post',
            url: url + "/upload",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {

                // console.log(`upload Success` + JSON.stringify(res.data));
                // document.getElementById("myProfile").src = res.data.profileUrl;
                // document.getElementById("profilePic").src = res.data.profileUrl;
            })
            .catch(err => {
                console.log(err);
            })
        // )
    }

    // function getRequest() {

    //     axios({
    //         method: 'get',
    //         url: url + "/realtimechat",
    //         headers: { 'Content-Type': 'multipart/form-data' }
    //     })
    //         .then(res => {
    //             setRealTime(!realTime);
    //             // setProducts(res.data.tweet)
    //             // console.log(res, "data");

    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    function removeAddProduct(e) {
        // console.log(produt.map((e)=>e._id),"ss");
        // console.log(e._id);

        axios({
            method: 'post',
            url: url + '/deleteCart',

            data: {
                _id: e._id,

            },
            withCredentials: true,

        })
            .then((response) => {

                if (response) {
                    // getRequest()
                    setRealTime(!realTime);
                    // alert(response.data)
                } else {

                    alert(response.data)
                }

            }, (error) => {
                console.log(error.message);
            });

    }

    function AddUserProduct(e) {
        console.log(e, "AddUserProduct");
        axios({
            method: 'post',
            url: url + '/userProduct',

            data: {
                // _id: e._id,
                productname: e.productname,
                price: e.price,
                productKey: e.productKey,
                stock: e.stock,
                description: e.description,
                imgUrl: e.profileUrl,

            },
        }).then((response) => {

            if (response) {
                // console.log(response,"responseresponse");
                alert(response.data.message)
                removeAddProduct(e)
                setRealTime(!realTime);
            } else {

                alert(response.data)
            }

        }, (error) => {
            console.log(error.message);
        });


    }

    // console.log(produt,"produt");
    return (
        <div >

            <form onSubmit={handler}>

                <h1>AddProduct</h1>

                <input type="number" ref={productKey} className="form-control w-25 p-1" placeholder="Product - Key" /> <br />
                <input type="text" className="form-control" ref={productname} placeholder="productname" /> <br />
                <input type="text" ref={price} className="form-control" placeholder="price" /> <br />

                <input type="file" id="fileInput" onChange={upload} ref={fileInput} name="img" accept="image/*" />
                <label for="img">Select image:</label>

                <input type="text" ref={stock} className="form-control" placeholder="stock" /> <br />
                <input type="text" ref={description} className="form-control" placeholder="description" /> <br />

                <Button type="submit">Summit</Button>
            </form>
            <div>

            </div>
            <hr />
            {/* <Button onClick={getRequest}>All Product</Button> */}
            <div id="produt">

                {produt.map((e, index) => (

                    <div className="d-flex justify-content-around" key={e.id, index}>
                        <Card style={{ width: '18rem' }}>
                            {/* {sweetadd && <Alert variant="danger">{sweetadd}</Alert>} */}
                            <div className="bg-image hover-zoom">
                                <img src={e.profileUrl} alt={e.productname} />
                            </div>

                            <Card.Body>
                                {/* <Card.Title>{e.productname}</Card.Title> */}
                                <div className="content">
                                    <h3>
                                        {e.productname}
                                    </h3>
                                    <span>PKR: {e.price}/-Per kg</span>
                                    <p><b>Description:</b>{e.description}</p>
                                    <p><b>stock:</b>{e.stock}</p>
                                    <p><b>ProductKey:</b>{e.productKey}</p>

                                </div>
                                <Button className="btn btn-primary w-100" onClick={() => AddUserProduct(e)}>Send user Dashboard</Button>
                                <Button className="btn btn-danger w-100" onClick={() => removeAddProduct(e)}>Dellet</Button>
                            </Card.Body >
                        </Card>

                    </div>
                ))}

            </div>

        </div>
    )
}





