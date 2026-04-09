import { Component, Input, computed, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuInterface } from '@libs/angular/interfaces/main-menu.interface';

let globalMenuId = 0;

function assignIds(menu: MainMenuInterface[]): MainMenuInterface[] {
  return menu.map((item) => {
    if (item.id == null) {
      item.id = ++globalMenuId;
    }
    if (item.subMenu) {
      item.subMenu = assignIds(item.subMenu);
    }
    return item;
  });
}

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav-menu.html',
  styleUrls: ['./sidenav-menu.scss'],
})
export class SidenavMenuComponent {
  @Input() menuSignal!: Signal<MainMenuInterface[]>;
  @Input() menuClickFn!: (item: MainMenuInterface) => void;
  @Input() visible: boolean = true;

  readonly menuWithIds = computed(() => assignIds(this.menuSignal?.() ?? []));

  openSubmenuId = signal<number | null>(null);
  private lastOpenSubmenuId: number | null = null;

  isLink(item: MainMenuInterface): boolean {
    return !!item.routerLink;
  }

  subMenuSignal(item: MainMenuInterface) {
    return () => item.subMenu ?? [];
  }

  toggleSubmenu(item: MainMenuInterface) {
    if (this.openSubmenuId() === item.id) {
      this.openSubmenuId.set(null);
    } else {
      this.openSubmenuId.set(item.id);
    }
  }

  // Llamar en mouseleave del sidebar
  closeAllSubmenus() {
    this.lastOpenSubmenuId = this.openSubmenuId();
    this.openSubmenuId.set(null);
  }

  // Llamar en mouseenter del sidebar
  restoreSubmenus() {
    this.openSubmenuId.set(this.lastOpenSubmenuId);
  }
}
