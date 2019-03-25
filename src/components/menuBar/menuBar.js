import React, {Component} from 'react';
import {Menu} from 'primereact/menu';

export class MenuBar extends Component {

    constructor() {
        super();
        this.state = {
            items: [
                {
                    label: 'Opções',
                    items: [{label: 'Home', icon: 'pi pi-fw pi-home', url: '/'}]
                }, 
                {
                    label: 'Conta',
                    items: [{label: 'Usuários', icon: 'pi pi-fw pi-cog', url: '/usuario'},
                            {label: 'Sair', icon: 'pi pi-fw pi-power-off', url: '/login'}]
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <div className="feature-intro">
                        <h3>Menu</h3>
                    </div>
                </div>
                <div className="Menu">
                    <Menu model={this.state.items}/>
                </div>
            </div>
        )
    }
}

export default MenuBar;