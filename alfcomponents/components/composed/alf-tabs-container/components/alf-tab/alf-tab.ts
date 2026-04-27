import { Component, input, signal } from '@angular/core';
import { AlfSingleTabInterface } from '../../interfaces/alf-tabs.interface';

@Component({
  selector: 'alf-tab',
  standalone: true,
  imports: [],
  templateUrl: './alf-tab.html',
  styleUrl: './alf-tab.scss'
})
export class AlfTabComponent {
  /**
   * Configuración de la pestaña.
   */
  public readonly tabConfig = input<AlfSingleTabInterface>();
  public readonly tabName = input.required<string>();

  /**
   * Estado de visibilidad (controlado por el contenedor).
   */
  public readonly isActive = signal<boolean>(false);
}
