import React, { Component } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';

import './location.css'

export default class location extends Component {
  constructor() {
    super();
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <div className="component-location">
        <Fieldset className="fieldSet" legend="Formulário de Localização">
          <h3 className="">Nova Localização</h3>
          <h4 className="first">Descrição</h4>
          <InputText value={this.state.value1} onChange={(e) => this.setState({ value1: e.target.value })} />
        </Fieldset>
      </div>
    );
  }
}