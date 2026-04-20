import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AlfButton, DefaultButtonKeys, AlfThemeEnum, themeSignal, updateThemeColors } from '@alfcomponents';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlfButton, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {

  private readonly router = inject(Router);
  
  protected readonly buttonKeys = DefaultButtonKeys;
  protected readonly themeEnum = AlfThemeEnum;

  /** Navegación temporal para la demo */
  protected navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  protected get activeTheme() {
    return themeSignal().theme;
  }

  protected themeSignal() {
    return themeSignal();
  }

  protected readonly setAppTheme = (theme: AlfThemeEnum) => {
   
    updateThemeColors(theme)
  }

  constructor() {}
}


