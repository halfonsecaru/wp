# Consideraciones Arquitectónicas: Uso de `equal` en Angular Signals

Esta guía documenta una de las decisiones arquitectónicas principales para el desarrollo de componentes dentro de la librería `alfcomponents`.

## La Regla de Oro
**Siempre que se cree una Signal en los componentes (especialmente en clases base o directivas) que vaya a almacenar Objetos o Arrays, se debe usar la propiedad `equal` para implementar una comprobación de igualdad profunda.**

### ¿Por qué?

Angular Signals utiliza por defecto la comparación por referencia (`Object.is`) para determinar si el valor de una señal ha cambiado. Esto significa que:
1. Para tipos primitivos (`string`, `number`, `boolean`), la comparación nativa es perfecta.
2. Para Objetos y Arrays, si pasamos un nuevo objeto literal (ej. `{ ...viejoObj, nuevaProp: true }`), Angular detectará que la *dirección de memoria* ha cambiado y **disparará la reactividad, repintando la vista y ejecutando los `effect`**, incluso si el contenido interno del objeto es exactamente idéntico al anterior.

Al asignar una función personalizada de igualdad profunda (como `JSON.stringify`), obligamos a Angular a interceptar la llamada al setter (`.set()` o `.update()`), comparar el contenido real de los datos, y si no hay cambios estructurales, **detener la reactividad en seco**.

## Beneficios Inmediatos

1. **Rendimiento Extremo**: Evita re-renderizados innecesarios en el HTML de los componentes hijos cuando las configuraciones no han sufrido alteraciones reales.
2. **Efectos Limpios**: Evita tener que escribir verbosos `if` con comprobaciones manuales (y evitar el uso forzado de `untracked()`) dentro de los `effect()` de cada componente. El componente hijo simplemente llama al setter, y el framework se encarga de ignorarlo si no aporta cambios reales.
3. **Prevención de Bucles Infinitos**: Elimina la posibilidad de crear dependencias circulares accidentales cuando un componente lee una señal computada y escribe en la señal base dentro del mismo ciclo.

## Ejemplo de Implementación

**Incorrecto (o ineficiente para objetos):**
```typescript
// Se disparará la vista cada vez que le pasemos un objeto nuevo, aunque el contenido sea idéntico.
private readonly _padding = signal<AlfPaddingInterface | undefined>(paddingInitial);
```

**Correcto y Optimizado:**
```typescript
// 1. Definimos una función de comprobación profunda (para objetos simples de config)
const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

// 2. Se la pasamos a la configuración de la Signal
private readonly _padding = signal<AlfPaddingInterface | undefined>(paddingInitial, { equal: deepEqual });
```

*(Nota: En escenarios donde el objeto sea inmensamente grande o contenga funciones/clases, se recomienda usar utilidades de deep-clone como `lodash.isEqual` o `fast-deep-equal` en lugar de `JSON.stringify` por motivos de rendimiento y compatibilidad).*
