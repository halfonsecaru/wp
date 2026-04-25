import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { AlfButtonInterface } from '@alfcomponents/components/simple/alf-buttons/interfaces/alf-button.interface';
import { DefaultButtonKeys } from '@alfcomponents/components/simple/alf-buttons/enums/defaultButtonKeys.interface';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { AlfBaseButtonConfiguration } from '@alfcomponents/components/simple/alf-buttons/base/base-button-configuration';

/**
 * @component AlfButton
 * @description Botón Élite de la librería AlfComponents.
 * Configuración determinística impulsada por el Elite CSS Variable Engine de AlfBaseComponent.
 * Adaptive Theme Support (Light/Dark).
 */
@Component({
  selector: 'alf-button',
  standalone: true,
  imports: [AlfRippleDirective],
  hostDirectives: [AlfTooltipTextDirective],
  templateUrl: './alf-button.html',
  styleUrls: ['./alf-button.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfButton extends AlfBaseButtonConfiguration<AlfButtonInterface> {

  protected readonly visualPrefix = '--alf-btn';


  // --- Internal Signals ---
  protected readonly predefinedInput = signal<AlfButtonInterface | DefaultButtonKeys | string>(DefaultButtonKeys.Light);
  protected readonly hideIconInput = signal<boolean>(false);
  protected readonly debounceTimeInput = signal<number>(0);

  private lastClickTime = 0;

  /**
   * Modern Outputs (Angular 21+)
   * Evitan el uso de EventEmitter y son reactivos por diseño.
   */
  public readonly onClick = output<MouseEvent>();
  public readonly onHoverEnter = output<MouseEvent>();
  public readonly onHoverLeave = output<MouseEvent>();


  public onHostClick(event: MouseEvent): void {
    // 1. Debounce Logic (Elite Protection)
    const now = Date.now();
    const threshold = this.debounceTimeInput();

    if (threshold > 0 && (now - this.lastClickTime < threshold)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.lastClickTime = now;

    // 2. Smart Blur (Solo desenfocamos si es click de puntero, manteniendo foco en teclado)
    if (event.detail > 0 && event.currentTarget instanceof HTMLElement) {
      event.currentTarget.blur();
    }

    this.onClick.emit(event);
  }

  public onMouseEnter(event: MouseEvent): void {
    this.onHoverEnter.emit(event);
  }

  public onMouseLeave(event: MouseEvent): void {
    this.onHoverLeave.emit(event);
  }

}
