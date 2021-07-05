import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
import url from '../core/index'

const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)

export function GlobalStateProvider({ children }) {
    const [data, setData] = useState({
        user: null,
        role: null,
        cart: (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []
    })

    useEffect(() => {
        axios({
            method: "get",
            url: url+`/getProfile`,
            withCredentials: true
        }).then((res) => {
            // console.log("context response", res.data.profile, res.status);
            if (res.status === 200) {

                setData((prev) => ({
                    ...prev,
                    user: res.data.profile,
                    role: res.data.profile.role
                })) 
                // console.log('check',res.data.profile.role)
            }
        }).catch((err) => {
            return setData((prev) => ({ ...prev, role: "loggedout" }));

            // console.log(JSON.stringify("Error===========", err.response.status));
            // console.log(err);
            // if (!err.response || err.response.status !== 200) {
            //     setData((prev) => ({ ...prev, role: "loggedout" }));
            // }
        })

        // return () => {
        //     console.log("cleanup");
        // }
    }, []);

    return (
        <GlobalStateContext.Provider value={data}>
            <GlobalStateUpdateContext.Provider value={setData}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    )
} 
