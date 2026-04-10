import { Component, input, ViewEncapsulation } from '@angular/core';
import { AlfSpinner } from '../../../shared/components/alf-spinner/alf-spinner';

/**
 * Componente interno para el contenido del botón
 * Evita duplicar el markup entre <a> y <button>
 */
@Component({
  selector: 'alf-button-content',
  standalone: true,
  imports: [AlfSpinner],
  template: `
    @if (isLoading()) {
      <alf-spinner></alf-spinner>
    }

    @if (prefixIcon()) {
      <span class="alf-btn-icon alf-btn-prefix">{{ prefixIcon() }}</span>
    }

    @if (label()) {
      <span class="alf-btn-text">{{ label() }}</span>
    }

    @if (suffixIcon()) {
      <span class="alf-btn-icon alf-btn-suffix">{{ suffixIcon() }}</span>
    }

    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AlfButtonContent {
  isLoading = input<boolean>(false);
  prefixIcon = input<string | undefined>(undefined);
  label = input<string | undefined>(undefined);
  suffixIcon = input<string | undefined>(undefined);
}
