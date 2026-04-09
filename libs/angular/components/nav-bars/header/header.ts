import { Component, input, Input, InputSignal, signal } from '@angular/core';
import { UiStateService } from '../../ui/ui-state.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {

  titleSignal = input<string>();

  constructor(public ui: UiStateService) {}

  toggleSidebar() {
    this.ui.setSidebarExpanded(!this.ui.sidebarExpanded());
  }

  isExpanded() {
    return this.ui.sidebarExpanded();
  }

  showMobileMenu() {
    return this.ui.mobileMenuVisible();
  }

  closeMobileMenu() {
    this.ui.setMobileMenuVisible(false);
  }
}
