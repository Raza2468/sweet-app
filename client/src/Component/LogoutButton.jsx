import axios from 'axios';
import { useGlobalStateUpdate } from "../Context/globaleContext";
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import url from '../core/index'

function LogoutButton() {
    const history = useHistory();

    
    const setGlobalState = useGlobalStateUpdate();

    function logout() {
        axios({
            method: 'post',
            url: url + '/auth/logout',
            withCredentials: true,
        }).then((response) => {
            if (response.status === 200) {
                alert(response.data)
                // console.log(response.data);
                // Router.History.back();
                // history.goBack()

                setGlobalState((prev) => ({ ...prev, loginStatus: false, role: "loggedout", user: null }))
            }
        }, (error) => {
            console.log(error.message);
        });

    }
    return (<Button variant="danger" onClick={logout}>Logout</Button>)
}

export default LogoutButton;