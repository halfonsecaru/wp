import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlfTabsComponent,
  AlfTabComponent,
  AlfTabsInterface,
  AlfTabsVisualTypeEnum,
  DefaultTabsKeys,
  AlfColorVariantEnum,
  AlfColorEnum,
  AlfButtonVisualTypeEnum,
  AlfCodeComponent,
  AlfColorEnum
} from '@alfcomponents';

/**
 * TabsDemoPage
 * Demostrador de componentes moderno, anidando Pestañas -> Ejemplo / Código.
 */
@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [CommonModule, AlfTabsComponent, AlfTabComponent, AlfCodeComponent],
  template: `
    <div class="docs-container">
      <header class="docs-header">
        <h1>AlfTabs <span class="accent">Documentation</span></h1>
        <p>Demostración de capacidades de anidamiento y visuales Élite.</p>
      </header>

      <div class="docs-content">
        <!-- ROOT TABS (Variantes Visuales) -->
        <alf-tabs predefined="master">
          
          <!-- ============================ -->
          <!-- VARIANT 1: UNDERLINE -->
          <!-- ============================ -->
          <alf-tab [defineComponent]="{ label: 'Underline (Standard)' }">
            <div class="variant-panel">
              
              <!-- SECONDARY TABS (Example vs Code) -->
              <alf-tabs predefined="master">
                
                <!-- EXAMPLE -->
                <alf-tab [defineComponent]="{ label: 'Example' }">
                  <div class="example-canvas">
                    <alf-tabs [defineComponent]="{ visualType: tabsVisualType.Underline }">
                      <alf-tab [defineComponent]="{ label: 'Visión General' }">
                        <div>
                          <h3>Resumen del Proyecto</h3>
                          <p>Bienvenido al panel de control principal. Aquí puedes visualizar el estado general de la aplicación, el rendimiento de los módulos y las alertas recientes generadas por el sistema.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Estadísticas' }">
                        <div>
                          <h3>Datos en Tiempo Real</h3>
                          <p>Gráficos volumétricos de tráfico, distribución de ancho de banda y picos de latencia global del clúster.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Configuración' }">
                        <div>
                          <h3>Preferencias Restringidas</h3>
                          <p>Ajustes de notificaciones, rotación de tokens criptográficos y políticas de control de acceso basado en roles (RBAC).</p>
                        </div>
                      </alf-tab>
                    </alf-tabs>
                  </div>
                </alf-tab>

                <!-- HTML -->
                <alf-tab [defineComponent]="{ label: 'HTML' }">
                  <div class="code-canvas-adapted">
                    <alf-code [code]="underlineHtml" language="html" title="HTML Template"></alf-code>
                  </div>
                </alf-tab>

                <!-- TS -->
                <alf-tab [defineComponent]="{ label: 'TS' }">
                  <div class="code-canvas-adapted">
                    <alf-code [code]="underlineTs" language="typescript" title="Property Declaration"></alf-code>
                  </div>
                </alf-tab>

              </alf-tabs>
            </div>
          </alf-tab>

          <!-- ============================ -->
          <!-- VARIANT 2: MASTER -->
          <!-- ============================ -->
          <alf-tab [defineComponent]="{ label: 'Master (Sliding Indicator)' }">
            <div class="variant-panel">
              
              <!-- SECONDARY TABS (Example vs Code) -->
              <alf-tabs predefined="master">
                
                <!-- EXAMPLE -->
                <alf-tab [defineComponent]="{ label: 'Example' }">
                  <div class="example-canvas">
                    <!-- Demo de Pestañas tipo Master -->
                    <alf-tabs [predefined]="tabsKeys.Master">
                      <alf-tab [defineComponent]="{ label: 'Diseño' }">
                        <div>
                          <h3>Arquitectura Visual Élite</h3>
                          <p>El diseño UI/UX se enfoca en la usabilidad pura mediante el uso intensivo de micro-animaciones (Signals + WAAPI), paletas de color con cálculos armónicos, y un sistema de espaciado matemático que respeta las leyes de proximidad de la Gestalt.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Rendimiento' }">
                        <div>
                          <h3>Zoneless & Signals (Full Hardware Acceleration)</h3>
                          <p>Las métricas de rendimiento marcan 100/100 en Lighthouse de forma consistente. No hay reflows forzados en CSS y Angular actualiza las vistas locales quirúrgicamente a través de reacciones atómicas, sin usar zone.js.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Seguridad' }">
                        <div>
                          <h3>Defensa en Profundidad (DiD)</h3>
                          <p>Autenticación hiper segura mediante tokens anti-CSRF inyectados en runtime. Cada Input del usuario es auditado y sanitizado nativamente por el compilador AOT y el motor de render DOM antes de aterrizar en la pantalla.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Analíticas' }">
                        <div>
                          <h3>Telemetría Inteligente</h3>
                          <p>Nuestra malla de microservicios procesa 10,000 eventos distribuidos por segundo, autoescalando los nodos edge de forma dinámica para absorber picos de demanda sin el más mínimo temblor de latencia.</p>
                        </div>
                      </alf-tab>
                    </alf-tabs>
                  </div>
                </alf-tab>

                <!-- HTML -->
                <alf-tab [defineComponent]="{ label: 'HTML' }">
                  <div class="code-canvas-adapted">
                    <alf-code [code]="masterHtml" language="html" title="HTML Template"></alf-code>
                  </div>
                </alf-tab>

                <!-- TS -->
                <alf-tab [defineComponent]="{ label: 'TS' }">
                  <div class="code-canvas-adapted">
                    <alf-code [code]="masterTs" language="typescript" title="Property Declaration"></alf-code>
                  </div>
                </alf-tab>

              </alf-tabs>
            </div>
          </alf-tab>

          <!-- ============================ -->
          <!-- VARIANT 3: SOLID COLLECTION -->
          <!-- ============================ -->
          <alf-tab [defineComponent]="{ label: 'Solid Collection' }">
            <div class="variant-panel">
              <alf-tabs predefined="master">
                
                <!-- EXAMPLE -->
                <alf-tab [defineComponent]="{ label: 'Example' }">
                  <div class="example-canvas">
                    <alf-tabs 
                      predefined="underline" 
                      [brandColor]="{ color: colorEnum.Primary, type: variantEnum.Primary }"
                      [tabsConfiguration]="{ visualType: buttonsVisualType.Solid }">
                      @for (tab of tenTabsArray; track $index) {
                        <alf-tab [defineComponent]="{ label: tab.label }">
                          <div style="padding: 1rem;">
                            <h3>{{ tab.label }}</h3>
                            <p>{{ tab.content }}</p>
                          </div>
                        </alf-tab>
                      }
                    </alf-tabs>
                  </div>
                </alf-tab>

                <!-- HTML -->
                <alf-tab [defineComponent]="{ label: 'HTML' }">
                  <div class="code-canvas-adapted">
                    <alf-code [code]="solidHtml" language="html" title="Solid Template"></alf-code>
                  </div>
                </alf-tab>

                <!-- TS -->
                <alf-tab [defineComponent]="{ label: 'TS' }">
                  <div class="code-canvas-adapted">
                    <alf-code [code]="solidTs" language="typescript" title="Property Declaration"></alf-code>
                  </div>
                </alf-tab>

              </alf-tabs>
            </div>
          </alf-tab>

        </alf-tabs>

        <!-- SEPARATE TABS COMPONENT FOR SOLID COLLECTION -->
        <div class="separate-section">
          <h2>Solid Collection Gallery</h2>
          <alf-tabs predefined="master">
            <alf-tab [defineComponent]="{ label: 'Gallery Overview' }">
              <div class="variant-panel">
                <alf-tabs predefined="master">
                  
                  <!-- EXAMPLE -->
                  <alf-tab [defineComponent]="{ label: 'Example' }">
                    <div class="solid-grid">
                      @for (variant of solidVariants; track $index) {
                        <div class="solid-item">
                          <span class="solid-label">{{ variant.label }}</span>
                          <alf-tabs 
                            predefined="underline" 
                            [brandColor]="{ color: variant.color, type: variant.key }"
                            [tabsConfiguration]="{ visualType: buttonsVisualType.Solid }">
                            <alf-tab [defineComponent]="{ label: 'Uno' }">
                              <div>Contenido {{ variant.label }} 1</div>
                            </alf-tab>
                            <alf-tab [defineComponent]="{ label: 'Dos' }">
                              <div>Contenido {{ variant.label }} 2</div>
                            </alf-tab>
                            <alf-tab [defineComponent]="{ label: 'Tres' }">
                              <div>Contenido {{ variant.label }} 3</div>
                            </alf-tab>
                          </alf-tabs>
                        </div>
                      }
                    </div>
                  </alf-tab>

                  <!-- HTML -->
                  <alf-tab [defineComponent]="{ label: 'HTML' }">
                    <div class="code-canvas-adapted">
                      <alf-code [code]="galleryHtml" language="html" title="Gallery Template"></alf-code>
                    </div>
                  </alf-tab>

                  <!-- TS -->
                  <alf-tab [defineComponent]="{ label: 'TS' }">
                    <div class="code-canvas-adapted">
                      <alf-code [code]="galleryTs" language="typescript" title="Property Declaration"></alf-code>
                    </div>
                  </alf-tab>

                </alf-tabs>
              </div>
            </alf-tab>
          </alf-tabs>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }
    .docs-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #f8fafc;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      min-height: 0;
    }
    .docs-header {
      background: #0f172a;
      color: white;
      padding: 2rem;
      h1 { margin: 0; font-size: 1.5rem; font-weight: 700; }
      p { margin: 0.5rem 0 0; color: #94a3b8; font-size: 0.9rem; }
      .accent { color: #3b82f6; }
    }
    .docs-content {
    padding: 2rem;
    margin: 0 auto;
    width: -webkit-fill-available;
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    overflow: auto;  /* FIX */
    }
    .variant-panel {
      margin-top: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 1.5rem;
    }
    .example-canvas {
      padding: 3rem;
      margin-top: 1rem;
      background: #f1f5f9;
      border-radius: 8px;
      border: 1px dashed #cbd5e1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .code-canvas-adapted {
      margin-top: 1rem;
      border-radius: 8px;
      overflow: hidden;
    }
    .solid-grid {
      gap: 2rem;
      padding: 1rem;
    }
    .solid-item {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .solid-label {
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
    .separate-section {
      margin-top: 4rem;
      h2 { 
        font-size: 1.25rem; 
        color: #0f172a; 
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #3b82f6;
        display: inline-block;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoPage {
  protected readonly tabsVisualType = AlfTabsVisualTypeEnum;
  protected readonly tabsKeys = DefaultTabsKeys;
  protected readonly colorVariants = AlfColorVariantEnum;
  protected readonly colorEnum = AlfColorEnum;
  protected readonly variantEnum = AlfColorVariantEnum;
  protected readonly buttonsVisualType = AlfButtonVisualTypeEnum;

  protected readonly underlineHtml = `
<alf-tabs [visualType]="visualType()">
  <alf-tab [defineComponent]="{ label: 'Tab 1' }"> ... </alf-tab>
  <alf-tab [defineComponent]="{ label: 'Tab 2' }"> ... </alf-tab>
</alf-tabs>
  `.trim();

  protected readonly underlineTs = `
import { signal } from '@angular/core';
import { AlfTabsVisualTypeEnum } from '@alfcomponents';

// 1. Definimos el estilo visual de las pestañas
public readonly visualType = signal(AlfTabsVisualTypeEnum.Underline);
  `.trim();

  protected readonly masterHtml = `
<alf-tabs [visualType]="visualType()">
  <alf-tab [defineComponent]="{ label: 'Tab 1' }"> ... </alf-tab>
  <alf-tab [defineComponent]="{ label: 'Tab 2' }"> ... </alf-tab>
</alf-tabs>
  `.trim();

  protected readonly masterTs = `
import { signal } from '@angular/core';
import { AlfTabsVisualTypeEnum } from '@alfcomponents';

// 1. Definimos el estilo visual (Master = Indicador Deslizante)
public readonly visualType = signal(AlfTabsVisualTypeEnum.Master);
  `.trim();

  protected readonly solidHtml = `
<alf-tabs 
  [visualType]="tabsVisual()"
  [brandColor]="brand()"
  [tabsConfiguration]="buttonStyle()">
  
  @for (tab of tenTabsArray; track $index) {
    <alf-tab [defineComponent]="{ label: tab.label }">
      <div>{{ tab.content }}</div>
    </alf-tab>
  }
</alf-tabs>
  `.trim();

  protected readonly solidTs = `
import { signal } from '@angular/core';
import { 
  AlfColorEnum, 
  AlfColorVariantEnum, 
  AlfButtonVisualTypeEnum,
  AlfTabsVisualTypeEnum,
  AlfButtonInterface 
} from '@alfcomponents';

// 1. Estilo general de la navegación
public readonly tabsVisual = signal(AlfTabsVisualTypeEnum.Underline);

// 2. Color de marca (Nuevo objeto {color, type})
public readonly brand = signal({ 
  color: AlfColorEnum.Primary, 
  type: AlfColorVariantEnum.Primary 
});

// 3. Estilo de los botones internos (Solid)
public readonly buttonStyle = signal<AlfButtonInterface>({
  visualType: AlfButtonVisualTypeEnum.Solid
});
  `.trim();

  protected readonly galleryHtml = `
@for (variant of solidVariants; track $index) {
  <alf-tabs 
    [brandColor]="{ color: variant.color, type: variant.key }"
    [tabsConfiguration]="buttonStyle()">
    
    <alf-tab [defineComponent]="{ label: 'Uno' }"> ... </alf-tab>
    <alf-tab [defineComponent]="{ label: 'Dos' }"> ... </alf-tab>
  </alf-tabs>
}
  `.trim();

  protected readonly galleryTs = `
import { signal } from '@angular/core';
import { 
  AlfColorEnum, 
  AlfColorVariantEnum, 
  AlfButtonVisualTypeEnum,
  AlfButtonInterface 
} from '@alfcomponents';

// 1. Listado de variantes para el bucle
public readonly solidVariants = [
  { key: AlfColorVariantEnum.Primary, color: AlfColorEnum.Primary, label: 'Primary' },
  { key: AlfColorVariantEnum.Success, color: AlfColorEnum.Success, label: 'Success' },
  { key: AlfColorVariantEnum.Danger, color: AlfColorEnum.Danger, label: 'Danger' }
];

// 2. Estilo de los botones internos
public readonly buttonStyle = signal<AlfButtonInterface>({
  visualType: AlfButtonVisualTypeEnum.Solid
});
  `.trim();

  protected readonly solidVariants = [
    { key: AlfColorVariantEnum.Primary, color: AlfColorEnum.Primary, label: 'Primary' },
    { key: AlfColorVariantEnum.Success, color: AlfColorEnum.Success, label: 'Success' },
    { key: AlfColorVariantEnum.Danger, color: AlfColorEnum.Danger, label: 'Danger' },
    { key: AlfColorVariantEnum.Warning, color: AlfColorEnum.Warning, label: 'Warning' },
    { key: AlfColorVariantEnum.Info, color: AlfColorEnum.Info, label: 'Info' },
  ];

  protected readonly tenTabsArray = Array.from({ length: 10 }, (_, i) => ({
    label: `Tab ${i + 1}`,
    content: `Contenido de la pestaña número ${i + 1}. Este es un ejemplo de cómo se ven 10 pestañas sólidas seguidas en la variante primaria.`
  }));
}
