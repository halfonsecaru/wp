import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AlfButton, DefaultButtonKeys, AlfThemeManager, setAlfTheme, AlfThemeEnum, ALF_ACTIVE_THEME } from '@alfcomponents';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlfButton],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly themeManager = inject(AlfThemeManager); // Aseguramos que el manager se instancie
  
  protected readonly buttonKeys = DefaultButtonKeys;
  protected readonly themeEnum = AlfThemeEnum;
  protected readonly activeTheme = ALF_ACTIVE_THEME;

  /** Navegación temporal para la demo */
  protected navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  protected setAppTheme(theme: AlfThemeEnum): void {
    setAlfTheme(theme);
  }

  constructor() {}
}
