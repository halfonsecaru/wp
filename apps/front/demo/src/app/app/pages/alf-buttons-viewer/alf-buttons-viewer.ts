import { Component, computed, signal } from '@angular/core';
import { AlfButtons } from '@alfcomponents/components/simple/alf-buttons/alf-buttons';
import { getAlfPredefinedButton } from '@alfcomponents/components/simple/alf-buttons/alf-button-predefined';
import { DefaultButtonKeys } from '@alfcomponents/components/simple/alf-buttons/enums/defaultButtonKeys.interface';
import { AlfButtonInterface } from '@alfcomponents/components/simple/alf-buttons/interfaces/alf-button.interface';
import {
  AlfAnimationTypeEnum,
  AlfButtonVisualTypeEnum,
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
    enterStage: AlfAnimationTypeEnum.FadeIn,
    exitStage: AlfAnimationTypeEnum.FadeOut,
    duration: '350ms',
  };

  protected readonly animationPanelClass = computed(() => {
    if (!this.animationsEnabledSignal()) {
      return '';
    }
    return this.animationPanelExitingSignal()
      ? (this.panelAnimations.exitStage ?? '')
      : (this.panelAnimations.enterStage ?? '');
  });

  protected readonly animationPanelStyle = computed<Record<string, string>>(() => {
    if (!this.animationsEnabledSignal()) {
      return {};
    }
    return {
      '--animate-duration': this.panelAnimations.duration ?? '350ms',
      '--animate-delay': this.panelAnimations.delay ?? '0ms',
    };
  });

  protected readonly liveButtonConfig = computed<AlfButtonInterface>(() => {
    const visualType = this.useOutlineSignal()
      ? AlfButtonVisualTypeEnum.Outlined
      : AlfButtonVisualTypeEnum.Solid;
    const key = this.useDangerSignal()
      ? DefaultButtonKeys.Danger
      : DefaultButtonKeys.Accept;

    return {
      ...getAlfPredefinedButton(key, { visualType }),
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
      { title: 'Predefined Solid', buttons: this.buildPaletteButtons(undefined, 'Solid') },
      { title: 'Predefined Outline', buttons: this.buildPaletteButtons(AlfButtonVisualTypeEnum.Outlined, 'Outline') },
      { title: 'Ghost (All Palettes)', buttons: this.buildPaletteButtons(AlfButtonVisualTypeEnum.Ghost, 'Ghost') },
      { title: 'Soft (All Palettes)', buttons: this.buildPaletteButtons(AlfButtonVisualTypeEnum.Soft, 'Soft') },
      { title: 'Crystal (All Palettes)', buttons: this.buildPaletteButtons(AlfButtonVisualTypeEnum.Crystal, 'Crystal') },
      { title: '3D (All Palettes)', buttons: this.buildPaletteButtons(AlfButtonVisualTypeEnum.ThreeD, '3D') },
      { title: 'Glossy (All Palettes)', buttons: this.buildPaletteButtons(AlfButtonVisualTypeEnum.Glossy, 'Glossy') },
      { title: 'Gradient (All Palettes)', buttons: this.buildPaletteButtons(AlfButtonVisualTypeEnum.Gradient, 'Gradient') },
      { title: 'Raised (All Palettes)', buttons: this.buildPaletteButtons(AlfButtonVisualTypeEnum.Raised, 'Raised') },
      { title: 'Practical Examples', buttons: this.buildPracticalExamples() },
    ];

  private buildPaletteButtons(
    visualType: AlfButtonVisualTypeEnum | undefined,
    visualLabel: string,
  ): ReadonlyArray<{
    readonly title: string;
    readonly tooltip: string;
    readonly config: AlfButtonInterface;
  }> {
    return this.palettes.map((palette) => {
      const baseConfig = visualType
        ? getAlfPredefinedButton(palette.key, { visualType })
        : getAlfPredefinedButton(palette.key);

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
          ...getAlfPredefinedButton(DefaultButtonKeys.Warning, { visualType: AlfButtonVisualTypeEnum.Ghost }),
          label: 'Revisar',
          iconLeft: AlfIconsUnicodeIconEnum.Warning,
        },
      },
      {
        title: 'Custom Soft',
        tooltip: 'Soft custom color variant',
        config: {
          visualType: AlfButtonVisualTypeEnum.Soft,
          colorVariant: AlfColorVariantEnum.Success,
          label: 'Completado',
          iconLeft: AlfIconsUnicodeIconEnum.Check,
        },
      },
      {
        title: 'Full Width',
        tooltip: 'Display and layout override',
        config: {
          ...getAlfPredefinedButton(DefaultButtonKeys.Dark, { visualType: AlfButtonVisualTypeEnum.Raised }),
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
    if (!this.animationsEnabledSignal() || !this.panelAnimations.exitStage) {
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
