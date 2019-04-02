import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { LocationService } from '../../../service/LocationService';


export class ListLocation extends Component {

    constructor() {
        super();
        this.state = {
            locationId: "",
            description: "",
            status: "",
            locations: []
        };
        this.locationService = new LocationService();
        this.onLocationStateChange = this.onLocationStateChange.bind(this);
    }

    onLocationStateChange(e) {
        this.setState({ locationState: e.value });
    }

    componentDidMount() {
        this.locationService.getAll().then((res) => {
            this.setState({ locations: res.data });
        });
    }

    statusTemplate(rowData, column) {
        var ret = rowData.status ? "Ativo" : "Inativo";
        return <div>
            {ret}
        </div>;
    }

    render() {
        const locationStates = [
            { name: 'Ativo', value: 'Ativo' },
            { name: 'Inativo', value: 'Inativo' }
        ];

        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Consulta de Localização</h1>
                        <div className="search-box">
                            <div className="search-box-child">
                                <h3 className="first" style={{ marginRight: '10px' }}>Código</h3>
                                <InputText type="text" keyfilter="pint" value={this.state.locationId} onChange={(e) => this.setState({ locationId: e.target.value })} style={{ width: '75px' }} />
                            </div>
                            <div className="search-box-child">
                                <h3 className="first" style={{ marginRight: '10px' }}>Descrição</h3>
                                <InputText type="text" size="20" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                            </div>
                            <div className="search-box-child">
                                <h3 className="first" style={{ marginRight: '10px' }}>Estado</h3>
                                <Dropdown value={this.state.locationState} options={locationStates} onChange={this.onLocationStateChange} style={{ width: '180px' }} placeholder="Selecione um Estado" optionLabel="name" />
                            </div>
                            <br></br><Button type="submit" id="btnSearch" label="Consultar" className="p-button-primary" icon="pi pi-search" />
                        </div>
                    </div>
                </div>
                <div className="p-col-12">
                    <div className="card">
                        <DataTable value={this.state.locations} paginator={true} rows={10} rowsPerPageOptions={[10, 30, 50, 100]}>
                            <Column field="locationId" header="Código" sortable={true} />
                            <Column field="description" header="Localização" sortable={true} />
                            <Column body={this.statusTemplate} header="Estado" sortable={true} />
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}