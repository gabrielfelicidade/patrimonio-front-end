import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export class NewLocation extends Component {
    constructor() {
        super();
        this.state = {
            value: null
        };
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Nova Localização</h1>
                        <h3 className="first">Descrição</h3>
                        <InputText type="text" size="40" value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} />
                        <br></br>
                        <div className="buttons">
                            <Button type="submit" id="btnSave" label="Salvar" className="p-button-primary" icon="pi pi-save" />
                            <Button type="button" id="btnCancel" label="Cancelar" className="p-button-danger"  />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}