import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AcquisitionMethodService } from '../../../service/AcquisitionMethodService';

export class ListAcquisitionMethod extends Component {
    constructor() {
        super();
        this.state = {
            acquisitionMethodId: "",
            description: "",
            acquisitions: []
        };
        this.acquisitionService = new AcquisitionMethodService();
    }

    componentDidMount() {
        this.acquisitionService.getAll().then((res) => {
            this.setState({ acquisitions: res.data });
        });
    }
    
    render() {

        return (
            <div className="p-col-12">
                <div className="card">
                    <h1>Consulta de Método de Aquisição</h1>
                    <div className="search-box">

                        <div className="search-box-child">
                            <h3 className="first" style={{ marginRight: '10px' }}>Código</h3>
                            <InputText type="text" keyfilter="pint" value={this.state.acquisitionMethodId} onChange={(e) => this.setState({ code: e.target.value })} style={{ width: '75px' }} />
                        </div>

                        <div className="search-box-child">
                            <h3 className="first" style={{ marginRight: '10px' }}>Descrição</h3>
                            <InputText type="text" size="20" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                        </div>

                        <br></br><Button type="submit" id="btnSearch" label="Consultar" className="p-button-primary" icon="pi pi-search" />
                    </div>
                </div>
                <div className="p-col-12">
                    <div className="card">
                        <DataTable value={this.state.acquisitions} paginator={true} rows={10} rowsPerPageOptions={[10, 30, 50, 100]}>
                            <Column field="acquisitionMethodId" header="Código" sortable={true} />
                            <Column field="description" header="Método de Aquisição" sortable={true} />
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}