# Contributing to alf-components

¡Gracias por tu interés en contribuir! 🎉

## 📋 Antes de Contribuir

1. Lee el archivo `memoria.md` para entender las convenciones del proyecto
2. Revisa el `COMPONENT_GUIDE.md` si vas a crear un nuevo componente
3. Asegúrate de que tu código sigue los estándares de Angular 21

---

## 🚀 Configuración del Entorno

```bash
# Clonar el repositorio
git clone https://github.com/halfonsecaru/alfComponents.git
cd alfComponents

# Instalar dependencias
npm install

# Ejecutar la demo app
npm run dev

# Ejecutar tests
npm test
```

---

## 📝 Guía de Estilo

### TypeScript

- **Arrow Functions**: Siempre usar arrow functions para métodos de clase
- **Signals**: Usar `input()`, `output()`, `model()` en lugar de decoradores
- **Tipos**: Siempre tipar parámetros y retornos de funciones
- **Interfaces**: Nombres con prefijo `Alf` y sufijo `Interface`

```typescript
// ✅ Correcto
protected handleClick = (event: MouseEvent): void => {
  this.clicked.emit(event);
};

// ❌ Incorrecto
handleClick(event: MouseEvent) {
  this.clicked.emit(event);
}
```

### SCSS

- Usar variables CSS con prefijo del componente: `--alf-button-*`
- Usar mixins de `shared/styles/` para estados
- No usar `!important` salvo casos excepcionales

### Componentes

- `standalone: true` siempre
- `ChangeDetectionStrategy.OnPush` cuando sea posible
- `ViewEncapsulation.None` para permitir customización

---

## 🧪 Tests

Cada componente/directiva/utilidad debe tener tests:

```bash
# Ejecutar tests
npm test

# Tests con watch
npm run test:watch

# Coverage
npm run test:coverage
```

### Estructura de Tests

```typescript
describe('ComponentName', () => {
  describe('feature', () => {
    it('should do something', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

---

## 📁 Estructura de un Nuevo Componente

```
components/simple/alf-{name}/
├── alf-{name}.ts          # Componente
├── alf-{name}.html        # Template
├── alf-{name}.scss        # Estilos
├── alf-{name}.spec.ts     # Tests
├── interfaces/
│   └── alf-{name}.ts      # Interface
├── predefineds/
│   └── alf-{name}-defaults.ts
└── README.md              # Documentación
```

---

## 🔄 Proceso de Pull Request

1. **Fork** el repositorio
2. Crea una **branch** desde `main`: `git checkout -b feature/mi-feature`
3. Haz tus cambios siguiendo la guía de estilo
4. Añade/actualiza **tests**
5. Actualiza la **documentación** si es necesario
6. Ejecuta `npm test` y asegúrate de que pasan
7. **Commit** con mensaje descriptivo: `feat: add alf-switch component`
8. **Push** a tu fork
9. Abre un **Pull Request**

### Formato de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formateo, sin cambios de código
refactor: refactorización de código
test: añadir o modificar tests
chore: tareas de mantenimiento
```

---

## 📄 Licencia

Al contribuir, aceptas que tu código se publicará bajo la licencia MIT del proyecto.

---

## 🙋 ¿Preguntas?

Abre un issue con la etiqueta `question`.
npm install @angular-devkit/schematics@21