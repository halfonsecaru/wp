import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  AlfTabsComponent,
  AlfTabComponent,
  AlfIconsUnicodeIconEnum,
  DefaultTabsKeys,
  AlfAnimationTypeEnum,
  AlfColorVariantEnum
} from '@alfcomponents';

/**
 * TabsDemoPage
 * Página de demostración oficial para AlfTabs Élite.
 * Visualización exclusiva de las variantes predefinidas (Predefined Identities).
 */
@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [AlfTabsComponent, AlfTabComponent],
  template: `
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: 3rem; min-height: 100%;">
      
      <header style="display: flex; flex-direction: column; gap: 0.5rem; border-bottom: 2px solid var(--alf-sys-gray-100); padding-bottom: 1.5rem;">
        <h1 style="margin: 0; font-size: 2.5rem; letter-spacing: -0.025em; font-weight: 800; background: linear-gradient(to right, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          AlfTabs Élite
        </h1>
        <p style="margin: 0; opacity: 0.7; font-size: 1.1rem;">
          Explorando las identidades visuales predefinidas y el motor de animaciones Animate.css.
        </p>
      </header>

      <!-- 1. BASE IDENTITY (Underline + FadeIn) -->
      <section class="demo-card">
        <h3 class="demo-title">1. Identidad: Base (Underline + FadeIn)</h3>
        <p class="demo-desc">La variante estándar para interfaces limpias con animación suave de entrada.</p>
        
        <alf-tabs [predefined]="tabsKeys.Base">
          <alf-tab [defineComponent]="{ label: 'Visión General', prefix: icons.Sparkle }">
            <div class="panel-content">
              <h4>Dashboard Principal</h4>
              <p>Esta es la configuración base. Usa una animación <code>FadeIn</code> y un estilo visual de subrayado.</p>
            </div>
          </alf-tab>
          <alf-tab [defineComponent]="{ label: 'Analíticas', prefix: icons.Bell }">
            <div class="panel-content">
              <h4>Datos en tiempo real</h4>
              <p>Panel de control con métricas avanzadas.</p>
            </div>
          </alf-tab>
        </alf-tabs>
      </section>

      <!-- 2. GEEK & SOLID IDENTITIES (Matrix, Cyber, Jedi) -->
      <section class="demo-card">
        <h3 class="demo-title" style="color: #4ade80;">2. Identidades Geek & Solid (Puras)</h3>
        <p class="demo-desc">Uso directo del ADN cromático en las pestañas. Sin configuración extra, solo inyectando la variante.</p>
        
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div>
            <span class="label-badge">Variante: Matrix</span>
            <alf-tabs [variant]="variants.Matrix">
              <alf-tab label="System Log"></alf-tab>
              <alf-tab label="Intrusion Alert"></alf-tab>
              <alf-tab label="Mainframe"></alf-tab>
            </alf-tabs>
          </div>

          <div>
            <span class="label-badge">Variante: Cyberpunk</span>
            <alf-tabs [variant]="variants.Cyber">
              <alf-tab label="Night City"></alf-tab>
              <alf-tab label="Netrunner"></alf-tab>
              <alf-tab label="Cyberware"></alf-tab>
            </alf-tabs>
          </div>

          <div>
            <span class="label-badge">Variante: Jedi</span>
            <alf-tabs [variant]="variants.Jedi">
              <alf-tab label="Force Meditation"></alf-tab>
              <alf-tab label="Lightsaber Skills"></alf-tab>
            </alf-tabs>
          </div>
        </div>
      </section>

      <!-- 3. SIDEBAR IDENTITY -->
      <section class="demo-card">
        <h3 class="demo-title">3. Identidad: Sidebar (Pill + Left)</h3>
        <p class="demo-desc">Configuración vertical ideal para menús laterales.</p>
        
        <alf-tabs [predefined]="tabsKeys.Sidebar" position="left">
          <alf-tab [defineComponent]="{ label: 'Proyectos', prefix: icons.Settings }">
            <div class="panel-content"><h4>Proyectos</h4><p>Gestión de proyectos.</p></div>
          </alf-tab>
          <alf-tab [defineComponent]="{ label: 'Equipo', prefix: icons.User }">
            <div class="panel-content"><h4>Equipo</h4><p>Miembros colaboradores.</p></div>
          </alf-tab>
        </alf-tabs>
      </section>

      <!-- 4. MASTER IDENTITY (Sliding Indicator) -->
      <section class="demo-card master-demo">
        <h3 class="demo-title" style="color: #6200ee;">4. Identidad: Master (Sliding Indicator)</h3>
        <p class="demo-desc">La joya de la corona con indicador deslizante y animaciones direccionales.</p>
        
        <alf-tabs [predefined]="tabsKeys.Master">
          <alf-tab label="Diseño"></alf-tab>
          <alf-tab label="Rendimiento"></alf-tab>
          <alf-tab label="Seguridad"></alf-tab>
          <alf-tab label="Analíticas"></alf-tab>
        </alf-tabs>
      </section>

    </div>
  `,
  styles: [`
    .demo-card {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 2.5rem;
      border-radius: 20px;
      transition: all 0.3s ease;
      background: var(--alf-sys-gray-050, #fcfcfd);
      border: 1px solid var(--alf-sys-gray-100, #f1f3f5);
    }
    .demo-title {
      margin: 0;
      font-size: 1.25rem;
      color: var(--alf-sys-primary, #3b82f6);
      font-weight: 700;
    }
    .demo-desc {
      margin: 0;
      font-size: 0.95rem;
      color: var(--alf-sys-gray-400, #868e96);
      line-height: 1.6;
    }
    .panel-content {
      padding: 1.5rem;
      min-height: 100px;
      h4 { margin-top: 0; color: var(--alf-sys-gray-900, #212529); }
      p { color: var(--alf-sys-gray-400, #868e96); margin-bottom: 0; }
    }
    .label-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      background: var(--alf-sys-gray-100);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 1rem;
      color: var(--alf-sys-gray-600);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoPage {
  protected readonly tabsKeys = DefaultTabsKeys;
  protected readonly icons = AlfIconsUnicodeIconEnum;
  protected readonly animations = AlfAnimationTypeEnum;
  protected readonly variants = AlfColorVariantEnum;

  constructor() { }
}
