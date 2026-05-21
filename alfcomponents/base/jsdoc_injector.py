import re

with open("c:/Users/alfon/wp/alfcomponents/base/base-visual.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Dictionary mapping function names to their JSDoc blocks
jsdocs = {
    "getPredefinedVisualType": """/**
 * Obtiene la configuración visual predefinida (PredefinedConfig) para una variante dada.
 * Actúa como puente entre el enum de variante y la configuración base unificada.
 *
 * @param type Variante de color solicitada.
 * @returns Configuración visual base tipada como MainVisualStyleInterface.
 */""",
    "addStateToDeclarations": """/**
 * Añade las propiedades de un estado (hover, focus, etc.) a las declaraciones CSS.
 * Omite la inyección de propiedades que sean idénticas al estado por defecto para evitar redundancias.
 *
 * @param statePrefix Prefijo CSS a inyectar (ej. '--alf-sw-bg-hover').
 * @param state Objeto con las propiedades del estado actual.
 * @param defaultState Objeto con las propiedades del estado default para comparación.
 * @param declarations Array de declaraciones mutante.
 * @param mapFn Función inyectora específica de cada módulo visual.
 */""",
    "visualBackgroundBase": """/**
 * Resuelve y mapea las variables CSS de los fondos (Backgrounds) para todos los estados interactivos.
 * Procesa colores sólidos y gradientes (imágenes de fondo).
 *
 * @param prefix Prefijo base del componente (ej. '--alf-btn').
 * @param input Objeto con la variante y configuraciones opcionales de fondos.
 * @returns Cadena de texto con las variables CSS compiladas listas para el DOM.
 */""",
    "visualBorderBase": """/**
 * Resuelve y mapea las variables CSS de bordes (Borders) en todos sus estados.
 * Contempla color, estilo, grosor global y grosores específicos por cada lado.
 *
 * @param prefix Prefijo base del componente (ej. '--alf-btn').
 * @param input Objeto con la variante y configuraciones opcionales de bordes.
 * @returns Cadena de texto con las variables CSS compiladas listas para el DOM.
 */""",
    "visualPaddingBase": """/**
 * Resuelve y mapea las variables CSS para los rellenos (Paddings) por estado.
 * Soporta rellenos globales o detallados (top, right, bottom, left).
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de padding.
 * @returns Cadena de texto con las variables CSS.
 */""",
    "visualShadowsBase": """/**
 * Resuelve y mapea las variables CSS para las sombras (Box Shadows) interactivas.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de sombras.
 * @returns Cadena de texto con las variables CSS para sombras.
 */""",
    "visualDisplayAndLayoutBase": """/**
 * Resuelve y mapea las variables CSS de layout (Display, Flex, Width, Height, etc.).
 * Controla el comportamiento estructural y geométrico del componente.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de layout.
 * @returns Cadena de texto con las variables CSS de layout.
 */""",
    "visualMarginBase": """/**
 * Resuelve y mapea las variables CSS para los márgenes (Margins) externos.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de margen.
 * @returns Cadena de texto con las variables CSS.
 */""",
    "visualTransformBase": """/**
 * Resuelve y mapea las variables CSS de transformación espacial (Translate, Scale, Rotate) 
 * reactivas a cada estado interactivo.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones espaciales.
 * @returns Cadena de texto con las variables CSS.
 */""",
    "visualTextStyleBase": """/**
 * Resuelve y mapea las variables CSS relacionadas exclusivamente con el color del texto y su grosor,
 * diferenciadas de la tipografía base para permitir herencias limpias en elementos hijos (ej. spans de iconos).
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones de estilo de texto.
 * @returns Cadena de texto con las variables CSS.
 */""",
    "visualTypographyBase": """/**
 * Resuelve y mapea las variables CSS completas de Tipografía (Size, Family, Line Height, Align, etc.).
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la variante y configuraciones tipográficas.
 * @returns Cadena de texto con las variables CSS.
 */""",
    "visualAnimationsBase": """/**
 * Resuelve variables CSS para duraciones y delays de animaciones inyectadas.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con las configuraciones de animación.
 * @returns Cadena de texto con las variables CSS (anim-duration, anim-delay).
 */""",
    "visualAnimationsClassBase": """/**
 * Genera la cadena de clases nativas de Animate.css necesarias para inyectar al DOM
 * durante los ciclos de vida de enterStage/exitStage.
 *
 * @param input Objeto con la configuración de la animación.
 * @returns Cadena con clases compuestas (ej. 'animate__animated animate__fadeIn').
 */""",
    "visualOutlineBase": """/**
 * Resuelve y mapea las variables CSS para el Outline de accesibilidad o enfoque.
 *
 * @param prefix Prefijo base del componente.
 * @param input Objeto con la configuración de outline.
 * @returns Cadena de texto con las variables CSS de outline.
 */""",
    "visualRippleColorBase": """/**
 * Resuelve matemáticamente el color base ideal para el efecto Ripple, asegurando
 * siempre un contraste óptimo (WCAG) sobre el fondo de la variante elegida.
 *
 * @param input Variante actual.
 * @returns El color calculado para la expansión del Ripple.
 */"""
}

# Regex replacement function
def replace_func(m):
    fn_name = m.group(1)
    if fn_name in jsdocs:
        # Prepend the jsdoc to the export const declaration
        return f"{jsdocs[fn_name]}\nexport const {fn_name} ="
    return m.group(0)

# Replace exported const functions
content = re.sub(r'export const (\w+) =', replace_func, content)

# Special case for non-exported addStateToDeclarations
content = re.sub(r'const addStateToDeclarations =', f"{jsdocs['addStateToDeclarations']}\nconst addStateToDeclarations =", content)

with open("c:/Users/alfon/wp/alfcomponents/base/base-visual.ts", "w", encoding="utf-8") as f:
    f.write(content)
print("JSDocs injected successfully.")
