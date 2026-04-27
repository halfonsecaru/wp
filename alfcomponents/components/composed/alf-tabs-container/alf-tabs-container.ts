import { Component, contentChildren, effect, input, signal, computed, viewChild, ElementRef, viewChildren, untracked } from '@angular/core';
import { AlfTabComponent } from './components/alf-tab/alf-tab';
import { AlfButtons } from '../../simple/alf-buttons/alf-buttons';
import { visualprefixEnum } from '@alfcomponents/shared';
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
  protected readonly visualPrefix = visualprefixEnum.TabsContainer;

  /**
   * Configuración general del contenedor con valores por defecto.
   */
  public override readonly inputConfig = input<AlfTabsContainerConfigInterface>(ALF_TABS_CONTAINER_DEFAULT, { alias: 'config' });

  /**
   * Listado de pestañas proyectadas.
   */
  protected readonly tabs = contentChildren(AlfTabComponent, { descendants: false });

  /**
   * Referencia al contenedor de scroll de la cabecera.
   */
  protected readonly headerScrollRef = viewChild<ElementRef<HTMLDivElement>>('headerScroll');

  /**
   * Métricas de scroll para mostrar/ocultar flechas.
   */
  protected readonly headerMetrics = signal({ canLeft: false, canRight: false });

  /**
   * Índice de la pestaña activa.
   */
  public readonly activeIndex = signal<number>(0);

  /**
   * Referencias a los botones de navegación para cálculos del slider.
   */
  protected readonly buttonRefs = viewChildren(AlfButtons, { read: ElementRef });

  /**
   * Referencia al elemento del slider.
   */
  protected readonly sliderRef = viewChild<ElementRef<HTMLDivElement>>('slider');

  /**
   * Observer para actualizar métricas de scroll.
   */
  private resizeObserver?: ResizeObserver;

  constructor() {
    super();
    
    // Efecto para inicializar el ResizeObserver cuando el scrollRef esté disponible
    effect((onCleanup) => {
      const scrollEl = this.headerScrollRef()?.nativeElement;
      if (!scrollEl) return;

      this.resizeObserver = new ResizeObserver(() => {
        this.updateScrollMetrics();
      });

      this.resizeObserver.observe(scrollEl);
      this.updateScrollMetrics();

      onCleanup(() => {
        this.resizeObserver?.disconnect();
      });
    });
  }

  /**
   * Actualiza las métricas de scroll (canLeft, canRight).
   */
  protected updateScrollMetrics(): void {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    
    // Tolerancia de 1px para redondeos
    this.headerMetrics.set({
      canLeft: scrollLeft > 1,
      canRight: scrollLeft + clientWidth < scrollWidth - 1
    });

    // Aprovechamos para actualizar el slider si ha cambiado la visibilidad
    this.updateSlider(false);
  }

  /**
   * Desplaza el scroll hacia la izquierda.
   */
  public scrollLeft(): void {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: -200, behavior: 'smooth' });
  }

  /**
   * Desplaza el scroll hacia la derecha.
   */
  public scrollRight(): void {
    const el = this.headerScrollRef()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: 200, behavior: 'smooth' });
  }

  /**
   * Manejador del evento de scroll.
   */
  protected onScroll(): void {
    this.updateScrollMetrics();
  }

  /**
   * Actualiza la posición y ancho del slider.
   */
  public updateSlider(animate: boolean = true): void {
    const active = this.activeIndex();
    const buttons = this.buttonRefs();
    const slider = this.sliderRef()?.nativeElement;

    if (!slider || buttons.length === 0) return;

    const targetButton = buttons[active]?.nativeElement;
    if (!targetButton) return;

    const width = targetButton.offsetWidth;
    const left = targetButton.offsetLeft;

    // Si no hay dimensiones (ej: está oculto), no hacemos nada
    if (width === 0) return;

    if (animate) {
      slider.animate([
        { width: slider.style.width || '0px', left: slider.style.left || '0px' },
        { width: `${width}px`, left: `${left}px` }
      ], {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
    }

    slider.style.width = `${width}px`;
    slider.style.left = `${left}px`;
  }

  /**
   * Efecto para animar el slider cuando cambia la pestaña activa.
   */
  protected readonly animateSlider = effect(() => {
    // Suscribimos a cambios de pestaña o botones
    this.activeIndex();
    this.buttonRefs();
    
    untracked(() => {
      this.updateSlider();
    });
  });

  /**
   * Datos de navegación derivados de las pestañas proyectadas.
   */
  protected readonly navigationTabs = computed(() => {
    const active = this.activeIndex();
    return this.tabs().map((tab, index) => {
      const baseConfig = (tab.inputConfig()?.configuration ?? getAlfTabDefaultConfig(tab.tabName())) as AlfButtonInterface;
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
    const contentAnim = this.inputConfig()?.contentAnimations;

    currentTabs.forEach((tab, index) => {
      tab.isActive.set(index === active);
      if (contentAnim) {
        tab.parentContentAnimations.set(contentAnim);
      }
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
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
    });
  };

  /**
   * Estilos de animación para el contenido.
   */
  protected readonly contentAnimationsStyle = computed(() => {
    const anim = this.inputConfig()?.contentAnimations;
    if (!anim) return '';
    const declarations: string[] = [];
    if (anim.duration) declarations.push(`--animate-duration: ${anim.duration};`);
    if (anim.delay) declarations.push(`--animate-delay: ${anim.delay};`);
    return declarations.join(' ');
  });

  /**
   * Clases de animación para el contenido.
   */
  protected readonly contentAnimationsClass = computed(() => {
    const anim = this.inputConfig()?.contentAnimations?.enterStage ?? '';
    if (!anim) return '';
    
    // Forzamos el recalculo al cambiar de pestaña
    this.activeIndex();
    return anim;
  });
}
