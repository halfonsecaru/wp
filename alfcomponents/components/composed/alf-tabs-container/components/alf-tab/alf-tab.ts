import { Component, input, signal, computed, inject, ElementRef, viewChild, OnDestroy } from '@angular/core';
import { AlfSingleTabInterface, ALF_TABS_CONTAINER_TOKEN } from '../../interfaces/alf-tabs.interface';
import { visualprefixEnum } from '@alfcomponents/shared';
import { AlfAnimateCssInterface } from '@alfcomponents/interfaces';
import { ALF_TAB_CONTENT_DEFAULT } from '../../predefined/alf-tabs-container.predefined';
import { AlfBaseButtonConfiguration } from '../../../../simple/alf-button/base/alf-base-button-configuration';

@Component({
  selector: 'alf-tab',
  standalone: true,
  imports: [],
  templateUrl: './alf-tab.html',
  styleUrl: './alf-tab.scss',
  host: {
    '[style.display]': 'isActive() || isExiting() ? "grid" : "none"',
    '[style.grid-area]': '"1/1"',
    '[style.width]': '"100%"',
    '[style.min-width]': '"0"'
  }
})
export class AlfTabComponent extends AlfBaseButtonConfiguration<AlfSingleTabInterface> implements OnDestroy {
  protected readonly visualPrefix = visualprefixEnum.TabsContent;

  public override readonly inputConfig = input<AlfSingleTabInterface>(ALF_TAB_CONTENT_DEFAULT as AlfSingleTabInterface);

  /**
   * Nombre de la pestaña (retrocompatibilidad, priorizamos label de la base).
   */
  public readonly tabName = input<string>('');

  /**
   * Nombre final resuelto para mostrar en la cabecera.
   */
  public readonly finalLabel = computed(() => this.label() || this.tabName() || this.inputConfig()?.tabName || 'Tab');

  /** Estado de visibilidad (controlado por el contenedor) */
  private readonly _isActive = signal<boolean>(false);
  public readonly isActive = this._isActive.asReadonly();

  /** Estado de salida para mantener visible durante animación de cierre */
  protected readonly isExiting = signal<boolean>(false);

  /** Referencia al elemento nativo - público para mediciones del padre */
  public readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  /** Token del contenedor padre */
  private readonly container = inject(ALF_TABS_CONTAINER_TOKEN, { optional: true });

  /** Resolución de la promesa de salida */
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
  private readonly onExitAnimationEnd = (): void => {
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
   * Setter para activar/desactivar la pestaña. La medición de altura
   * la gestiona el contenedor padre directamente vía syncActiveTab.
   */
  public readonly setActive = (active: boolean): void => {
    this._isActive.set(active);
  };

  constructor() {
    super();
  }

  public ngOnDestroy(): void {
    // Limpieza futura si se necesita
  }

  /**
   * Referencia al contenedor interno para mediciones precisas del padre.
   */
  public readonly contentInner = viewChild<ElementRef<HTMLDivElement>>('contentInner');

  /**
   * Notifica al contenedor padre que debe re-medir la altura.
   * La medición se hace en el padre para evitar problemas de Grid stretch.
   */
  public readonly reportHeight = (): void => {
    if (this.container) {
      this.container.onTabHeightMeasured();
    }
  };

  /**
   * Animaciones finales aplicadas, priorizando las propias sobre las del padre.
   */
  public readonly effectiveAnimations = computed(() => {
    return this.inputConfig()?.animations || this.parentContentAnimations();
  });

  /**
   * Clase de animación actual según el estado (Entrada/Salida).
   */
  protected readonly currentAnimationClass = computed(() => {
    const anims = this.effectiveAnimations();
    if (this.isExiting()) return anims?.exitStage ?? '';
    if (this.isActive()) return anims?.enterStage ?? '';
    return '';
  });

  /**
   * Estilos de animación calculados.
   */
  protected readonly animationStyle = computed(() => {
    const anim = this.effectiveAnimations();
    if (!anim) return '';
    const declarations: string[] = [];
    if (anim.duration) declarations.push(`--animate-duration: ${anim.duration};`);

    // Solo aplicamos delay en la entrada (isActive) para permitir que la salida (isExiting) sea inmediata
    const delay = (this.isActive() && !this.isExiting()) ? (anim.delay || '0s') : '0s';
    declarations.push(`--animate-delay: ${delay};`);

    return declarations.join(' ');
  });
}
