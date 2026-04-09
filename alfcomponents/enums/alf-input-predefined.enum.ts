/**
 * Enum para configuraciones predefinidas de inputs
 * Configuraciones completas para casos de uso comunes (Email, Password, etc.)
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * preset: AlfInputPredefinedEnum.Email // Configura automáticamente icono, tipo y validación
 * ```
 */
export enum AlfInputPredefinedEnum {
  // ===== CAMPOS DE FORMULARIO COMUNES =====

  /** Campo de email con icono y validación */
  Email = 'email',

  /** Campo de contraseña con toggle de visibilidad */
  Password = 'password',

  /** Campo de búsqueda con icono y clearable */
  Search = 'search',

  /** Campo de teléfono con formato */
  Phone = 'phone',

  /** Campo de URL/website */
  Url = 'url',

  /** Campo de nombre de usuario */
  Username = 'username',
}
