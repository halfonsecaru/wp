import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AlfButton, DefaultButtonKeys } from '@alfcomponents';

@Component({
  selector: 'app-solid-buttons',
  standalone: true,
  imports: [AlfButton],
  template: `
    <div style="padding: 2rem; display: flex; flex-direction: column; gap: 2rem; min-height: 100vh;">
      
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3>Bootstrap 5 Solid Buttons (Full Set)</h3>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; border-radius: 16px; background: color-mix(in srgb, currentColor 3%, transparent); border: 1px solid color-mix(in srgb, currentColor 8%, transparent); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); overflow: hidden;">
        <h4 style="margin: 0; padding-bottom: 1rem; border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); opacity: 0.9; font-size: 1.25rem;">[ UNIT_TEST: Geek Mode Detected ] 👾</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 2.5rem; justify-content: center; padding: 1rem;">
          @for (btn of geekTypes; track btn.key) {
            <div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: center;">
              <span style="font-size: 0.7rem; font-family: monospace; opacity: 0.6; text-transform: uppercase;">{{ btn.label }}</span>
              <alf-button [predefined]="btn.key" visualType="solid" size="lg"></alf-button>
            </div>
          }
        </div>
      </div>
      @for (section of demoSections; track section.type) {
        <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; border-radius: 16px; background: color-mix(in srgb, currentColor 3%, transparent); border: 1px solid color-mix(in srgb, currentColor 8%, transparent); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); backdrop-filter: blur(10px);">
          <h4 style="margin: 0; padding-bottom: 1rem; border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); opacity: 0.9; font-size: 1.25rem;">{{ section.title }}</h4>
          
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <h5 style="margin: 0; opacity: 0.5; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">With Icons</h5>
              <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
                @for (btn of buttonTypes; track btn.key) {
                  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <span style="font-size: 0.875rem; font-weight: 500; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;">{{ btn.label }}</span>
                    <alf-button [predefined]="btn.key" [visualType]="section.type"></alf-button>
                  </div>
                }
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <h5 style="margin: 0; opacity: 0.5; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">No Icons</h5>
              <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
                @for (btn of buttonTypes; track btn.key) {
                  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <span style="font-size: 0.875rem; font-weight: 500; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;">{{ btn.label }}</span>
                    <alf-button [predefined]="btn.key" [visualType]="section.type" [hideIcon]="true"></alf-button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }

      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; border-radius: 16px; background: color-mix(in srgb, currentColor 3%, transparent); border: 1px solid color-mix(in srgb, currentColor 8%, transparent); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); backdrop-filter: blur(10px);">
        <h4 style="margin: 0; padding-bottom: 1rem; border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); opacity: 0.9; font-size: 1.25rem;">Visual Types Comparison</h4>
        <div style="display: flex; gap: 3rem;">
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <span style="font-size: 0.875rem; font-weight: 500; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;">Raised (Material)</span>
            <alf-button [predefined]="buttonKeys.Accept" visualType="raised"></alf-button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <span style="font-size: 0.875rem; font-weight: 500; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;">Gradient (Premium)</span>
            <alf-button [predefined]="buttonKeys.Accept" visualType="gradient"></alf-button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <span style="font-size: 0.875rem; font-weight: 500; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;">Solid (Vibrant)</span>
            <alf-button [predefined]="buttonKeys.Accept" visualType="solid"></alf-button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <span style="font-size: 0.875rem; font-weight: 500; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;">3D (Experimental)</span>
            <alf-button [predefined]="buttonKeys.Accept" visualType="3d"></alf-button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <span style="font-size: 0.875rem; font-weight: 500; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em;">Text (Pure)</span>
            <alf-button [predefined]="buttonKeys.Accept" visualType="text"></alf-button>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; border-radius: 16px; background: color-mix(in srgb, currentColor 3%, transparent); border: 1px solid color-mix(in srgb, currentColor 8%, transparent); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); backdrop-filter: blur(10px);">
        <h4 style="margin: 0; padding-bottom: 1rem; border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); opacity: 0.9; font-size: 1.25rem;">Navigation & Links (Pure HTML &lt;a&gt; tags)</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <span style="font-size: 0.875rem; opacity: 0.7;">These buttons are rendered as native <code>&lt;a&gt;</code> tags for SEO and accessibility.</span>
          <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
            <alf-button 
              predefined="info" 
              label="Go to Google" 
              [link]="{ url: 'https://google.com', target: '_blank' }">
            </alf-button>
            <alf-button 
              predefined="back" 
              label="Back to Top" 
              [link]="{ url: '#' }">
            </alf-button>
            <alf-button 
              visualType="text"
              label="Internal Deep Link" 
              [link]="{ url: '/demo/solid' }">
            </alf-button>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; border-radius: 16px; background: color-mix(in srgb, currentColor 3%, transparent); border: 1px solid color-mix(in srgb, currentColor 8%, transparent); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); backdrop-filter: blur(10px);">
        <h4 style="margin: 0; padding-bottom: 1rem; border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); opacity: 0.9; font-size: 1.25rem;">Modern Output API (Angular 21)</h4>
        <div style="display: flex; gap: 2rem; align-items: flex-start;">
          <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 200px;">
             <span style="font-size: 0.875rem; font-weight: 500; opacity: 0.6; text-transform: uppercase;">Interactive Button</span>
             <alf-button 
                predefined="accept"
                label="Interact with me" 
                (onClick)="logEvent('CLICK', $event)"
                (onHoverEnter)="logEvent('HOVER ENTER', $event)"
                (onHoverLeave)="logEvent('HOVER LEAVE', $event)">
             </alf-button>
          </div>

          <div style="flex: 1; min-height: 120px; padding: 1rem; border-radius: 12px; background: rgba(0,0,0,0.2); font-family: monospace; font-size: 0.85rem; overflow: hidden;">
            <div style="color: #4ade80; margin-bottom: 0.5rem;">> Event Logger Ready_</div>
            @for (log of eventLogs; track $index) {
              <div style="margin-bottom: 0.25rem;">
                <span style="opacity: 0.5;">[{{ log.time }}]</span> 
                <span [style.color]="log.color" style="font-weight: bold; margin: 0 0.5rem;">{{ log.type }}</span>
                <span style="opacity: 0.8;">Pos: ({{ log.x }}, {{ log.y }})</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolidButtonsPage {
  protected readonly buttonKeys = DefaultButtonKeys;
  protected eventLogs: any[] = [];

  protected logEvent(type: string, event: MouseEvent): void {
    const log = {
      type,
      time: new Date().toLocaleTimeString(),
      x: Math.round(event.clientX),
      y: Math.round(event.clientY),
      color: type.includes('CLICK') ? '#fbbf24' : (type.includes('ENTER') ? '#38bdf8' : '#f87171')
    };
    this.eventLogs = [log, ...this.eventLogs].slice(0, 5);
  }

  protected readonly buttonTypes = [
    { key: DefaultButtonKeys.Accept, label: 'Primary' },
    { key: DefaultButtonKeys.Cancel, label: 'Secondary' },
    { key: DefaultButtonKeys.Example, label: 'Success' },
    { key: DefaultButtonKeys.Danger, label: 'Danger' },
    { key: DefaultButtonKeys.Warning, label: 'Warning' },
    { key: DefaultButtonKeys.Info, label: 'Info' },
    { key: DefaultButtonKeys.Light, label: 'Light' },
    { key: DefaultButtonKeys.Back, label: 'Dynamic Dark' }
  ];

  protected readonly geekTypes = [
    { key: DefaultButtonKeys.Cyber, label: 'Cyberpunk' },
    { key: DefaultButtonKeys.Matrix, label: 'Matrix' },
    { key: DefaultButtonKeys.Jedi, label: 'Star Wars: Jedi' },
    { key: DefaultButtonKeys.Sith, label: 'Star Wars: Sith' },
    { key: DefaultButtonKeys.Fire, label: 'Fire' },
    { key: DefaultButtonKeys.Frost, label: 'Frost' },
    { key: DefaultButtonKeys.Lava, label: 'Lava' },
    { key: DefaultButtonKeys.Zen, label: 'Zen' }
  ];

  protected readonly demoSections = [
    { title: 'Raised "Material" Buttons (New 🏢)', type: 'raised' },
    { title: 'Gradient "Modern" Buttons (New 🎨)', type: 'gradient' },
    { title: '3D "Gamer" Buttons (New 🚀)', type: '3d' },
    { title: 'Glossy "Liquid" Buttons (New 💧)', type: 'glossy' },
    { title: 'Solid Buttons', type: 'solid' },
    { title: 'Soft Buttons', type: 'soft' },
    { title: 'Outlined Buttons', type: 'outlined' },
    { title: 'Ghost Buttons', type: 'ghost' },
    { title: 'Text Buttons', type: 'text' },
    { title: 'Crystal Buttons', type: 'crystal' }
  ];
}
