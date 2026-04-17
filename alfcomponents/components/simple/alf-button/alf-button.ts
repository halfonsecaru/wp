import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  output,
  ViewEncapsulation,
  Input,
  signal,
  inject,
  effect,
} from '@angular/core';
import { AlfButtonInterface } from './interfaces/alf-button.interface';
import { AlfSpinner } from '../alf-spinner/alf-spinner';


import { getAlfButtonLabel } from './i18n/alf-button.i18n';
import { getAlfPredefinedButton } from './predefined/alf-button.predefined';
import { DefaultButtonKeys } from './enums/defaultButtonKeys.interface';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { AlfBaseComponent } from '@alfcomponents/base';
import { AlfButtonTypeEnum, AlfButtonVisualTypeEnum, AlfLinkTargetEnum } from '@alfcomponents/enums';

/**
 * @component AlfButton
 * @description Botón Élite de la librería AlfComponents.
 * Configuración determinística impulsada por el Elite CSS Variable Engine de AlfBaseComponent.
 * Adaptive Theme Support (Light/Dark).
 */
@Component({
  selector: 'alf-button',
  standalone: true,
  imports: [AlfSpinner, AlfRippleDirective],
  hostDirectives: [AlfTooltipTextDirective],
  templateUrl: './alf-button.html',
  styleUrl: './alf-button.scss', 
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfButton extends AlfBaseComponent<AlfButtonInterface> {

  // --- Bridge Inputs (@Input Setters for JIT/Vitest compatibility) ---
  @Input('link') set link(v: { url: string; target?: AlfLinkTargetEnum } | undefined) { this.linkInput.set(v); }
  @Input('predefined') set predefined(v: AlfButtonInterface | DefaultButtonKeys | string | undefined) { this.predefinedInput.set(v || DefaultButtonKeys.Light); }
  @Input('type') set type(v: AlfButtonTypeEnum | undefined) { this.typeInput.set(v); }
  @Input('visualType') set visualType(v: AlfButtonVisualTypeEnum | undefined) { this.visualTypeInput.set(v); }
  @Input('hideIcon') set hideIcon(v: boolean | undefined) { this.hideIconInput.set(v || false); }
  @Input('debounceTime') set debounceTime(v: number | undefined) { this.debounceTimeInput.set(v || 0); }
  @Input('tooltip') set tooltip(v: string | any | undefined) { this.tooltipInput.set(v); }

  // --- Internal Signals ---
  protected readonly linkInput = signal<{ url: string; target?: AlfLinkTargetEnum } | undefined>(undefined);
  protected readonly predefinedInput = signal<AlfButtonInterface | DefaultButtonKeys | string>(DefaultButtonKeys.Light);
  protected readonly typeInput = signal<AlfButtonTypeEnum | undefined>(undefined);
  protected readonly visualTypeInput = signal<AlfButtonVisualTypeEnum | undefined>(undefined);
  protected readonly hideIconInput = signal<boolean>(false);
  protected readonly debounceTimeInput = signal<number>(0);
  protected readonly tooltipInput = signal<string | any | undefined>(undefined);
  
  private lastClickTime = 0;
  private readonly tooltipDirective = inject(AlfTooltipTextDirective);
  
  /**
   * Modern Outputs (Angular 21+)
   * Evitan el uso de EventEmitter y son reactivos por diseño.
   */
  public readonly onClick = output<MouseEvent>();
  public readonly onHoverEnter = output<MouseEvent>();
  public readonly onHoverLeave = output<MouseEvent>();

  // 1. Resolvemos el ADN base (siempre sólido por defecto para evitar bucles)
  protected readonly resolvedBaseIdentity = computed(() => {
    const p = this.predefinedInput();
    if (!p) return undefined;
    if (typeof p === 'string') return getAlfPredefinedButton(p.toUpperCase(), AlfButtonVisualTypeEnum.Solid, this.hideIconInput());
    return p as AlfButtonInterface;
  });

  // 2. Resolvemos el tipo visual (Mirando la identidad base, NO el final)
  protected readonly visualTypeComputed = computed(() => 
    this.visualTypeInput() ?? 
    (this.resolvedBaseIdentity() as any)?.visualType ?? 
    AlfButtonVisualTypeEnum.Solid
  );

  // 3. Resolvemos la configuración FINAL que usará AlfBaseComponent
  protected override readonly resolvedPredefined = computed(() => {
    const base = this.resolvedBaseIdentity();
    if (!base) return undefined;
    
    // Si la clave era un string, aplicamos la transformación visual ahora que ya sabemos cuál es
    if (typeof this.predefinedInput() === 'string') {
        return getAlfPredefinedButton((this.predefinedInput() as string).toUpperCase(), this.visualTypeComputed(), this.hideIconInput());
    }
    return base;
  });

  // --- Signals Computados (Merge Config + Inputs) ---
  protected readonly linkComputed = computed(() => this.linkInput() ?? (this.defineComponentInput() as any)?.link ?? (this.resolvedPredefined() as any)?.link);
  protected readonly typeComputed = computed(() => this.typeInput() ?? (this.defineComponentInput() as any)?.type ?? (this.resolvedPredefined() as any)?.type);

  // --- Signals Derivados (Elite Logic) ---
  protected readonly isLinkComputed = computed(() => !!this.linkComputed()?.url);
  protected readonly disabledStateComputed = computed(() => this.disabledComputed() || this.loadingComputed()?.isLoading);
  protected readonly ariaLabelComputed = computed(() => this.ariaComputed()?.ariaLabel || this.labelComputed());
  
  protected readonly tooltipComputed = computed(() => 
    this.tooltipInput() ?? (this.defineComponentInput() as any)?.tooltip ?? (this.resolvedPredefined() as any)?.tooltip
  );
  
  protected readonly visualTypeClassesComputed = computed(() => ({
    'alf-btn--text': this.visualTypeComputed() === AlfButtonVisualTypeEnum.Text,
    'alf-btn--glossy': this.visualTypeComputed() === AlfButtonVisualTypeEnum.Glossy || this.visualTypeComputed() === AlfButtonVisualTypeEnum.ThreeD
  }));

  /**
   * Resolución dinámica del tamaño del spinner basado en el tamaño del botón.
   */
  protected readonly spinnerSizeComputed = computed(() => {
    const size = this.sizeComputed();
    switch (size) {
      case 'xs': return '12px';
      case 'sm': return '14px';
      case 'lg': return '20px';
      case 'xl': return '24px';
      case '2xl': return '32px';
      default: return '16px';
    }
  });

  /**
   * Traducción automática de etiquetas basada en i18n
   */
  protected readonly finalLabelComputed = computed(() => {
    const rawLabel = this.labelComputed();
    if (!rawLabel) return rawLabel;

    const key = rawLabel.toLowerCase();
    const translated = getAlfButtonLabel(key as any);

    return (translated && translated !== key) ? translated : rawLabel;
  });

  @HostListener('click', ['$event'])
  protected onHostClick = (event: MouseEvent): void => {
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
  };

  @HostListener('mouseenter', ['$event'])
  protected onMouseEnter = (event: MouseEvent): void => {
    this.onHoverEnter.emit(event);
  };

  @HostListener('mouseleave', ['$event'])
  protected onMouseLeave = (event: MouseEvent): void => {
    this.onHoverLeave.emit(event);
  };

  /**
   * Sincronización Élite con el HostDirective del Tooltip
   */
  private readonly _tooltipSyncEffect = effect(() => {
    const tooltip = this.tooltipComputed();
    this.tooltipDirective.alfTooltipText = tooltip;
  });

  constructor() {
    super();
  }
}
