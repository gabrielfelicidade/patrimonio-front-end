import React, { Component } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

export default class MenuBar extends Component {
    constructor() {
        super();
        this.state = {
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-file',
                    url: '/'
                },
                {
                    label: 'Patrimônio',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Novo',
                            icon: 'pi pi-fw pi-align-left'
                        },
                        {
                            label: 'Listar',
                            icon: 'pi pi-fw pi-align-right'
                        }
                    ]
                },
                {
                    label: 'Localização',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Novo',
                            icon: 'pi pi-fw pi-align-left',
                            url: '/localizacao-cadastro'
                        },
                        {
                            label: 'Listar',
                            icon: 'pi pi-fw pi-align-right'
                        }
                    ]
                },
                {
                    label: 'Método de Aquisição',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Novo',
                            icon: 'pi pi-fw pi-align-left',
                            url: '/metodo-aquisicao-cadastro'
                        },
                        {
                            label: 'Listar',
                            icon: 'pi pi-fw pi-align-right',
                            url: '/metodo-aquisicao'
                        }
                    ]
                },
            ]
        };
    }
    
    render() {
        return (
            <div className="content-section implementation">
                <Menubar model={this.state.items}>
                    <Button label="Sair" icon="pi pi-power-off" style={{ marginLeft: 4 }} />
                </Menubar>
            </div>
        );
    }
}