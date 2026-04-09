import { Component, Input, signal } from '@angular/core';
import { Signal } from '@angular/core';
import { MainMenuInterface } from '@libs/angular/interfaces/main-menu.interface';
import { SidebarComponent } from '../sidebar';


@Component({
  selector: 'app-top-nav-bar-mobile',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './top-nav-bar-mobile.html',
  styleUrls: ['./top-nav-bar-mobile.scss'],
})
export class TopNavBarMobileComponent {
  @Input() nombreApp: string = '';
  @Input() menuSignal!: Signal<MainMenuInterface[]>;
  @Input() menuClickFn!: (item: MainMenuInterface) => void;
  
  menuAbierto = signal(false);

  onSidenavMovilClose = () => {
    this.menuAbierto.set(false);
  };
}
