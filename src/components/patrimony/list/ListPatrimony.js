import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PatrimonyService } from '../../../service/PatrimonyService';
import { LocationService } from '../../../service/LocationService';

export class ListPatrimony extends Component {
    constructor() {
        super();
        this.state = {
            number: 0,
            brand: "",
            description: "",
            status: "",
            additionalInformation: "",
            patrimonies: [],
            locations: []
        };
        this.locationService = new LocationService();
        this.patrimonyService = new PatrimonyService();
        this.onPatrimonyStateChange = this.onPatrimonyStateChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.routeNewPatrimony = this.routeNewPatrimony.bind(this);
    }

    onPatrimonyStateChange(e) {
        this.setState({ patrimonyState: e.value });
    }

    onLocationChange(e) {
        this.setState({ location: e.value });
    }

    componentDidMount() {
        this.patrimonyService.getAll().then((data) => {
            this.setState({ patrimonies: data.data })
        });
        this.locationService.getAll().then((data) => {
            this.setState({ locations: data.data });
        });
    }

    routeNewPatrimony() {
        let path = '/patrimonio/novo';
        this.props.history.push(path);
    }

    render() {
        const patrimonyStates = [
            { name: 'Ativo', value: 'Ativo' },
            { name: 'Inativo', value: 'Inativo' }
        ];

        return (
            <div className="p-grid">

                <div className="p-col-12">
                    <div className="card">
                        <h1>Consulta de Patrimônio</h1>
                        <div className="search-box">
                            <div className="search-box-child">
                                <h3 className="first" style={{ marginRight: '10px' }}>Localização</h3>
                                <Dropdown value={this.state.location} options={this.state.locations} onChange={this.onLocationChange} style={{ width: '400px' }} placeholder="Selecione uma Localização" optionLabel="description" />
                            </div>
                            <div className="search-box-child">
                                <h3 className="first" style={{ marginRight: '10px' }}>Número</h3>
                                <InputText type="text" size="20" value={this.state.number} onChange={(e) => this.setState({ number: e.target.value })} />
                            </div>
                            <div className="search-box-child">
                                <h3 className="first" style={{ marginRight: '10px' }}>Marca</h3>
                                <InputText type="text" size="20" value={this.state.brand} onChange={(e) => this.setState({ brand: e.target.value })} />
                            </div>
                            <div className="search-box-child">
                                <h3 className="first" style={{ marginRight: '10px' }}>Descrição</h3>
                                <InputText type="text" size="20" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                            </div>
                            <div className="search-box-child">
                                <h3 className="first" style={{ marginRight: '10px' }}>Estado</h3>
                                <Dropdown value={this.state.patrimonyState} options={patrimonyStates} onChange={this.onPatrimonyStateChange} style={{ width: '180px' }} placeholder="Selecione um Estado" optionLabel="name" />
                            </div>
                            <div className="search-box-child">
                                <h3 className="first" style={{ marginRight: '10px' }}>Complemento</h3>
                                <InputText type="text" size="20" value={this.state.complement} onChange={(e) => this.setState({ complement: e.target.value })} />
                            </div>
                            <br></br>
                            <Button type="submit" id="btnSearch" label="Consultar" className="p-button-primary" icon="pi pi-search" />
                            <Button type="submit" id="btnAdd" label="Adicionar" className="p-button-primary" icon="pi pi-plus" onClick={this.routeNewPatrimony} />
                        </div>
                    </div>
                </div>
                <div className="p-col-12">
                    <div className="card">
                        <DataTable value={this.state.patrimonies} paginator={true} rows={10} rowsPerPageOptions={[10, 30, 50, 100]}>
                            <Column field="patrimonyId" header="Número do Patrimônio" sortable={true} />
                            <Column field="description" header="Patrimônio" sortable={true} />
                            <Column field="model" header="Modelo" sortable={true} />
                            <Column field="brand" header="Marca" sortable={true} />
                            <Column field="location.description" header="Localização" sortable={true} />
                            <Column field="acquisitionMethod.description" header="Método de Aquisição" sortable={true} />
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}