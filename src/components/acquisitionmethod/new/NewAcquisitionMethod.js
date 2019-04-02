import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { AcquisitionMethodService } from '../../../service/AcquisitionMethodService';

export class NewAcquisitionMethod extends Component {
    constructor() {
        super();
        this.state = {
            acquisitionMethodId: null,
            description: ""
        };
        this.acquisitionService = new AcquisitionMethodService();
        this.insert = this.insert.bind(this);
    }

    insert() {
        if (this.state.description.trim() !== "") {
            var obj = this.acquisitionService.insert(this.state);
            if (obj != null) {
                console.log(obj);
                this.setState({
                    acquisitionMethodId: null,
                    description: ""
                });
            } else {
                console.log("error");
            }
        } else {
            console.log("descrição inválida.");
        }
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Novo Método de Aquisição</h1>
                        <h3 className="first">Descrição</h3>
                        <InputText type="text" size="40" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                        <br></br>
                        <div className="buttons">
                            <Button type="submit" id="btnSave" label="Salvar" className="p-button-primary" icon="pi pi-save" onClick={this.insert} />
                            <Button type="button" id="btnCancel" label="Cancelar" className="p-button-danger" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}