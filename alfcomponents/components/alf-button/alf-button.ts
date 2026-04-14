import {
  Component,
  ElementRef,
  Renderer2,
  inject,
  Signal,
  Output,
  EventEmitter,
  signal,
  computed,
  effect,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  input
} from '@angular/core';
import { AlfButtonConfig } from './interfaces/alf-button.interface';
import { AlfSpinner } from '../alf-spinner/alf-spinner';
import {
  AlfColorEnum,
  AlfColorVariantEnum,
  AlfFontWeightEnum,
  AlfRadiusEnum,
  AlfPxEnum,
  AlfButtonTypeEnum,
  AlfSizeEnum,
  AlfLinkTargetEnum,
  AlfIconsUnicodeIconEnum,
} from '../../enums';
import { 
  AlfLoadingInterface,
  AlfTypographyInterface,
  AlfPaddingInterface,
  AlfMarginInterface,
  AlfBorderInterface,
  AlfShadowsInterface,
  AlfBackgroundsInterface,
  AlfTransformInterface,
  AlfAriaInterface,
  AlfRippleInterface,
} from '../../interfaces';
import { LOADING_DEFAULT_SIGNAL } from '../../directives/alf-loading/predefined/alf-loading.tokens';

/**
 * @component AlfButton
 * @description Botón Élite de la librería AlfComponents.
 * Soporta configuración granular extrema, internacionalización, carga y Ripple.
 * Versión Élite: Máxima compatibilidad JIT/Vitest, Zero SCSS, WAAPI y Rigor Técnico.
 */
@Component({
  selector: 'alf-button',
  standalone: true,
  imports: [],
  templateUrl: './alf-button.html',
  styleUrls: ['./alf-button.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlfButton implements OnDestroy {

  // --- Inputs de Configuración (Signals) ---
  protected readonly configInput = input<AlfButtonConfig>({});
  
  // Primitivos y Base
  protected readonly labelInput = input<string>();
  protected readonly variantInput = input<AlfColorVariantEnum>();
  protected readonly sizeInput = input<AlfSizeEnum>();
  protected readonly typeInput = input<AlfButtonTypeEnum>();
  protected readonly disabledInput = input<boolean>();
  protected readonly iconLeftInput = input<AlfIconsUnicodeIconEnum>();
  protected readonly iconRightInput = input<AlfIconsUnicodeIconEnum>();
  protected readonly idInput = input<string | number>();
  protected readonly customClassInput = input<string | string[]>();
  protected readonly customStyleInput = input<Record<string, string>>();
  protected readonly linkInput = input<{ url: string; target?: AlfLinkTargetEnum }>();

  // Interfaces Granulares
  protected readonly loadingInput = input<AlfLoadingInterface>();
  protected readonly typographyInput = input<AlfTypographyInterface>();
  protected readonly paddingInput = input<AlfPaddingInterface>();
  protected readonly marginInput = input<AlfMarginInterface>();
  protected readonly borderInput = input<AlfBorderInterface>();
  protected readonly shadowsInput = input<AlfShadowsInterface>();
  protected readonly backgroundsInput = input<AlfBackgroundsInterface>();
  protected readonly transformInput = input<AlfTransformInterface>();
  protected readonly ariaInput = input<AlfAriaInterface>();
  protected readonly rippleInput = input<boolean | AlfRippleInterface>();

  // --- Signals Computados (Merge Config + Inputs Individuales) ---
  
  protected readonly labelComputed = computed(() => this.labelInput() ?? this.configInput()?.label);
  protected readonly variantComputed = computed(() => this.variantInput() ?? this.configInput()?.variant);
  protected readonly sizeComputed = computed(() => this.sizeInput() ?? this.configInput()?.size);
  protected readonly typeComputed = computed(() => this.typeInput() ?? this.configInput()?.type);
  protected readonly disabledComputed = computed(() => this.disabledInput() ?? this.configInput()?.disabled);
  protected readonly iconLeftComputed = computed(() => this.iconLeftInput() ?? this.configInput()?.iconLeft);
  protected readonly iconRightComputed = computed(() => this.iconRightInput() ?? this.configInput()?.iconRight);
  protected readonly idComputed = computed(() => this.idInput() ?? this.configInput()?.id);
  protected readonly customClassComputed = computed(() => this.customClassInput() ?? this.configInput()?.customClass);
  protected readonly customStyleComputed = computed(() => this.customStyleInput() ?? this.configInput()?.customStyle);
  protected readonly linkComputed = computed(() => this.linkInput() ?? this.configInput()?.link);

  protected readonly loadingComputed: Signal<AlfLoadingInterface> = computed(() => {
    return this.loadingInput() ?? this.configInput()?.loading ?? LOADING_DEFAULT_SIGNAL();
  });

  protected readonly typographyComputed = computed(() => this.typographyInput() ?? this.configInput()?.typography);
  protected readonly paddingComputed = computed(() => this.paddingInput() ?? this.configInput()?.padding);
  protected readonly marginComputed = computed(() => this.marginInput() ?? this.configInput()?.margin);
  protected readonly borderComputed = computed(() => this.borderInput() ?? this.configInput()?.border);
  protected readonly shadowsComputed = computed(() => this.shadowsInput() ?? this.configInput()?.shadows);
  protected readonly backgroundsComputed = computed(() => this.backgroundsInput() ?? this.configInput()?.backgrounds);
  protected readonly transformComputed = computed(() => this.transformInput() ?? this.configInput()?.transform);
  protected readonly ariaComputed = computed(() => this.ariaInput() ?? this.configInput()?.aria);
  protected readonly rippleComputed = computed(() => this.rippleInput() ?? this.configInput()?.ripple);


  // // a partir de aqui es codigo generado por la ia
  // private readonly _el = inject(ElementRef<HTMLElement>);
  // private readonly _renderer = inject(Renderer2);

  // @ViewChild('buttonHost') private _buttonHost?: ElementRef<HTMLElement>;

  // /**
  //  * Puente para compatibilidad con Vitest/JIT.
  //  */
  // // @Input({ alias: 'config' })
  // // public set configInput(value: AlfButtonConfig) {
  // //   this._config.set(value);
  // // }

  // // Signals de estado
  // private readonly _config = signal<AlfButtonConfig>({});
  // public readonly config = this._config.asReadonly();
  // public readonly currentState = signal<'default' | 'hover' | 'focus' | 'disabled'>('default');
  // @Output()
  // public readonly clicked = new EventEmitter<MouseEvent>();

  // protected readonly isLoading = computed(() => {
  //   const l = this.config().loading;
  //   return typeof l === 'boolean' ? l : l?.isLoading ?? false;
  // });

  // protected readonly linkUrl = computed(() => this.config().link?.url);
  // protected readonly linkTarget = computed(() => this.config().link?.target || '_self');
  // protected readonly ariaLabel = computed(() => this.config().aria?.ariaLabel || this.config().label);

  // protected readonly spinnerColor = computed(() => {
  //   const l = this.config().loading;
  //   if (typeof l !== 'boolean' && l?.spinnerColor) return l.spinnerColor;

  //   // Default spinner color (logic premium: contrast with bg)
  //   return AlfColorEnum.White;
  // });

  // protected readonly spinnerSize = computed(() => AlfPxEnum.Px16);

  // /**
  //  * Efecto reactivo para aplicar estilos programáticos basados en el estado.
  //  */
  // private readonly styleEffect = effect(() => {
  //   const config = this.config();
  //   const state = this.currentState();
  //   const isDisabled = config.disabled || this.isLoading();

  //   this.applyEliteStyles(config, isDisabled ? 'disabled' : state);
  // });

  // /**
  //  * Maneja el click del botón.
  //  */
  // public readonly handleClick = (event: MouseEvent): void => {
  //   if (this.isLoading() || this.config().disabled) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     return;
  //   }
  //   this.clicked.emit(event);
  // };

  // // --- Listeners de Estado (Zero SCSS Hover/Focus) ---

  // private _listeners: (() => void)[] = [];

  // ngAfterViewInit(): void {
  //   const btn = this._buttonHost?.nativeElement;
  //   if (!btn) return;

  //   this._listeners.push(
  //     this._renderer.listen(btn, 'mouseenter', () => this.currentState.set('hover')),
  //     this._renderer.listen(btn, 'mouseleave', () => this.currentState.set('default')),
  //     this._renderer.listen(btn, 'focus', () => this.currentState.set('focus')),
  //     this._renderer.listen(btn, 'blur', () => this.currentState.set('default'))
  //   );
  // }

  // /**
  //  * Motor de Estilos Élite: Traduce las interfaces granulares a CSS nativo.
  //  */
  // private applyEliteStyles(config: AlfButtonConfig, state: 'default' | 'hover' | 'focus' | 'disabled'): void {
  //   const btn = this._buttonHost?.nativeElement;
  //   if (!btn) return;

  //   // 1. Reset base (Estilo básico Premium)
  //   this.resetBaseStyles(btn);

  //   // 2. Aplicar variante base (solo en estado default si no hay overrides)
  //   this.applyVariantStyles(btn, config.variant || AlfColorVariantEnum.Primary, state);

  //   // 3. Aplicar interfaces granulares (Sobrescriben a la variante)
  //   // Buscamos estilos para el estado actual o el 'default' como fallback
  //   const styles = {
  //     padding: config.padding?.[state] || config.padding?.default,
  //     border: config.border?.[state] || config.border?.default,
  //     typography: config.typography?.[state] || config.typography?.default,
  //     shadows: config.shadows?.[state] || config.shadows?.default,
  //     background: config.backgrounds?.[state] || config.backgrounds?.default,
  //   };

  //   if (styles.padding) this.applyPadding(btn, styles.padding);
  //   if (styles.border) this.applyBorder(btn, styles.border);
  //   if (styles.typography) this.applyTypography(btn, styles.typography);
  //   if (styles.shadows) this.applyShadows(btn, styles.shadows);
  //   if (styles.background) this.applyBackground(btn, styles.background);

  //   // 4. Custom overrides
  //   if (config.customStyle) {
  //     Object.entries(config.customStyle).forEach(([prop, val]) => {
  //       this._renderer.setStyle(btn, prop, val);
  //     });
  //   }
  // }

  // private resetBaseStyles(el: HTMLElement): void {
  //   const base: Record<string, string> = {
  //     'padding': '10px 24px',
  //     'border-radius': AlfRadiusEnum.Md,
  //     'font-family': 'inherit',
  //     'font-weight': AlfFontWeightEnum.SemiBold,
  //     'font-size': '14px',
  //     'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  //     'border': '1px solid transparent',
  //     'display': 'inline-flex',
  //     'align-items': 'center',
  //     'justify-content': 'center',
  //     'gap': '8px',
  //     'cursor': 'pointer',
  //     'background': 'none',
  //     'box-shadow': 'none',
  //   };

  //   Object.entries(base).forEach(([prop, val]) => this._renderer.setStyle(el, prop, val));
  // }

  // private applyVariantStyles(el: HTMLElement, variant: AlfColorVariantEnum, state: string): void {
  //   const colors: Record<string, { bg: string; color: string; border?: string }> = {
  //     [AlfColorVariantEnum.Primary]: { bg: AlfColorEnum.Primary, color: AlfColorEnum.White },
  //     [AlfColorVariantEnum.Secondary]: { bg: AlfColorEnum.Secondary, color: AlfColorEnum.White },
  //     [AlfColorVariantEnum.Danger]: { bg: AlfColorEnum.Red600, color: AlfColorEnum.White },
  //     [AlfColorVariantEnum.Success]: { bg: AlfColorEnum.Green600, color: AlfColorEnum.White },
  //     [AlfColorVariantEnum.Light]: { bg: AlfColorEnum.Gray100, color: AlfColorEnum.Black, border: AlfColorEnum.Gray300 },
  //     [AlfColorVariantEnum.Dark]: { bg: AlfColorEnum.Black, color: AlfColorEnum.White },
  //   };

  //   const style = colors[variant] || colors[AlfColorVariantEnum.Primary];

  //   let bg = style.bg;
  //   let color = style.color;

  //   // Lógica Simple de Hover para variantes (si no hay config específica)
  //   if (state === 'hover') {
  //     this._renderer.setStyle(el, 'filter', 'brightness(1.1)');
  //     this._renderer.setStyle(el, 'transform', 'translateY(-1px)');
  //   }
  //   if (state === 'disabled') {
  //     this._renderer.setStyle(el, 'opacity', '0.6');
  //     this._renderer.setStyle(el, 'cursor', 'not-allowed');
  //     this._renderer.setStyle(el, 'filter', 'grayscale(0.2)');
  //   }

  //   this._renderer.setStyle(el, 'background', bg);
  //   this._renderer.setStyle(el, 'color', color);
  //   if (style.border) this._renderer.setStyle(el, 'border-color', style.border);
  // }

  // private applyPadding(el: HTMLElement, p: any): void {
  //   if (p.padding) this._renderer.setStyle(el, 'padding', p.padding);
  //   if (p.paddingTop) this._renderer.setStyle(el, 'padding-top', p.paddingTop);
  //   if (p.paddingRight) this._renderer.setStyle(el, 'padding-right', p.paddingRight);
  //   if (p.paddingBottom) this._renderer.setStyle(el, 'padding-bottom', p.paddingBottom);
  //   if (p.paddingLeft) this._renderer.setStyle(el, 'padding-left', p.paddingLeft);
  // }

  // private applyBorder(el: HTMLElement, b: any): void {
  //   if (b.borderWidth) this._renderer.setStyle(el, 'border-width', b.borderWidth);
  //   if (b.borderColor) this._renderer.setStyle(el, 'border-color', b.borderColor);
  //   if (b.borderStyle) this._renderer.setStyle(el, 'border-style', b.borderStyle);
  //   if (b.borderRadius) this._renderer.setStyle(el, 'border-radius', b.borderRadius);
  // }

  // private applyTypography(el: HTMLElement, t: any): void {
  //   if (t.fontSize) this._renderer.setStyle(el, 'font-size', t.fontSize);
  //   if (t.fontWeight) this._renderer.setStyle(el, 'font-weight', t.fontWeight);
  //   if (t.color) this._renderer.setStyle(el, 'color', t.color);
  // }

  // private applyShadows(el: HTMLElement, s: any): void {
  //   if (s.boxShadow) this._renderer.setStyle(el, 'box-shadow', s.boxShadow);
  // }

  // private applyBackground(el: HTMLElement, b: any): void {
  //   if (b.background) this._renderer.setStyle(el, 'background', b.background);
  //   if (b.backgroundColor) this._renderer.setStyle(el, 'background-color', b.backgroundColor);
  //   if (b.backgroundImage) this._renderer.setStyle(el, 'background-image', b.backgroundImage);
  // }

  ngOnDestroy(): void {
  //   this._listeners.forEach(fn => fn());
  }
}

