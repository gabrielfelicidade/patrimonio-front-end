import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {AcquisitionService} from '../../../service/AcquisitionService';

export class ListAcquisitionMethod extends Component {
    constructor() {
        super();
        this.state = {
            code: null,
            description: null,
            acquisitionState: null,
            acquisitions: []
        };
        this.acquisitionservice = new AcquisitionService();
        this.onacquisitionStateChange = this.onacquisitionStateChange.bind(this);
    }

    onacquisitionStateChange(e) {
        this.setState({acquisitionState: e.value});
    }

    componentDidMount() {
        this.acquisitionservice.getAcquisitionsSmall().then(data => this.setState({acquisitions: data}));
    }
    render() {
        const acquistionStates = [
            {name: 'Ativo', value: 'Ativo'},
            {name: 'Inativo', value: 'Inativo'}
        ];

        return (
            <div className="p-col-12">
                    <div className="card">
                        <h1>Consulta de Método de Aquisição</h1>
                        <div className="search-box">

                            <div className="search-box-child">
                                <h3 className="first"  style={{marginRight:'10px'}}>Código</h3>
                                <InputText type="text" keyfilter="pint" code={this.state.code} onChange={(e) => this.setState({code: e.target.codigo})} style={{width:'75px'}} />
                            </div>

                            <div className="search-box-child">
                                <h3 className="first" style={{marginRight:'10px'}}>Descrição</h3>
                                <InputText type="text" size="20" description={this.state.description} onChange={(e) => this.setState({description: e.target.description})} />
                            </div>

                            <div className="search-box-child">
                                <h3 className="first" style={{marginRight:'10px'}}>Estado</h3>
                                <Dropdown value={this.state.aquisitionState} options={acquistionStates} onChange={this.onacquisitionStateChange} style={{width:'180px'}} placeholder="Selecione um Estado" optionLabel="name"/>
                            </div>

                            <br></br><Button type="submit" id="btnSearch" label="Consultar" className="p-button-primary" icon="pi pi-search" />
                        </div>
                    </div>
                <div className="p-col-12">
                    <div className="card">
                        <DataTable value={this.state.acquisitions} paginator={true} rows={10} rowsPerPageOptions={[10, 30, 50, 100]}>
                            <Column field="code" header="Código" sortable={true}/>
                            <Column field="method" header="Método de Aquisição" sortable={true}/>
                            <Column field="state" header="Estado" sortable={true}/>
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}