import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  sidebarExpanded = signal(true);
  mobileMenuVisible = signal(false);

  setSidebarExpanded(expanded: boolean) {
    this.sidebarExpanded.set(expanded);
  }

  setMobileMenuVisible(visible: boolean) {
    this.mobileMenuVisible.set(visible);
  }
}
