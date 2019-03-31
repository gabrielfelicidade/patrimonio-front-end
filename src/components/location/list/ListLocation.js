import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CarService} from '../../../service/CarService';


export class ListLocation extends Component {
    constructor() {
        super();
        this.state = {
            codigo: null,
            descricao: null,
            locationState: null,
            cars: []
        };
        this.carservice = new CarService();
        this.onlocationStateChange = this.onlocationStateChange.bind(this);
    }

    onlocationStateChange(e) {
        this.setState({locationState: e.value});
    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    render() {
        const locationStates = [
            {name: 'Ativo', value: 'Ativo'},
            {name: 'Inativo', value: 'Inativo'}
        ];

        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Consulta de Localização</h1>
                        <div className="search-box">
                            <div className="search-box-child">
                                <h3 className="first"  style={{marginRight:'10px'}}>Código</h3>
                                <InputText type="text" keyfilter="pint" codigo={this.state.codigo} onChange={(e) => this.setState({codigo: e.target.codigo})} style={{width:'75px'}} />
                            </div>
                            <div className="search-box-child">
                                <h3 className="first" style={{marginRight:'10px'}}>Descrição</h3>
                                <InputText type="text" size="20" descricao={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.descricao})} />
                            </div>
                            <div className="search-box-child">
                                <h3 className="first" style={{marginRight:'10px'}}>Estado</h3>
                                <Dropdown value={this.state.locationState} options={locationStates} onChange={this.onlocationStateChange} style={{width:'180px'}} placeholder="Selecione um Estado" optionLabel="name"/>
                            </div>
                            <Button type="submit" id="btnSearch" label="Consultar" className="p-button-primary" icon="pi pi-search" />
                        </div>
                    </div>
                </div>
                <div className="p-col-12">
                    <div className="card">
                        <DataTable value={this.state.cars} paginator={true} rows={10} rowsPerPageOptions={[10, 30, 50, 100]}>
                            <Column field="vin" header="Código" sortable={true}/>
                            <Column field="year" header="Localização" sortable={true}/>
                            <Column field="brand" header="Estado" sortable={true}/>
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}