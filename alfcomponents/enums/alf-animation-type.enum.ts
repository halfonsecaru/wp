/**
 * Enum maestro de animaciones (Basado en Animate.css)
 * Define efectos de entrada, salida y llamadas de atención.
 * 
 * @example
 * ```typescript
 * // En un componente Angular
 * animation: AlfAnimationTypeEnum.FadeInDown // Efecto de entrada desde arriba
 * ```
 */
export enum AlfAnimationTypeEnum {
  // Fade animations
  FadeIn = 'animate__animated animate__fadeIn',
  FadeInDown = 'animate__animated animate__fadeInDown',
  FadeInDownBig = 'animate__animated animate__fadeInDownBig',
  FadeInLeft = 'animate__animated animate__fadeInLeft',
  FadeInLeftBig = 'animate__animated animate__fadeInLeftBig',
  FadeInRight = 'animate__animated animate__fadeInRight',
  FadeInRightBig = 'animate__animated animate__fadeInRightBig',
  FadeInUp = 'animate__animated animate__fadeInUp',
  FadeInUpBig = 'animate__animated animate__fadeInUpBig',
  FadeOut = 'animate__animated animate__fadeOut',
  FadeOutDown = 'animate__animated animate__fadeOutDown',
  FadeOutDownBig = 'animate__animated animate__fadeOutDownBig',
  FadeOutLeft = 'animate__animated animate__fadeOutLeft',
  FadeOutLeftBig = 'animate__animated animate__fadeOutLeftBig',
  FadeOutRight = 'animate__animated animate__fadeOutRight',
  FadeOutRightBig = 'animate__animated animate__fadeOutRightBig',
  FadeOutUp = 'animate__animated animate__fadeOutUp',
  FadeOutUpBig = 'animate__animated animate__fadeOutUpBig',

  // Bounce animations
  Bounce = 'animate__animated animate__bounce',
  BounceIn = 'animate__animated animate__bounceIn',
  BounceInDown = 'animate__animated animate__bounceInDown',
  BounceInLeft = 'animate__animated animate__bounceInLeft',
  BounceInRight = 'animate__animated animate__bounceInRight',
  BounceInUp = 'animate__animated animate__bounceInUp',
  BounceOut = 'animate__animated animate__bounceOut',
  BounceOutDown = 'animate__animated animate__bounceOutDown',
  BounceOutLeft = 'animate__animated animate__bounceOutLeft',
  BounceOutRight = 'animate__animated animate__bounceOutRight',
  BounceOutUp = 'animate__animated animate__bounceOutUp',

  // Flip animations
  Flip = 'animate__animated animate__flip',
  FlipInX = 'animate__animated animate__flipInX',
  FlipInY = 'animate__animated animate__flipInY',
  FlipOutX = 'animate__animated animate__flipOutX',
  FlipOutY = 'animate__animated animate__flipOutY',

  // Rotate animations
  RotateIn = 'animate__animated animate__rotateIn',
  RotateInDownLeft = 'animate__animated animate__rotateInDownLeft',
  RotateInDownRight = 'animate__animated animate__rotateInDownRight',
  RotateInUpLeft = 'animate__animated animate__rotateInUpLeft',
  RotateInUpRight = 'animate__animated animate__rotateInUpRight',
  RotateOut = 'animate__animated animate__rotateOut',
  RotateOutDownLeft = 'animate__animated animate__rotateOutDownLeft',
  RotateOutDownRight = 'animate__animated animate__rotateOutDownRight',
  RotateOutUpLeft = 'animate__animated animate__rotateOutUpLeft',
  RotateOutUpRight = 'animate__animated animate__rotateOutUpRight',

  // Slide animations
  SlideInDown = 'animate__animated animate__slideInDown',
  SlideInLeft = 'animate__animated animate__slideInLeft',
  SlideInRight = 'animate__animated animate__slideInRight',
  SlideInUp = 'animate__animated animate__slideInUp',
  SlideOutDown = 'animate__animated animate__slideOutDown',
  SlideOutLeft = 'animate__animated animate__slideOutLeft',
  SlideOutRight = 'animate__animated animate__slideOutRight',
  SlideOutUp = 'animate__animated animate__slideOutUp',

  // Zoom animations
  ZoomIn = 'animate__animated animate__zoomIn',
  ZoomInDown = 'animate__animated animate__zoomInDown',
  ZoomInLeft = 'animate__animated animate__zoomInLeft',
  ZoomInRight = 'animate__animated animate__zoomInRight',
  ZoomInUp = 'animate__animated animate__zoomInUp',
  ZoomOut = 'animate__animated animate__zoomOut',
  ZoomOutDown = 'animate__animated animate__zoomOutDown',
  ZoomOutLeft = 'animate__animated animate__zoomOutLeft',
  ZoomOutRight = 'animate__animated animate__zoomOutRight',
  ZoomOutUp = 'animate__animated animate__zoomOutUp',

  // Specials
  Hinge = 'animate__animated animate__hinge',
  JackInTheBox = 'animate__animated animate__jackInTheBox',
  RollIn = 'animate__animated animate__rollIn',
  RollOut = 'animate__animated animate__rollOut',

  // Attention Seekers
  Pulse = 'animate__animated animate__pulse',
  RubberBand = 'animate__animated animate__rubberBand',
  ShakeX = 'animate__animated animate__shakeX',
  ShakeY = 'animate__animated animate__shakeY',
  HeadShake = 'animate__animated animate__headShake',
  Swing = 'animate__animated animate__swing',
  Tada = 'animate__animated animate__tada',
  Wobble = 'animate__animated animate__wobble',
  Jello = 'animate__animated animate__jello',
  HeartBeat = 'animate__animated animate__heartBeat',

  // =================================================================
  // CUSTOM ANIMATIONS (Alf Components Library)
  // Prefixed with 'alf-anim' to avoid conflicts
  // =================================================================

  // Text Effects
  TextGlow = 'alf-anim-textGlow',
  TextBlur = 'alf-anim-textBlur',
  TextFocus = 'alf-anim-textFocus',

  // Border/Outline Effects
  OutlineGrow = 'alf-anim-outlineGrow',
  OutlineGlitch = 'alf-anim-outlineGlitch',

  // Background Effects
  BackgroundFade = 'alf-anim-backgroundFade',
  BackgroundSlide = 'alf-anim-backgroundSlide',
  BackgroundPulse = 'alf-anim-backgroundPulse',

  // Special Effects
  Glow = 'alf-anim-glow',
  GlowPulse = 'alf-anim-glowPulse',
  Ripple = 'alf-anim-ripple',
  RippleOut = 'alf-anim-rippleOut',
  BlurIn = 'alf-anim-blurIn',
  BlurOut = 'alf-anim-blurOut',
  GradientShift = 'alf-anim-gradientShift',
  GradientRotate = 'alf-anim-gradientRotate',

  // Generic Utilities (mapped to custom implementations if needed)
  Spin = 'alf-anim-spin',
  SpinSlow = 'alf-anim-spinSlow',
  SpinFast = 'alf-anim-spinFast',
  Ping = 'alf-anim-ping',

  // None
  None = 'none'
}
