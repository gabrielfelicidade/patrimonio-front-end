import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';

import './acquisitionMethod.css';

export default class acquisitionMethod extends Component {
  constructor() {
    super();
    this.state = {
      value: null,
      values1: []
    };
    this.NewAcquisitionMethod = this.NewAcquisitionMethod.bind(this);
  }

  NewAcquisitionMethod() {
    let path = `/metodo-aquisicao-cadastro`;
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="component-acquisition-method">
        <Card style={{ width: '1000px' }}>
          <Button label="Novo" className="p-button-secondary" onClick={this.NewAcquisitionMethod} />
          <Button label="Alterar" className="p-button-secondary" />
          <br /><br />
          <Card style={{ width: '970px' }}>
            <div className="content-section implementation inputgrid-demo">
              <div className="p-grid p-fluid">
                <div className="p-col-6 p-md-3">
                  <h4>Código</h4>
                  <InputText id="txtCode"></InputText>
                </div>
                <div className="p-col-6 p-md-3">
                  <h4>Descrição</h4>
                  <InputText id="txtDescription"></InputText>
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    );
  }
}