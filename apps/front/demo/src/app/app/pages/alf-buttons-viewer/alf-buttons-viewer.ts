import { Component, computed, signal } from '@angular/core';
import { AlfButton } from '@alfcomponents/components/simple/alf-button/alf-button';
import { getAlfButtonDefaultConfig } from '@alfcomponents/components/simple/alf-button/predefined/alf-button.predefined';
import { DefaultButtonKeys } from '@alfcomponents/components/simple/alf-button/enums/defaultButtonKeys.interface';
import { AlfButtonInterface } from '@alfcomponents/components/simple/alf-button/interfaces/alf-button.interface';
import {
  AlfAnimationTypeEnum,
  AlfColorVariantEnum,
  AlfIconsUnicodeIconEnum,
  AlfLinkTargetEnum,
  AlfPxEnum,
} from '@alfcomponents/enums';
import { AlfAnimateCssInterface, AlfDisplayAndLayoutInterface } from '@alfcomponents/interfaces';
import { AlfButtonI18nLabels } from '@alfcomponents/components/simple/alf-button/i18n/alf-button.i18n';

@Component({
  selector: 'app-alf-buttons-viewer',
  imports: [AlfButton],
  templateUrl: './alf-buttons-viewer.html',
  styleUrl: './alf-buttons-viewer.scss',
})
export class AlfButtonsViewer {
  protected readonly signalClicks = signal(0);
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
    const isOutline = this.useOutlineSignal();
    const baseVariant = this.useDangerSignal()
      ? AlfColorVariantEnum.Danger
      : AlfColorVariantEnum.Primary;

    const finalVariant = isOutline
      ? (baseVariant + 'Outline' as AlfColorVariantEnum)
      : baseVariant;

    return {
      ...getAlfButtonDefaultConfig(finalVariant),
      label: this.useDangerSignal() ? 'Eliminar' : 'Guardar',
      iconLeft: this.useDangerSignal()
        ? AlfIconsUnicodeIconEnum.Delete
        : AlfIconsUnicodeIconEnum.Save,
    };
  });


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
      readonly config: AlfButtonInterface;
    }>;

  }> = [
      { title: 'Predefined Solid', buttons: this.buildPaletteButtons('', 'Solid') },
      { title: 'Predefined Outline', buttons: this.buildPaletteButtons('Outline', 'Outline') },
      { title: 'Ghost (All Palettes)', buttons: this.buildPaletteButtons('Ghost', 'Ghost') },
      { title: 'Soft (All Palettes)', buttons: this.buildPaletteButtons('Soft', 'Soft') },
      { title: 'Crystal (All Palettes)', buttons: this.buildPaletteButtons('Crystal', 'Crystal') },
      { title: '3D (All Palettes)', buttons: this.buildPaletteButtons('3D', '3D') },
      { title: 'Practical Examples', buttons: this.buildPracticalExamples() },
    ];

  private buildPaletteButtons(
    suffix: string,
    visualLabel: string,
  ): ReadonlyArray<{
    readonly title: string;
    readonly config: AlfButtonInterface;
  }> {

    return this.palettes.map((palette) => {
      // Mapeamos el nombre de la paleta (Primary, etc.) + el sufijo (Outline, Ghost, etc.)
      const variant = (palette.title + suffix) as AlfColorVariantEnum;
      const baseConfig = getAlfButtonDefaultConfig(variant);

      // Creamos un label descriptivo (ej: "Primary Outline")
      const descriptiveLabel = suffix ? `${palette.title} ${suffix}` : palette.title;

      return {
        title: palette.title,
        config: {
          ...baseConfig,
          label: descriptiveLabel,
        },
      };
    });

  }

  private buildPracticalExamples(): ReadonlyArray<{
    readonly title: string;
    readonly config: AlfButtonInterface;
  }> {

    return [
      {
        title: 'Save With Icon',
        config: {
          ...getAlfButtonDefaultConfig(AlfColorVariantEnum.Primary),
          label: 'Guardar',
          iconLeft: AlfIconsUnicodeIconEnum.Save,
        },
      },

      {
        title: 'Disabled',
        config: {
          ...getAlfButtonDefaultConfig(AlfColorVariantEnum.Secondary),
          label: 'Deshabilitado',
          disabled: true,
        },
      },

      {
        title: 'External Link',
        config: {
          ...getAlfButtonDefaultConfig(AlfColorVariantEnum.Info),
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
        config: {
          ...getAlfButtonDefaultConfig(AlfColorVariantEnum.WarningGhost),
          label: 'Revisar',
          iconLeft: AlfIconsUnicodeIconEnum.Warning,
        },
      },

      {
        title: 'Custom Soft',
        config: {
          colorVariant: AlfColorVariantEnum.SuccessSoft,
          label: 'Completado',
          iconLeft: AlfIconsUnicodeIconEnum.CheckMark,
        },
      },

      {
        title: 'Full Width',
        config: {
          ...getAlfButtonDefaultConfig(AlfColorVariantEnum.Dark3D),
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
