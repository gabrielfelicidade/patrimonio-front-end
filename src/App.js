import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AppTopbar } from './components/appTopbar/AppTopbar';
import { AppMenu } from './components/appMenu/AppMenu';
import { AppInlineProfile } from './components/appInlineProfile/AppInlineProfile';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import { Home } from './components/home/Home';
import { ListAcquisitionMethod } from './components/acquisitionmethod/list/ListAcquisitionMethod';
import { NewAcquisitionMethod } from './components/acquisitionmethod/new/NewAcquisitionMethod';
import { ListLocation } from './components/location/list/ListLocation';
import { NewLocation } from './components/location/new/NewLocation';
import { ListPatrimony } from './components/patrimony/list/ListPatrimony';
import { NewPatrimony } from './components/patrimony/new/NewPatrimony';
import { MyUser } from './components/myuser/MyUser';
import { ManageUsers } from './components/manageusers/ManageUsers';
import classNames from 'classnames';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './layout/layout.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'light',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }

        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
        setTimeout(() => { this.layoutMenuScroller.moveBar(); }, 500);
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            { label: 'Home', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Patrimônios', icon: 'pi pi-fw pi-briefcase', to: '/patrimonio' },
            { label: 'Localizações', icon: 'pi pi-fw pi-globe', to: '/localizacao' },
            { label: 'Métodos de Aquisição', icon: 'pi pi-fw pi-dollar', to: '/metodo-aquisicao' },
            {
                label: 'Administrativo', icon: 'pi pi-fw pi-user', items: [
                    { label: 'Meu Usuário', icon: 'pi pi-fw pi-cog', to: '/meu-usuario' },
                    { label: 'Administrar Usuários', icon: 'pi pi-fw pi-users', to: '/usuarios' },
                    { label: 'Registro de Alterações', icon: 'pi pi-fw pi-list', to: '/registro-alteracoes' }
                ]
            },
        ];
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    render() {
        let logo = 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Fatec-sorocaba.png';
        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });
        let sidebarClassName = classNames("layout-sidebar", { 'layout-sidebar-dark': this.state.layoutColorMode === 'dark' });

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu} />

                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{ height: '100%' }}>
                        <div className="layout-sidebar-scroll-content" >
                            <div className="layout-logo">
                                <img alt="Logo" src={logo} height="80" width="140" />
                            </div>
                            <hr style={{ marginTop: 40, marginLeft: 10, marginRight: 10 }} />
                            <AppInlineProfile />
                            <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                        </div>
                    </ScrollPanel>
                </div>

                <div className="layout-main">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/metodo-aquisicao" component={ListAcquisitionMethod} />
                        <Route exact path="/metodo-aquisicao/novo" component={NewAcquisitionMethod} />
                        <Route path="/metodo-aquisicao/{id}" component={NewAcquisitionMethod} />
                        <Route exact path="/localizacao" component={ListLocation} />
                        <Route exact path="/localizacao/novo" component={NewLocation} />
                        <Route path="/localizacao/{id}" component={NewLocation} />
                        <Route exact path="/patrimonio" component={ListPatrimony} />
                        <Route exact path="/patrimonio/novo" component={NewPatrimony} />
                        <Route path="/patrimonio/{id}" component={NewPatrimony} />
                        <Route path="/meu-usuario" component={MyUser} />
                        <Route path="/administrar-usuarios" component={ManageUsers} />
                        <Route path="/registro-alteracoes" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
