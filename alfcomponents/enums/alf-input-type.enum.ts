/**
 * Enum para tipos de input nativos
 * Define el atributo 'type' y comportamientos especiales.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * type: AlfInputTypeEnum.Password // Oculta los caracteres ingresados
 * ```
 */
export enum AlfInputTypeEnum {
  Text = 'text',
  Email = 'email',
  Password = 'password',
  Number = 'number',
  Tel = 'tel',
  Url = 'url',
  Search = 'search',
  File = 'file',
}
