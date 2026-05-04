import { Component, computed, signal } from '@angular/core';
import { AlfButtons } from '@alfcomponents/components/simple/alf-buttons/alf-buttons';
import { getAlfPredefinedButton, AlfButtonStyleKind } from '@alfcomponents/components/simple/alf-buttons/alf-button-predefined';
import { DefaultButtonKeys } from '@alfcomponents/components/simple/alf-buttons/enums/defaultButtonKeys.interface';
import { AlfButtonInterface } from '@alfcomponents/components/simple/alf-buttons/interfaces/alf-button.interface';
import {
  AlfAnimationTypeEnum,
  AlfColorVariantEnum,
  AlfIconsUnicodeIconEnum,
  AlfLinkTargetEnum,
  AlfPxEnum,
} from '@alfcomponents/enums';
import { AlfAnimateCssInterface, AlfDisplayAndLayoutInterface } from '@alfcomponents/interfaces';

@Component({
  selector: 'app-alf-buttons-viewer',
  imports: [AlfButtons],
  templateUrl: './alf-buttons-viewer.html',
  styleUrl: './alf-buttons-viewer.scss',
})
export class AlfButtonsViewer {
  protected readonly signalClicks = signal(0);
  protected readonly signalHovers = signal(0);
  protected readonly useOutlineSignal = signal(false);
  protected readonly useDangerSignal = signal(false);
  protected readonly debounceMsSignal = signal(600);
  protected readonly animationsEnabledSignal = signal(true);
  protected readonly animationPanelRenderedSignal = signal(false);
  protected readonly animationPanelExitingSignal = signal(false);

  private readonly panelAnimations: AlfAnimateCssInterface = {
    enterStage: { name: AlfAnimationTypeEnum.FadeIn, duration: '350ms' },
    exitStage: { name: AlfAnimationTypeEnum.FadeOut, duration: '350ms' },
  };

  protected readonly animationPanelClass = computed(() => {
    if (!this.animationsEnabledSignal()) {
      return '';
    }
    const stage = this.animationPanelExitingSignal()
      ? this.panelAnimations.exitStage
      : this.panelAnimations.enterStage;

    if (!stage) return '';
    return typeof stage === 'string' ? stage : (stage.name ?? '');
  });

  protected readonly animationPanelStyle = computed<string>(() => {
    if (!this.animationsEnabledSignal()) {
      return '';
    }
    const declarations: string[] = [];
    if (this.panelAnimations.duration) declarations.push(`--animate-duration: ${this.panelAnimations.duration}`);
    if (this.panelAnimations.delay) declarations.push(`--animate-delay: ${this.panelAnimations.delay}`);
    return declarations.join('; ');
  });

  protected readonly liveButtonConfig = computed<AlfButtonInterface>(() => {
    const styleKind: AlfButtonStyleKind = this.useOutlineSignal()
      ? 'outlined'
      : 'solid';
    const key = this.useDangerSignal()
      ? DefaultButtonKeys.Danger
      : DefaultButtonKeys.Accept;

    return {
      ...getAlfPredefinedButton(key, { styleKind }),
      label: this.useDangerSignal() ? 'Eliminar' : 'Guardar',
      iconLeft: this.useDangerSignal()
        ? AlfIconsUnicodeIconEnum.Delete
        : AlfIconsUnicodeIconEnum.Save,
      displayAndLayout: this.sameWidthButton,
    };
  });

  protected readonly sameWidthButton: AlfDisplayAndLayoutInterface = {
    default: {
      width: AlfPxEnum.Px128,
    },
  };

  private readonly palettes: ReadonlyArray<{
    readonly key: DefaultButtonKeys;
    readonly title: string;
  }> = [
      { key: DefaultButtonKeys.Accept, title: 'Primary' },
      { key: DefaultButtonKeys.Cancel, title: 'Secondary' },
      { key: DefaultButtonKeys.Success, title: 'Success' },
      { key: DefaultButtonKeys.Danger, title: 'Danger' },
      { key: DefaultButtonKeys.Warning, title: 'Warning' },
      { key: DefaultButtonKeys.Info, title: 'Info' },
      { key: DefaultButtonKeys.Light, title: 'Light' },
      { key: DefaultButtonKeys.Dark, title: 'Dark' },
    ];

  protected readonly visualSections: ReadonlyArray<{
    readonly title: string;
    readonly buttons: ReadonlyArray<{
      readonly title: string;
      readonly tooltip: string;
      readonly config: AlfButtonInterface;
    }>;
  }> = [
      { title: 'Predefined Solid', buttons: this.buildPaletteButtons('solid', 'Solid') },
      { title: 'Predefined Outline', buttons: this.buildPaletteButtons('outlined', 'Outline') },
      { title: 'Ghost (All Palettes)', buttons: this.buildPaletteButtons('ghost', 'Ghost') },
      { title: 'Soft (All Palettes)', buttons: this.buildPaletteButtons('soft', 'Soft') },
      { title: 'Crystal (All Palettes)', buttons: this.buildPaletteButtons('crystal', 'Crystal') },
      { title: '3D (All Palettes)', buttons: this.buildPaletteButtons('3d', '3D') },
      { title: 'Practical Examples', buttons: this.buildPracticalExamples() },
    ];

  private buildPaletteButtons(
    styleKind: AlfButtonStyleKind,
    visualLabel: string,
  ): ReadonlyArray<{
    readonly title: string;
    readonly tooltip: string;
    readonly config: AlfButtonInterface;
  }> {
    return this.palettes.map((palette) => {
      const baseConfig = getAlfPredefinedButton(palette.key, { styleKind });

      return {
        title: palette.title,
        tooltip: `${visualLabel}: ${palette.title}`,
        config: {
          ...baseConfig,
          displayAndLayout: this.sameWidthButton,
        },
      };
    });
  }

  private buildPracticalExamples(): ReadonlyArray<{
    readonly title: string;
    readonly tooltip: string;
    readonly config: AlfButtonInterface;
  }> {
    return [
      {
        title: 'Save With Icon',
        tooltip: 'Solid primary with left icon',
        config: {
          ...getAlfPredefinedButton(DefaultButtonKeys.Accept),
          label: 'Guardar',
          iconLeft: AlfIconsUnicodeIconEnum.Save,
        },
      },
      {
        title: 'Disabled',
        tooltip: 'Disabled state example',
        config: {
          ...getAlfPredefinedButton(DefaultButtonKeys.Cancel),
          label: 'Deshabilitado',
          disabled: true,
        },
      },
      {
        title: 'External Link',
        tooltip: 'Button rendered as anchor',
        config: {
          ...getAlfPredefinedButton(DefaultButtonKeys.Info),
          label: 'Documentacion',
          iconRight: AlfIconsUnicodeIconEnum.ArrowRight,
          link: {
            url: 'https://angular.dev',
            target: AlfLinkTargetEnum.Blank,
          },
        },
      },
      {
        title: 'Ghost Warning',
        tooltip: 'Ghost variant warning',
        config: {
          ...getAlfPredefinedButton(DefaultButtonKeys.Warning, { styleKind: 'ghost' }),
          label: 'Revisar',
          iconLeft: AlfIconsUnicodeIconEnum.Warning,
        },
      },
      {
        title: 'Custom Soft',
        tooltip: 'Soft custom color variant',
        config: {
          colorVariant: AlfColorVariantEnum.SuccessSoft,
          label: 'Completado',
          iconLeft: AlfIconsUnicodeIconEnum.CheckMark,
        },
      },
      {
        title: 'Full Width',
        tooltip: 'Display and layout override',
        config: {
          ...getAlfPredefinedButton(DefaultButtonKeys.Dark, { styleKind: '3d' }),
          label: 'Continuar',
          displayAndLayout: {
            default: {
              width: AlfPxEnum.Px192,
            },
          },
        },
      },
    ];
  }

  protected onLiveClick(): void {
    this.signalClicks.update((current) => current + 1);
  }

  protected onLiveHover(): void {
    this.signalHovers.update((current) => current + 1);
  }

  protected toggleLiveVisualType(): void {
    this.useOutlineSignal.update((current) => !current);
  }

  protected toggleLiveTone(): void {
    this.useDangerSignal.update((current) => !current);
  }

  protected rotateDebounce(): void {
    const current = this.debounceMsSignal();
    if (current === 0) {
      this.debounceMsSignal.set(300);
      return;
    }
    if (current === 300) {
      this.debounceMsSignal.set(600);
      return;
    }
    this.debounceMsSignal.set(0);
  }

  protected toggleAnimationsEnabled(): void {
    this.animationsEnabledSignal.update((current) => !current);
  }

  protected openAnimationPanel(): void {
    this.animationPanelExitingSignal.set(false);
    this.animationPanelRenderedSignal.set(true);
  }

  protected closeAnimationPanel(): void {
    if (!this.animationPanelRenderedSignal()) {
      return;
    }
    if (!this.animationsEnabledSignal()) {
      this.animationPanelExitingSignal.set(false);
      this.animationPanelRenderedSignal.set(false);
      return;
    }
    this.animationPanelExitingSignal.set(true);
  }

  protected onAnimationPanelEnd(): void {
    if (this.animationPanelExitingSignal()) {
      this.animationPanelExitingSignal.set(false);
      this.animationPanelRenderedSignal.set(false);
    }
  }
}
