import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';

export class NewPatrimony extends Component {
    constructor() {
        super();
        this.state = {
            location: null,
            aquisition: null,
            value1: null,
            value2: null,
            value3: null,
            value4: null,
            value5: null,
            value6: null,
            value7: null,
            value8: null
        };

        this.onLocationChange = this.onLocationChange.bind(this);
        this.onAquisitionChange = this.onAquisitionChange.bind(this);
    }

    onLocationChange(e) {
        this.setState({ location: e.value });
    }

    onAquisitionChange(e) {
        this.setState({ aquisition: e.value });
    }

    render() {
        const locations = [
            { name: 'Prédio TI - Recepção', value: 'Prédio TI - Recepção' },
            { name: 'Prédio TI - Lab 1', value: 'Prédio TI - Lab 1' },
            { name: 'CA - Hall', value: 'CA - Hall' }
        ];

        const aquisitions = [
            { name: 'Compra', value: 'Compra' },
            { name: 'Doação', code: 'Doação' },
            { name: 'Leilão', code: 'Leilão' }
        ];

        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Novo Patrimônio</h1>
                        <div className="p-grid">
                            <div className="p-col">
                                <h3>Localização</h3>
                                <Dropdown value={this.state.location} options={locations} onChange={this.onLocationChange} style={{ width: '400px' }} placeholder="Selecione uma Localização" optionLabel="name" />
                                <h3>Número do Processo de Aquisição</h3>
                                <InputText type="text" keyfilter="pint" value={this.state.value1} onChange={(e) => this.setState({ value1: e.target.value })} />
                                <h3 className="first">Nota Fiscal</h3>
                                <InputText type="text" size="40" value={this.state.value2} onChange={(e) => this.setState({ value2: e.target.value })} />
                                <h3 className="first">Modelo</h3>
                                <InputText type="text" size="40" value={this.state.value3} onChange={(e) => this.setState({ value3: e.target.value })} />
                                <h3>Valor {this.state.val1}</h3>
                                <InputMask mask="R$ 999,99" value={this.state.value4} placeholder="R$" onChange={(e) => this.setState({ value4: e.value })} />
                                <h3>Informações Complementares</h3>
                                <InputTextarea rows={5} cols={30} autoResize={true} />
                            </div>
                            <div className="p-col">
                                <h3>Número do Patrimônio</h3>
                                <InputText type="text" keyfilter="pint" value={this.state.value5} onChange={(e) => this.setState({ value5: e.target.value })} />
                                <h3 className="first">Descrição</h3>
                                <InputText type="text" size="40" value={this.state.value6} onChange={(e) => this.setState({ value6: e.target.value })} />
                                <h3 className="first">Marca</h3>
                                <InputText type="text" size="40" value={this.state.value7} onChange={(e) => this.setState({ value7: e.target.value })} />
                                <h3 className="first">Número de Série</h3>
                                <InputText type="text" size="40" value={this.state.value8} onChange={(e) => this.setState({ value8: e.target.value })} />
                                <h3>Método de Aquisição</h3>
                                <Dropdown value={this.state.aquisition} options={aquisitions} onChange={this.onAquisitionChange} style={{ width: '400px' }} placeholder="Selecione um meio de Aquisição" optionLabel="name" />
                                <h3>Imagem</h3>
                                <div className="img-box">
                                    <Card style={{ width: '108px', height: '108px' }}>
                                    </Card>
                                    <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={this.onBasicUploadAuto} auto={true} chooseLabel="Selecionar" />
                                </div>
                            </div>
                            <br></br>
                        </div>
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