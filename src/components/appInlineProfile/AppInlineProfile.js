import React, { Component } from 'react';
import classNames from 'classnames';

export class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({ expanded: !this.state.expanded });
        event.preventDefault();
    }

    render() {
        return (
            <div className="profile">
                <div>
                    <img src="assets/layout/images/profile.png" alt="" />
                </div>
                <button className="p-link profile-link" onClick={this.onClick}>
                    <span className="username">Nome do Usuário</span>
                    <i className="pi pi-fw pi-cog" />
                </button>
                <ul className={classNames({ 'profile-expanded': this.state.expanded })}>
                    <li><button className="p-link"><i className="pi pi-fw pi-power-off" /><span>Sair</span></button></li>
                </ul>
            </div>
        );
    }
}