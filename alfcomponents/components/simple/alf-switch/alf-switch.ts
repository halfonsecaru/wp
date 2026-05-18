import { AlfBaseConfiguration } from '@alfcomponents/base/alf-base-configuration';
import { AlfRippleDirective, AlfTooltipTextDirective } from '@alfcomponents/directives';
import { ChangeDetectionStrategy, Component, computed, input, model, ViewEncapsulation } from '@angular/core';
import { AlfSwitchInterface } from './interfaces/alf-switch.interface';
import { ALF_SWITCH_DEFAULT_BASE } from './predefined/alf-switch.predefined';
import { generateUniqueId, visualprefixEnum } from '@alfcomponents/shared';
import { AlfColorVariantEnum } from '@alfcomponents/enums/alf-color-variant.enum';
import { AlfSizeEnum } from '@alfcomponents/enums';

/**
 * AlfSwitch Component
 * ✅ Elite Design System Standard.
 * ✅ Reactive Signals (input, model, computed).
 * ✅ Centralized Visual Engine Integration.
 */
@Component({
  selector: 'alf-switch',
  standalone: true,
  imports: [AlfTooltipTextDirective, AlfRippleDirective],
  templateUrl: './alf-switch.html',
  styleUrl: './alf-switch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AlfSwitch extends AlfBaseConfiguration<AlfSwitchInterface> {


  public readonly initialConfig = input<AlfSwitchInterface>();


  public readonly resolvedConfigu = computed<AlfSwitchInterface>(() => {
    return {
      ...ALF_SWITCH_DEFAULT_BASE,
      ...this.initialConfig(),
    };
  });











  // // // ── 1. Attributes ─────────────────────────────────────────────────────────

  //  protected override readonly visualPrefix: string = visualprefixEnum.Switch;
  //  protected readonly internalId: string = generateUniqueId({ prefix: 'alf-sw' });

  // // private readonly el: ElementRef = inject(ElementRef);

  // // // ── 2. Signals (Inputs & Models) ──────────────────────────────────────────

  // // /** Choosing a predefined style (Primary, Secondary, etc.) */
  //  public readonly variant = input<AlfColorVariantEnum | undefined>(undefined);

  // // /** Direct user configuration (Elite Standard) */
  //  public override readonly inputConfig = input<AlfSwitchInterface>(undefined, { alias: 'config' });

  // // /** Two-way binding for the checked state */
  // public readonly checked = model<boolean>(false);

  // // /** Specific switch style (Elegant vs Standard) */
  // public readonly switchStyle = input<'standard' | 'elegant'>();

  // // /** Label text for the switch */
  // public readonly label = input<string>();

  // // /** Dimension scale (XS to 2XL) */
  // public readonly size = input<AlfSizeEnum>();

  // // /** Reactive error message */
  // public readonly error = input<string>();

  // // /** Reactive helper text */
  // public readonly helperText = input<string>();

  // // // ── 3. Computed (Reactive Engine) ─────────────────────────────────────────

  // /**
  //  * Final configuration merge.
  //  * Resolves hierarchy: Inputs > InputConfig > Design System Defaults.
  //  */
  // public readonly finalConfig = computed<AlfSwitchInterface>(() => {
  //   const rawV = (this.colorVariant() ?? this.variant()) as string;
    
  //   let v: AlfColorVariantEnum | undefined;
  //   if (rawV) {
  //     const lowerV = rawV.toLowerCase();
  //     const coreVariants: Record<string, AlfColorVariantEnum> = {
  //       primary: AlfColorVariantEnum.Primary,
  //       secondary: AlfColorVariantEnum.Secondary,
  //       success: AlfColorVariantEnum.Success,
  //       danger: AlfColorVariantEnum.Danger,
  //       warning: AlfColorVariantEnum.Warning,
  //       info: AlfColorVariantEnum.Info,
  //       light: AlfColorVariantEnum.Light,
  //       dark: AlfColorVariantEnum.Dark,
  //       transparent: AlfColorVariantEnum.Transparent
  //     };
      
  //     v = coreVariants[lowerV] ?? (rawV as AlfColorVariantEnum);
  //   }

  //   const cfg = {
  //     ...this.resolvedConfig(),
  //     ...this.inputConfig(),
  //   };

  //   return {
  //     ...cfg,
  //     switchStyle: this.switchStyle() ?? cfg?.switchStyle,
  //     size: this.size() ?? cfg?.size,
  //     error: this.error() ?? cfg?.error,
  //     helperText: this.helperText() ?? cfg?.helperText,
  //     checked: this.checked(),
  //   };
  // });

  // /** Syncs with AlfBaseConfiguration resolvedConfig */
  // public override readonly resolvedConfig = this.finalConfig;

  // /** Resolves the effective switch style */
  // public readonly switchStyleComputed = computed<'standard' | 'elegant'>(
  //   () => this.resolvedConfig()?.switchStyle ?? 'elegant'
  // );

  // /** Resolves the visible label */
  // public readonly labelComputed = computed<string>(() => this.resolvedConfig()?.label ?? '');

  // /** Resolves the label positioning (before/after) */
  // public readonly labelPositionComputed = computed<'before' | 'after'>(
  //   () => this.resolvedConfig()?.labelPosition ?? 'after'
  // );

  // /** Resolves the dimension scale */
  // public readonly sizeComputed = computed<AlfSizeEnum>(() => this.resolvedConfig()?.size ?? AlfSizeEnum.MD);

  // // ── 4. Outputs ────────────────────────────────────────────────────────────

  // /** Emitted whenever the checked state changes */
  // public readonly onCheckedChange = output<boolean>();

  // // ── 5. Handlers (Arrow Functions) ─────────────────────────────────────────

  // /**
  //  * Toggles the switch state.
  //  */
  // public readonly toggle = (): void => {
  //   if (this.disabledComputed()) return;

  //   const newValue = !this.checked();
  //   this.checked.set(newValue);
  //   this.onCheckedChange.emit(newValue);
  // };

  // /** Click handler for the label wrapper */
  // protected readonly onLabelClick = (event: Event): void => {
  //   if (this.disabledComputed()) return;
  //   event.preventDefault();
  //   this.toggle();
  // };

  // /** Keyboard support (Space/Enter) */
  // protected readonly onInputKeydown = (event: KeyboardEvent): void => {
  //   if (this.disabledComputed()) return;
  //   if (event.key === ' ' || event.key === 'Enter') {
  //     event.preventDefault();
  //     this.toggle();
  //   }
  // };
}
