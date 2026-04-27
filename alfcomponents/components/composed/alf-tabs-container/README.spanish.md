# AlfTabsContainerComponent

El AlfTabsContainerComponent es un componente compuesto diseñado para gestionar un conjunto de pestañas. Maneja la navegación de las cabeceras y la sincronización con el contenido proyectado.

## Características
- Reactividad basada en Signals.
- Proyección de contenido para los paneles de pestañas.
- Integrado con AlfButtons para la navegación.
- Accesible (incluye roles ARIA).

## Uso

```html
<alf-tabs-container [config]="tabsConfig">
  <alf-tab [tabConfig]="tabsConfig.tab[0]">
    <p>Contenido para la Pestaña 1</p>
  </alf-tab>
  <alf-tab [tabConfig]="tabsConfig.tab[1]">
    <p>Contenido para la Pestaña 2</p>
  </alf-tab>
</alf-tabs-container>
```

## Interfaz de Configuración

```typescript
export interface AlfTabsContainerInterface {
  readonly tab: AlfSingleTabInterface[];
  readonly tabsStyle?: AlfTabsStyleEnum;
}
```
