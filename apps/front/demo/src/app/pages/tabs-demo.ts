import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlfTabsComponent,
  AlfTabComponent,
  AlfTabsInterface,
  AlfTabsVisualTypeEnum,
  DefaultTabsKeys
} from '@alfcomponents';

/**
 * TabsDemoPage
 * Demostrador de componentes moderno, anidando Pestañas -> Ejemplo / Código.
 */
@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [CommonModule, AlfTabsComponent, AlfTabComponent],
  template: `
    <div class="docs-container">
      <header class="docs-header">
        <h1>AlfTabs <span class="accent">Documentation</span></h1>
        <p>Demostración de capacidades de anidamiento y visuales Élite.</p>
      </header>

      <div class="docs-content">
        <!-- ROOT TABS (Variantes Visuales) -->
        <alf-tabs [defineComponent]="{ visualType: tabsVisualType.Modern }">
          
          <!-- ============================ -->
          <!-- VARIANT 1: UNDERLINE -->
          <!-- ============================ -->
          <alf-tab [defineComponent]="{ label: 'Underline (Standard)' }">
            <div class="variant-panel">
              
              <!-- SECONDARY TABS (Example vs Code) -->
              <alf-tabs [defineComponent]="{ visualType: tabsVisualType.Modern }">
                
                <!-- EXAMPLE -->
                <alf-tab [defineComponent]="{ label: 'Example' }">
                  <div class="example-canvas">
                    <alf-tabs [defineComponent]="{ visualType: tabsVisualType.Underline }">
                      <alf-tab [defineComponent]="{ label: 'Visión General' }">
                        <div class="demo-content">
                          <h3>Resumen del Proyecto</h3>
                          <p>Bienvenido al panel de control principal. Aquí puedes visualizar el estado general de la aplicación, el rendimiento de los módulos y las alertas recientes generadas por el sistema.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Estadísticas' }">
                        <div class="demo-content">
                          <h3>Datos en Tiempo Real</h3>
                          <p>Gráficos volumétricos de tráfico, distribución de ancho de banda y picos de latencia global del clúster.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Configuración' }">
                        <div class="demo-content">
                          <h3>Preferencias Restringidas</h3>
                          <p>Ajustes de notificaciones, rotación de tokens criptográficos y políticas de control de acceso basado en roles (RBAC).</p>
                        </div>
                      </alf-tab>
                    </alf-tabs>
                  </div>
                </alf-tab>

                <!-- CODE -->
                <alf-tab [defineComponent]="{ label: 'Code' }">
                  <div class="code-canvas">
                    <pre><code>
&lt;!-- Plantilla HTML --&gt;
&lt;alf-tabs [defineComponent]="&#123; visualType: tabsVisualType.Underline &#125;"&gt;
  &lt;alf-tab [defineComponent]="&#123; label: 'Visión General' &#125;"&gt; ... &lt;/alf-tab&gt;
  &lt;alf-tab [defineComponent]="&#123; label: 'Estadísticas' &#125;"&gt; ... &lt;/alf-tab&gt;
&lt;/alf-tabs&gt;
                    </code></pre>
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
              <alf-tabs [defineComponent]="{ visualType: tabsVisualType.Modern }">
                
                <!-- EXAMPLE -->
                <alf-tab [defineComponent]="{ label: 'Example' }">
                  <div class="example-canvas">
                    <!-- Demo de Pestañas tipo Master -->
                    <alf-tabs [predefined]="tabsKeys.Master">
                      <alf-tab [defineComponent]="{ label: 'Diseño' }">
                        <div class="demo-content">
                          <h3>Arquitectura Visual Élite</h3>
                          <p>El diseño UI/UX se enfoca en la usabilidad pura mediante el uso intensivo de micro-animaciones (Signals + WAAPI), paletas de color con cálculos armónicos, y un sistema de espaciado matemático que respeta las leyes de proximidad de la Gestalt.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Rendimiento' }">
                        <div class="demo-content">
                          <h3>Zoneless & Signals (Full Hardware Acceleration)</h3>
                          <p>Las métricas de rendimiento marcan 100/100 en Lighthouse de forma consistente. No hay reflows forzados en CSS y Angular actualiza las vistas locales quirúrgicamente a través de reacciones atómicas, sin usar zone.js.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Seguridad' }">
                        <div class="demo-content">
                          <h3>Defensa en Profundidad (DiD)</h3>
                          <p>Autenticación hiper segura mediante tokens anti-CSRF inyectados en runtime. Cada Input del usuario es auditado y sanitizado nativamente por el compilador AOT y el motor de render DOM antes de aterrizar en la pantalla.</p>
                        </div>
                      </alf-tab>
                      <alf-tab [defineComponent]="{ label: 'Analíticas' }">
                        <div class="demo-content">
                          <h3>Telemetría Inteligente</h3>
                          <p>Nuestra malla de microservicios procesa 10,000 eventos distribuidos por segundo, autoescalando los nodos edge de forma dinámica para absorber picos de demanda sin el más mínimo temblor de latencia.</p>
                        </div>
                      </alf-tab>
                    </alf-tabs>
                  </div>
                </alf-tab>

                <!-- CODE -->
                <alf-tab [defineComponent]="{ label: 'Code' }">
                  <div class="code-canvas">
                    <pre><code>
&lt;!-- Plantilla HTML --&gt;
&lt;alf-tabs [predefined]="tabsKeys.Master"&gt;
  &lt;alf-tab label="Diseño"&gt; ... &lt;/alf-tab&gt;
  &lt;alf-tab label="Rendimiento"&gt; ... &lt;/alf-tab&gt;
&lt;/alf-tabs&gt;
                    </code></pre>
                  </div>
                </alf-tab>

              </alf-tabs>
            </div>
          </alf-tab>

        </alf-tabs>
      </div>
    </div>
  `,
  styles: [`
    .docs-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: #f8fafc;
      font-family: 'Inter', sans-serif;
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
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      flex: 1;
      overflow-y: auto;
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
    .code-canvas {
      margin-top: 1rem;
      background: #0f172a;
      border-radius: 8px;
      padding: 1.5rem;
      color: #38bdf8;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      overflow-x: auto;
    }
    .demo-content {
      padding: 2.5rem;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
      h3 { margin: 0 0 0.5rem 0; color: #0f172a; font-size: 1.15rem; }
      p { margin: 0; color: #475569; font-size: 0.95rem; line-height: 1.6; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoPage {
  protected readonly tabsVisualType = AlfTabsVisualTypeEnum;
  protected readonly tabsKeys = DefaultTabsKeys;
}
