# Ejemplo simple: Comunicación padre-hijo con función por @Input en Angular

Este ejemplo muestra cómo un componente padre (`FatherComponent`) pasa una función por `@Input` a un componente hijo (`SonComponent`). El hijo llama a la función del padre al hacer click en un botón, pasando un valor.

---

## Código de ejemplo

### father.component.ts

```ts
@Component({
  selector: 'app-father',
  standalone: true,
  imports: [SonComponent],
  template: `
    <app-son [onNotify]="notificar"></app-son>
    <p>Mensaje recibido: {{ mensaje }}</p>
  `,
})
export class FatherComponent {
  mensaje = '';

  notificar = (valor: string) => {
    this.mensaje = valor;
  };
}
```

### son.component.ts

```ts
@Component({
  selector: 'app-son',
  standalone: true,
  template: `
    <button (click)="onNotify('¡Hola desde el hijo!')">
      Notificar al padre
    </button>
  `,
})
export class SonComponent {
  @Input() onNotify!: (valor: string) => void;
}
```

---

## Resumen

- **No se usan servicios ni EventEmitter**.
- El hijo llama directamente a la función del padre pasada por input.
- Comunicación simple, directa y recomendada en Angular moderno.
