import { Component, contentChildren, effect, input, signal, computed, viewChild, ElementRef, viewChildren, untracked } from '@angular/core';
import { AlfTabComponent } from './components/alf-tab/alf-tab';
import { AlfButtons } from '../../simple/alf-buttons/alf-buttons';
import { AlfButtonVisualTypeEnum, AlfColorVariantEnum, AlfCursorEnum, AlfColorEnum } from '@alfcomponents/enums';
import { AlfBorderInterface } from '@alfcomponents/interfaces';
import { AlfBaseConfiguration } from '@alfcomponents/base';
import { AlfTabsContainerConfigInterface } from './interfaces/alf-tabs.interface';
import { getAlfTabDefaultConfig, ALF_TABS_CONTAINER_DEFAULT } from './predefined/alf-tabs-container.predefined';
import { AlfButtonInterface } from '../../simple/alf-buttons/interfaces/alf-button.interface';

@Component({
  selector: 'alf-tabs-container',
  standalone: true,
  imports: [AlfButtons],
  templateUrl: './alf-tabs-container.html',
  styleUrl: './alf-tabs-container.scss'
})
export class AlfTabsContainerComponent extends AlfBaseConfiguration<AlfTabsContainerConfigInterface> {
  /**
   * Prefijo para las variables CSS.
   */
  protected readonly visualPrefix = '--alf-tabs';

  /**
   * Configuración general del contenedor con valores por defecto.
   */
  public override readonly inputConfig = input<AlfTabsContainerConfigInterface>(ALF_TABS_CONTAINER_DEFAULT, { alias: 'config' });

  /**
   * Listado de pestañas proyectadas.
   */
  protected readonly tabs = contentChildren(AlfTabComponent, { descendants: true });

  /**
   * Índice de la pestaña activa.
   */
  protected readonly activeIndex = signal<number>(0);

  /**
   * Referencias a los botones de navegación para cálculos del slider.
   */
  protected readonly buttonRefs = viewChildren(AlfButtons, { read: ElementRef });

  /**
   * Referencia al elemento del slider.
   */
  protected readonly sliderRef = viewChild<ElementRef<HTMLDivElement>>('slider');

  /**
   * Efecto para animar el slider cuando cambia la pestaña activa.
   */
  protected readonly animateSlider = effect(() => {
    const active = this.activeIndex();
    const buttons = this.buttonRefs();
    const slider = this.sliderRef()?.nativeElement;

    if (!slider || buttons.length === 0) return;

    const targetButton = buttons[active]?.nativeElement;
    if (!targetButton) return;

    untracked(() => {
      // Calculamos posición y ancho respecto al contenedor nav
      const width = targetButton.offsetWidth;
      const left = targetButton.offsetLeft;

      slider.animate([
        { width: slider.style.width || '0px', left: slider.style.left || '0px' },
        { width: `${width}px`, left: `${left}px` }
      ], {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });

      // Sincronizamos estilo inline para el siguiente frame si fuera necesario
      slider.style.width = `${width}px`;
      slider.style.left = `${left}px`;
    });
  });

  /**
   * Datos de navegación derivados de las pestañas proyectadas.
   */
  protected readonly navigationTabs = computed(() => {
    const active = this.activeIndex();
    return this.tabs().map((tab, index) => {
      const baseConfig = (tab.tabConfig()?.configuration ?? getAlfTabDefaultConfig(tab.tabName())) as AlfButtonInterface;
      const isActive = index === active;
      const activeColor = baseConfig.backgrounds?.active?.backgroundColor;

      return {
        label: tab.tabName(),
        configuration: {
          ...baseConfig,
          backgrounds: isActive ? {
            ...baseConfig.backgrounds,
            default: { ...baseConfig.backgrounds?.default, backgroundColor: activeColor },
            hover: { ...baseConfig.backgrounds?.hover, backgroundColor: activeColor },
            focus: { ...baseConfig.backgrounds?.focus, backgroundColor: activeColor },
            active: { ...baseConfig.backgrounds?.active, backgroundColor: activeColor },
          } : baseConfig.backgrounds
        }
      };
    });
  });

  /**
   * Efecto para sincronizar la pestaña activa con los componentes hijos.
   */
  protected readonly syncActiveTab = effect(() => {
    const currentTabs = this.tabs();
    const active = this.activeIndex();

    currentTabs.forEach((tab, index) => {
      tab.isActive.set(index === active);
    });
  });

  /**
   * Referencia al contenedor de contenido para animaciones.
   */
  protected readonly contentContainer = viewChild<ElementRef<HTMLDivElement>>('contentContainer');

  /**
   * Cambia la pestaña activa con una transición de altura fluida.
   * @param index Nuevo índice
   */
  public readonly setActiveTab = (index: number): void => {
    const container = this.contentContainer()?.nativeElement;
    if (!container || this.activeIndex() === index) {
      this.activeIndex.set(index);
      return;
    }

    // 1. Medir altura actual
    const startHeight = container.offsetHeight;

    // 2. Cambiar pestaña
    this.activeIndex.set(index);

    // 3. Esperar al siguiente frame para medir la nueva altura
    requestAnimationFrame(() => {
      const endHeight = container.scrollHeight;

      // 4. Ejecutar animación WAAPI
      container.animate([
        { height: `${startHeight}px` },
        { height: `${endHeight}px` }
      ], {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
    });
  };
}
