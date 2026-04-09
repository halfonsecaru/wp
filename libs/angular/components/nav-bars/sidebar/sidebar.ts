import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu';
import { Signal } from '@angular/core';
import { MainMenuInterface } from '@libs/angular/interfaces/main-menu.interface';
import { UiStateService } from '../../ui/ui-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidenavMenuComponent],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() menuSignal!: Signal<MainMenuInterface[]>;
  @Input() menuClickFn!: (item: MainMenuInterface) => void;
  @Input() isMobile = false;
  @Input() onClose?: () => void;
  @Input() minWidthPercent?: number;

  showMenu = true;
  visible = true;

  constructor(public ui: UiStateService) {}

  isMobileSignal = signal(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  private _expanded = signal(false);

  private resizeListener = () => {
    if (typeof window !== 'undefined') {
      this.isMobileSignal.set(window.innerWidth < 768);
    }
  };

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.resizeListener);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['menuSignal']) {
      this.openMenu();
    }
  }

  openMenu() {
    this.showMenu = true;
    setTimeout(() => (this.visible = true), 10);
  }

  closeMenu() {
    this.visible = false;
    setTimeout(() => (this.showMenu = false), 2000);
  }

  isExpanded() {
    return this._expanded();
  }

  changeStatusSidenav(expanded: boolean) {
    this._expanded.set(expanded);
  }

  closeSidebar() {
    if (this.onClose) this.onClose();
  }

  @ViewChild('sidenavMenu') sidenavMenu?: SidenavMenuComponent;

  restoreSubmenusSidebar() {
    this.changeStatusSidenav(true);
    this.sidenavMenu?.restoreSubmenus();
  }

  closeAllSubmenusSidebar() {
    this.changeStatusSidenav(false);
    this.sidenavMenu?.closeAllSubmenus();
  }
}
