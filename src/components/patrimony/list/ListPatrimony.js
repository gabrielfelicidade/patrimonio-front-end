import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PatrimonyService } from '../../../service/PatrimonyService';

export class ListPatrimony extends Component {
    constructor() {
        super();
        this.state = {
            number: null,
            brand: null,
            description: null,
            patrimonyState: null,
            complement: null,
            patrimonies: []
        };
        this.patrimonyService = new PatrimonyService();
        this.onPatrimonyStateChange = this.onPatrimonyStateChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    onPatrimonyStateChange(e) {
        this.setState({ patrimonyState: e.value });
    }

    onLocationChange(e) {
        this.setState({ location: e.value });
    }

    componentDidMount() {
        this.patrimonyService.getPatrimoniesSmall().then(data => this.setState({ patrimonies: data }));
    }

    render() {
        const patrimonyStates = [
            { name: 'Ativo', value: 'Ativo' },
            { name: 'Inativo', value: 'Inativo' }
        ];

        const locations = [
            { name: 'Prédio TI - Recepção', value: 'Prédio TI - Recepção' },
            { name: 'Prédio TI - Lab 1', value: 'Prédio TI - Lab 1' },
            { name: 'CA - Hall', value: 'CA - Hall' }
        ];

        return (
            <div className="p-grid">

                <div className="p-col-12">
                    <div className="card">
                        <h1>Consulta de Patrimônio</h1>
                        <div className="search-box">
                            <div>
                                <h3>Localização</h3>
                                <Dropdown value={this.state.location} options={locations} onChange={this.onLocationChange} style={{ width: '400px' }} placeholder="Selecione uma Localização" optionLabel="name" />
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
                        </div>
                    </div>
                </div>
                <div className="p-col-12">
                    <div className="card">
                        <DataTable value={this.state.locations} paginator={true} rows={10} rowsPerPageOptions={[10, 30, 50, 100]}>
                            <Column field="location" header="Localização" sortable={true} />
                            <Column field="number" header="Número do Patrimônio" sortable={true} />
                            <Column field="description" header="Descrição" sortable={true} />
                            <Column field="brand" header="Marca" sortable={true} />
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}