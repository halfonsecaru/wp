import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  AlfTabsComponent,
  AlfTabComponent,
  AlfIconsUnicodeIconEnum,
  DefaultTabsKeys,
  AlfAnimationTypeEnum
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
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: 3rem; min-height: 100vh;">
      
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

      <!-- 2. SIDEBAR IDENTITY (Pill + SlideInLeft + Position Left) -->
      <section class="demo-card">
        <h3 class="demo-title">2. Identidad: Sidebar (Pill + SlideIn + Left)</h3>
        <p class="demo-desc">Configuración vertical ideal para menús laterales con navegación por píldoras.</p>
        
        <alf-tabs [predefined]="tabsKeys.Sidebar">
          <alf-tab [defineComponent]="{ label: 'Proyectos', prefix: icons.Settings }">
            <div class="panel-content">
              <h4>Gestión de Proyectos</h4>
              <p>Identidad diseñada para paneles laterales. Observa la animación <code>SlideInLeft</code>.</p>
            </div>
          </alf-tab>
          <alf-tab [defineComponent]="{ label: 'Equipo', prefix: icons.User }">
            <div class="panel-content">
              <h4>Colaboradores</h4>
              <p>Lista de miembros del equipo activo.</p>
            </div>
          </alf-tab>
        </alf-tabs>
      </section>

      <!-- 3. MODERN IDENTITY (Modern + FadeInDown) -->
      <section class="demo-card">
        <h3 class="demo-title">3. Identidad: Modern (Boxed + FadeInDown)</h3>
        <p class="demo-desc">Estética contemporánea con bordes definidos y entrada desde arriba.</p>
        
        <alf-tabs [predefined]="tabsKeys.Settings">
          <alf-tab [defineComponent]="{ label: 'Configuración', prefix: icons.Settings }">
            <div class="panel-content">
              <h4>Preferencias del Sistema</h4>
              <p>Estética moderna con fondo sólido y animación descendente.</p>
            </div>
          </alf-tab>
          <alf-tab [defineComponent]="{ label: 'Privacidad', prefix: icons.CheckMark }">
            <div class="panel-content">
              <h4>Seguridad de Datos</h4>
              <p>Ajustes de visibilidad y encriptación.</p>
            </div>
          </alf-tab>
        </alf-tabs>
      </section>

      <!-- 4. GLASS IDENTITY (Glassmorphism + ZoomIn) -->
      <section class="demo-card">
        <h3 class="demo-title">4. Identidad: Profile (Glass + ZoomIn)</h3>
        <p class="demo-desc">Efecto translúcido premium con animación de escala orgánica.</p>
        
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 1rem; border-radius: 12px;">
          <alf-tabs [predefined]="tabsKeys.Profile">
            <alf-tab [defineComponent]="{ label: 'Mi Cuenta', prefix: icons.User }">
              <div class="panel-content glass-effect">
                <h4>Información de Usuario</h4>
                <p>Efecto Glassmorphism real. La animación <code>ZoomIn</code> aporta un toque cinético Élite.</p>
              </div>
            </alf-tab>
            <alf-tab [defineComponent]="{ label: 'Suscripción', prefix: icons.Sparkle }">
              <div class="panel-content glass-effect">
                <h4>Plan Actual: Élite PRO</h4>
                <p>Gestiona tus pagos y facturación.</p>
              </div>
            </alf-tab>
          </alf-tabs>
        </div>
      </section>

      <!-- 5. MASTER IDENTITY (Material + Sliding Indicator + Directional Slides) -->
      <section class="demo-card master-demo">
        <h3 class="demo-title" style="color: #6200ee;">5. Identidad: Master (Material + Sliding Indicator)</h3>
        <p class="demo-desc">La joya de la corona. Indicador deslizante reactivo y animaciones con coherencia espacial.</p>
        
        <alf-tabs [predefined]="tabsKeys.Master">
          <alf-tab [defineComponent]="{ label: 'Diseño', prefix: icons.Settings }">
            <div class="panel-content">
              <h4>Material Design 3.0</h4>
              <p>Observa cómo la barra de abajo se desliza suavemente ajustándose al ancho del texto.</p>
            </div>
          </alf-tab>
          <alf-tab [defineComponent]="{ label: 'Rendimiento', prefix: icons.Zap }">
            <div class="panel-content">
              <h4>Velocidad Atómica</h4>
              <p>Animaciones direccionales: si avanzas hacia aquí, el contenido entra por la derecha.</p>
            </div>
          </alf-tab>
          <alf-tab [defineComponent]="{ label: 'Seguridad', prefix: icons.CheckMark }">
            <div class="panel-content">
              <h4>Protección Total</h4>
              <p>Todo el motor está basado en señales de Angular, sin un solo milisegundo de desperdicio.</p>
            </div>
          </alf-tab>
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
    .glass-effect {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoPage {
  protected readonly tabsKeys = DefaultTabsKeys;
  protected readonly icons = AlfIconsUnicodeIconEnum;
  protected readonly animations = AlfAnimationTypeEnum;

  constructor() { }
}
