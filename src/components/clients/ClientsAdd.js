import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { Link, useNavigate } from "react-router-dom";
import config from '../../helpers/config.json';

const ClientsAdd = () => {
    let navigate = useNavigate(); 
    const cancel = () => {
        var {operatorId, clientName, nickname, password, level} = document.forms[0]; 
        var hasChanges = operatorId.value.length > 0 ||  clientName.value.length > 0 || nickname.value.length > 0 || password.value.length > 0 ||
            level.value.length > 0
        if(hasChanges){
            if(window.confirm("Existen cambios sin guardar. ¿Seguro de querer cancelar?")){
                navigate("/clients");
            }
        } else {
            navigate("/clients")
        }
    }

    const save = async (event) => {
        event.preventDefault();
        var {clientName, nickname, password, level} = document.forms[0];

        var errors = "";
        errors += clientName.value.length === 0 ? "El campo 'Usuario' es obligatorio.\n" : "";
        errors += nickname.value.length === 0 ? "El campo 'Nickname' es obligatorio.\n" : "";
        errors += password.value.length === 0 ? "El campo 'Contraseña' es obligatorio.\n" : "";
        errors += level.value.length === 0 ? "El campo 'Nivel' es obligatorio.\n" : "";
        errors += level.value !== 'admin' && level.value !== 'seller' ? "El nivel debe ser 'admin' o 'seller'.\n" : "";
        if(errors.length > 0){
            window.alert("Corrija los siguientes errores:\n"+errors);
        } 
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ "operatorId": config.operatorId,"clientName": clientName.value,"nickname": nickname.value,"password": password.value,"level": level.value})
              }
              fetch(config.apiURL+"clients", requestOptions).then((response) => {
                switch(response.status){
                  case 400:
                    console.log("consulta mal formada");
                    break;
                    default:
                    //
                }
                return response.json();
              }).then((result) => {
                  window.alert("Regitro existoso");
                  navigate("/clients");
              })
        }
    }
    return (<div>
            <Topbar />
            <Sidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Incorporación de Cliente</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Cloud Sales</a></li>
                                    <li className="breadcrumb-item"><a href="/clients">Usuarios</a></li>
                                    <li className="breadcrumb-item active">Agregar</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={save}>
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="clientName" className="control-label">Nombre</label>
                                        <input type="text" name="clientName" id="clientName" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="nickname" className="control-label">nickname</label>
                                        <input type="text" name="nickname" id="nickname" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="password" className="control-label">contraseña</label>
                                        <input type="password" name="password" id="password" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label htmlFor="level" className="control-label">nivel</label>
                                        <input type="text" name="level" id="level" className="form-control" required />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" onClick={cancel} className="btn btn-secondary"><i className="fas fa-times"></i> Cancelar</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Guardar</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ClientsAdd;