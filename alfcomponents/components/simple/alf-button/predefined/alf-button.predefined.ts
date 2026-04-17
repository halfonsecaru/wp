import { AlfButtonInterface } from '../interfaces/alf-button.interface';
import { DefaultButtonKeys } from '../enums/defaultButtonKeys.interface';
import { AlfBorderStyleEnum, AlfButtonVisualTypeEnum, AlfColorEnum, AlfFontFamilyEnum, AlfFontWeightEnum, AlfIconsUnicodeIconEnum, AlfPxEnum, AlfRadiusEnum, AlfShadowEnum } from '@alfcomponents/enums';


/**
 * Interface para la Identidad Pura de un botón.
 * Define solo el "ADN" cromático y conceptual.
 */
interface AlfButtonIdentity {
    label: string;
    brandColor: AlfColorEnum;
    brandColorHover: AlfColorEnum;
    rippleColor: AlfColorEnum;
    textColor?: AlfColorEnum; // Opcional, por si algún botón rompe la regla (ej. Warning)
    iconLeft?: AlfIconsUnicodeIconEnum;
}

/**
 * 1. MAPA DE IDENTIDADES (El ADN de la librería)
 * Aquí solo definimos qué colores definen a cada botón.
 */
const BUTTON_IDENTITIES: Record<string, AlfButtonIdentity> = {
    [DefaultButtonKeys.Accept]: {
        label: DefaultButtonKeys.Accept,
        brandColor: AlfColorEnum.Primary,
        brandColorHover: AlfColorEnum.PrimaryHover,
        rippleColor: AlfColorEnum.Blue900,
        iconLeft: AlfIconsUnicodeIconEnum.Check
    },
    [DefaultButtonKeys.Cancel]: {
        label: DefaultButtonKeys.Cancel,
        brandColor: AlfColorEnum.Secondary,
        brandColorHover: AlfColorEnum.SecondaryHover,
        rippleColor: AlfColorEnum.Gray800,
        iconLeft: AlfIconsUnicodeIconEnum.Cross
    },
    [DefaultButtonKeys.Danger]: {
        label: DefaultButtonKeys.Danger,
        brandColor: AlfColorEnum.Danger,
        brandColorHover: AlfColorEnum.DangerHover,
        rippleColor: AlfColorEnum.Red900,
        iconLeft: AlfIconsUnicodeIconEnum.Delete
    },
    [DefaultButtonKeys.Warning]: {
        label: DefaultButtonKeys.Warning,
        brandColor: AlfColorEnum.Warning,
        brandColorHover: AlfColorEnum.WarningHover,
        rippleColor: AlfColorEnum.Yellow800,
        textColor: AlfColorEnum.Black, // El warning suele necesitar texto negro incluso en sólido
        iconLeft: AlfIconsUnicodeIconEnum.Bell
    },
    [DefaultButtonKeys.Info]: {
        label: DefaultButtonKeys.Info,
        brandColor: AlfColorEnum.Info,
        brandColorHover: AlfColorEnum.InfoHover,
        rippleColor: AlfColorEnum.Cyan900,
        textColor: AlfColorEnum.Black,
        iconLeft: AlfIconsUnicodeIconEnum.Info
    },
    [DefaultButtonKeys.Light]: {
        label: DefaultButtonKeys.Light,
        brandColor: AlfColorEnum.Gray300,
        brandColorHover: AlfColorEnum.Gray400,
        rippleColor: AlfColorEnum.Gray600,
        textColor: AlfColorEnum.Black,
        iconLeft: AlfIconsUnicodeIconEnum.Sun
    },
    [DefaultButtonKeys.Back]: {
        label: DefaultButtonKeys.Back,
        brandColor: AlfColorEnum.Gray800,
        brandColorHover: AlfColorEnum.Gray900,
        rippleColor: AlfColorEnum.Gray900,
        textColor: AlfColorEnum.White,
        iconLeft: AlfIconsUnicodeIconEnum.ArrowLeft
    },
    [DefaultButtonKeys.Example]: {
        label: DefaultButtonKeys.Example,
        brandColor: AlfColorEnum.Success,
        brandColorHover: AlfColorEnum.SuccessHover,
        rippleColor: AlfColorEnum.Green900,
        iconLeft: AlfIconsUnicodeIconEnum.Sparkles
    },
    // --- FrikiButtons Identidades ---
    [DefaultButtonKeys.Cyber]: {
        label: 'Cyberpunk',
        brandColor: AlfColorEnum.Yellow400,
        brandColorHover: AlfColorEnum.Yellow500,
        rippleColor: AlfColorEnum.Orange600,
        textColor: AlfColorEnum.Black,
        iconLeft: AlfIconsUnicodeIconEnum.Zap
    },
    [DefaultButtonKeys.Matrix]: {
        label: 'Matrix',
        brandColor: AlfColorEnum.Black,
        brandColorHover: AlfColorEnum.Gray950,
        rippleColor: AlfColorEnum.Green600,
        textColor: AlfColorEnum.Green400,
        iconLeft: AlfIconsUnicodeIconEnum.Laptop
    },
    [DefaultButtonKeys.Jedi]: {
        label: 'Jedi Order',
        brandColor: AlfColorEnum.Blue400,
        brandColorHover: AlfColorEnum.Blue500,
        rippleColor: AlfColorEnum.Blue300,
        textColor: AlfColorEnum.White,
        iconLeft: AlfIconsUnicodeIconEnum.Sparkles
    },
    [DefaultButtonKeys.Sith]: {
        label: 'Sith Empire',
        brandColor: AlfColorEnum.Black,
        brandColorHover: AlfColorEnum.Red950,
        rippleColor: AlfColorEnum.Red600,
        textColor: AlfColorEnum.Red500,
        iconLeft: AlfIconsUnicodeIconEnum.Skull
    },
    [DefaultButtonKeys.Fire]: {
        label: 'Fire Element',
        brandColor: AlfColorEnum.Orange500,
        brandColorHover: AlfColorEnum.Red600,
        rippleColor: AlfColorEnum.Orange900,
        iconLeft: AlfIconsUnicodeIconEnum.Collision
    },
    [DefaultButtonKeys.Frost]: {
        label: 'Frost Element',
        brandColor: AlfColorEnum.Cyan400,
        brandColorHover: AlfColorEnum.Blue500,
        rippleColor: AlfColorEnum.Blue200,
        textColor: AlfColorEnum.Black,
        iconLeft: AlfIconsUnicodeIconEnum.Snowflake
    },
    [DefaultButtonKeys.Lava]: {
        label: 'Lava Flow',
        brandColor: AlfColorEnum.Gray900,
        brandColorHover: AlfColorEnum.Black,
        rippleColor: AlfColorEnum.Orange600,
        textColor: AlfColorEnum.Orange500,
        iconLeft: AlfIconsUnicodeIconEnum.Volcano
    },
    [DefaultButtonKeys.Zen]: {
        label: 'Zen Spirit',
        brandColor: AlfColorEnum.Gray100,
        brandColorHover: AlfColorEnum.White,
        rippleColor: AlfColorEnum.Green200,
        textColor: AlfColorEnum.Gray600,
        iconLeft: AlfIconsUnicodeIconEnum.FallenLeaf
    }
};

/**
 * 2. CONSTRUCTOR MAESTRO
 * Transforma una Identidad Pura en una Interfaz Completa basada en el Tipo Visual y Tema.
 */
export function getAlfPredefinedButton(
    key: string,
    visualType: AlfButtonVisualTypeEnum = AlfButtonVisualTypeEnum.Solid,
    hideIcon: boolean = false
): AlfButtonInterface {

    const identity = BUTTON_IDENTITIES[key] ?? BUTTON_IDENTITIES[DefaultButtonKeys.Light];

    const { brandColor, brandColorHover, rippleColor, label, textColor, iconLeft } = identity;

    const finalIcon = hideIcon ? undefined : iconLeft;
    const calculatedPaddingLeft = finalIcon ? AlfPxEnum.Px12 : AlfPxEnum.Px20;

    // Estilos Base Comunes
    const config: AlfButtonInterface = {
        label,
        iconLeft: finalIcon,
        padding: {
            default: {
                paddingLeft: calculatedPaddingLeft,
                paddingRight: AlfPxEnum.Px20,
                paddingTop: AlfPxEnum.Px8,
                paddingBottom: AlfPxEnum.Px8
            }
        },
        border: {
            default: { borderRadius: AlfRadiusEnum.Base }
        },
        typography: {
            default: { fontWeight: AlfFontWeightEnum.SemiBold }
        },
        shadows: {
            default: { boxShadow: AlfShadowEnum.None },
            hover: { boxShadow: AlfShadowEnum.Sm }
        }
    };

    let result: AlfButtonInterface;

    switch (visualType) {

        case AlfButtonVisualTypeEnum.Text:
            result = {
                ...config,
                backgrounds: {
                    default: { backgroundColor: AlfColorEnum.Transparent },
                    hover: { backgroundColor: AlfColorEnum.Transparent }
                },
                typography: {
                    default: { ...config.typography?.default, color: brandColor },
                    hover: { ...config.typography?.default, color: brandColorHover }
                },
                border: {
                    default: { ...config.border?.default, borderColor: AlfColorEnum.Transparent, borderWidth: AlfPxEnum.None }
                },
                shadows: {
                    default: { boxShadow: AlfShadowEnum.None },
                    hover: { boxShadow: AlfShadowEnum.None }
                },
                ripple: { enabled: true, color: rippleColor }
            };
            break;

        case AlfButtonVisualTypeEnum.Outlined:
            result = {
                ...config,
                backgrounds: {
                    default: { backgroundColor: `color-mix(in srgb, ${brandColor} 10%, transparent)` as AlfColorEnum },
                    hover: { backgroundColor: `color-mix(in srgb, ${brandColor} 80%, transparent)` as AlfColorEnum }
                },
                typography: {
                    default: { ...config.typography?.default, color: brandColor },
                    hover: { ...config.typography?.default, color: textColor || AlfColorEnum.White }
                },
                border: {
                    default: { ...config.border?.default, borderColor: brandColor, borderStyle: AlfBorderStyleEnum.Solid, borderWidth: AlfPxEnum.Px1 }
                },
                shadows: {
                    default: { boxShadow: AlfShadowEnum.None },
                    hover: { boxShadow: AlfShadowEnum.Sm }
                },
                ripple: { enabled: true, color: rippleColor }
            };
            break;

        case AlfButtonVisualTypeEnum.Ghost:
            result = {
                ...config,
                backgrounds: {
                    default: { backgroundColor: AlfColorEnum.Transparent },
                    hover: { backgroundColor: `color-mix(in srgb, ${brandColor} 10%, transparent)` as AlfColorEnum }
                },
                typography: {
                    default: { ...config.typography?.default, color: brandColor }
                },
                border: {
                    default: { ...config.border?.default, borderColor: AlfColorEnum.Transparent, borderWidth: AlfPxEnum.None }
                },
                shadows: {
                    default: { boxShadow: AlfShadowEnum.None },
                    hover: { boxShadow: AlfShadowEnum.None }
                },
                ripple: { enabled: true, color: rippleColor }
            };
            break;

        case AlfButtonVisualTypeEnum.Crystal:
            result = {
                ...config,
                backgrounds: {
                    default: { backgroundColor: `color-mix(in srgb, ${brandColor} 5%, transparent)` as AlfColorEnum },
                    hover: { backgroundColor: `color-mix(in srgb, ${brandColor} 15%, transparent)` as AlfColorEnum }
                },
                typography: {
                    default: { ...config.typography?.default, color: brandColor }
                },
                border: {
                    default: { ...config.border?.default, borderColor: `color-mix(in srgb, ${brandColor} 20%, transparent)` as AlfColorEnum, borderStyle: AlfBorderStyleEnum.Solid, borderWidth: AlfPxEnum.Px1 }
                },
                shadows: {
                    default: { boxShadow: AlfShadowEnum.Sm },
                    hover: { boxShadow: AlfShadowEnum.Md }
                },
                ripple: { enabled: true, color: rippleColor },
                customStyle: {
                    'backdrop-filter': 'blur(8px)',
                    '-webkit-backdrop-filter': 'blur(8px)'
                }
            };
            break;

        case AlfButtonVisualTypeEnum.Soft:
            result = {
                ...config,
                backgrounds: {
                    default: { backgroundColor: `color-mix(in srgb, ${brandColor} 15%, transparent)` as AlfColorEnum },
                    hover: { backgroundColor: `color-mix(in srgb, ${brandColor} 25%, transparent)` as AlfColorEnum }
                },
                typography: {
                    default: { ...config.typography?.default, color: brandColor }
                },
                border: {
                    default: { ...config.border?.default, borderColor: AlfColorEnum.Transparent, borderWidth: AlfPxEnum.None }
                },
                shadows: {
                    default: { boxShadow: AlfShadowEnum.None },
                    hover: { boxShadow: AlfShadowEnum.None }
                },
                ripple: { enabled: true, color: rippleColor }
            };
            break;

        case AlfButtonVisualTypeEnum.ThreeD:
            result = {
                ...config,
                backgrounds: {
                    default: { backgroundColor: brandColor },
                    hover: { backgroundColor: brandColorHover }
                },
                typography: {
                    default: {
                        ...config.typography?.default,
                        color: textColor || AlfColorEnum.White,
                        fontWeight: AlfFontWeightEnum.Bold,
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)' as any
                    }
                },
                border: {
                    default: {
                        ...config.border?.default,
                        borderColor: `color-mix(in srgb, ${brandColor}, black 20%)` as AlfColorEnum,
                        borderWidth: AlfPxEnum.Px1,
                        borderBottomWidth: AlfPxEnum.None, // Quitar el borde de abajo para que no sume al shadow
                        borderStyle: AlfBorderStyleEnum.Solid,
                        borderRadius: AlfRadiusEnum.Md
                    }
                },
                shadows: {
                    default: {
                        boxShadow: `0 4px 0 color-mix(in srgb, ${brandColor} 80%, black), inset 0 1px 1px rgba(255,255,255,0.5), 0 8px 15px -3px rgba(0,0,0,0.3)` as any
                    },
                    hover: {
                        boxShadow: `0 4px 0 color-mix(in srgb, ${brandColor} 80%, black), inset 0 1px 1px rgba(255,255,255,0.5), 0 8px 15px -3px rgba(0,0,0,0.3)` as any
                    },
                },
                transform: {
                    default: { translateY: AlfPxEnum.None, scale: 1 },
                    hover: { translateY: AlfPxEnum.None, scale: 1 },
                },
                ripple: { enabled: true, color: rippleColor },
                customStyle: {
                    'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    
                }
            };
            break;

        case AlfButtonVisualTypeEnum.Glossy:
            result = {
                ...config,
                backgrounds: {
                    default: {
                        backgroundColor: brandColor,
                        customCssStyle: [{ 'background-image': `linear-gradient(180deg, ${brandColor} 0%, color-mix(in srgb, ${brandColor}, black 10%) 100%)` }]
                    },
                    hover: {
                        backgroundColor: brandColorHover,
                        customCssStyle: [{ 'background-image': `linear-gradient(180deg, color-mix(in srgb, ${brandColor}, white 5%) 0%, color-mix(in srgb, ${brandColor}, black 5%) 100%)` }]
                    }
                },
                padding: {
                    default: {
                        paddingTop: AlfPxEnum.Px14,
                        paddingBottom: AlfPxEnum.Px14,
                        paddingLeft: AlfPxEnum.Px32,
                        paddingRight: AlfPxEnum.Px32
                    }
                },
                typography: {
                    default: { ...config.typography?.default, color: textColor || AlfColorEnum.White, fontWeight: AlfFontWeightEnum.Bold }
                },
                border: {
                    default: {
                        ...config.border?.default,
                        borderColor: `color-mix(in srgb, ${brandColor}, black 20%)` as AlfColorEnum,
                        borderWidth: AlfPxEnum.Px1,
                        borderStyle: AlfBorderStyleEnum.Solid
                    }
                },
                shadows: {
                    default: { boxShadow: AlfShadowEnum.Sm },
                    hover: { boxShadow: `0 4px 12px color-mix(in srgb, ${brandColor}, transparent 70%)` as any }
                },
                ripple: { enabled: true, color: rippleColor },
                customStyle: {
                    'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }
            };
            break;

        case AlfButtonVisualTypeEnum.Gradient:
            result = {
                ...config,
                backgrounds: {
                    default: {
                        backgroundColor: brandColor,
                        customCssStyle: [{ 'background-image': `linear-gradient(135deg, ${brandColor} 0%, color-mix(in srgb, ${brandColor}, black 20%) 100%)` }]
                    },
                    hover: {
                        backgroundColor: brandColorHover,
                        customCssStyle: [{ 'background-image': `linear-gradient(135deg, color-mix(in srgb, ${brandColor}, white 10%) 0%, ${brandColor} 100%)` }]
                    }
                },
                typography: {
                    default: { ...config.typography?.default, color: textColor || AlfColorEnum.White, fontWeight: AlfFontWeightEnum.Bold }
                },
                border: {
                    default: { ...config.border?.default, borderWidth: AlfPxEnum.None }
                },
                shadows: {
                    default: { boxShadow: `0 4px 15px color-mix(in srgb, ${brandColor}, transparent 60%)` as any },
                    hover: { boxShadow: `0 6px 20px color-mix(in srgb, ${brandColor}, transparent 40%)` as any }
                },
                ripple: { enabled: true, color: rippleColor }
            };
            break;

        case AlfButtonVisualTypeEnum.Raised:
            result = {
                ...config,
                backgrounds: {
                    default: { backgroundColor: brandColor },
                    hover: { backgroundColor: brandColorHover }
                },
                typography: {
                    default: { ...config.typography?.default, color: textColor || AlfColorEnum.White }
                },
                border: {
                    default: { ...config.border?.default, borderRadius: AlfRadiusEnum.Base, borderWidth: AlfPxEnum.None }
                },
                shadows: {
                    default: { boxShadow: AlfShadowEnum.Md },
                    hover: { boxShadow: AlfShadowEnum.Md }
                },
                ripple: { enabled: true, color: rippleColor }
            };
            break;

        case AlfButtonVisualTypeEnum.Solid:
        default:
            result = {
                ...config,
                backgrounds: {
                    default: { backgroundColor: brandColor },
                    hover: { backgroundColor: brandColorHover }
                },
                typography: {
                    default: { ...config.typography?.default, color: textColor || AlfColorEnum.White }
                },
                ripple: { enabled: true, color: rippleColor }
            };
            break;
    }

    // --- Especial Overrides for FrikiButtons (Geek Mode) ---
    const finalConfig = { ...result! };

    if (key === DefaultButtonKeys.Cyber) {
        finalConfig.shadows = {
            default: { boxShadow: `0 0 10px ${brandColor}, 0 0 20px color-mix(in srgb, ${brandColor}, transparent 50%)` as any },
            hover: { boxShadow: `0 0 15px ${brandColor}, 0 0 30px color-mix(in srgb, ${brandColor}, transparent 30%)` as any }
        };
        finalConfig.border = { default: { ...finalConfig.border?.default, borderRadius: AlfRadiusEnum.None } };
    }

    if (key === DefaultButtonKeys.Matrix) {
        finalConfig.shadows = {
            default: { boxShadow: `0 0 5px color-mix(in srgb, ${textColor}, transparent 50%)` as any },
            hover: { boxShadow: `0 0 15px ${textColor}` as any }
        };
        finalConfig.typography = { ...finalConfig.typography, default: { ...finalConfig.typography?.default, fontFamily: AlfFontFamilyEnum.Monospace } };
    }

    if (key === DefaultButtonKeys.Jedi) {
        finalConfig.shadows = {
            default: { boxShadow: `0 0 10px color-mix(in srgb, ${brandColor}, transparent 30%)` as any },
            hover: { boxShadow: `0 0 20px ${brandColor}, 0 0 40px color-mix(in srgb, ${brandColor}, transparent 50%)` as any }
        };
    }

    if (key === DefaultButtonKeys.Sith) {
        finalConfig.shadows = {
            default: { boxShadow: `0 0 5px color-mix(in srgb, ${textColor}, transparent 30%)` as any },
            hover: { boxShadow: `0 0 15px ${textColor}, 0 0 30px color-mix(in srgb, ${brandColor}, transparent 50%)` as any }
        };
    }

    if (key === DefaultButtonKeys.Zen) {
        finalConfig.border = { default: { ...finalConfig.border?.default, borderRadius: AlfRadiusEnum.Xl3 } };
        finalConfig.typography = { ...finalConfig.typography, default: { ...finalConfig.typography?.default, fontWeight: AlfFontWeightEnum.Light, letterSpacing: '0.1em' as any } };
    }

    return finalConfig;
}

