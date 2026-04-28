import { Component, input, signal, computed, inject, ElementRef, output, effect, viewChild, Injector, afterNextRender, OnDestroy } from '@angular/core';
import { AlfBaseConfiguration } from '@alfcomponents/base';
import { AlfSingleTabInterface, ALF_TABS_CONTAINER_TOKEN, AlfTabsParentInterface } from '../../interfaces/alf-tabs.interface';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { ALF_TAB_CONTENT_DEFAULT } from '../../predefined/alf-tabs-container.predefined';

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
export class AlfTabComponent extends AlfBaseConfiguration<AlfSingleTabInterface> implements OnDestroy {
  protected readonly visualPrefix = visualprefixEnum.TabsContent;

  public override readonly inputConfig = input<AlfSingleTabInterface>(ALF_TAB_CONTENT_DEFAULT as AlfSingleTabInterface);

  /**
   * Nombre de la pestaña.
   */
  public readonly tabName = input.required<string>();

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

      // Intentamos usar el evento nativo de animación finalizada
      const onEnd = () => {
        el.removeEventListener('animationend', onEnd);
        clearTimeout(fallback);
        this.isExiting.set(false);
        resolve();
      };
      
      el.addEventListener('animationend', onEnd);
      // Fallback de seguridad de 1 segundo (por si la animación falla o se cancela)
      const fallback = setTimeout(onEnd, 1000);
    });
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
      afterNextRender(() => {
        this.reportHeight();
      }, { injector: this.injector });
    }
  };

  private resizeObserver?: ResizeObserver;

  constructor() {
    super();

    afterNextRender(() => {
      const el = this.elementRef.nativeElement;
      if (el) {
        this.resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (this._isActive() && entry.contentRect.height > 0) {
              this.reportHeight();
            }
          }
        });
        this.resizeObserver.observe(el);
      }
    }, { injector: this.injector });
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
