import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {Chips} from 'primereact/chips';
import {InputTextarea} from 'primereact/inputtextarea';

import './formAquisition.css';

export default class formAquisition extends Component {
    constructor() {
      super();
      this.state = {
        value: null,
        values1: []
      };
      this.AcquisitionMethod = this.AcquisitionMethod.bind(this);
    }

    AcquisitionMethod() {
      let path = `/metodo-aquisicao`;
      this.props.history.push(path);
    }

    customChip(item) {
      return (
          <div>
              <span>{item} - (active) </span>
              <i className="pi pi-user-plus" style={{fontSize: '14px'}}></i>
          </div>
      );
  }

    render() {
      return <div className="component-form-aquisition">
        <Card title="Novo Método de Aquisição" style={{width: '500px'}}>

          <div className="content-section implementation">
            <h4>Código</h4>
            <Chips value={this.state.values1} onChange={(e) => this.setState({values1: e.value})} disabled={true}></Chips>
          </div>

          <div className="content-section implementation">
            <h4>Descrição</h4>
            <InputTextarea rows={5} cols={50} autoResize={true}></InputTextarea>
          </div>

          <Button label="Salvar" className="p-button-rounded" id="bttSave" onClick={this.AcquisitionMethod}/>
          <Button label="Cancelar" className="p-button-rounded p-button-warning" id="bttCancel" onClick={this.AcquisitionMethod}/>
        </Card>
      </div>;
    }
  }
