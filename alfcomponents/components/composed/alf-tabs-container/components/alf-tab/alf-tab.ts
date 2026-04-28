import { Component, input, signal, computed, inject, ElementRef, output, effect, viewChild, Injector, afterNextRender, OnDestroy } from '@angular/core';
import { AlfBaseConfiguration } from '@alfcomponents/base';
import { AlfSingleTabInterface, ALF_TABS_CONTAINER_TOKEN, AlfTabsParentInterface } from '../../interfaces/alf-tabs.interface';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { ALF_TAB_CONTENT_DEFAULT } from '../../predefined/alf-tabs-container.predefined';
import { AlfBaseButtonConfiguration } from '../../../../simple/alf-buttons/base/base-button-configuration';
import { AlfButtonInterface } from '../../../../simple/alf-buttons/interfaces/alf-button.interface';

@Component({
  selector: 'alf-tab',
  standalone: true,
  imports: [],
  templateUrl: './alf-tab.html',
  styleUrl: './alf-tab.scss',
  host: {
    '[style.display]': '"block"',
    '[style.width]': '"100%"'
  }
})
export class AlfTabComponent extends AlfBaseButtonConfiguration<AlfSingleTabInterface> implements OnDestroy {
  protected readonly visualPrefix = visualprefixEnum.TabsContent;

  public override readonly inputConfig = input<AlfSingleTabInterface>(ALF_TAB_CONTENT_DEFAULT as AlfSingleTabInterface);

  /**
   * Nombre de la pestaña (Mantenemos el input para retrocompatibilidad, pero priorizamos label de la base).
   */
  public readonly tabName = input<string>('');

  /**
   * Nombre final resuelto para mostrar en la cabecera.
   */
  public readonly finalLabel = computed(() => this.label() || this.tabName() || this.inputConfig()?.tabName || 'Tab');

  /**
   * Referencia al elemento nativo para mediciones puntuales.
   */
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Referencia al contenedor padre a través de un token para evitar dependencias circulares.
   */
  private readonly container = inject(ALF_TABS_CONTAINER_TOKEN, { optional: true });

  /**
   * Injector para usar afterNextRender.
   */
  private readonly injector = inject(Injector);

  /**
   * Estado de visibilidad (controlado por el contenedor).
   */
  private readonly _isActive = signal<boolean>(false);
  public readonly isActive = this._isActive.asReadonly();
  /**
   * Estado de salida para mantener la pestaña visible durante la animación de cierre.
   */
  protected readonly isExiting = signal<boolean>(false);

  /**
   * Referencia a la función de resolución de la promesa de salida.
   */
  private exitResolveFn: (() => void) | null = null;

  /**
   * Ejecuta la animación de salida y retorna una promesa que se resuelve al terminar.
   */
  public readonly playExitAnimation = (): Promise<void> => {
    return new Promise((resolve) => {
      const anims = this.effectiveAnimations();
      if (!anims || !anims.exitStage) {
        resolve();
        return;
      }

      this.isExiting.set(true);
      
      const el = this.elementRef.nativeElement.firstElementChild as HTMLElement;
      if (!el) {
        this.isExiting.set(false);
        resolve();
        return;
      }

      this.exitResolveFn = resolve;
      el.addEventListener('animationend', this.onExitAnimationEnd);
    });
  };

  /**
   * Manejador del evento de fin de animación de salida.
   */
  private readonly onExitAnimationEnd = (event: AnimationEvent): void => {
    const el = this.elementRef.nativeElement.firstElementChild as HTMLElement;
    if (el) {
      el.removeEventListener('animationend', this.onExitAnimationEnd);
    }
    
    this.isExiting.set(false);
    
    if (this.exitResolveFn) {
      this.exitResolveFn();
      this.exitResolveFn = null;
    }
  };

  /**
   * Indica si se debe aplicar un efecto de agrandamiento al entrar.
   */
  public readonly expandHeight = input<boolean>(false);

  /**
   * Configuración de animaciones para el contenido (controlado por el contenedor).
   */
  public readonly parentContentAnimations = signal<AlfAnimateCssInterface | undefined>(undefined);

  /**
   * Setter para activar la medición cuando la pestaña se vuelve activa.
   */
  public readonly setActive = (active: boolean): void => {
    this._isActive.set(active);
    if (active) {
      afterNextRender(this.reportHeight, { injector: this.injector });
    }
  };

  private resizeObserver?: ResizeObserver;

  private readonly handleResizeEvent = (entries: ResizeObserverEntry[]): void => {
    for (let i = 0; i < entries.length; i++) {
      if (this._isActive() && entries[i].contentRect.height > 0) {
        this.reportHeight();
      }
    }
  };

  private readonly initResizeObserver = (): void => {
    const el = this.elementRef.nativeElement;
    if (el) {
      this.resizeObserver = new ResizeObserver(this.handleResizeEvent);
      this.resizeObserver.observe(el);
    }
  };

  constructor() {
    super();
    afterNextRender(this.initResizeObserver, { injector: this.injector });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  /**
   * Referencia al contenedor interno para mediciones precisas.
   */
  protected readonly contentInner = viewChild<ElementRef<HTMLDivElement>>('contentInner');

  /**
   * Mide la altura real del componente (Caja completa) y la reporta al contenedor padre.
   */
  public readonly reportHeight = (): void => {
    if (this.container) {
      // Medimos el offsetHeight del componente entero.
      // Esto ya incluye paddings, bordes y el contenido real.
      const totalHeight = this.elementRef.nativeElement.offsetHeight;

      if (totalHeight > 0) {
        this.container.onTabHeightMeasured(totalHeight);
      }
    }
  };

  /**
   * Animaciones finales aplicadas, priorizando las propias sobre las del padre.
   */
  public readonly effectiveAnimations = computed(() => {
    return this.inputConfig()?.animations || this.parentContentAnimations();
  });

  /**
   * Estilos de animación calculados.
   */
  protected readonly animationStyle = computed(() => {
    const anim = this.effectiveAnimations();
    if (!anim) return '';
    const declarations: string[] = [];
    if (anim.duration) declarations.push(`--animate-duration: ${anim.duration};`);
    if (anim.delay) declarations.push(`--animate-delay: ${anim.delay};`);
    return declarations.join(' ');
  });
}
