import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { LocationService } from '../../../service/LocationService';
import { AcquisitionMethodService } from '../../../service/AcquisitionMethodService';
import { PatrimonyService } from '../../../service/PatrimonyService';
// import { Card } from 'primereact/card';
// import { FileUpload } from 'primereact/fileupload';

export class NewPatrimony extends Component {
    constructor() {
        super();
        this.state = {
            location: null,
            acquisitionMethod: null,
            acquisitionProcessId: "",
            commercialInvoice: "",
            value: 0,
            patrimonyId: "",
            description: "",
            brand: "",
            model: "",
            serialNumber: "",
            additionalInformation: "",
            locations: [],
            acquisitions: []
        };
        this.locationService = new LocationService();
        this.acquisitionService = new AcquisitionMethodService();
        this.patrimonyService = new PatrimonyService();

        this.insert = this.insert.bind(this);
    }

    componentDidMount() {
        this.locationService.getAll().then((data) => {
            this.setState({ locations: data.data });
        });
        this.acquisitionService.getAll().then((data) => {
            this.setState({ acquisitions: data.data });
        });
    }

    insert() {
        var obj = this.patrimonyService.insert(this.state);
        if (obj != null) {
            console.log(obj);
            this.setState({
                location: null,
                acquisitionMethod: null,
                acquisitionProcessId: "",
                commercialInvoice: "",
                value: "",
                patrimonyId: "",
                description: "",
                brand: "",
                model: "",
                serialNumber: "",
                additionalInformation: ""
            });
        } else {
            console.log("error");
        }
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Novo Patrimônio</h1>
                        <div className="p-grid">
                            <div className="p-col">
                                <h3>Localização</h3>
                                <Dropdown value={this.state.location} options={this.state.locations} onChange={(e) => this.setState({ location: e.target.value })} style={{ width: '400px' }} placeholder="Selecione uma Localização" optionLabel="description" />
                                <h3>Número do Processo de Aquisição</h3>
                                <InputText type="text" keyfilter="pint" value={this.state.acquisitionProcessId} onChange={(e) => this.setState({ acquisitionProcessId: e.target.value })} />
                                <h3 className="first">Nota Fiscal</h3>
                                <InputText type="text" size="40" value={this.state.commercialInvoice} onChange={(e) => this.setState({ commercialInvoice: e.target.value })} />
                                <h3 className="first">Modelo</h3>
                                <InputText type="text" size="40" value={this.state.model} onChange={(e) => this.setState({ model: e.target.value })} />
                                <h3>Valor {this.state.val1}</h3>
                                <InputText keyfilter="money" value={this.state.value} placeholder="R$" onChange={(e) => this.setState({ value: e.target.value })} />
                                <h3>Informações Complementares</h3>
                                <InputTextarea rows={5} cols={30} autoResize={true} value={this.state.additionalInformation} onChange={(e) => this.setState({ additionalInformation: e.target.value })} />
                            </div>
                            <div className="p-col">
                                <h3>Número do Patrimônio</h3>
                                <InputText type="text" keyfilter="pint" value={this.state.patrimonyId} onChange={(e) => this.setState({ patrimonyId: e.target.value })} />
                                <h3 className="first">Descrição</h3>
                                <InputText type="text" size="40" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                                <h3 className="first">Marca</h3>
                                <InputText type="text" size="40" value={this.state.brand} onChange={(e) => this.setState({ brand: e.target.value })} />
                                <h3 className="first">Número de Série</h3>
                                <InputText type="text" size="40" value={this.state.serialNumber} onChange={(e) => this.setState({ serialNumber: e.target.value })} />
                                <h3>Método de Aquisição</h3>
                                <Dropdown value={this.state.acquisitionMethod} options={this.state.acquisitions} onChange={(e) => this.setState({ acquisitionMethod: e.target.value })} style={{ width: '400px' }} placeholder="Selecione uma Localização" optionLabel="description" />
                                {/*<h3>Imagem</h3>
                                 <div className="img-box">
                                    <Card style={{ width: '108px', height: '108px' }}>
                                    </Card>
                                    <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={this.onBasicUploadAuto} auto={true} chooseLabel="Selecionar" />
                                </div> */}
                            </div>
                            <br></br>
                        </div>
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