# alfTabContent

Directiva para marcar `ng-template` como contenido de un tab específico dentro de `alf-tabs`.

## 📋 Uso Básico

```html
<alf-tabs [config]="tabsConfig">
  <ng-template alfTabContent="home">
    <div>Contenido del tab Home</div>
  </ng-template>
  
  <ng-template alfTabContent="profile">
    <div>Contenido del tab Profile</div>
  </ng-template>
  
  <ng-template alfTabContent="settings">
    <div>Contenido del tab Settings</div>
  </ng-template>
</alf-tabs>
```

```typescript
tabsConfig = {
  tabs: [
    { id: 'home', label: 'Inicio', prefix: '🏠' },
    { id: 'profile', label: 'Perfil', prefix: '👤' },
    { id: 'settings', label: 'Config', prefix: '⚙️' }
  ]
};
```

---

## 🔧 API

### Input

| Nombre          | Tipo     | Requerido | Descripción                                                                                                  |
| --------------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| `alfTabContent` | `string` | ✅ Sí      | ID del tab al que pertenece este contenido. Debe coincidir con el `id` definido en la configuración del tab. |

---

## 📌 Características

- **Content Projection**: Usa templates para proyectar contenido en cada tab
- **Lazy-ish Rendering**: El contenido solo se renderiza cuando el tab está activo
- **Signal-based**: Usa `input.required<string>()` para el ID del tab
- **Standalone**: Directiva standalone, import directo

---

## 💡 Ejemplos Avanzados

### Con componentes anidados

```html
<alf-tabs [config]="config">
  <ng-template alfTabContent="dashboard">
    <app-dashboard-widget></app-dashboard-widget>
  </ng-template>
  
  <ng-template alfTabContent="analytics">
    <app-analytics-chart [data]="chartData"></app-analytics-chart>
  </ng-template>
</alf-tabs>
```

### ID dinámico

```html
<ng-template [alfTabContent]="dynamicTabId">
  <div>Contenido dinámico</div>
</ng-template>
```

```typescript
dynamicTabId = signal('tab-1');
```

---

## ⚠️ Importante

- El `alfTabContent` **debe coincidir exactamente** con el `id` del tab en la configuración
- Si no hay coincidencia, el contenido no se mostrará
- Cada `ng-template` debe tener un ID único

---

## 📚 Ver También

- [alf-tabs](../../components/composed/alf-tabs/README.md) - Componente contenedor
- [AlfTabConfigInterface](../../components/composed/alf-tabs/interfaces/alf-tab-config.ts) - Configuración de tabs
