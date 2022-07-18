import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { Link, useNavigate } from "react-router-dom";
import config from '../../helpers/config.json';

const ClientsAdd = () => {
    return(
        <div>
            <Topbar />
            <Sidebar />
        </div>
    )
}

export default ClientsAdd;