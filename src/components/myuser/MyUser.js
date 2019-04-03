import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import './styles.css';

export class MyUser extends Component {
    constructor() {
        super();
        this.state = {
            locationId: null,
            description: "",
            status: true
        };
        this.routeHome = this.routeHome.bind(this);
        this.onHierarchyLevelChange = this.onHierarchyLevelChange.bind(this);
    }

    routeHome() {
        let path = '/';
        this.props.history.push(path);
    }

    onHierarchyLevelChange(e) {
      this.setState({ hierarchyLevel: e.value });
    }

    render() {
      const hierarchyLevel = [
      { name: 'Administrador', value: '1' },
      { name: 'Funcionário', value: '2' },
      { name: 'Consultor', value: '3'}
      ];

      return (
          <div className="p-grid">
              <div className="p-col-12">
                  <div className="card">
                      <h1>Meu Usuário</h1>
                      <h3 className="first">Nome</h3>
                      <InputText type="text" size="40" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                      <br></br>
                      <h3 className="first">Usuário</h3>
                      <InputText type="text" size="40" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                      <br></br>
                      <h3 className="first">Senha</h3>
                      <InputText type="text" size="40" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                      <br></br>
                      <div className="search-box-child">
                        <h3 className="first" style={{ marginRight: '10px' }}>Nível de Hierarquia</h3>
                        <Dropdown value={this.state.hierarchyLevel} options={hierarchyLevel} onChange={this.onHierarchyLevelChange} style={{ width: '310px' }} placeholder="Selecione um Nível de Hierarquia" optionLabel="name" />
                      <br></br>
                      </div>
                      <div className="buttons">
                          <br></br>
                          <Button type="submit" id="btnSave" label="Salvar" className="p-button-primary" icon="pi pi-save" onClick={this.insert} />
                          <Button type="button" id="btnCancel" label="Cancelar" className="p-button-danger" onClick={this.routeListLocation}/>
                      </div>
                  </div>
              </div>
          </div>
      );
    }
}