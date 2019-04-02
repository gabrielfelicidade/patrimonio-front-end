import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export class NewAcquisitionMethod extends Component {
    constructor() {
        super();
        this.state = {
            description: null
        };
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
                            <Button type="submit" id="btnSave" label="Salvar" className="p-button-primary" icon="pi pi-save" />
                            <Button type="button" id="btnCancel" label="Cancelar" className="p-button-danger" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}