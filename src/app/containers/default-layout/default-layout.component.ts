import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLevel } from '../../constants/user-level.enum';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  helper = new JwtHelperService();
  decodedToken = this.helper.decodeToken(localStorage.getItem('token'));

  constructor(@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  getActualUser(): string {
    return this.decodedToken.sub;
  }

  getActualUserLevelString(): string {
    if(this.decodedToken.userlevel == UserLevel.Basic){
      return "Básico";
    }else if(this.decodedToken.userlevel == UserLevel.Intermediary){
      return "Intermediário";
    }else if(this.decodedToken.userlevel == UserLevel.Administrator){
      return "Administrador";
    }
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
