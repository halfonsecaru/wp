/**
 * Enum de colores (Omni-Reactive System - FULL PALETTE)
 * Restauración total de todos los niveles cromáticos originales vinculados al sistema de tokens.
 */
export enum AlfColorEnum {
  // ===== GHOST MODALITY =====

  // ------------------------------------------------
  // PRIMARY
  // ------------------------------------------------
  PrimaryGhost = 'var(--alf-primary-ghost, rgba(13, 110, 253, 0.20))',
  PrimaryGhostFocus = 'var(--alf-primary-ghost-focus, #4085ef26)',
  PrimaryGhostDisabled = 'var(--alf-primary-ghost-disabled, #c6d8f5)',
  PrimaryGhostActive = 'var(--alf-primary-ghost-active, #2d6fd426)',
  PrimaryGhostHover = 'var(--alf-primary-ghost-hover, rgba(146, 181, 234, 0.3))',

  PrimaryGhostBG = 'var(--alf-primary-ghost, rgba(13, 110, 253, 0.20))',
  PrimaryGhostFocusBG = 'var(--alf-primary-ghost-focus, #4085ef26)',
  PrimaryGhostDisabledBG = 'var(--alf-primary-ghost-disabled, #c6d8f5)',
  PrimaryGhostActiveBG = 'var(--alf-primary-ghost-active, #2d6fd426)',
  PrimaryGhostHoverBG = 'var(--alf-primary-ghost-hover, rgba(146, 181, 234, 0.3))',

  PrimaryGhostText = 'var(--alf-primary-ghost-text, rgba(13, 110, 253, 0.60))',
  PrimaryGhostTextFocus = 'var(--alf-primary-ghost-text-focus, #4085efff)',
  PrimaryGhostTextDisabled = 'var(--alf-primary-ghost-text-disabled, #c6d8f5)',
  PrimaryGhostTextActive = 'var(--alf-primary-ghost-text-active, #2d6fd4ff)',
  PrimaryGhostTextHover = 'var(--alf-primary-ghost-text-hover, #4085efff)',


  PrimaryGhostBorder = 'var(--alf-primary-ghost-border, rgba(13, 110, 253, 0.20))',
  PrimaryGhostBorderHover = 'var(--alf-primary-ghost-border-hover, rgba(13, 110, 253, 0.30))',
  PrimaryGhostBorderFocus = 'var(--alf-primary-ghost-border-focus, #4085ef26)',
  PrimaryGhostBorderDisabled = 'var(--alf-primary-ghost-border-disabled, #c6d8f5)',
  PrimaryGhostBorderActive = 'var(--alf-primary-ghost-border-active, #2d6fd426)',

  // ------------------------------------------------
  // SECONDARY
  // ------------------------------------------------
  SecondaryGhost = 'var(--alf-secondary-ghost, rgba(108, 117, 125, 0.20))',
  SecondaryGhostFocus = 'var(--alf-secondary-ghost-focus, #75879726)',
  SecondaryGhostDisabled = 'var(--alf-secondary-ghost-disabled, #d5d8da)',
  SecondaryGhostActive = 'var(--alf-secondary-ghost-active, #5d6e7e26)',
  SecondaryGhostHover = 'var(--alf-secondary-ghost-hover, rgba(108, 117, 125, 0.30))',

  SecondaryGhostBG = 'var(--alf-secondary-ghost, rgba(108, 117, 125, 0.20))',
  SecondaryGhostFocusBG = 'var(--alf-secondary-ghost-focus, #75879726)',
  SecondaryGhostDisabledBG = 'var(--alf-secondary-ghost-disabled, #d5d8da)',
  SecondaryGhostActiveBG = 'var(--alf-secondary-ghost-active, #5d6e7e26)',
  SecondaryGhostHoverBG = 'var(--alf-secondary-ghost-hover, rgba(108, 117, 125, 0.30))',

  SecondaryGhostText = 'var(--alf-secondary-ghost-text, rgba(108, 117, 125, 0.60))',
  SecondaryGhostTextFocus = 'var(--alf-secondary-ghost-text-focus, #758797ff)',
  SecondaryGhostTextDisabled = 'var(--alf-secondary-ghost-text-disabled, #d5d8da)',
  SecondaryGhostTextActive = 'var(--alf-secondary-ghost-text-active, #5d6e7eff)',
  SecondaryGhostTextHover = 'var(--alf-secondary-ghost-text-hover, #758797ff)',

  SecondaryGhostBorder = 'var(--alf-secondary-ghost-border, rgba(108, 117, 125, 0.20))',
  SecondaryGhostBorderHover = 'var(--alf-secondary-ghost-border-hover, rgba(108, 117, 125, 0.30))',
  SecondaryGhostBorderFocus = 'var(--alf-secondary-ghost-border-focus, #75879726)',
  SecondaryGhostBorderDisabled = 'var(--alf-secondary-ghost-border-disabled, #d5d8da)',
  SecondaryGhostBorderActive = 'var(--alf-secondary-ghost-border-active, #5d6e7e26)',

  // ------------------------------------------------
  // SUCCESS
  // ------------------------------------------------
  SuccessGhost = 'var(--alf-success-ghost, rgba(25, 135, 84, 0.20))',
  SuccessGhostFocus = 'var(--alf-success-ghost-focus, #57a88226)',
  SuccessGhostDisabled = 'var(--alf-success-ghost-disabled, #cae3d6)',
  SuccessGhostActive = 'var(--alf-success-ghost-active, #43926c26)',
  SuccessGhostHover = 'var(--alf-success-ghost-hover, rgba(25, 135, 84, 0.30))',

  SuccessGhostBG = 'var(--alf-success-ghost, rgba(25, 135, 84, 0.20))',
  SuccessGhostFocusBG = 'var(--alf-success-ghost-focus, #57a88226)',
  SuccessGhostDisabledBG = 'var(--alf-success-ghost-disabled, #cae3d6)',
  SuccessGhostActiveBG = 'var(--alf-success-ghost-active, #43926c26)',
  SuccessGhostHoverBG = 'var(--alf-success-ghost-hover, rgba(25, 135, 84, 0.30))',

  SuccessGhostText = 'var(--alf-success-ghost-text, rgba(25, 135, 84, 0.60))',
  SuccessGhostTextFocus = 'var(--alf-success-ghost-text-focus, #57a882ff)',
  SuccessGhostTextDisabled = 'var(--alf-success-ghost-text-disabled, #cae3d6)',
  SuccessGhostTextActive = 'var(--alf-success-ghost-text-active, #43926cff)',
  SuccessGhostTextHover = 'var(--alf-success-ghost-text-hover, #57a882ff)',

  SuccessGhostBorder = 'var(--alf-success-ghost-border, rgba(25, 135, 84, 0.20))',
  SuccessGhostBorderHover = 'var(--alf-success-ghost-border-hover, rgba(25, 135, 84, 0.30))',
  SuccessGhostBorderFocus = 'var(--alf-success-ghost-border-focus, #57a88226)',
  SuccessGhostBorderDisabled = 'var(--alf-success-ghost-border-disabled, #cae3d6)',
  SuccessGhostBorderActive = 'var(--alf-success-ghost-border-active, #43926c26)',

  // ------------------------------------------------
  // DANGER
  // ------------------------------------------------
  DangerGhost = 'var(--alf-danger-ghost, rgba(220, 53, 69, 0.20))',
  DangerGhostFocus = 'var(--alf-danger-ghost-focus, #e2586726)',
  DangerGhostDisabled = 'var(--alf-danger-ghost-disabled, #f5ced2)',
  DangerGhostActive = 'var(--alf-danger-ghost-active, #cb3f4e26)',
  DangerGhostHover = 'var(--alf-danger-ghost-hover, rgba(220, 53, 69, 0.30))',

  DangerGhostBG = 'var(--alf-danger-ghost, rgba(220, 53, 69, 0.20))',
  DangerGhostFocusBG = 'var(--alf-danger-ghost-focus, #e2586726)',
  DangerGhostDisabledBG = 'var(--alf-danger-ghost-disabled, #f5ced2)',
  DangerGhostActiveBG = 'var(--alf-danger-ghost-active, #cb3f4e26)',
  DangerGhostHoverBG = 'var(--alf-danger-ghost-hover, rgba(220, 53, 69, 0.30))',

  DangerGhostText = 'var(--alf-danger-ghost-text, rgba(220, 53, 69, 0.60))',
  DangerGhostTextFocus = 'var(--alf-danger-ghost-text-focus, #e25867ff)',
  DangerGhostTextDisabled = 'var(--alf-danger-ghost-text-disabled, #f5ced2)',
  DangerGhostTextActive = 'var(--alf-danger-ghost-text-active, #cb3f4eff)',
  DangerGhostTextHover = 'var(--alf-danger-ghost-text-hover, #e25867ff)',

  DangerGhostBorder = 'var(--alf-danger-ghost-border, rgba(220, 53, 69, 0.20))',
  DangerGhostBorderHover = 'var(--alf-danger-ghost-border-hover, rgba(220, 53, 69, 0.30))',
  DangerGhostBorderFocus = 'var(--alf-danger-ghost-border-focus, #e2586726)',
  DangerGhostBorderDisabled = 'var(--alf-danger-ghost-border-disabled, #f5ced2)',
  DangerGhostBorderActive = 'var(--alf-danger-ghost-border-active, #cb3f4e26)',

  // ------------------------------------------------
  // WARNING
  // ------------------------------------------------
  WarningGhost = 'var(--alf-warning-ghost, rgba(255, 193, 7, 0.20))',
  WarningGhostFocus = 'var(--alf-warning-ghost-focus, #d99e1626)',
  WarningGhostDisabled = 'var(--alf-warning-ghost-disabled, #fcedba)',
  WarningGhostActive = 'var(--alf-warning-ghost-active, #b7820f26)',
  WarningGhostHover = 'var(--alf-warning-ghost-hover, rgba(255, 193, 7, 0.30))',

  WarningGhostBG = 'var(--alf-warning-ghost, rgba(255, 193, 7, 0.20))',
  WarningGhostFocusBG = 'var(--alf-warning-ghost-focus, #d99e1626)',
  WarningGhostDisabledBG = 'var(--alf-warning-ghost-disabled, #fcedba)',
  WarningGhostActiveBG = 'var(--alf-warning-ghost-active, #b7820f26)',
  WarningGhostHoverBG = 'var(--alf-warning-ghost-hover, rgba(255, 193, 7, 0.30))',

  WarningGhostText = 'var(--alf-warning-ghost-text, rgba(255, 193, 7, 0.60))',
  WarningGhostTextFocus = 'var(--alf-warning-ghost-text-focus, #d99e16ff)',
  WarningGhostTextDisabled = 'var(--alf-warning-ghost-text-disabled, #fcedba)',
  WarningGhostTextActive = 'var(--alf-warning-ghost-text-active, #b7820fff)',
  WarningGhostTextHover = 'var(--alf-warning-ghost-text-hover, #d99e16ff)',

  WarningGhostBorder = 'var(--alf-warning-ghost-border, rgba(255, 193, 7, 0.20))',
  WarningGhostBorderHover = 'var(--alf-warning-ghost-border-hover, rgba(255, 193, 7, 0.30))',
  WarningGhostBorderFocus = 'var(--alf-warning-ghost-border-focus, #d99e1626)',
  WarningGhostBorderDisabled = 'var(--alf-warning-ghost-border-disabled, #fcedba)',
  WarningGhostBorderActive = 'var(--alf-warning-ghost-border-active, #b7820f26)',

  // ------------------------------------------------
  // INFO
  // ------------------------------------------------
  InfoGhost = 'var(--alf-info-ghost, rgba(13, 202, 240, 0.20))',
  InfoGhostFocus = 'var(--alf-info-ghost-focus, #35acc726)',
  InfoGhostDisabled = 'var(--alf-info-ghost-disabled, #c3f2fa)',
  InfoGhostActive = 'var(--alf-info-ghost-active, #2293ad26)',
  InfoGhostHover = 'var(--alf-info-ghost-hover, rgba(13, 202, 240, 0.30))',

  InfoGhostBG = 'var(--alf-info-ghost, rgba(13, 202, 240, 0.20))',
  InfoGhostFocusBG = 'var(--alf-info-ghost-focus, #35acc726)',
  InfoGhostDisabledBG = 'var(--alf-info-ghost-disabled, #c3f2fa)',
  InfoGhostActiveBG = 'var(--alf-info-ghost-active, #2293ad26)',
  InfoGhostHoverBG = 'var(--alf-info-ghost-hover, rgba(13, 202, 240, 0.30))',

  InfoGhostText = 'var(--alf-info-ghost-text, rgba(13, 202, 240, 0.60))',
  InfoGhostTextFocus = 'var(--alf-info-ghost-text-focus, #35acc7ff)',
  InfoGhostTextDisabled = 'var(--alf-info-ghost-text-disabled, #c3f2fa)',
  InfoGhostTextActive = 'var(--alf-info-ghost-text-active, #2293adff)',
  InfoGhostTextHover = 'var(--alf-info-ghost-text-hover, #35acc7ff)',

  InfoGhostBorder = 'var(--alf-info-ghost-border, rgba(13, 202, 240, 0.20))',
  InfoGhostBorderHover = 'var(--alf-info-ghost-border-hover, rgba(13, 202, 240, 0.30))',
  InfoGhostBorderFocus = 'var(--alf-info-ghost-border-focus, #35acc726)',
  InfoGhostBorderDisabled = 'var(--alf-info-ghost-border-disabled, #c3f2fa)',
  InfoGhostBorderActive = 'var(--alf-info-ghost-border-active, #2293ad26)',

  // ------------------------------------------------
  // LIGHT
  // ------------------------------------------------
  LightGhost = 'var(--alf-light-ghost, rgba(206, 212, 218, 0.55))',
  LightGhostFocus = 'var(--alf-light-ghost-focus, #21252926)',
  LightGhostDisabled = 'var(--alf-light-ghost-disabled, #f4f5f6)',
  LightGhostActive = 'var(--alf-light-ghost-active, #21252926)',
  LightGhostHover = 'var(--alf-light-ghost-hover, rgba(206, 212, 218, 0.75))',

  LightGhostBG = 'var(--alf-light-ghost, rgba(206, 212, 218, 0.55))',
  LightGhostFocusBG = 'var(--alf-light-ghost-focus, #21252926)',
  LightGhostDisabledBG = 'var(--alf-light-ghost-disabled, #f4f5f6)',
  LightGhostActiveBG = 'var(--alf-light-ghost-active, #21252926)',
  LightGhostHoverBG = 'var(--alf-light-ghost-hover, rgba(206, 212, 218, 0.75))',

  LightGhostText = 'var(--alf-light-ghost-text, #6c757d)',
  LightGhostTextFocus = 'var(--alf-light-ghost-text-focus, #212529)',
  LightGhostTextDisabled = 'var(--alf-light-ghost-text-disabled, #f4f5f6)',
  LightGhostTextActive = 'var(--alf-light-ghost-text-active, #212529)',
  LightGhostTextHover = 'var(--alf-light-ghost-text-hover, #212529)',

  LightGhostBorder = 'var(--alf-light-ghost-border, rgba(206, 212, 218, 0.55))',
  LightGhostBorderHover = 'var(--alf-light-ghost-border-hover, rgba(206, 212, 218, 0.75))',
  LightGhostBorderFocus = 'var(--alf-light-ghost-border-focus, #21252926)',
  LightGhostBorderDisabled = 'var(--alf-light-ghost-border-disabled, #f4f5f6)',
  LightGhostBorderActive = 'var(--alf-light-ghost-border-active, #21252926)',

  // ------------------------------------------------
  // DARK
  // ------------------------------------------------
  DarkGhost = 'var(--alf-dark-ghost, rgba(33, 37, 41, 0.08))',
  DarkGhostFocus = 'var(--alf-dark-ghost-focus, #49505726)',
  DarkGhostDisabled = 'var(--alf-dark-ghost-disabled, #c0c2c4)',
  DarkGhostActive = 'var(--alf-dark-ghost-active, #343a4026)',
  DarkGhostHover = 'var(--alf-dark-ghost-hover, rgba(33, 37, 41, 0.12))',

  DarkGhostBG = 'var(--alf-dark-ghost, rgba(33, 37, 41, 0.08))',
  DarkGhostFocusBG = 'var(--alf-dark-ghost-focus, #49505726)',
  DarkGhostDisabledBG = 'var(--alf-dark-ghost-disabled, #c0c2c4)',
  DarkGhostActiveBG = 'var(--alf-dark-ghost-active, #343a4026)',
  DarkGhostHoverBG = 'var(--alf-dark-ghost-hover, rgba(33, 37, 41, 0.12))',

  DarkGhostText = 'var(--alf-dark-ghost-text, rgba(33, 37, 41, 0.60))',
  DarkGhostTextFocus = 'var(--alf-dark-ghost-text-focus, #495057)',
  DarkGhostTextDisabled = 'var(--alf-dark-ghost-text-disabled, #c0c2c4)',
  DarkGhostTextActive = 'var(--alf-dark-ghost-text-active, #343a40)',
  DarkGhostTextHover = 'var(--alf-dark-ghost-text-hover, #495057)',

  DarkGhostBorder = 'var(--alf-dark-ghost-border, rgba(33, 37, 41, 0.08))',
  DarkGhostBorderHover = 'var(--alf-dark-ghost-border-hover, rgba(33, 37, 41, 0.12))',
  DarkGhostBorderFocus = 'var(--alf-dark-ghost-border-focus, #49505726)',
  DarkGhostBorderDisabled = 'var(--alf-dark-ghost-border-disabled, #c0c2c4)',
  DarkGhostBorderActive = 'var(--alf-dark-ghost-border-active, #343a4026)',


  // ===== BASE COLORS =====
  White = '#ffffff',
  White10 = 'rgba(255, 255, 255, 0.1)',
  White20 = 'rgba(255, 255, 255, 0.2)',
  White30 = 'rgba(255, 255, 255, 0.3)',
  White40 = 'rgba(255, 255, 255, 0.4)',
  Black = '#000000',
  Transparent = 'transparent',



  // ===== GRAY SCALE (Complete 050-999) =====
  Gray050 = 'var(--alf-gray-050, #fafafa)',
  Gray100 = 'var(--alf-gray-100, #f8f9fa)',
  Gray150 = 'var(--alf-gray-150, #f0f0f0)',
  Gray200 = 'var(--alf-gray-200, #e9ecef)',
  Gray250 = 'var(--alf-gray-250, #dbdbdb)',
  Gray300 = 'var(--alf-gray-300, #dee2e6)',
  Gray350 = 'var(--alf-gray-350, #c9c9c9)',
  Gray400 = 'var(--alf-gray-400, #ced4da)',
  Gray450 = 'var(--alf-gray-450, #8f8f8f)',
  Gray500 = 'var(--alf-gray-500, #adb5bd)',
  Gray550 = 'var(--alf-gray-550, #676767)',
  Gray600 = 'var(--alf-gray-600, #6c757d)',
  Gray650 = 'var(--alf-gray-650, #464646)',
  Gray700 = 'var(--alf-gray-700, #495057)',
  Gray750 = 'var(--alf-gray-750, #353535)',
  Gray800 = 'var(--alf-gray-800, #343a40)',
  Gray850 = 'var(--alf-gray-850, #1f1f1f)',
  Gray900 = 'var(--alf-gray-900, #212529)',
  Gray950 = 'var(--alf-gray-950, #0f0f0f)',
  Gray999 = 'var(--alf-gray-999, #000000)',

  // ===== RED (Complete 050-999) =====
  Red050 = 'var(--alf-red-050, #fef2f2)',
  Red100 = 'var(--alf-red-100, #fee2e2)',
  Red150 = 'var(--alf-red-150, #fdd5d5)',
  Red200 = 'var(--alf-red-200, #fecaca)',
  Red250 = 'var(--alf-red-250, #fdb8b8)',
  Red300 = 'var(--alf-red-300, #fca5a5)',
  Red350 = 'var(--alf-red-350, #fb9191)',
  Red400 = 'var(--alf-red-400, #f87171)',
  Red450 = 'var(--alf-red-450, #f65858)',
  Red500 = 'var(--alf-red-500, #ef4444)',
  Red550 = 'var(--alf-red-550, #e73838)',
  Red600 = 'var(--alf-red-600, #dc2626)',
  Red650 = 'var(--alf-red-650, #d01f1f)',
  Red700 = 'var(--alf-red-700, #b91c1c)',
  Red750 = 'var(--alf-red-750, #a51919)',
  Red800 = 'var(--alf-red-800, #991b1b)',
  Red850 = 'var(--alf-red-850, #851818)',
  Red900 = 'var(--alf-red-900, #7f1d1d)',
  Red950 = 'var(--alf-red-950, #6d1818)',
  Red999 = 'var(--alf-red-999, #450a0a)',

  // ===== BLUE (Complete 050-999) =====
  Blue050 = 'var(--alf-blue-050, #eff6ff)',
  Blue100 = 'var(--alf-blue-100, #dbeafe)',
  Blue150 = 'var(--alf-blue-150, #cfe3fe)',
  Blue200 = 'var(--alf-blue-200, #bfdbfe)',
  Blue250 = 'var(--alf-blue-250, #b1d4fe)',
  Blue300 = 'var(--alf-blue-300, #93c5fd)',
  Blue350 = 'var(--alf-blue-350, #7ebcfc)',
  Blue400 = 'var(--alf-blue-400, #60a5fa)',
  Blue450 = 'var(--alf-blue-450, #4a97f9)',
  Blue500 = 'var(--alf-blue-500, #3b82f6)',
  Blue550 = 'var(--alf-blue-550, #3575e6)',
  Blue600 = 'var(--alf-blue-600, #2563eb)',
  Blue650 = 'var(--alf-blue-650, #2158d8)',
  Blue700 = 'var(--alf-blue-700, #1d4ed8)',
  Blue750 = 'var(--alf-blue-750, #1a46c2)',
  Blue800 = 'var(--alf-blue-800, #1e40af)',
  Blue850 = 'var(--alf-blue-850, #1a389a)',
  Blue900 = 'var(--alf-blue-900, #1e3a8a)',
  Blue950 = 'var(--alf-blue-950, #193174)',
  Blue999 = 'var(--alf-blue-999, #172554)',

  // ===== GREEN (Complete 050-999) =====
  Green050 = 'var(--alf-green-050, #f0fdf4)',
  Green100 = 'var(--alf-green-100, #dcfce7)',
  Green150 = 'var(--alf-green-150, #d1fbe0)',
  Green200 = 'var(--alf-green-200, #bbf7d0)',
  Green250 = 'var(--alf-green-250, #adf5c5)',
  Green300 = 'var(--alf-green-300, #86efac)',
  Green350 = 'var(--alf-green-350, #6fec9c)',
  Green400 = 'var(--alf-green-400, #4ade80)',
  Green450 = 'var(--alf-green-450, #31d66e)',
  Green500 = 'var(--alf-green-500, #22c55e)',
  Green550 = 'var(--alf-green-550, #1eb854)',
  Green600 = 'var(--alf-green-600, #16a34a)',
  Green650 = 'var(--alf-green-650, #139143)',
  Green700 = 'var(--alf-green-700, #15803d)',
  Green750 = 'var(--alf-green-750, #127236)',
  Green800 = 'var(--alf-green-800, #166534)',
  Green850 = 'var(--alf-green-850, #13562d)',
  Green900 = 'var(--alf-green-900, #14532d)',
  Green950 = 'var(--alf-green-950, #104525)',
  Green999 = 'var(--alf-green-999, #052e16)',

  // ===== ORANGE =====
  Orange050 = 'var(--alf-orange-050, #fff7ed)',
  Orange100 = 'var(--alf-orange-100, #ffedd5)',
  Orange150 = 'var(--alf-orange-150, #ffe4c4)',
  Orange200 = 'var(--alf-orange-200, #fed7aa)',
  Orange250 = 'var(--alf-orange-250, #feccf99)',
  Orange300 = 'var(--alf-orange-300, #fdba74)',
  Orange350 = 'var(--alf-orange-350, #fcaa5e)',
  Orange400 = 'var(--alf-orange-400, #fb923c)',
  Orange450 = 'var(--alf-orange-450, #fa7e25)',
  Orange500 = 'var(--alf-orange-500, #f97316)',
  Orange550 = 'var(--alf-orange-550, #f06410)',
  Orange600 = 'var(--alf-orange-600, #ea580c)',
  Orange650 = 'var(--alf-orange-650, #dc500b)',
  Orange700 = 'var(--alf-orange-700, #c2410c)',
  Orange750 = 'var(--alf-orange-750, #ad3a0b)',
  Orange800 = 'var(--alf-orange-800, #9a3412)',
  Orange850 = 'var(--alf-orange-850, #872e10)',
  Orange900 = 'var(--alf-orange-900, #7c2d12)',
  Orange950 = 'var(--alf-orange-950, #6b250f)',
  Orange999 = 'var(--alf-orange-999, #431407)',

  // ===== YELLOW =====
  Yellow050 = 'var(--alf-yellow-050, #fefce8)',
  Yellow100 = 'var(--alf-yellow-100, #fef9c3)',
  Yellow150 = 'var(--alf-yellow-150, #fef7af)',
  Yellow200 = 'var(--alf-yellow-200, #fef08a)',
  Yellow250 = 'var(--alf-yellow-250, #feec75)',
  Yellow300 = 'var(--alf-yellow-300, #fde047)',
  Yellow350 = 'var(--alf-yellow-350, #fddb32)',
  Yellow400 = 'var(--alf-yellow-400, #facc15)',
  Yellow450 = 'var(--alf-yellow-450, #f7bf07)',
  Yellow500 = 'var(--alf-yellow-500, #eab308)',
  Yellow550 = 'var(--alf-yellow-550, #daa507)',
  Yellow600 = 'var(--alf-yellow-600, #ca8a04)',
  Yellow650 = 'var(--alf-yellow-650, #b97d04)',
  Yellow700 = 'var(--alf-yellow-700, #a16207)',
  Yellow750 = 'var(--alf-yellow-750, #8e5606)',
  Yellow800 = 'var(--alf-yellow-800, #854d0e)',
  Yellow850 = 'var(--alf-yellow-850, #72420c)',
  Yellow900 = 'var(--alf-yellow-900, #713f12)',
  Yellow950 = 'var(--alf-yellow-950, #5f350f)',
  Yellow999 = 'var(--alf-yellow-999, #422006)',

  // ===== LIME =====
  Lime050 = 'var(--alf-lime-050, #f7fee7)',
  Lime100 = 'var(--alf-lime-100, #ecfccb)',
  Lime150 = 'var(--alf-lime-150, #e4fbb8)',
  Lime200 = 'var(--alf-lime-200, #d9f99d)',
  Lime250 = 'var(--alf-lime-250, #d0f889)',
  Lime300 = 'var(--alf-lime-300, #bef264)',
  Lime350 = 'var(--alf-lime-350, #b3ee4f)',
  Lime400 = 'var(--alf-lime-400, #a3e635)',
  Lime450 = 'var(--alf-lime-450, #96df23)',
  Lime500 = 'var(--alf-lime-500, #84cc16)',
  Lime550 = 'var(--alf-lime-550, #77b914)',
  Lime600 = 'var(--alf-lime-600, #65a30d)',
  Lime650 = 'var(--alf-lime-650, #5a910b)',
  Lime700 = 'var(--alf-lime-700, #4d7c0f)',
  Lime750 = 'var(--alf-lime-750, #446d0d)',
  Lime800 = 'var(--alf-lime-800, #3f6212)',
  Lime850 = 'var(--alf-lime-850, #365410)',
  Lime900 = 'var(--alf-lime-900, #365314)',
  Lime950 = 'var(--alf-lime-950, #2d4410)',
  Lime999 = 'var(--alf-lime-999, #1a2e05)',

  // ===== EMERALD =====
  Emerald050 = 'var(--alf-emerald-050, #ecfdf5)',
  Emerald100 = 'var(--alf-emerald-100, #d1fae5)',
  Emerald150 = 'var(--alf-emerald-150, #c3f9dd)',
  Emerald200 = 'var(--alf-emerald-200, #a7f3d0)',
  Emerald250 = 'var(--alf-emerald-250, #95f0c6)',
  Emerald300 = 'var(--alf-emerald-300, #6ee7b7)',
  Emerald350 = 'var(--alf-emerald-350, #59e3ab)',
  Emerald400 = 'var(--alf-emerald-400, #34d399)',
  Emerald450 = 'var(--alf-emerald-450, #21ca8a)',
  Emerald500 = 'var(--alf-emerald-500, #10b981)',
  Emerald550 = 'var(--alf-emerald-550, #0ea973)',
  Emerald600 = 'var(--alf-emerald-600, #059669)',
  Emerald650 = 'var(--alf-emerald-650, #04855d)',
  Emerald700 = 'var(--alf-emerald-700, #047857)',
  Emerald750 = 'var(--alf-emerald-750, #046a4d)',
  Emerald800 = 'var(--alf-emerald-800, #065f46)',
  Emerald850 = 'var(--alf-emerald-850, #05523c)',
  Emerald900 = 'var(--alf-emerald-900, #064e3b)',
  Emerald950 = 'var(--alf-emerald-950, #054132)',
  Emerald999 = 'var(--alf-emerald-999, #022c22)',

  // ===== TEAL =====
  Teal050 = 'var(--alf-teal-050, #f0fdfa)',
  Teal100 = 'var(--alf-teal-100, #ccfbf1)',
  Teal150 = 'var(--alf-teal-150, #b8fae9)',
  Teal200 = 'var(--alf-teal-200, #99f6e4)',
  Teal250 = 'var(--alf-teal-250, #85f3dd)',
  Teal300 = 'var(--alf-teal-300, #5eead4)',
  Teal350 = 'var(--alf-teal-350, #48e6cc)',
  Teal400 = 'var(--alf-teal-400, #2dd4bf)',
  Teal450 = 'var(--alf-teal-450, #1ecdb5)',
  Teal500 = 'var(--alf-teal-500, #14b8a6)',
  Teal550 = 'var(--alf-teal-550, #12a897)',
  Teal600 = 'var(--alf-teal-600, #0d9488)',
  Teal650 = 'var(--alf-teal-650, #0b847a)',
  Teal700 = 'var(--alf-teal-700, #0f766e)',
  Teal750 = 'var(--alf-teal-750, #0d6861)',
  Teal800 = 'var(--alf-teal-800, #115e59)',
  Teal850 = 'var(--alf-teal-850, #0f524d)',
  Teal900 = 'var(--alf-teal-900, #134e4a)',
  Teal950 = 'var(--alf-teal-950, #0f423e)',
  Teal999 = 'var(--alf-teal-999, #042f2e)',

  // ===== CYAN =====
  Cyan050 = 'var(--alf-cyan-050, #ecfeff)',
  Cyan100 = 'var(--alf-cyan-100, #cffafe)',
  Cyan150 = 'var(--alf-cyan-150, #baf8fe)',
  Cyan200 = 'var(--alf-cyan-200, #a5f3fc)',
  Cyan250 = 'var(--alf-cyan-250, #92f0fb)',
  Cyan300 = 'var(--alf-cyan-300, #67e8f9)',
  Cyan350 = 'var(--alf-cyan-350, #51e4f8)',
  Cyan400 = 'var(--alf-cyan-400, #22d3ee)',
  Cyan450 = 'var(--alf-cyan-450, #0fcdea)',
  Cyan500 = 'var(--alf-cyan-500, #06b6d4)',
  Cyan550 = 'var(--alf-cyan-550, #05a6c1)',
  Cyan600 = 'var(--alf-cyan-600, #0891b2)',
  Cyan650 = 'var(--alf-cyan-650, #07829e)',
  Cyan700 = 'var(--alf-cyan-700, #0e7490)',
  Cyan750 = 'var(--alf-cyan-750, #0c6780)',
  Cyan800 = 'var(--alf-cyan-800, #155e75)',
  Cyan850 = 'var(--alf-cyan-850, #125265)',
  Cyan900 = 'var(--alf-cyan-900, #164e63)',
  Cyan950 = 'var(--alf-cyan-950, #124253)',
  Cyan999 = 'var(--alf-cyan-999, #083344)',

  // ===== SKY =====
  Sky050 = 'var(--alf-sky-050, #f0f9ff)',
  Sky100 = 'var(--alf-sky-100, #e0f2fe)',
  Sky150 = 'var(--alf-sky-150, #d5edfe)',
  Sky200 = 'var(--alf-sky-200, #bae6fd)',
  Sky250 = 'var(--alf-sky-250, #abe0fd)',
  Sky300 = 'var(--alf-sky-300, #7dd3fc)',
  Sky350 = 'var(--alf-sky-350, #67ccfb)',
  Sky400 = 'var(--alf-sky-400, #38bdf8)',
  Sky450 = 'var(--alf-sky-450, #22b3f6)',
  Sky500 = 'var(--alf-sky-500, #0ea5e9)',
  Sky550 = 'var(--alf-sky-550, #0d96d6)',
  Sky600 = 'var(--alf-sky-600, #0284c7)',
  Sky650 = 'var(--alf-sky-650, #0276b3)',
  Sky700 = 'var(--alf-sky-700, #0369a1)',
  Sky750 = 'var(--alf-sky-750, #025d8e)',
  Sky800 = 'var(--alf-sky-800, #075985)',
  Sky850 = 'var(--alf-sky-850, #064d73)',
  Sky900 = 'var(--alf-sky-900, #0c4a6e)',
  Sky950 = 'var(--alf-sky-950, #0a3e5c)',
  Sky999 = 'var(--alf-sky-999, #082f45)',

  // ===== VIOLET =====
  Violet050 = 'var(--alf-violet-050, #f5f3ff)',
  Violet100 = 'var(--alf-violet-100, #ede9fe)',
  Violet150 = 'var(--alf-violet-150, #e6e1fe)',
  Violet200 = 'var(--alf-violet-200, #ddd6fe)',
  Violet250 = 'var(--alf-violet-250, #d5ccfe)',
  Violet300 = 'var(--alf-violet-300, #c4b5fd)',
  Violet350 = 'var(--alf-violet-350, #b8a8fc)',
  Violet400 = 'var(--alf-violet-400, #a78bfa)',
  Violet450 = 'var(--alf-violet-450, #9a78f9)',
  Violet500 = 'var(--alf-violet-500, #8b5cf6)',
  Violet550 = 'var(--alf-violet-550, #7f52e6)',
  Violet600 = 'var(--alf-violet-600, #7c3aed)',
  Violet650 = 'var(--alf-violet-650, #7031da)',
  Violet700 = 'var(--alf-violet-700, #6d28d9)',
  Violet750 = 'var(--alf-violet-750, #6224c4)',
  Violet800 = 'var(--alf-violet-800, #5b21b6)',
  Violet850 = 'var(--alf-violet-850, #501da1)',
  Violet900 = 'var(--alf-violet-900, #4c1d95)',
  Violet950 = 'var(--alf-violet-950, #41197f)',
  Violet999 = 'var(--alf-violet-999, #2e1065)',

  // ===== PURPLE =====
  Purple050 = 'var(--alf-purple-050, #faf5ff)',
  Purple100 = 'var(--alf-purple-100, #f3e8ff)',
  Purple150 = 'var(--alf-purple-150, #eedffe)',
  Purple200 = 'var(--alf-purple-200, #e9d5ff)',
  Purple250 = 'var(--alf-purple-250, #e4cbff)',
  Purple300 = 'var(--alf-purple-300, #d8b4fe)',
  Purple350 = 'var(--alf-purple-350, #d0a5fe)',
  Purple400 = 'var(--alf-purple-400, #c084fc)',
  Purple450 = 'var(--alf-purple-450, #b570fb)',
  Purple500 = 'var(--alf-purple-500, #a855f7)',
  Purple550 = 'var(--alf-purple-550, #9c4ae7)',
  Purple600 = 'var(--alf-purple-600, #9333ea)',
  Purple650 = 'var(--alf-purple-650, #862bd7)',
  Purple700 = 'var(--alf-purple-700, #7e22ce)',
  Purple750 = 'var(--alf-purple-750, #711eb8)',
  Purple800 = 'var(--alf-purple-800, #6b21a8)',
  Purple850 = 'var(--alf-purple-850, #5e1d93)',
  Purple900 = 'var(--alf-purple-900, #581c87)',
  Purple950 = 'var(--alf-purple-950, #4b1872)',
  Purple999 = 'var(--alf-purple-999, #3b0764)',

  // ===== FUCHSIA =====
  Fuchsia050 = 'var(--alf-fuchsia-050, #fdf4ff)',
  Fuchsia100 = 'var(--alf-fuchsia-100, #fae8ff)',
  Fuchsia150 = 'var(--alf-fuchsia-150, #f8dfff)',
  Fuchsia200 = 'var(--alf-fuchsia-200, #f5d0fe)',
  Fuchsia250 = 'var(--alf-fuchsia-250, #f2c5fe)',
  Fuchsia300 = 'var(--alf-fuchsia-300, #f0abfc)',
  Fuchsia350 = 'var(--alf-fuchsia-350, #ed9cfb)',
  Fuchsia400 = 'var(--alf-fuchsia-400, #e879f9)',
  Fuchsia450 = 'var(--alf-fuchsia-450, #e565f7)',
  Fuchsia500 = 'var(--alf-fuchsia-500, #d946ef)',
  Fuchsia550 = 'var(--alf-fuchsia-550, #cd3de6)',
  Fuchsia600 = 'var(--alf-fuchsia-600, #c026d3)',
  Fuchsia650 = 'var(--alf-fuchsia-650, #b21ec4)',
  Fuchsia700 = 'var(--alf-fuchsia-700, #a21caf)',
  Fuchsia750 = 'var(--alf-fuchsia-750, #92199c)',
  Fuchsia800 = 'var(--alf-fuchsia-800, #86198f)',
  Fuchsia850 = 'var(--alf-fuchsia-850, #76167e)',
  Fuchsia900 = 'var(--alf-fuchsia-900, #701a75)',
  Fuchsia950 = 'var(--alf-fuchsia-950, #601663)',
  Fuchsia999 = 'var(--alf-fuchsia-999, #4a044e)',

  // ===== PINK =====
  Pink050 = 'var(--alf-pink-050, #fdf2f8)',
  Pink100 = 'var(--alf-pink-100, #fce7f3)',
  Pink150 = 'var(--alf-pink-150, #fbdfe9)',
  Pink200 = 'var(--alf-pink-200, #fbcfe8)',
  Pink250 = 'var(--alf-pink-250, #fac4e3)',
  Pink300 = 'var(--alf-pink-300, #f9a8d4)',
  Pink350 = 'var(--alf-pink-350, #f896ca)',
  Pink400 = 'var(--alf-pink-400, #f472b6)',
  Pink450 = 'var(--alf-pink-450, #f15da7)',
  Pink500 = 'var(--alf-pink-500, #ec4899)',
  Pink550 = 'var(--alf-pink-550, #e73f8c)',
  Pink600 = 'var(--alf-pink-600, #db2777)',
  Pink650 = 'var(--alf-pink-650, #cf216a)',
  Pink700 = 'var(--alf-pink-700, #be185d)',
  Pink750 = 'var(--alf-pink-750, #ac1653)',
  Pink800 = 'var(--alf-pink-800, #9f1239)',
  Pink850 = 'var(--alf-pink-850, #8d1032)',
  Pink900 = 'var(--alf-pink-900, #831843)',
  Pink950 = 'var(--alf-pink-950, #701438)',
  Pink999 = 'var(--alf-pink-999, #500724)',

  // ===== ROSE =====
  Rose050 = 'var(--alf-rose-050, #fff1f2)',
  Rose100 = 'var(--alf-rose-100, #ffe4e6)',
  Rose150 = 'var(--alf-rose-150, #ffd9dc)',
  Rose200 = 'var(--alf-rose-200, #fecdd3)',
  Rose250 = 'var(--alf-rose-250, #fec0c7)',
  Rose300 = 'var(--alf-rose-300, #fda4af)',
  Rose350 = 'var(--alf-rose-350, #fc91a0)',
  Rose400 = 'var(--alf-rose-400, #fb7185)',
  Rose450 = 'var(--alf-rose-450, #fa5d73)',
  Rose500 = 'var(--alf-rose-500, #f43f5e)',
  Rose600 = 'var(--alf-rose-600, #e11d48)',
  Rose650 = 'var(--alf-rose-650, #d3193f)',
  Rose700 = 'var(--alf-rose-700, #be123c)',
  Rose750 = 'var(--alf-rose-750, #ab1036)',
  Rose800 = 'var(--alf-rose-800, #9f1239)',
  Rose850 = 'var(--alf-rose-850, #8d1032)',
  Rose900 = 'var(--alf-rose-900, #881337)',
  Rose950 = 'var(--alf-rose-950, #74102e)',
  Rose999 = 'var(--alf-rose-999, #4c0519)',

  // ===== SOLID MODALITY =====
  // ------------------------------------------------
  // PRIMARY
  // ------------------------------------------------
  Primary = 'var(--alf-primary, #0d6efd)',
  PrimaryFocus = 'var(--alf-primary-focus, #0a55c7ff)',
  PrimaryDisabled = 'var(--alf-primary-disabled, #a0b6d7ff)',
  PrimaryActive = 'var(--alf-primary-active, #0a55c7ff)',
  PrimaryHover = 'var(--alf-primary-hover, #0a55c7ff)',

  PrimaryBG = 'var(--alf-primary, #0d6efd)',
  PrimaryFocusBG = 'var(--alf-primary-focus, #0a55c7ff)',
  PrimaryDisabledBG = 'var(--alf-primary-disabled, #a0b6d7ff)',
  PrimaryActiveBG = 'var(--alf-primary-active, #0a55c7ff)',
  PrimaryHoverBG = 'var(--alf-primary-hover, #0a55c7ff)',

  PrimaryText = 'var(--alf-primary-text, #ffffffff)',
  PrimaryTextFocus = 'var(--alf-primary-text-focus, #ffffffff)',
  PrimaryTextDisabled = 'var(--alf-primary-text-disabled, #ffffffff)',
  PrimaryTextActive = 'var(--alf-primary-text-active, #ffffffff)',
  PrimaryTextHover = 'var(--alf-primary-text-hover, #ffffffff)',

  PrimaryBorder = 'var(--alf-primary-border, #0d6efd)',
  PrimaryBorderHover = 'var(--alf-primary-border-hover, #0a55c7ff)',
  PrimaryBorderFocus = 'var(--alf-primary-border-focus, #0a55c7ff)',
  PrimaryBorderDisabled = 'var(--alf-primary-border-disabled, #a0b6d7ff)',
  PrimaryBorderActive = 'var(--alf-primary-border-active, #0a55c7ff)',

  // ------------------------------------------------
  // SECONDARY
  // ------------------------------------------------
  Secondary = 'var(--alf-secondary, #6c757d)',
  SecondaryFocus = 'var(--alf-secondary-focus, #4a5055ff)',
  SecondaryDisabled = 'var(--alf-secondary-disabled, #aab1b6)',
  SecondaryActive = 'var(--alf-secondary-active, #4a5055ff)',
  SecondaryHover = 'var(--alf-secondary-hover, #4a5055ff)',

  SecondaryBG = 'var(--alf-secondary, #6c757d)',
  SecondaryFocusBG = 'var(--alf-secondary-focus, #4a5055ff)',
  SecondaryDisabledBG = 'var(--alf-secondary-disabled, #aab1b6)',
  SecondaryActiveBG = 'var(--alf-secondary-active, #4a5055ff)',
  SecondaryHoverBG = 'var(--alf-secondary-hover, #4a5055ff)',

  SecondaryText = 'var(--alf-secondary-text, #ffffffff)',
  SecondaryTextFocus = 'var(--alf-secondary-text-focus, #ffffffff)',
  SecondaryTextDisabled = 'var(--alf-secondary-text-disabled, #ffffffa6)',
  SecondaryTextActive = 'var(--alf-secondary-text-active, #ffffffff)',
  SecondaryTextHover = 'var(--alf-secondary-text-hover, #ffffffff)',

  SecondaryBorder = 'var(--alf-secondary-border, #6c757d)',
  SecondaryBorderHover = 'var(--alf-secondary-border-hover, #4a5055ff)',
  SecondaryBorderFocus = 'var(--alf-secondary-border-focus, #4a5055ff)',
  SecondaryBorderDisabled = 'var(--alf-secondary-border-disabled, #aab1b6)',
  SecondaryBorderActive = 'var(--alf-secondary-border-active, #4a5055ff)',

  // ------------------------------------------------
  // SUCCESS
  // ------------------------------------------------
  Success = 'var(--alf-success, #198754)',
  SuccessFocus = 'var(--alf-success-focus, #125b39ff)',
  SuccessDisabled = 'var(--alf-success-disabled, #8cc5a6)',
  SuccessActive = 'var(--alf-success-active, #125b39ff)',
  SuccessHover = 'var(--alf-success-hover, #125b39ff)',

  SuccessBG = 'var(--alf-success, #198754)',
  SuccessFocusBG = 'var(--alf-success-focus, #125b39ff)',
  SuccessDisabledBG = 'var(--alf-success-disabled, #8cc5a6)',
  SuccessActiveBG = 'var(--alf-success-active, #125b39ff)',
  SuccessHoverBG = 'var(--alf-success-hover, #125b39ff)',

  SuccessText = 'var(--alf-success-text, #ffffffff)',
  SuccessTextFocus = 'var(--alf-success-text-focus, #ffffffff)',
  SuccessTextDisabled = 'var(--alf-success-text-disabled, #ffffffa6)',
  SuccessTextActive = 'var(--alf-success-text-active, #ffffffff)',
  SuccessTextHover = 'var(--alf-success-text-hover, #ffffffff)',

  SuccessBorder = 'var(--alf-success-border, #198754)',
  SuccessBorderHover = 'var(--alf-success-border-hover, #125b39ff)',
  SuccessBorderFocus = 'var(--alf-success-border-focus, #125b39ff)',
  SuccessBorderDisabled = 'var(--alf-success-border-disabled, #8cc5a6)',
  SuccessBorderActive = 'var(--alf-success-border-active, #125b39ff)',

  // ------------------------------------------------
  // DANGER
  // ------------------------------------------------
  Danger = 'var(--alf-danger, #dc3545)',
  DangerFocus = 'var(--alf-danger-focus, #bb2d3b)',
  DangerDisabled = 'var(--alf-danger-disabled, #efa0a8)',
  DangerActive = 'var(--alf-danger-active, #bb2d3b)',
  DangerHover = 'var(--alf-danger-hover, #bb2d3b)',

  DangerBG = 'var(--alf-danger, #dc3545)',
  DangerFocusBG = 'var(--alf-danger-focus, #bb2d3b)',
  DangerDisabledBG = 'var(--alf-danger-disabled, #efa0a8)',
  DangerActiveBG = 'var(--alf-danger-active, #bb2d3b)',
  DangerHoverBG = 'var(--alf-danger-hover, #bb2d3b)',

  DangerText = 'var(--alf-danger-text, #ffffffff)',
  DangerTextFocus = 'var(--alf-danger-text-focus, #ffffffff)',
  DangerTextDisabled = 'var(--alf-danger-text-disabled, #ffffffa6)',
  DangerTextActive = 'var(--alf-danger-text-active, #ffffffff)',
  DangerTextHover = 'var(--alf-danger-text-hover, #ffffffff)',

  DangerBorder = 'var(--alf-danger-border, #dc3545)',
  DangerBorderHover = 'var(--alf-danger-border-hover, #bb2d3b)',
  DangerBorderFocus = 'var(--alf-danger-border-focus, #bb2d3b)',
  DangerBorderDisabled = 'var(--alf-danger-border-disabled, #efa0a8)',
  DangerBorderActive = 'var(--alf-danger-border-active, #bb2d3b)',

  // ------------------------------------------------
  // WARNING
  // ------------------------------------------------
  Warning = 'var(--alf-warning, #ffc107)',
  WarningFocus = 'var(--alf-warning-focus, #d39e00)',
  WarningDisabled = 'var(--alf-warning-disabled, #fcedba)',
  WarningActive = 'var(--alf-warning-active, #d39e00)',
  WarningHover = 'var(--alf-warning-hover, #d39e00)',

  WarningBG = 'var(--alf-warning, #ffc107)',
  WarningFocusBG = 'var(--alf-warning-focus, #d39e00)',
  WarningDisabledBG = 'var(--alf-warning-disabled, #fcedba)',
  WarningActiveBG = 'var(--alf-warning-active, #d39e00)',
  WarningHoverBG = 'var(--alf-warning-hover, #d39e00)',

  WarningText = 'var(--alf-warning-text, #000000ff)',
  WarningTextFocus = 'var(--alf-warning-text-focus, #000000ff)',
  WarningTextDisabled = 'var(--alf-warning-text-disabled, #000000a6)',
  WarningTextActive = 'var(--alf-warning-text-active, #000000ff)',
  WarningTextHover = 'var(--alf-warning-text-hover, #000000ff)',

  WarningBorder = 'var(--alf-warning-border, #ffc107)',
  WarningBorderHover = 'var(--alf-warning-border-hover, #d39e00)',
  WarningBorderFocus = 'var(--alf-warning-border-focus, #d39e00)',
  WarningBorderDisabled = 'var(--alf-warning-border-disabled, #fcedba)',
  WarningBorderActive = 'var(--alf-warning-border-active, #d39e00)',

  // ------------------------------------------------
  // INFO
  // ------------------------------------------------
  Info = 'var(--alf-info, #0dcaf0)',
  InfoFocus = 'var(--alf-info-focus, #0aa2c0)',
  InfoDisabled = 'var(--alf-info-disabled, #9eeaf9)',
  InfoActive = 'var(--alf-info-active, #0aa2c0)',
  InfoHover = 'var(--alf-info-hover, #0aa2c0)',

  InfoBG = 'var(--alf-info, #0dcaf0)',
  InfoFocusBG = 'var(--alf-info-focus, #0aa2c0)',
  InfoDisabledBG = 'var(--alf-info-disabled, #9eeaf9)',
  InfoActiveBG = 'var(--alf-info-active, #0aa2c0)',
  InfoHoverBG = 'var(--alf-info-hover, #0aa2c0)',

  InfoText = 'var(--alf-info-text, #000000ff)',
  InfoTextFocus = 'var(--alf-info-text-focus, #000000ff)',
  InfoTextDisabled = 'var(--alf-info-text-disabled, #000000a6)',
  InfoTextActive = 'var(--alf-info-text-active, #000000ff)',
  InfoTextHover = 'var(--alf-info-text-hover, #000000ff)',

  InfoBorder = 'var(--alf-info-border, #0dcaf0)',
  InfoBorderHover = 'var(--alf-info-border-hover, #0aa2c0)',
  InfoBorderFocus = 'var(--alf-info-border-focus, #0aa2c0)',
  InfoBorderDisabled = 'var(--alf-info-border-disabled, #9eeaf9)',
  InfoBorderActive = 'var(--alf-info-border-active, #0aa2c0)',

  // ------------------------------------------------
  // LIGHT
  // ------------------------------------------------
  Light = 'var(--alf-light, #f8f9fa)',
  LightFocus = 'var(--alf-light-focus, #e2e6ea)',
  LightDisabled = 'var(--alf-light-disabled, #f8f9fa)',
  LightActive = 'var(--alf-light-active, #e2e6ea)',
  LightHover = 'var(--alf-light-hover, #e2e6ea)',

  LightBG = 'var(--alf-light, #f8f9fa)',
  LightFocusBG = 'var(--alf-light-focus, #e2e6ea)',
  LightDisabledBG = 'var(--alf-light-disabled, #f8f9fa)',
  LightActiveBG = 'var(--alf-light-active, #e2e6ea)',
  LightHoverBG = 'var(--alf-light-hover, #e2e6ea)',

  LightText = 'var(--alf-light-text, #000000ff)',
  LightTextFocus = 'var(--alf-light-text-focus, #000000ff)',
  LightTextDisabled = 'var(--alf-light-text-disabled, #000000a6)',
  LightTextActive = 'var(--alf-light-text-active, #000000ff)',
  LightTextHover = 'var(--alf-light-text-hover, #000000ff)',

  LightBorder = 'var(--alf-light-border, #f8f9fa)',
  LightBorderHover = 'var(--alf-light-border-hover, #e2e6ea)',
  LightBorderFocus = 'var(--alf-light-border-focus, #e2e6ea)',
  LightBorderDisabled = 'var(--alf-light-border-disabled, #f8f9fa)',
  LightBorderActive = 'var(--alf-light-border-active, #e2e6ea)',

  // ------------------------------------------------
  // DARK
  // ------------------------------------------------
  Dark = 'var(--alf-dark, #212529)',
  DarkFocus = 'var(--alf-dark-focus, #1d2124)',
  DarkDisabled = 'var(--alf-dark-disabled, #8c9298)',
  DarkActive = 'var(--alf-dark-active, #1d2124)',
  DarkHover = 'var(--alf-dark-hover, #1d2124)',

  DarkBG = 'var(--alf-dark, #212529)',
  DarkFocusBG = 'var(--alf-dark-focus, #1d2124)',
  DarkDisabledBG = 'var(--alf-dark-disabled, #8c9298)',
  DarkActiveBG = 'var(--alf-dark-active, #1d2124)',
  DarkHoverBG = 'var(--alf-dark-hover, #1d2124)',

  DarkText = 'var(--alf-dark-text, #ffffffff)',
  DarkTextFocus = 'var(--alf-dark-text-focus, #ffffffff)',
  DarkTextDisabled = 'var(--alf-dark-text-disabled, #ffffffa6)',
  DarkTextActive = 'var(--alf-dark-text-active, #ffffffff)',
  DarkTextHover = 'var(--alf-dark-text-hover, #ffffffff)',

  DarkBorder = 'var(--alf-dark-border, #212529)',
  DarkBorderHover = 'var(--alf-dark-border-hover, #1d2124)',
  DarkBorderFocus = 'var(--alf-dark-border-focus, #1d2124)',
  DarkBorderDisabled = 'var(--alf-dark-border-disabled, #8c9298)',
  DarkBorderActive = 'var(--alf-dark-border-active, #1d2124)',

  // ===== OUTLINE MODALITY =====
  // ------------------------------------------------
  // PRIMARY
  // ------------------------------------------------
  PrimaryOutline = 'var(--alf-primary-outline, #0d6efd)',
  PrimaryOutlineFocus = 'var(--alf-primary-outline-focus, #0a55c7ff)',
  PrimaryOutlineDisabled = 'var(--alf-primary-outline-disabled, #9dbdf2)',
  PrimaryOutlineActive = 'var(--alf-primary-outline-active, #0a55c7ff)',
  PrimaryOutlineHover = 'var(--alf-primary-outline-hover, #0a55c7ff)',

  PrimaryOutlineBG = 'var(--alf-primary-outline-bg, transparent)',
  PrimaryOutlineFocusBG = 'var(--alf-primary-outline-focus-bg, rgba(13, 110, 253, 0.04))',
  PrimaryOutlineDisabledBG = 'var(--alf-primary-outline-disabled-bg, transparent)',
  PrimaryOutlineActiveBG = 'var(--alf-primary-outline-active-bg, rgba(13, 110, 253, 0.04))',
  PrimaryOutlineHoverBG = 'var(--alf-primary-outline-hover-bg, rgba(13, 110, 253, 0.04))',

  PrimaryOutlineText = 'var(--alf-primary-outline-text, #0d6efd)',
  PrimaryOutlineTextFocus = 'var(--alf-primary-outline-text-focus, #0a55c7ff)',
  PrimaryOutlineTextDisabled = 'var(--alf-primary-outline-text-disabled, #9dbdf2)',
  PrimaryOutlineTextActive = 'var(--alf-primary-outline-text-active, #0a55c7ff)',
  PrimaryOutlineTextHover = 'var(--alf-primary-outline-text-hover, #0a55c7ff)',

  PrimaryOutlineBorder = 'var(--alf-primary-outline-border, #0d6efd)',
  PrimaryOutlineBorderHover = 'var(--alf-primary-outline-border-hover, #0a55c7ff)',
  PrimaryOutlineBorderFocus = 'var(--alf-primary-outline-border-focus, #0a55c7ff)',
  PrimaryOutlineBorderDisabled = 'var(--alf-primary-outline-border-disabled, #9dbdf2)',
  PrimaryOutlineBorderActive = 'var(--alf-primary-outline-border-active, #0a55c7ff)',

  // ------------------------------------------------
  // SECONDARY
  // ------------------------------------------------
  SecondaryOutline = 'var(--alf-secondary-outline, #6c757d)',
  SecondaryOutlineFocus = 'var(--alf-secondary-outline-focus, #4a5055ff)',
  SecondaryOutlineDisabled = 'var(--alf-secondary-outline-disabled, #b1b6ba)',
  SecondaryOutlineActive = 'var(--alf-secondary-outline-active, #4a5055ff)',
  SecondaryOutlineHover = 'var(--alf-secondary-outline-hover, #4a5055ff)',

  SecondaryOutlineBG = 'var(--alf-secondary-outline-bg, transparent)',
  SecondaryOutlineFocusBG = 'var(--alf-secondary-outline-focus-bg, rgba(108, 117, 125, 0.04))',
  SecondaryOutlineDisabledBG = 'var(--alf-secondary-outline-disabled-bg, transparent)',
  SecondaryOutlineActiveBG = 'var(--alf-secondary-outline-active-bg, rgba(108, 117, 125, 0.04))',
  SecondaryOutlineHoverBG = 'var(--alf-secondary-outline-hover-bg, rgba(108, 117, 125, 0.04))',

  SecondaryOutlineText = 'var(--alf-secondary-outline-text, #6c757d)',
  SecondaryOutlineTextFocus = 'var(--alf-secondary-outline-text-focus, #4a5055ff)',
  SecondaryOutlineTextDisabled = 'var(--alf-secondary-outline-text-disabled, #b1b6ba)',
  SecondaryOutlineTextActive = 'var(--alf-secondary-outline-text-active, #4a5055ff)',
  SecondaryOutlineTextHover = 'var(--alf-secondary-outline-text-hover, #4a5055ff)',

  SecondaryOutlineBorder = 'var(--alf-secondary-outline-border, #6c757d)',
  SecondaryOutlineBorderHover = 'var(--alf-secondary-outline-border-hover, #4a5055ff)',
  SecondaryOutlineBorderFocus = 'var(--alf-secondary-outline-border-focus, #4a5055ff)',
  SecondaryOutlineBorderDisabled = 'var(--alf-secondary-outline-border-disabled, #b1b6ba)',
  SecondaryOutlineBorderActive = 'var(--alf-secondary-outline-border-active, #4a5055ff)',

  // ------------------------------------------------
  // SUCCESS
  // ------------------------------------------------
  SuccessOutline = 'var(--alf-success-outline, #198754)',
  SuccessOutlineFocus = 'var(--alf-success-outline-focus, #125b39ff)',
  SuccessOutlineDisabled = 'var(--alf-success-outline-disabled, #91c1aa)',
  SuccessOutlineActive = 'var(--alf-success-outline-active, #125b39ff)',
  SuccessOutlineHover = 'var(--alf-success-outline-hover, #125b39ff)',

  SuccessOutlineBG = 'var(--alf-success-outline-bg, transparent)',
  SuccessOutlineFocusBG = 'var(--alf-success-outline-focus-bg, rgba(25, 135, 84, 0.04))',
  SuccessOutlineDisabledBG = 'var(--alf-success-outline-disabled-bg, transparent)',
  SuccessOutlineActiveBG = 'var(--alf-success-outline-active-bg, rgba(25, 135, 84, 0.04))',
  SuccessOutlineHoverBG = 'var(--alf-success-outline-hover-bg, rgba(25, 135, 84, 0.04))',

  SuccessOutlineText = 'var(--alf-success-outline-text, #198754)',
  SuccessOutlineTextFocus = 'var(--alf-success-outline-text-focus, #125b39ff)',
  SuccessOutlineTextDisabled = 'var(--alf-success-outline-text-disabled, #91c1aa)',
  SuccessOutlineTextActive = 'var(--alf-success-outline-text-active, #125b39ff)',
  SuccessOutlineTextHover = 'var(--alf-success-outline-text-hover, #125b39ff)',

  SuccessOutlineBorder = 'var(--alf-success-outline-border, #198754)',
  SuccessOutlineBorderHover = 'var(--alf-success-outline-border-hover, #125b39ff)',
  SuccessOutlineBorderFocus = 'var(--alf-success-outline-border-focus, #125b39ff)',
  SuccessOutlineBorderDisabled = 'var(--alf-success-outline-border-disabled, #91c1aa)',
  SuccessOutlineBorderActive = 'var(--alf-success-outline-border-active, #125b39ff)',

  // ------------------------------------------------
  // DANGER
  // ------------------------------------------------
  DangerOutline = 'var(--alf-danger-outline, #dc3545)',
  DangerOutlineFocus = 'var(--alf-danger-outline-focus, #bb2d3b)',
  DangerOutlineDisabled = 'var(--alf-danger-outline-disabled, #f0a2ab)',
  DangerOutlineActive = 'var(--alf-danger-outline-active, #bb2d3b)',
  DangerOutlineHover = 'var(--alf-danger-outline-hover, #bb2d3b)',

  DangerOutlineBG = 'var(--alf-danger-outline-bg, transparent)',
  DangerOutlineFocusBG = 'var(--alf-danger-outline-focus-bg, rgba(220, 53, 69, 0.04))',
  DangerOutlineDisabledBG = 'var(--alf-danger-outline-disabled-bg, transparent)',
  DangerOutlineActiveBG = 'var(--alf-danger-outline-active-bg, rgba(220, 53, 69, 0.04))',
  DangerOutlineHoverBG = 'var(--alf-danger-outline-hover-bg, rgba(220, 53, 69, 0.04))',

  DangerOutlineText = 'var(--alf-danger-outline-text, #dc3545)',
  DangerOutlineTextFocus = 'var(--alf-danger-outline-text-focus, #bb2d3b)',
  DangerOutlineTextDisabled = 'var(--alf-danger-outline-text-disabled, #f0a2ab)',
  DangerOutlineTextActive = 'var(--alf-danger-outline-text-active, #bb2d3b)',
  DangerOutlineTextHover = 'var(--alf-danger-outline-text-hover, #bb2d3b)',

  DangerOutlineBorder = 'var(--alf-danger-outline-border, #dc3545)',
  DangerOutlineBorderHover = 'var(--alf-danger-outline-border-hover, #bb2d3b)',
  DangerOutlineBorderFocus = 'var(--alf-danger-outline-border-focus, #bb2d3b)',
  DangerOutlineBorderDisabled = 'var(--alf-danger-outline-border-disabled, #f0a2ab)',
  DangerOutlineBorderActive = 'var(--alf-danger-outline-border-active, #bb2d3b)',

  // ------------------------------------------------
  // WARNING
  // ------------------------------------------------
  WarningOutline = 'var(--alf-warning-outline, #ffc107)',
  WarningOutlineFocus = 'var(--alf-warning-outline-focus, #d39e00)',
  WarningOutlineDisabled = 'var(--alf-warning-outline-disabled, #fcedba)',
  WarningOutlineActive = 'var(--alf-warning-outline-active, #d39e00)',
  WarningOutlineHover = 'var(--alf-warning-outline-hover, #d39e00)',

  WarningOutlineBG = 'var(--alf-warning-outline-bg, transparent)',
  WarningOutlineFocusBG = 'var(--alf-warning-outline-focus-bg, rgba(255, 193, 7, 0.04))',
  WarningOutlineDisabledBG = 'var(--alf-warning-outline-disabled-bg, transparent)',
  WarningOutlineActiveBG = 'var(--alf-warning-outline-active-bg, rgba(255, 193, 7, 0.04))',
  WarningOutlineHoverBG = 'var(--alf-warning-outline-hover-bg, rgba(255, 193, 7, 0.04))',

  WarningOutlineText = 'var(--alf-warning-outline-text, #ffc107)',
  WarningOutlineTextFocus = 'var(--alf-warning-outline-text-focus, #d39e00)',
  WarningOutlineTextDisabled = 'var(--alf-warning-outline-text-disabled, #fcedba)',
  WarningOutlineTextActive = 'var(--alf-warning-outline-text-active, #d39e00)',
  WarningOutlineTextHover = 'var(--alf-warning-outline-text-hover, #d39e00)',

  WarningOutlineBorder = 'var(--alf-warning-outline-border, #ffc107)',
  WarningOutlineBorderHover = 'var(--alf-warning-outline-border-hover, #d39e00)',
  WarningOutlineBorderFocus = 'var(--alf-warning-outline-border-focus, #d39e00)',
  WarningOutlineBorderDisabled = 'var(--alf-warning-outline-border-disabled, #fcedba)',
  WarningOutlineBorderActive = 'var(--alf-warning-outline-border-active, #d39e00)',

  // ------------------------------------------------
  // INFO
  // ------------------------------------------------
  InfoOutline = 'var(--alf-info-outline, #0dcaf0)',
  InfoOutlineFocus = 'var(--alf-info-outline-focus, #0aa2c0)',
  InfoOutlineDisabled = 'var(--alf-info-outline-disabled, #a1e5f4)',
  InfoOutlineActive = 'var(--alf-info-outline-active, #0aa2c0)',
  InfoOutlineHover = 'var(--alf-info-outline-hover, #0aa2c0)',

  InfoOutlineBG = 'var(--alf-info-outline-bg, transparent)',
  InfoOutlineFocusBG = 'var(--alf-info-outline-focus-bg, rgba(13, 202, 240, 0.04))',
  InfoOutlineDisabledBG = 'var(--alf-info-outline-disabled-bg, transparent)',
  InfoOutlineActiveBG = 'var(--alf-info-outline-active-bg, rgba(13, 202, 240, 0.04))',
  InfoOutlineHoverBG = 'var(--alf-info-outline-hover-bg, rgba(13, 202, 240, 0.04))',

  InfoOutlineText = 'var(--alf-info-outline-text, #0dcaf0)',
  InfoOutlineTextFocus = 'var(--alf-info-outline-text-focus, #0aa2c0)',
  InfoOutlineTextDisabled = 'var(--alf-info-outline-text-disabled, #a1e5f4)',
  InfoOutlineTextActive = 'var(--alf-info-outline-text-active, #0aa2c0)',
  InfoOutlineTextHover = 'var(--alf-info-outline-text-hover, #0aa2c0)',

  InfoOutlineBorder = 'var(--alf-info-outline-border, #0dcaf0)',
  InfoOutlineBorderHover = 'var(--alf-info-outline-border-hover, #0aa2c0)',
  InfoOutlineBorderFocus = 'var(--alf-info-outline-border-focus, #0aa2c0)',
  InfoOutlineBorderDisabled = 'var(--alf-info-outline-border-disabled, #a1e5f4)',
  InfoOutlineBorderActive = 'var(--alf-info-outline-border-active, #0aa2c0)',

  // ------------------------------------------------
  // LIGHT
  // ------------------------------------------------
  LightOutline = 'var(--alf-light-outline, #dee2e6)',
  LightOutlineFocus = 'var(--alf-light-outline-focus, #ced4da)',
  LightOutlineDisabled = 'var(--alf-light-outline-disabled, #f8f9fa)',
  LightOutlineActive = 'var(--alf-light-outline-active, #ced4da)',
  LightOutlineHover = 'var(--alf-light-outline-hover, #ced4da)',

  LightOutlineBG = 'var(--alf-light-outline-bg, transparent)',
  LightOutlineFocusBG = 'var(--alf-light-outline-focus-bg, rgba(222, 226, 230, 0.04))',
  LightOutlineDisabledBG = 'var(--alf-light-outline-disabled-bg, transparent)',
  LightOutlineActiveBG = 'var(--alf-light-outline-active-bg, rgba(222, 226, 230, 0.04))',
  LightOutlineHoverBG = 'var(--alf-light-outline-hover-bg, rgba(222, 226, 230, 0.04))',

  LightOutlineText = 'var(--alf-light-outline-text, #6c757d)',
  LightOutlineTextFocus = 'var(--alf-light-outline-text-focus, #868e96)',
  LightOutlineTextDisabled = 'var(--alf-light-outline-text-disabled, #adb5bd)',
  LightOutlineTextActive = 'var(--alf-light-outline-text-active, #868e96)',
  LightOutlineTextHover = 'var(--alf-light-outline-text-hover, #868e96)',

  LightOutlineBorder = 'var(--alf-light-outline-border, #dee2e6)',
  LightOutlineBorderHover = 'var(--alf-light-outline-border-hover, #ced4da)',
  LightOutlineBorderFocus = 'var(--alf-light-outline-border-focus, #ced4da)',
  LightOutlineBorderDisabled = 'var(--alf-light-outline-border-disabled, #f8f9fa)',
  LightOutlineBorderActive = 'var(--alf-light-outline-border-active, #ced4da)',

  // ------------------------------------------------
  // DARK
  // ------------------------------------------------
  DarkOutline = 'var(--alf-dark-outline, #212529)',
  DarkOutlineFocus = 'var(--alf-dark-outline-focus, #1d2124)',
  DarkOutlineDisabled = 'var(--alf-dark-outline-disabled, #92979c)',
  DarkOutlineActive = 'var(--alf-dark-outline-active, #1d2124)',
  DarkOutlineHover = 'var(--alf-dark-outline-hover, #1d2124)',

  DarkOutlineBG = 'var(--alf-dark-outline-bg, transparent)',
  DarkOutlineFocusBG = 'var(--alf-dark-outline-focus-bg, rgba(33, 37, 41, 0.04))',
  DarkOutlineDisabledBG = 'var(--alf-dark-outline-disabled-bg, transparent)',
  DarkOutlineActiveBG = 'var(--alf-dark-outline-active-bg, rgba(33, 37, 41, 0.04))',
  DarkOutlineHoverBG = 'var(--alf-dark-outline-hover-bg, rgba(33, 37, 41, 0.04))',

  DarkOutlineText = 'var(--alf-dark-outline-text, #212529)',
  DarkOutlineTextFocus = 'var(--alf-dark-outline-text-focus, #1d2124)',
  DarkOutlineTextDisabled = 'var(--alf-dark-outline-text-disabled, #92979c)',
  DarkOutlineTextActive = 'var(--alf-dark-outline-text-active, #1d2124)',
  DarkOutlineTextHover = 'var(--alf-dark-outline-text-hover, #1d2124)',

  DarkOutlineBorder = 'var(--alf-dark-outline-border, #212529)',
  DarkOutlineBorderHover = 'var(--alf-dark-outline-border-hover, #1d2124)',
  DarkOutlineBorderFocus = 'var(--alf-dark-outline-border-focus, #1d2124)',
  DarkOutlineBorderDisabled = 'var(--alf-dark-outline-border-disabled, #92979c)',
  DarkOutlineBorderActive = 'var(--alf-dark-outline-border-active, #1d2124)',

  // ===== CRYSTAL MODALITY =====
  // ------------------------------------------------
  // PRIMARY
  // ------------------------------------------------
  PrimaryCrystal = 'var(--alf-primary-crystal, rgba(13, 110, 253, 0.15))',
  PrimaryCrystalFocus = 'var(--alf-primary-crystal-focus, #4085ef26)',
  PrimaryCrystalDisabled = 'var(--alf-primary-crystal-disabled, #c6d8f5)',
  PrimaryCrystalActive = 'var(--alf-primary-crystal-active, #2d6fd426)',
  PrimaryCrystalHover = 'var(--alf-primary-crystal-hover, rgba(13, 110, 253, 0.25))',

  PrimaryCrystalBG = 'var(--alf-primary-crystal-bg, rgba(13, 110, 253, 0.15))',
  PrimaryCrystalFocusBG = 'var(--alf-primary-crystal-focus-bg, #4085ef26)',
  PrimaryCrystalDisabledBG = 'var(--alf-primary-crystal-disabled-bg, #c6d8f5)',
  PrimaryCrystalActiveBG = 'var(--alf-primary-crystal-active-bg, #2d6fd426)',
  PrimaryCrystalHoverBG = 'var(--alf-primary-crystal-hover-bg, rgba(13, 110, 253, 0.25))',

  PrimaryCrystalText = 'var(--alf-primary-crystal-text, #5a9bfdff)',
  PrimaryCrystalTextFocus = 'var(--alf-primary-crystal-text-focus, #4085efff)',
  PrimaryCrystalTextDisabled = 'var(--alf-primary-crystal-text-disabled, #c6d8f5)',
  PrimaryCrystalTextActive = 'var(--alf-primary-crystal-text-active, #2d6fd4ff)',
  PrimaryCrystalTextHover = 'var(--alf-primary-crystal-text-hover, #4085efff)',

  PrimaryCrystalBorder = 'var(--alf-primary-crystal-border, rgba(13, 110, 253, 0.15))',
  PrimaryCrystalBorderHover = 'var(--alf-primary-crystal-border-hover, rgba(13, 110, 253, 0.25))',
  PrimaryCrystalBorderFocus = 'var(--alf-primary-crystal-border-focus, #4085ef26)',
  PrimaryCrystalBorderDisabled = 'var(--alf-primary-crystal-border-disabled, #c6d8f5)',
  PrimaryCrystalBorderActive = 'var(--alf-primary-crystal-border-active, #2d6fd426)',

  // ------------------------------------------------
  // SECONDARY
  // ------------------------------------------------
  SecondaryCrystal = 'var(--alf-secondary-crystal, rgba(108, 117, 125, 0.15))',
  SecondaryCrystalFocus = 'var(--alf-secondary-crystal-focus, #75879726)',
  SecondaryCrystalDisabled = 'var(--alf-secondary-crystal-disabled, #d5d8da)',
  SecondaryCrystalActive = 'var(--alf-secondary-crystal-active, #5d6e7e26)',
  SecondaryCrystalHover = 'var(--alf-secondary-crystal-hover, rgba(108, 117, 125, 0.25))',

  SecondaryCrystalBG = 'var(--alf-secondary-crystal-bg, rgba(108, 117, 125, 0.15))',
  SecondaryCrystalFocusBG = 'var(--alf-secondary-crystal-focus-bg, #75879726)',
  SecondaryCrystalDisabledBG = 'var(--alf-secondary-crystal-disabled-bg, #d5d8da)',
  SecondaryCrystalActiveBG = 'var(--alf-secondary-crystal-active-bg, #5d6e7e26)',
  SecondaryCrystalHoverBG = 'var(--alf-secondary-crystal-hover-bg, rgba(108, 117, 125, 0.25))',

  SecondaryCrystalText = 'var(--alf-secondary-crystal-text, #8fa0b0ff)',
  SecondaryCrystalTextFocus = 'var(--alf-secondary-crystal-text-focus, #758797ff)',
  SecondaryCrystalTextDisabled = 'var(--alf-secondary-crystal-text-disabled, #d5d8da)',
  SecondaryCrystalTextActive = 'var(--alf-secondary-crystal-text-active, #5d6e7eff)',
  SecondaryCrystalTextHover = 'var(--alf-secondary-crystal-text-hover, #758797ff)',

  SecondaryCrystalBorder = 'var(--alf-secondary-crystal-border, rgba(108, 117, 125, 0.15))',
  SecondaryCrystalBorderHover = 'var(--alf-secondary-crystal-border-hover, rgba(108, 117, 125, 0.25))',
  SecondaryCrystalBorderFocus = 'var(--alf-secondary-crystal-border-focus, #75879726)',
  SecondaryCrystalBorderDisabled = 'var(--alf-secondary-crystal-border-disabled, #d5d8da)',
  SecondaryCrystalBorderActive = 'var(--alf-secondary-crystal-border-active, #5d6e7e26)',

  // ------------------------------------------------
  // SUCCESS
  // ------------------------------------------------
  SuccessCrystal = 'var(--alf-success-crystal, rgba(25, 135, 84, 0.15))',
  SuccessCrystalFocus = 'var(--alf-success-crystal-focus, #57a88226)',
  SuccessCrystalDisabled = 'var(--alf-success-crystal-disabled, #cae3d6)',
  SuccessCrystalActive = 'var(--alf-success-crystal-active, #43926c26)',
  SuccessCrystalHover = 'var(--alf-success-crystal-hover, rgba(25, 135, 84, 0.25))',

  SuccessCrystalBG = 'var(--alf-success-crystal-bg, rgba(25, 135, 84, 0.15))',
  SuccessCrystalFocusBG = 'var(--alf-success-crystal-focus-bg, #57a88226)',
  SuccessCrystalDisabledBG = 'var(--alf-success-crystal-disabled-bg, #cae3d6)',
  SuccessCrystalActiveBG = 'var(--alf-success-crystal-active-bg, #43926c26)',
  SuccessCrystalHoverBG = 'var(--alf-success-crystal-hover-bg, rgba(25, 135, 84, 0.25))',

  SuccessCrystalText = 'var(--alf-success-crystal-text, #6cbd97ff)',
  SuccessCrystalTextFocus = 'var(--alf-success-crystal-text-focus, #57a882ff)',
  SuccessCrystalTextDisabled = 'var(--alf-success-crystal-text-disabled, #cae3d6)',
  SuccessCrystalTextActive = 'var(--alf-success-crystal-text-active, #43926cff)',
  SuccessCrystalTextHover = 'var(--alf-success-crystal-text-hover, #57a882ff)',

  SuccessCrystalBorder = 'var(--alf-success-crystal-border, rgba(25, 135, 84, 0.15))',
  SuccessCrystalBorderHover = 'var(--alf-success-crystal-border-hover, rgba(25, 135, 84, 0.25))',
  SuccessCrystalBorderFocus = 'var(--alf-success-crystal-border-focus, #57a88226)',
  SuccessCrystalBorderDisabled = 'var(--alf-success-crystal-border-disabled, #cae3d6)',
  SuccessCrystalBorderActive = 'var(--alf-success-crystal-border-active, #43926c26)',

  // ------------------------------------------------
  // DANGER
  // ------------------------------------------------
  DangerCrystal = 'var(--alf-danger-crystal, rgba(220, 53, 69, 0.15))',
  DangerCrystalFocus = 'var(--alf-danger-crystal-focus, #e2586726)',
  DangerCrystalDisabled = 'var(--alf-danger-crystal-disabled, #f5ced2)',
  DangerCrystalActive = 'var(--alf-danger-crystal-active, #cb3f4e26)',
  DangerCrystalHover = 'var(--alf-danger-crystal-hover, rgba(220, 53, 69, 0.25))',

  DangerCrystalBG = 'var(--alf-danger-crystal-bg, rgba(220, 53, 69, 0.15))',
  DangerCrystalFocusBG = 'var(--alf-danger-crystal-focus-bg, #e2586726)',
  DangerCrystalDisabledBG = 'var(--alf-danger-crystal-disabled-bg, #f5ced2)',
  DangerCrystalActiveBG = 'var(--alf-danger-crystal-active-bg, #cb3f4e26)',
  DangerCrystalHoverBG = 'var(--alf-danger-crystal-hover-bg, rgba(220, 53, 69, 0.25))',

  DangerCrystalText = 'var(--alf-danger-crystal-text, #f67280ff)',
  DangerCrystalTextFocus = 'var(--alf-danger-crystal-text-focus, #e25867ff)',
  DangerCrystalTextDisabled = 'var(--alf-danger-crystal-text-disabled, #f5ced2)',
  DangerCrystalTextActive = 'var(--alf-danger-crystal-text-active, #cb3f4eff)',
  DangerCrystalTextHover = 'var(--alf-danger-crystal-text-hover, #e25867ff)',

  DangerCrystalBorder = 'var(--alf-danger-crystal-border, rgba(220, 53, 69, 0.15))',
  DangerCrystalBorderHover = 'var(--alf-danger-crystal-border-hover, rgba(220, 53, 69, 0.25))',
  DangerCrystalBorderFocus = 'var(--alf-danger-crystal-border-focus, #e2586726)',
  DangerCrystalBorderDisabled = 'var(--alf-danger-crystal-border-disabled, #f5ced2)',
  DangerCrystalBorderActive = 'var(--alf-danger-crystal-border-active, #cb3f4e26)',

  // ------------------------------------------------
  // WARNING
  // ------------------------------------------------
  WarningCrystal = 'var(--alf-warning-crystal, rgba(255, 193, 7, 0.15))',
  WarningCrystalFocus = 'var(--alf-warning-crystal-focus, #d99e1626)',
  WarningCrystalDisabled = 'var(--alf-warning-crystal-disabled, #fcedba)',
  WarningCrystalActive = 'var(--alf-warning-crystal-active, #b7820f26)',
  WarningCrystalHover = 'var(--alf-warning-crystal-hover, rgba(255, 193, 7, 0.25))',

  WarningCrystalBG = 'var(--alf-warning-crystal-bg, rgba(255, 193, 7, 0.15))',
  WarningCrystalFocusBG = 'var(--alf-warning-crystal-focus-bg, #d99e1626)',
  WarningCrystalDisabledBG = 'var(--alf-warning-crystal-disabled-bg, #fcedba)',
  WarningCrystalActiveBG = 'var(--alf-warning-crystal-active-bg, #b7820f26)',
  WarningCrystalHoverBG = 'var(--alf-warning-crystal-hover-bg, rgba(255, 193, 7, 0.25))',

  WarningCrystalText = 'var(--alf-warning-crystal-text, #f0b429ff)',
  WarningCrystalTextFocus = 'var(--alf-warning-crystal-text-focus, #d99e16ff)',
  WarningCrystalTextDisabled = 'var(--alf-warning-crystal-text-disabled, #fcedba)',
  WarningCrystalTextActive = 'var(--alf-warning-crystal-text-active, #b7820fff)',
  WarningCrystalTextHover = 'var(--alf-warning-crystal-text-hover, #d99e16ff)',

  WarningCrystalBorder = 'var(--alf-warning-crystal-border, rgba(255, 193, 7, 0.15))',
  WarningCrystalBorderHover = 'var(--alf-warning-crystal-border-hover, rgba(255, 193, 7, 0.25))',
  WarningCrystalBorderFocus = 'var(--alf-warning-crystal-border-focus, #d99e1626)',
  WarningCrystalBorderDisabled = 'var(--alf-warning-crystal-border-disabled, #fcedba)',
  WarningCrystalBorderActive = 'var(--alf-warning-crystal-border-active, #b7820f26)',

  // ------------------------------------------------
  // INFO
  // ------------------------------------------------
  InfoCrystal = 'var(--alf-info-crystal, rgba(13, 202, 240, 0.15))',
  InfoCrystalFocus = 'var(--alf-info-crystal-focus, #35acc726)',
  InfoCrystalDisabled = 'var(--alf-info-crystal-disabled, #c3f2fa)',
  InfoCrystalActive = 'var(--alf-info-crystal-active, #2293ad26)',
  InfoCrystalHover = 'var(--alf-info-crystal-hover, rgba(13, 202, 240, 0.25))',

  InfoCrystalBG = 'var(--alf-info-crystal-bg, rgba(13, 202, 240, 0.15))',
  InfoCrystalFocusBG = 'var(--alf-info-crystal-focus-bg, #35acc726)',
  InfoCrystalDisabledBG = 'var(--alf-info-crystal-disabled-bg, #c3f2fa)',
  InfoCrystalActiveBG = 'var(--alf-info-crystal-active-bg, #2293ad26)',
  InfoCrystalHoverBG = 'var(--alf-info-crystal-hover-bg, rgba(13, 202, 240, 0.25))',

  InfoCrystalText = 'var(--alf-info-crystal-text, #4ec3deff)',
  InfoCrystalTextFocus = 'var(--alf-info-crystal-text-focus, #35acc7ff)',
  InfoCrystalTextDisabled = 'var(--alf-info-crystal-text-disabled, #c3f2fa)',
  InfoCrystalTextActive = 'var(--alf-info-crystal-text-active, #2293adff)',
  InfoCrystalTextHover = 'var(--alf-info-crystal-text-hover, #35acc7ff)',

  InfoCrystalBorder = 'var(--alf-info-crystal-border, rgba(13, 202, 240, 0.15))',
  InfoCrystalBorderHover = 'var(--alf-info-crystal-border-hover, rgba(13, 202, 240, 0.25))',
  InfoCrystalBorderFocus = 'var(--alf-info-crystal-border-focus, #35acc726)',
  InfoCrystalBorderDisabled = 'var(--alf-info-crystal-border-disabled, #c3f2fa)',
  InfoCrystalBorderActive = 'var(--alf-info-crystal-border-active, #2293ad26)',

  // ------------------------------------------------
  // LIGHT
  // ------------------------------------------------
  LightCrystal = 'var(--alf-light-crystal, rgba(206, 212, 218, 0.15))',
  LightCrystalFocus = 'var(--alf-light-crystal-focus, #21252926)',
  LightCrystalDisabled = 'var(--alf-light-crystal-disabled, #f4f5f6)',
  LightCrystalActive = 'var(--alf-light-crystal-active, #21252926)',
  LightCrystalHover = 'var(--alf-light-crystal-hover, rgba(206, 212, 218, 0.25))',

  LightCrystalBG = 'var(--alf-light-crystal-bg, rgba(206, 212, 218, 0.15))',
  LightCrystalFocusBG = 'var(--alf-light-crystal-focus-bg, #21252926)',
  LightCrystalDisabledBG = 'var(--alf-light-crystal-disabled-bg, #f4f5f6)',
  LightCrystalActiveBG = 'var(--alf-light-crystal-active-bg, #21252926)',
  LightCrystalHoverBG = 'var(--alf-light-crystal-hover-bg, rgba(206, 212, 218, 0.25))',

  LightCrystalText = 'var(--alf-light-crystal-text, #495057ff)',
  LightCrystalTextFocus = 'var(--alf-light-crystal-text-focus, #212529ff)',
  LightCrystalTextDisabled = 'var(--alf-light-crystal-text-disabled, #f4f5f6)',
  LightCrystalTextActive = 'var(--alf-light-crystal-text-active, #212529ff)',
  LightCrystalTextHover = 'var(--alf-light-crystal-text-hover, #212529ff)',

  LightCrystalBorder = 'var(--alf-light-crystal-border, rgba(206, 212, 218, 0.15))',
  LightCrystalBorderHover = 'var(--alf-light-crystal-border-hover, rgba(206, 212, 218, 0.25))',
  LightCrystalBorderFocus = 'var(--alf-light-crystal-border-focus, #21252926)',
  LightCrystalBorderDisabled = 'var(--alf-light-crystal-border-disabled, #f4f5f6)',
  LightCrystalBorderActive = 'var(--alf-light-crystal-border-active, #21252926)',

  // ------------------------------------------------
  // DARK
  // ------------------------------------------------
  DarkCrystal = 'var(--alf-dark-crystal, rgba(33, 37, 41, 0.15))',
  DarkCrystalFocus = 'var(--alf-dark-crystal-focus, #49505726)',
  DarkCrystalDisabled = 'var(--alf-dark-crystal-disabled, #c0c2c4)',
  DarkCrystalActive = 'var(--alf-dark-crystal-active, #343a4026)',
  DarkCrystalHover = 'var(--alf-dark-crystal-hover, rgba(33, 37, 41, 0.25))',

  DarkCrystalBG = 'var(--alf-dark-crystal-bg, rgba(33, 37, 41, 0.15))',
  DarkCrystalFocusBG = 'var(--alf-dark-crystal-focus-bg, #49505726)',
  DarkCrystalDisabledBG = 'var(--alf-dark-crystal-disabled-bg, #c0c2c4)',
  DarkCrystalActiveBG = 'var(--alf-dark-crystal-active-bg, #343a4026)',
  DarkCrystalHoverBG = 'var(--alf-dark-crystal-hover-bg, rgba(33, 37, 41, 0.25))',

  DarkCrystalText = 'var(--alf-dark-crystal-text, #6c757dff)',
  DarkCrystalTextFocus = 'var(--alf-dark-crystal-text-focus, #495057ff)',
  DarkCrystalTextDisabled = 'var(--alf-dark-crystal-text-disabled, #c0c2c4)',
  DarkCrystalTextActive = 'var(--alf-dark-crystal-text-active, #343a40ff)',
  DarkCrystalTextHover = 'var(--alf-dark-crystal-text-hover, #495057ff)',

  DarkCrystalBorder = 'var(--alf-dark-crystal-border, rgba(33, 37, 41, 0.15))',
  DarkCrystalBorderHover = 'var(--alf-dark-crystal-border-hover, rgba(33, 37, 41, 0.25))',
  DarkCrystalBorderFocus = 'var(--alf-dark-crystal-border-focus, #49505726)',
  DarkCrystalBorderDisabled = 'var(--alf-dark-crystal-border-disabled, #c0c2c4)',
  DarkCrystalBorderActive = 'var(--alf-dark-crystal-border-active, #343a4026)',

  // ===== SOFT MODALITY =====
  PrimarySoft = 'var(--alf-primary-soft, #eff6ff)',
  PrimarySoftFocus = 'var(--alf-primary-soft-focus, #4085ef26)',
  PrimarySoftDisabled = 'var(--alf-primary-soft-disabled, #c6d8f5)',
  PrimarySoftActive = 'var(--alf-primary-soft-active, #2d6fd426)',
  PrimarySoftHover = 'var(--alf-primary-soft-hover, #eaf3fe)',

  PrimarySoftBG = 'var(--alf-primary-soft-bg, #f4f9ff)',
  PrimarySoftFocusBG = 'var(--alf-primary-soft-focus-bg, #4085ef26)',
  PrimarySoftDisabledBG = 'var(--alf-primary-soft-disabled-bg, #c6d8f5)',
  PrimarySoftActiveBG = 'var(--alf-primary-soft-active-bg, #2d6fd426)',
  PrimarySoftHoverBG = 'var(--alf-primary-soft-hover-bg, #edf4fc)',

  PrimarySoftText = 'var(--alf-primary-soft-text, #5a9bfdff)',
  PrimarySoftTextFocus = 'var(--alf-primary-soft-text-focus, #4085efff)',
  PrimarySoftTextDisabled = 'var(--alf-primary-soft-text-disabled, #c6d8f5)',
  PrimarySoftTextActive = 'var(--alf-primary-soft-text-active, #2d6fd4ff)',
  PrimarySoftTextHover = 'var(--alf-primary-soft-text-hover, #4085efff)',

  PrimarySoftBorder = 'var(--alf-primary-soft-border, #dbeafe)',
  PrimarySoftBorderHover = 'var(--alf-primary-soft-border-hover, #bfdbfe)',
  PrimarySoftBorderFocus = 'var(--alf-primary-soft-border-focus, #4085ef26)',
  PrimarySoftBorderDisabled = 'var(--alf-primary-soft-border-disabled, #c6d8f5)',
  PrimarySoftBorderActive = 'var(--alf-primary-soft-border-active, #2d6fd426)',

  SecondarySoft = 'var(--alf-secondary-soft, #f8f9fa)',
  SecondarySoftFocus = 'var(--alf-secondary-soft-focus, #75879726)',
  SecondarySoftDisabled = 'var(--alf-secondary-soft-disabled, #d5d8da)',
  SecondarySoftActive = 'var(--alf-secondary-soft-active, #5d6e7e26)',
  SecondarySoftHover = 'var(--alf-secondary-soft-hover, #f4f5f7)',

  SecondarySoftBG = 'var(--alf-secondary-soft-bg, #fbfcfd)',
  SecondarySoftFocusBG = 'var(--alf-secondary-soft-focus-bg, #75879726)',
  SecondarySoftDisabledBG = 'var(--alf-secondary-soft-disabled-bg, #d5d8da)',
  SecondarySoftActiveBG = 'var(--alf-secondary-soft-active-bg, #5d6e7e26)',
  SecondarySoftHoverBG = 'var(--alf-secondary-soft-hover-bg, #f4f5f7)',

  SecondarySoftText = 'var(--alf-secondary-soft-text, #8fa0b0ff)',
  SecondarySoftTextFocus = 'var(--alf-secondary-soft-text-focus, #758797ff)',
  SecondarySoftTextDisabled = 'var(--alf-secondary-soft-text-disabled, #d5d8da)',
  SecondarySoftTextActive = 'var(--alf-secondary-soft-text-active, #5d6e7eff)',
  SecondarySoftTextHover = 'var(--alf-secondary-soft-text-hover, #758797ff)',

  SecondarySoftBorder = 'var(--alf-secondary-soft-border, #e9ecef)',
  SecondarySoftBorderHover = 'var(--alf-secondary-soft-border-hover, #dee2e6)',
  SecondarySoftBorderFocus = 'var(--alf-secondary-soft-border-focus, #75879726)',
  SecondarySoftBorderDisabled = 'var(--alf-secondary-soft-border-disabled, #d5d8da)',
  SecondarySoftBorderActive = 'var(--alf-secondary-soft-border-active, #5d6e7e26)',

  SuccessSoft = 'var(--alf-success-soft, #f0fdf4)',
  SuccessSoftFocus = 'var(--alf-success-soft-focus, #57a88226)',
  SuccessSoftDisabled = 'var(--alf-success-soft-disabled, #cae3d6)',
  SuccessSoftActive = 'var(--alf-success-soft-active, #43926c26)',
  SuccessSoftHover = 'var(--alf-success-soft-hover, #ebfcf0)',

  SuccessSoftBG = 'var(--alf-success-soft-bg, #f6fef8)',
  SuccessSoftFocusBG = 'var(--alf-success-soft-focus-bg, #57a88226)',
  SuccessSoftDisabledBG = 'var(--alf-success-soft-disabled-bg, #cae3d6)',
  SuccessSoftActiveBG = 'var(--alf-success-soft-active-bg, #43926c26)',
  SuccessSoftHoverBG = 'var(--alf-success-soft-hover-bg, #edfcf2)',

  SuccessSoftText = 'var(--alf-success-soft-text, #6cbd97ff)',
  SuccessSoftTextFocus = 'var(--alf-success-soft-text-focus, #57a882ff)',
  SuccessSoftTextDisabled = 'var(--alf-success-soft-text-disabled, #cae3d6)',
  SuccessSoftTextActive = 'var(--alf-success-soft-text-active, #43926cff)',
  SuccessSoftTextHover = 'var(--alf-success-soft-text-hover, #57a882ff)',

  SuccessSoftBorder = 'var(--alf-success-soft-border, #dcfce7)',
  SuccessSoftBorderHover = 'var(--alf-success-soft-border-hover, #bbf7d0)',
  SuccessSoftBorderFocus = 'var(--alf-success-soft-border-focus, #57a88226)',
  SuccessSoftBorderDisabled = 'var(--alf-success-soft-border-disabled, #cae3d6)',
  SuccessSoftBorderActive = 'var(--alf-success-soft-border-active, #43926c26)',

  DangerSoft = 'var(--alf-danger-soft, #fef2f2)',
  DangerSoftFocus = 'var(--alf-danger-soft-focus, #e2586726)',
  DangerSoftDisabled = 'var(--alf-danger-soft-disabled, #f5ced2)',
  DangerSoftActive = 'var(--alf-danger-soft-active, #cb3f4e26)',
  DangerSoftHover = 'var(--alf-danger-soft-hover, #feeeee)',

  DangerSoftBG = 'var(--alf-danger-soft-bg, #fef7f7)',
  DangerSoftFocusBG = 'var(--alf-danger-soft-focus-bg, #e2586726)',
  DangerSoftDisabledBG = 'var(--alf-danger-soft-disabled-bg, #f5ced2)',
  DangerSoftActiveBG = 'var(--alf-danger-soft-active-bg, #cb3f4e26)',
  DangerSoftHoverBG = 'var(--alf-danger-soft-hover-bg, #fceeee)',

  DangerSoftText = 'var(--alf-danger-soft-text, #f67280ff)',
  DangerSoftTextFocus = 'var(--alf-danger-soft-text-focus, #e25867ff)',
  DangerSoftTextDisabled = 'var(--alf-danger-soft-text-disabled, #f5ced2)',
  DangerSoftTextActive = 'var(--alf-danger-soft-text-active, #cb3f4eff)',
  DangerSoftTextHover = 'var(--alf-danger-soft-text-hover, #e25867ff)',

  DangerSoftBorder = 'var(--alf-danger-soft-border, #fee2e2)',
  DangerSoftBorderHover = 'var(--alf-danger-soft-border-hover, #fecaca)',
  DangerSoftBorderFocus = 'var(--alf-danger-soft-border-focus, #e2586726)',
  DangerSoftBorderDisabled = 'var(--alf-danger-soft-border-disabled, #f5ced2)',
  DangerSoftBorderActive = 'var(--alf-danger-soft-border-active, #cb3f4e26)',

  WarningSoft = 'var(--alf-warning-soft, #fffbeb)',
  WarningSoftFocus = 'var(--alf-warning-soft-focus, #d99e1626)',
  WarningSoftDisabled = 'var(--alf-warning-soft-disabled, #fcedba)',
  WarningSoftActive = 'var(--alf-warning-soft-active, #b7820f26)',
  WarningSoftHover = 'var(--alf-warning-soft-hover, #fef9e2)',

  WarningSoftBG = 'var(--alf-warning-soft-bg, #fffdf4)',
  WarningSoftFocusBG = 'var(--alf-warning-soft-focus-bg, #d99e1626)',
  WarningSoftDisabledBG = 'var(--alf-warning-soft-disabled-bg, #fcedba)',
  WarningSoftActiveBG = 'var(--alf-warning-soft-active-bg, #b7820f26)',
  WarningSoftHoverBG = 'var(--alf-warning-soft-hover-bg, #fef9e2)',

  WarningSoftText = 'var(--alf-warning-soft-text, #f0b429ff)',
  WarningSoftTextFocus = 'var(--alf-warning-soft-text-focus, #d99e16ff)',
  WarningSoftTextDisabled = 'var(--alf-warning-soft-text-disabled, #fcedba)',
  WarningSoftTextActive = 'var(--alf-warning-soft-text-active, #b7820fff)',
  WarningSoftTextHover = 'var(--alf-warning-soft-text-hover, #d99e16ff)',

  WarningSoftBorder = 'var(--alf-warning-soft-border, #fef3c7)',
  WarningSoftBorderHover = 'var(--alf-warning-soft-border-hover, #fde68a)',
  WarningSoftBorderFocus = 'var(--alf-warning-soft-border-focus, #d99e1626)',
  WarningSoftBorderDisabled = 'var(--alf-warning-soft-border-disabled, #fcedba)',
  WarningSoftBorderActive = 'var(--alf-warning-soft-border-active, #b7820f26)',

  InfoSoft = 'var(--alf-info-soft, #ecfeff)',
  InfoSoftFocus = 'var(--alf-info-soft-focus, #35acc726)',
  InfoSoftDisabled = 'var(--alf-info-soft-disabled, #c3f2fa)',
  InfoSoftActive = 'var(--alf-info-soft-active, #2293ad26)',
  InfoSoftHover = 'var(--alf-info-soft-hover, #e4fdfe)',

  InfoSoftBG = 'var(--alf-info-soft-bg, #f4feff)',
  InfoSoftFocusBG = 'var(--alf-info-soft-focus-bg, #35acc726)',
  InfoSoftDisabledBG = 'var(--alf-info-soft-disabled-bg, #c3f2fa)',
  InfoSoftActiveBG = 'var(--alf-info-soft-active-bg, #2293ad26)',
  InfoSoftHoverBG = 'var(--alf-info-soft-hover-bg, #e8fcff)',

  InfoSoftText = 'var(--alf-info-soft-text, #4ec3deff)',
  InfoSoftTextFocus = 'var(--alf-info-soft-text-focus, #35acc7ff)',
  InfoSoftTextDisabled = 'var(--alf-info-soft-text-disabled, #c3f2fa)',
  InfoSoftTextActive = 'var(--alf-info-soft-text-active, #2293adff)',
  InfoSoftTextHover = 'var(--alf-info-soft-text-hover, #35acc7ff)',

  InfoSoftBorder = 'var(--alf-info-soft-border, #cffafe)',
  InfoSoftBorderHover = 'var(--alf-info-soft-border-hover, #a5f3fc)',
  InfoSoftBorderFocus = 'var(--alf-info-soft-border-focus, #35acc726)',
  InfoSoftBorderDisabled = 'var(--alf-info-soft-border-disabled, #c3f2fa)',
  InfoSoftBorderActive = 'var(--alf-info-soft-border-active, #2293ad26)',

  LightSoft = 'var(--alf-light-soft, #f8f9fa)',
  LightSoftFocus = 'var(--alf-light-soft-focus, #21252926)',
  LightSoftDisabled = 'var(--alf-light-soft-disabled, #f4f5f6)',
  LightSoftActive = 'var(--alf-light-soft-active, #21252926)',
  LightSoftHover = 'var(--alf-light-soft-hover, #f4f5f7)',

  LightSoftBG = 'var(--alf-light-soft-bg, #fbfcfd)',
  LightSoftFocusBG = 'var(--alf-light-soft-focus-bg, #21252926)',
  LightSoftDisabledBG = 'var(--alf-light-soft-disabled-bg, #f4f5f6)',
  LightSoftActiveBG = 'var(--alf-light-soft-active-bg, #21252926)',
  LightSoftHoverBG = 'var(--alf-light-soft-hover-bg, #f4f5f7)',

  LightSoftText = 'var(--alf-light-soft-text, #212529)',
  LightSoftTextFocus = 'var(--alf-light-soft-text-focus, #212529)',
  LightSoftTextDisabled = 'var(--alf-light-soft-text-disabled, #f4f5f6)',
  LightSoftTextActive = 'var(--alf-light-soft-text-active, #212529)',
  LightSoftTextHover = 'var(--alf-light-soft-text-hover, #212529)',

  LightSoftBorder = 'var(--alf-light-soft-border, #e9ecef)',
  LightSoftBorderHover = 'var(--alf-light-soft-border-hover, #dee2e6)',
  LightSoftBorderFocus = 'var(--alf-light-soft-border-focus, #21252926)',
  LightSoftBorderDisabled = 'var(--alf-light-soft-border-disabled, #f4f5f6)',
  LightSoftBorderActive = 'var(--alf-light-soft-border-active, #21252926)',

  DarkSoft = 'var(--alf-dark-soft, #e9ecef)',
  DarkSoftFocus = 'var(--alf-dark-soft-focus, #49505726)',
  DarkSoftDisabled = 'var(--alf-dark-soft-disabled, #c0c2c4)',
  DarkSoftActive = 'var(--alf-dark-soft-active, #343a4026)',
  DarkSoftHover = 'var(--alf-dark-soft-hover, #e6e9ec)',

  DarkSoftBG = 'var(--alf-dark-soft-bg, #f0f2f5)',
  DarkSoftFocusBG = 'var(--alf-dark-soft-focus-bg, #49505726)',
  DarkSoftDisabledBG = 'var(--alf-dark-soft-disabled-bg, #c0c2c4)',
  DarkSoftActiveBG = 'var(--alf-dark-soft-active-bg, #343a4026)',
  DarkSoftHoverBG = 'var(--alf-dark-soft-hover-bg, #e8ebef)',

  DarkSoftText = 'var(--alf-dark-soft-text, #6c757d)',
  DarkSoftTextFocus = 'var(--alf-dark-soft-text-focus, #495057)',
  DarkSoftTextDisabled = 'var(--alf-dark-soft-text-disabled, #c0c2c4)',
  DarkSoftTextActive = 'var(--alf-dark-soft-text-active, #343a40)',
  DarkSoftTextHover = 'var(--alf-dark-soft-text-hover, #495057)',

  DarkSoftBorder = 'var(--alf-dark-soft-border, #dee2e6)',
  DarkSoftBorderHover = 'var(--alf-dark-soft-border-hover, #ced4da)',
  DarkSoftBorderFocus = 'var(--alf-dark-soft-border-focus, #49505726)',
  DarkSoftBorderDisabled = 'var(--alf-dark-soft-border-disabled, #c0c2c4)',
  DarkSoftBorderActive = 'var(--alf-dark-soft-border-active, #343a4026)',

  // ===== 3D MODALITY =====
  Primary3D = 'var(--alf-primary-3d, linear-gradient(to bottom, #4ea1fd, #0d6efd))',
  Primary3DFocus = 'var(--alf-primary-3d-focus, linear-gradient(to bottom, #0d6efd, #0a58ca))',
  Primary3DDisabled = 'var(--alf-primary-3d-disabled, #b6cbf2)',
  Primary3DActive = 'var(--alf-primary-3d-active, linear-gradient(to bottom, #0a58ca, #084298))',
  Primary3DHover = 'var(--alf-primary-3d-hover, linear-gradient(to bottom, #0d6efd, #0a58ca))',

  Primary3DBG = 'var(--alf-primary-3d-bg, linear-gradient(to bottom, #4ea1fd, #0d6efd))',
  Primary3DFocusBG = 'var(--alf-primary-3d-focus-bg, linear-gradient(to bottom, #0d6efd, #0a58ca))',
  Primary3DDisabledBG = 'var(--alf-primary-3d-disabled-bg, #b6cbf2)',
  Primary3DActiveBG = 'var(--alf-primary-3d-active-bg, linear-gradient(to bottom, #0a58ca, #084298))',
  Primary3DHoverBG = 'var(--alf-primary-3d-hover-bg, linear-gradient(to bottom, #0d6efd, #0a58ca))',

  Primary3DText = 'var(--alf-primary-3d-text, #ffffffff)',
  Primary3DTextFocus = 'var(--alf-primary-3d-text-focus, #ffffffff)',
  Primary3DTextDisabled = 'var(--alf-primary-3d-text-disabled, #b6cbf2)',
  Primary3DTextActive = 'var(--alf-primary-3d-text-active, #ffffffff)',
  Primary3DTextHover = 'var(--alf-primary-3d-text-hover, #d1d1d1ff)',

  Primary3DBorder = 'var(--alf-primary-3d-border, #4ea1fd)',
  Primary3DBorderHover = 'var(--alf-primary-3d-border-hover, #0d6efd)',
  Primary3DBorderFocus = 'var(--alf-primary-3d-border-focus, #0d6efd)',
  Primary3DBorderDisabled = 'var(--alf-primary-3d-border-disabled, #b6cbf2)',
  Primary3DBorderActive = 'var(--alf-primary-3d-border-active, #0a58ca)',

  Secondary3D = 'var(--alf-secondary-3d, linear-gradient(to bottom, #8a9197, #6c757d))',
  Secondary3DFocus = 'var(--alf-secondary-3d-focus, linear-gradient(to bottom, #6c757d, #5a6268))',
  Secondary3DDisabled = 'var(--alf-secondary-3d-disabled, #c4c8cb)',
  Secondary3DActive = 'var(--alf-secondary-3d-active, linear-gradient(to bottom, #5a6268, #4e555b))',
  Secondary3DHover = 'var(--alf-secondary-3d-hover, linear-gradient(to bottom, #6c757d, #5a6268))',

  Secondary3DBG = 'var(--alf-secondary-3d-bg, linear-gradient(to bottom, #8a9197, #6c757d))',
  Secondary3DFocusBG = 'var(--alf-secondary-3d-focus-bg, linear-gradient(to bottom, #6c757d, #5a6268))',
  Secondary3DDisabledBG = 'var(--alf-secondary-3d-disabled-bg, #c4c8cb)',
  Secondary3DActiveBG = 'var(--alf-secondary-3d-active-bg, linear-gradient(to bottom, #5a6268, #4e555b))',
  Secondary3DHoverBG = 'var(--alf-secondary-3d-hover-bg, linear-gradient(to bottom, #6c757d, #5a6268))',

  Secondary3DText = 'var(--alf-secondary-3d-text, #ffffffff)',
  Secondary3DTextFocus = 'var(--alf-secondary-3d-text-focus, #ffffffff)',
  Secondary3DTextDisabled = 'var(--alf-secondary-3d-text-disabled, #c4c8cb)',
  Secondary3DTextActive = 'var(--alf-secondary-3d-text-active, #ffffffff)',
  Secondary3DTextHover = 'var(--alf-secondary-3d-text-hover, #d1d1d1ff)',

  Secondary3DBorder = 'var(--alf-secondary-3d-border, #8a9197)',
  Secondary3DBorderHover = 'var(--alf-secondary-3d-border-hover, #6c757d)',
  Secondary3DBorderFocus = 'var(--alf-secondary-3d-border-focus, #6c757d)',
  Secondary3DBorderDisabled = 'var(--alf-secondary-3d-border-disabled, #c4c8cb)',
  Secondary3DBorderActive = 'var(--alf-secondary-3d-border-active, #5a6268)',

  Success3D = 'var(--alf-success-3d, linear-gradient(to bottom, #28a745, #198754))',
  Success3DFocus = 'var(--alf-success-3d-focus, linear-gradient(to bottom, #198754, #157347))',
  Success3DDisabled = 'var(--alf-success-3d-disabled, #b3d7c4)',
  Success3DActive = 'var(--alf-success-3d-active, linear-gradient(to bottom, #157347, #115c3a))',
  Success3DHover = 'var(--alf-success-3d-hover, linear-gradient(to bottom, #198754, #157347))',

  Success3DBG = 'var(--alf-success-3d-bg, linear-gradient(to bottom, #28a745, #198754))',
  Success3DFocusBG = 'var(--alf-success-3d-focus-bg, linear-gradient(to bottom, #198754, #157347))',
  Success3DDisabledBG = 'var(--alf-success-3d-disabled-bg, #b3d7c4)',
  Success3DActiveBG = 'var(--alf-success-3d-active-bg, linear-gradient(to bottom, #157347, #115c3a))',
  Success3DHoverBG = 'var(--alf-success-3d-hover-bg, linear-gradient(to bottom, #198754, #157347))',

  Success3DText = 'var(--alf-success-3d-text, #ffffffff)',
  Success3DTextFocus = 'var(--alf-success-3d-text-focus, #ffffffff)',
  Success3DTextDisabled = 'var(--alf-success-3d-text-disabled, #b3d7c4)',
  Success3DTextActive = 'var(--alf-success-3d-text-active, #ffffffff)',
  Success3DTextHover = 'var(--alf-success-3d-text-hover, #d1d1d1ff)',

  Success3DBorder = 'var(--alf-success-3d-border, #28a745)',
  Success3DBorderHover = 'var(--alf-success-3d-border-hover, #198754)',
  Success3DBorderFocus = 'var(--alf-success-3d-border-focus, #198754)',
  Success3DBorderDisabled = 'var(--alf-success-3d-border-disabled, #b3d7c4)',
  Success3DBorderActive = 'var(--alf-success-3d-border-active, #157347)',

  Danger3D = 'var(--alf-danger-3d, linear-gradient(to bottom, #e35d6a, #dc3545))',
  Danger3DFocus = 'var(--alf-danger-3d-focus, linear-gradient(to bottom, #dc3545, #bb2d3b))',
  Danger3DDisabled = 'var(--alf-danger-3d-disabled, #f1b8be)',
  Danger3DActive = 'var(--alf-danger-3d-active, linear-gradient(to bottom, #bb2d3b, #a52834))',
  Danger3DHover = 'var(--alf-danger-3d-hover, linear-gradient(to bottom, #dc3545, #bb2d3b))',

  Danger3DBG = 'var(--alf-danger-3d-bg, linear-gradient(to bottom, #e35d6a, #dc3545))',
  Danger3DFocusBG = 'var(--alf-danger-3d-focus-bg, linear-gradient(to bottom, #dc3545, #bb2d3b))',
  Danger3DDisabledBG = 'var(--alf-danger-3d-disabled-bg, #f1b8be)',
  Danger3DActiveBG = 'var(--alf-danger-3d-active-bg, linear-gradient(to bottom, #bb2d3b, #a52834))',
  Danger3DHoverBG = 'var(--alf-danger-3d-hover-bg, linear-gradient(to bottom, #dc3545, #bb2d3b))',

  Danger3DText = 'var(--alf-danger-3d-text, #ffffffff)',
  Danger3DTextFocus = 'var(--alf-danger-3d-text-focus, #ffffffff)',
  Danger3DTextDisabled = 'var(--alf-danger-3d-text-disabled, #f1b8be)',
  Danger3DTextActive = 'var(--alf-danger-3d-text-active, #ffffffff)',
  Danger3DTextHover = 'var(--alf-danger-3d-text-hover, #d1d1d1ff)',

  Danger3DBorder = 'var(--alf-danger-3d-border, #e35d6a)',
  Danger3DBorderHover = 'var(--alf-danger-3d-border-hover, #dc3545)',
  Danger3DBorderFocus = 'var(--alf-danger-3d-border-focus, #dc3545)',
  Danger3DBorderDisabled = 'var(--alf-danger-3d-border-disabled, #f1b8be)',
  Danger3DBorderActive = 'var(--alf-danger-3d-border-active, #bb2d3b)',

  Warning3D = 'var(--alf-warning-3d, linear-gradient(to bottom, #ffcd39, #ffc107))',
  Warning3DFocus = 'var(--alf-warning-3d-focus, linear-gradient(to bottom, #ffc107, #ffca2c))',
  Warning3DDisabled = 'var(--alf-warning-3d-disabled, #fce59f)',
  Warning3DActive = 'var(--alf-warning-3d-active, linear-gradient(to bottom, #ffca2c, #e0a800))',
  Warning3DHover = 'var(--alf-warning-3d-hover, linear-gradient(to bottom, #ffc107, #ffca2c))',

  Warning3DBG = 'var(--alf-warning-3d-bg, linear-gradient(to bottom, #ffcd39, #ffc107))',
  Warning3DFocusBG = 'var(--alf-warning-3d-focus-bg, linear-gradient(to bottom, #ffc107, #ffca2c))',
  Warning3DDisabledBG = 'var(--alf-warning-3d-disabled-bg, #fce59f)',
  Warning3DActiveBG = 'var(--alf-warning-3d-active-bg, linear-gradient(to bottom, #ffca2c, #e0a800))',
  Warning3DHoverBG = 'var(--alf-warning-3d-hover-bg, linear-gradient(to bottom, #ffc107, #ffca2c))',

  Warning3DText = 'var(--alf-warning-3d-text, #565656ff)',
  Warning3DTextFocus = 'var(--alf-warning-3d-text-focus, #565656ff)',
  Warning3DTextDisabled = 'var(--alf-warning-3d-text-disabled, #fce59f)',
  Warning3DTextActive = 'var(--alf-warning-3d-text-active, #565656ff)',
  Warning3DTextHover = 'var(--alf-warning-3d-text-hover, #565656ff)',

  Warning3DBorder = 'var(--alf-warning-3d-border, #ffcd39)',
  Warning3DBorderHover = 'var(--alf-warning-3d-border-hover, #ffc107)',
  Warning3DBorderFocus = 'var(--alf-warning-3d-border-focus, #ffc107)',
  Warning3DBorderDisabled = 'var(--alf-warning-3d-border-disabled, #fce59f)',
  Warning3DBorderActive = 'var(--alf-warning-3d-border-active, #ffca2c)',

  Info3D = 'var(--alf-info-3d, linear-gradient(to bottom, #39d9fa, #0dcaf0))',
  Info3DFocus = 'var(--alf-info-3d-focus, linear-gradient(to bottom, #0dcaf0, #31d2f2))',
  Info3DDisabled = 'var(--alf-info-3d-disabled, #abecf7)',
  Info3DActive = 'var(--alf-info-3d-active, linear-gradient(to bottom, #31d2f2, #0baccc))',
  Info3DHover = 'var(--alf-info-3d-hover, linear-gradient(to bottom, #0dcaf0, #31d2f2))',

  Info3DBG = 'var(--alf-info-3d-bg, linear-gradient(to bottom, #39d9fa, #0dcaf0))',
  Info3DFocusBG = 'var(--alf-info-3d-focus-bg, linear-gradient(to bottom, #0dcaf0, #31d2f2))',
  Info3DDisabledBG = 'var(--alf-info-3d-disabled-bg, #abecf7)',
  Info3DActiveBG = 'var(--alf-info-3d-active-bg, linear-gradient(to bottom, #31d2f2, #0baccc))',
  Info3DHoverBG = 'var(--alf-info-3d-hover-bg, linear-gradient(to bottom, #0dcaf0, #31d2f2))',

  Info3DText = 'var(--alf-info-3d-text, #565656ff)',
  Info3DTextFocus = 'var(--alf-info-3d-text-focus, #565656ff)',
  Info3DTextDisabled = 'var(--alf-info-3d-text-disabled, #abecf7)',
  Info3DTextActive = 'var(--alf-info-3d-text-active, #565656ff)',
  Info3DTextHover = 'var(--alf-info-3d-text-hover, #565656ff)',

  Info3DBorder = 'var(--alf-info-3d-border, #39d9fa)',
  Info3DBorderHover = 'var(--alf-info-3d-border-hover, #0dcaf0)',
  Info3DBorderFocus = 'var(--alf-info-3d-border-focus, #0dcaf0)',
  Info3DBorderDisabled = 'var(--alf-info-3d-border-disabled, #abecf7)',
  Info3DBorderActive = 'var(--alf-info-3d-border-active, #31d2f2)',

  Light3D = 'var(--alf-light-3d, linear-gradient(to bottom, #ffffff, #f8f9fa))',
  Light3DFocus = 'var(--alf-light-3d-focus, linear-gradient(to bottom, #f8f9fa, #e9ecef))',
  Light3DDisabled = 'var(--alf-light-3d-disabled, #eef0f2)',
  Light3DActive = 'var(--alf-light-3d-active, linear-gradient(to bottom, #e9ecef, #dee2e6))',
  Light3DHover = 'var(--alf-light-3d-hover, linear-gradient(to bottom, #f8f9fa, #e9ecef))',

  Light3DBG = 'var(--alf-light-3d-bg, linear-gradient(to bottom, #ffffff, #f8f9fa))',
  Light3DFocusBG = 'var(--alf-light-3d-focus-bg, linear-gradient(to bottom, #f8f9fa, #e9ecef))',
  Light3DDisabledBG = 'var(--alf-light-3d-disabled-bg, #eef0f2)',
  Light3DActiveBG = 'var(--alf-light-3d-active-bg, linear-gradient(to bottom, #e9ecef, #dee2e6))',
  Light3DHoverBG = 'var(--alf-light-3d-hover-bg, linear-gradient(to bottom, #f8f9fa, #e9ecef))',

  Light3DText = 'var(--alf-light-3d-text, #000000ff)',
  Light3DTextFocus = 'var(--alf-light-3d-text-focus, #000000ff)',
  Light3DTextDisabled = 'var(--alf-light-3d-text-disabled, #000000a6)',
  Light3DTextActive = 'var(--alf-light-3d-text-active, #000000ff)',
  Light3DTextHover = 'var(--alf-light-3d-text-hover, #1f1f1fff)',

  Light3DBorder = 'var(--alf-light-3d-border, #ffffff)',
  Light3DBorderHover = 'var(--alf-light-3d-border-hover, #f8f9fa)',
  Light3DBorderFocus = 'var(--alf-light-3d-border-focus, #f8f9fa)',
  Light3DBorderDisabled = 'var(--alf-light-3d-border-disabled, #eef0f2)',
  Light3DBorderActive = 'var(--alf-light-3d-border-active, #e9ecef)',

  Dark3D = 'var(--alf-dark-3d, linear-gradient(to bottom, #343a40, #212529))',
  Dark3DFocus = 'var(--alf-dark-3d-focus, linear-gradient(to bottom, #212529, #1c1f23))',
  Dark3DDisabled = 'var(--alf-dark-3d-disabled, #aab0b4)',
  Dark3DActive = 'var(--alf-dark-3d-active, linear-gradient(to bottom, #1c1f23, #0f0f0f))',
  Dark3DHover = 'var(--alf-dark-3d-hover, linear-gradient(to bottom, #212529, #1c1f23))',

  Dark3DBG = 'var(--alf-dark-3d-bg, linear-gradient(to bottom, #343a40, #212529))',
  Dark3DFocusBG = 'var(--alf-dark-3d-focus-bg, linear-gradient(to bottom, #212529, #1c1f23))',
  Dark3DDisabledBG = 'var(--alf-dark-3d-disabled-bg, #aab0b4)',
  Dark3DActiveBG = 'var(--alf-dark-3d-active-bg, linear-gradient(to bottom, #1c1f23, #0f0f0f))',
  Dark3DHoverBG = 'var(--alf-dark-3d-hover-bg, linear-gradient(to bottom, #212529, #1c1f23))',

  Dark3DText = 'var(--alf-dark-3d-text, #ffffffff)',
  Dark3DTextFocus = 'var(--alf-dark-3d-text-focus, #ffffffff)',
  Dark3DTextDisabled = 'var(--alf-dark-3d-text-disabled, #aab0b4)',
  Dark3DTextActive = 'var(--alf-dark-3d-text-active, #ffffffff)',
  Dark3DTextHover = 'var(--alf-dark-3d-text-hover, #d1d1d1ff)',

  Dark3DBorder = 'var(--alf-dark-3d-border, #343a40)',
  Dark3DBorderHover = 'var(--alf-dark-3d-border-hover, #212529)',
  Dark3DBorderFocus = 'var(--alf-dark-3d-border-focus, #212529)',
  Dark3DBorderDisabled = 'var(--alf-dark-3d-border-disabled, #aab0b4)',
  Dark3DBorderActive = 'var(--alf-dark-3d-border-active, #1c1f23)',

  // ===== PREMIUM GRADIENTS =====
  GradientPurple = 'var(--alf-gradient-purple, linear-gradient(135deg, #667eea 0%, #764ba2 100%))',
  GradientPurpleFocus = 'var(--alf-gradient-purple-focus, linear-gradient(135deg, #3b82f6 0%, #2563eb 100%))',
  GradientPurpleDisabled = 'var(--alf-gradient-purple-disabled, linear-gradient(135deg, rgba(59,130,246,0.5) 0%, rgba(37,99,235,0.5) 100%))',
  GradientPurpleActive = 'var(--alf-gradient-purple-active, linear-gradient(135deg, #3b82f6 0%, #2563eb 100%))',
  GradientPurpleHover = 'var(--alf-gradient-purple-hover, linear-gradient(135deg, #3b82f6 0%, #2563eb 100%))',

  GradientPurpleBG = 'var(--alf-gradient-purple-bg, linear-gradient(135deg, #667eea 0%, #764ba2 100%))',
  GradientPurpleFocusBG = 'var(--alf-gradient-purple-focus-bg, linear-gradient(135deg, #3b82f6 0%, #2563eb 100%))',
  GradientPurpleDisabledBG = 'var(--alf-gradient-purple-disabled-bg, linear-gradient(135deg, rgba(59,130,246,0.5) 0%, rgba(37,99,235,0.5) 100%))',
  GradientPurpleActiveBG = 'var(--alf-gradient-purple-active-bg, linear-gradient(135deg, #3b82f6 0%, #2563eb 100%))',
  GradientPurpleHoverBG = 'var(--alf-gradient-purple-hover-bg, linear-gradient(135deg, #3b82f6 0%, #2563eb 100%))',

  GradientPurpleText = 'var(--alf-gradient-purple-text, #ffffffff)',
  GradientPurpleTextFocus = 'var(--alf-gradient-purple-text-focus, #ffffffff)',
  GradientPurpleTextDisabled = 'var(--alf-gradient-purple-text-disabled, linear-gradient(135deg, rgba(59,130,246,0.5) 0%, rgba(37,99,235,0.5) 100%))',
  GradientPurpleTextActive = 'var(--alf-gradient-purple-text-active, #ffffffff)',
  GradientPurpleTextHover = 'var(--alf-gradient-purple-text-hover, #d1d1d1ff)',

  GradientPurpleBorder = 'var(--alf-gradient-purple-border, #667eea)',
  GradientPurpleBorderHover = 'var(--alf-gradient-purple-border-hover, #3b82f6)',
  GradientPurpleBorderFocus = 'var(--alf-gradient-purple-border-focus, #3b82f6)',
  GradientPurpleBorderDisabled = 'var(--alf-gradient-purple-border-disabled, linear-gradient(135deg, rgba(59,130,246,0.5) 0%, rgba(37,99,235,0.5) 100%))',
  GradientPurpleBorderActive = 'var(--alf-gradient-purple-border-active, #3b82f6)',

  GradientSunset = 'var(--alf-gradient-sunset, linear-gradient(135deg, #f093fb 0%, #f5576c 100%))',
  GradientSunsetFocus = 'var(--alf-gradient-sunset-focus, linear-gradient(135deg, #f093fb 0%, #f5576c 100%))',
  GradientSunsetDisabled = 'var(--alf-gradient-sunset-disabled, linear-gradient(135deg, rgba(240,147,251,0.5) 0%, rgba(245,87,108,0.5) 100%))',
  GradientSunsetActive = 'var(--alf-gradient-sunset-active, linear-gradient(135deg, #f093fb 0%, #f5576c 100%))',
  GradientSunsetHover = 'var(--alf-gradient-sunset-hover, linear-gradient(135deg, #f093fb 0%, #f5576c 100%))',

  GradientSunsetBG = 'var(--alf-gradient-sunset-bg, linear-gradient(135deg, #f093fb 0%, #f5576c 100%))',
  GradientSunsetFocusBG = 'var(--alf-gradient-sunset-focus-bg, linear-gradient(135deg, #f093fb 0%, #f5576c 100%))',
  GradientSunsetDisabledBG = 'var(--alf-gradient-sunset-disabled-bg, linear-gradient(135deg, rgba(240,147,251,0.5) 0%, rgba(245,87,108,0.5) 100%))',
  GradientSunsetActiveBG = 'var(--alf-gradient-sunset-active-bg, linear-gradient(135deg, #f093fb 0%, #f5576c 100%))',
  GradientSunsetHoverBG = 'var(--alf-gradient-sunset-hover-bg, linear-gradient(135deg, #f093fb 0%, #f5576c 100%))',

  GradientSunsetText = 'var(--alf-gradient-sunset-text, #ffffffff)',
  GradientSunsetTextFocus = 'var(--alf-gradient-sunset-text-focus, #ffffffff)',
  GradientSunsetTextDisabled = 'var(--alf-gradient-sunset-text-disabled, linear-gradient(135deg, rgba(240,147,251,0.5) 0%, rgba(245,87,108,0.5) 100%))',
  GradientSunsetTextActive = 'var(--alf-gradient-sunset-text-active, #ffffffff)',
  GradientSunsetTextHover = 'var(--alf-gradient-sunset-text-hover, #d1d1d1ff)',

  GradientSunsetBorder = 'var(--alf-gradient-sunset-border, #f093fb)',
  GradientSunsetBorderHover = 'var(--alf-gradient-sunset-border-hover, #f093fb)',
  GradientSunsetBorderFocus = 'var(--alf-gradient-sunset-border-focus, #f093fb)',
  GradientSunsetBorderDisabled = 'var(--alf-gradient-sunset-border-disabled, linear-gradient(135deg, rgba(240,147,251,0.5) 0%, rgba(245,87,108,0.5) 100%))',
  GradientSunsetBorderActive = 'var(--alf-gradient-sunset-border-active, #f093fb)',

  GradientOcean = 'var(--alf-gradient-ocean, linear-gradient(135deg, #4facfe 0%, #00f2fe 100%))',
  GradientOceanFocus = 'var(--alf-gradient-ocean-focus, linear-gradient(135deg, #4facfe 0%, #00f2fe 100%))',
  GradientOceanDisabled = 'var(--alf-gradient-ocean-disabled, linear-gradient(135deg, rgba(79,172,254,0.5) 0%, rgba(0,242,254,0.5) 100%))',
  GradientOceanActive = 'var(--alf-gradient-ocean-active, linear-gradient(135deg, #4facfe 0%, #00f2fe 100%))',
  GradientOceanHover = 'var(--alf-gradient-ocean-hover, linear-gradient(135deg, #4facfe 0%, #00f2fe 100%))',

  GradientOceanBG = 'var(--alf-gradient-ocean-bg, linear-gradient(135deg, #4facfe 0%, #00f2fe 100%))',
  GradientOceanFocusBG = 'var(--alf-gradient-ocean-focus-bg, linear-gradient(135deg, #4facfe 0%, #00f2fe 100%))',
  GradientOceanDisabledBG = 'var(--alf-gradient-ocean-disabled-bg, linear-gradient(135deg, rgba(79,172,254,0.5) 0%, rgba(0,242,254,0.5) 100%))',
  GradientOceanActiveBG = 'var(--alf-gradient-ocean-active-bg, linear-gradient(135deg, #4facfe 0%, #00f2fe 100%))',
  GradientOceanHoverBG = 'var(--alf-gradient-ocean-hover-bg, linear-gradient(135deg, #4facfe 0%, #00f2fe 100%))',

  GradientOceanText = 'var(--alf-gradient-ocean-text, #ffffffff)',
  GradientOceanTextFocus = 'var(--alf-gradient-ocean-text-focus, #ffffffff)',
  GradientOceanTextDisabled = 'var(--alf-gradient-ocean-text-disabled, linear-gradient(135deg, rgba(79,172,254,0.5) 0%, rgba(0,242,254,0.5) 100%))',
  GradientOceanTextActive = 'var(--alf-gradient-ocean-text-active, #ffffffff)',
  GradientOceanTextHover = 'var(--alf-gradient-ocean-text-hover, #d1d1d1ff)',

  GradientOceanBorder = 'var(--alf-gradient-ocean-border, #4facfe)',
  GradientOceanBorderHover = 'var(--alf-gradient-ocean-border-hover, #4facfe)',
  GradientOceanBorderFocus = 'var(--alf-gradient-ocean-border-focus, #4facfe)',
  GradientOceanBorderDisabled = 'var(--alf-gradient-ocean-border-disabled, linear-gradient(135deg, rgba(79,172,254,0.5) 0%, rgba(0,242,254,0.5) 100%))',
  GradientOceanBorderActive = 'var(--alf-gradient-ocean-border-active, #4facfe)',

  GradientForest = 'var(--alf-gradient-forest, linear-gradient(135deg, #11998e 0%, #38ef7d 100%))',
  GradientForestFocus = 'var(--alf-gradient-forest-focus, linear-gradient(135deg, #11998e 0%, #38ef7d 100%))',
  GradientForestDisabled = 'var(--alf-gradient-forest-disabled, linear-gradient(135deg, rgba(17,153,142,0.5) 0%, rgba(56,239,125,0.5) 100%))',
  GradientForestActive = 'var(--alf-gradient-forest-active, linear-gradient(135deg, #11998e 0%, #38ef7d 100%))',
  GradientForestHover = 'var(--alf-gradient-forest-hover, linear-gradient(135deg, #11998e 0%, #38ef7d 100%))',

  GradientForestBG = 'var(--alf-gradient-forest-bg, linear-gradient(135deg, #11998e 0%, #38ef7d 100%))',
  GradientForestFocusBG = 'var(--alf-gradient-forest-focus-bg, linear-gradient(135deg, #11998e 0%, #38ef7d 100%))',
  GradientForestDisabledBG = 'var(--alf-gradient-forest-disabled-bg, linear-gradient(135deg, rgba(17,153,142,0.5) 0%, rgba(56,239,125,0.5) 100%))',
  GradientForestActiveBG = 'var(--alf-gradient-forest-active-bg, linear-gradient(135deg, #11998e 0%, #38ef7d 100%))',
  GradientForestHoverBG = 'var(--alf-gradient-forest-hover-bg, linear-gradient(135deg, #11998e 0%, #38ef7d 100%))',

  GradientForestText = 'var(--alf-gradient-forest-text, #ffffffff)',
  GradientForestTextFocus = 'var(--alf-gradient-forest-text-focus, #ffffffff)',
  GradientForestTextDisabled = 'var(--alf-gradient-forest-text-disabled, linear-gradient(135deg, rgba(17,153,142,0.5) 0%, rgba(56,239,125,0.5) 100%))',
  GradientForestTextActive = 'var(--alf-gradient-forest-text-active, #ffffffff)',
  GradientForestTextHover = 'var(--alf-gradient-forest-text-hover, #d1d1d1ff)',

  GradientForestBorder = 'var(--alf-gradient-forest-border, #11998e)',
  GradientForestBorderHover = 'var(--alf-gradient-forest-border-hover, #11998e)',
  GradientForestBorderFocus = 'var(--alf-gradient-forest-border-focus, #11998e)',
  GradientForestBorderDisabled = 'var(--alf-gradient-forest-border-disabled, linear-gradient(135deg, rgba(17,153,142,0.5) 0%, rgba(56,239,125,0.5) 100%))',
  GradientForestBorderActive = 'var(--alf-gradient-forest-border-active, #11998e)',

  GradientPrimary = 'var(--alf-gradient-primary, linear-gradient(135deg, #4ea1fd 0%, #0d6efd 100%))',
  GradientPrimaryFocus = 'var(--alf-gradient-primary-focus, linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%))',
  GradientPrimaryDisabled = 'var(--alf-gradient-primary-disabled, linear-gradient(135deg, rgba(78,161,253,0.5) 0%, rgba(13,110,253,0.5) 100%))',
  GradientPrimaryActive = 'var(--alf-gradient-primary-active, linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%))',
  GradientPrimaryHover = 'var(--alf-gradient-primary-hover, linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%))',

  GradientPrimaryBG = 'var(--alf-gradient-primary-bg, linear-gradient(135deg, #4ea1fd 0%, #0d6efd 100%))',
  GradientPrimaryFocusBG = 'var(--alf-gradient-primary-focus-bg, linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%))',
  GradientPrimaryDisabledBG = 'var(--alf-gradient-primary-disabled-bg, linear-gradient(135deg, rgba(78,161,253,0.5) 0%, rgba(13,110,253,0.5) 100%))',
  GradientPrimaryActiveBG = 'var(--alf-gradient-primary-active-bg, linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%))',
  GradientPrimaryHoverBG = 'var(--alf-gradient-primary-hover-bg, linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%))',

  GradientPrimaryText = 'var(--alf-gradient-primary-text, #ffffffff)',
  GradientPrimaryTextFocus = 'var(--alf-gradient-primary-text-focus, #ffffffff)',
  GradientPrimaryTextDisabled = 'var(--alf-gradient-primary-text-disabled, linear-gradient(135deg, rgba(78,161,253,0.5) 0%, rgba(13,110,253,0.5) 100%))',
  GradientPrimaryTextActive = 'var(--alf-gradient-primary-text-active, #ffffffff)',
  GradientPrimaryTextHover = 'var(--alf-gradient-primary-text-hover, #d1d1d1ff)',

  GradientPrimaryBorder = 'var(--alf-gradient-primary-border, #4ea1fd)',
  GradientPrimaryBorderHover = 'var(--alf-gradient-primary-border-hover, #0d6efd)',
  GradientPrimaryBorderFocus = 'var(--alf-gradient-primary-border-focus, #0d6efd)',
  GradientPrimaryBorderDisabled = 'var(--alf-gradient-primary-border-disabled, linear-gradient(135deg, rgba(78,161,253,0.5) 0%, rgba(13,110,253,0.5) 100%))',
  GradientPrimaryBorderActive = 'var(--alf-gradient-primary-border-active, #0d6efd)',

  GradientDanger = 'var(--alf-gradient-danger, linear-gradient(135deg, #ef4444 0%, #dc2626 100%))',
  GradientDangerFocus = 'var(--alf-gradient-danger-focus, linear-gradient(135deg, #ef4444 0%, #dc2626 100%))',
  GradientDangerDisabled = 'var(--alf-gradient-danger-disabled, linear-gradient(135deg, rgba(239,68,68,0.5) 0%, rgba(220,38,38,0.5) 100%))',
  GradientDangerActive = 'var(--alf-gradient-danger-active, linear-gradient(135deg, #ef4444 0%, #dc2626 100%))',
  GradientDangerHover = 'var(--alf-gradient-danger-hover, linear-gradient(135deg, #ef4444 0%, #dc2626 100%))',

  GradientDangerBG = 'var(--alf-gradient-danger-bg, linear-gradient(135deg, #ef4444 0%, #dc2626 100%))',
  GradientDangerFocusBG = 'var(--alf-gradient-danger-focus-bg, linear-gradient(135deg, #ef4444 0%, #dc2626 100%))',
  GradientDangerDisabledBG = 'var(--alf-gradient-danger-disabled-bg, linear-gradient(135deg, rgba(239,68,68,0.5) 0%, rgba(220,38,38,0.5) 100%))',
  GradientDangerActiveBG = 'var(--alf-gradient-danger-active-bg, linear-gradient(135deg, #ef4444 0%, #dc2626 100%))',
  GradientDangerHoverBG = 'var(--alf-gradient-danger-hover-bg, linear-gradient(135deg, #ef4444 0%, #dc2626 100%))',

  GradientDangerText = 'var(--alf-gradient-danger-text, #ffffffff)',
  GradientDangerTextFocus = 'var(--alf-gradient-danger-text-focus, #ffffffff)',
  GradientDangerTextDisabled = 'var(--alf-gradient-danger-text-disabled, linear-gradient(135deg, rgba(239,68,68,0.5) 0%, rgba(220,38,38,0.5) 100%))',
  GradientDangerTextActive = 'var(--alf-gradient-danger-text-active, #ffffffff)',
  GradientDangerTextHover = 'var(--alf-gradient-danger-text-hover, #d1d1d1ff)',

  GradientDangerBorder = 'var(--alf-gradient-danger-border, #ef4444)',
  GradientDangerBorderHover = 'var(--alf-gradient-danger-border-hover, #ef4444)',
  GradientDangerBorderFocus = 'var(--alf-gradient-danger-border-focus, #ef4444)',
  GradientDangerBorderDisabled = 'var(--alf-gradient-danger-border-disabled, linear-gradient(135deg, rgba(239,68,68,0.5) 0%, rgba(220,38,38,0.5) 100%))',
  GradientDangerBorderActive = 'var(--alf-gradient-danger-border-active, #ef4444)',

  GradientSuccess = 'var(--alf-gradient-success, linear-gradient(135deg, #10b981 0%, #059669 100%))',
  GradientSuccessFocus = 'var(--alf-gradient-success-focus, linear-gradient(135deg, #10b981 0%, #059669 100%))',
  GradientSuccessDisabled = 'var(--alf-gradient-success-disabled, linear-gradient(135deg, rgba(16,185,129,0.5) 0%, rgba(5,150,105,0.5) 100%))',
  GradientSuccessActive = 'var(--alf-gradient-success-active, linear-gradient(135deg, #10b981 0%, #059669 100%))',
  GradientSuccessHover = 'var(--alf-gradient-success-hover, linear-gradient(135deg, #10b981 0%, #059669 100%))',

  GradientSuccessBG = 'var(--alf-gradient-success-bg, linear-gradient(135deg, #10b981 0%, #059669 100%))',
  GradientSuccessFocusBG = 'var(--alf-gradient-success-focus-bg, linear-gradient(135deg, #10b981 0%, #059669 100%))',
  GradientSuccessDisabledBG = 'var(--alf-gradient-success-disabled-bg, linear-gradient(135deg, rgba(16,185,129,0.5) 0%, rgba(5,150,105,0.5) 100%))',
  GradientSuccessActiveBG = 'var(--alf-gradient-success-active-bg, linear-gradient(135deg, #10b981 0%, #059669 100%))',
  GradientSuccessHoverBG = 'var(--alf-gradient-success-hover-bg, linear-gradient(135deg, #10b981 0%, #059669 100%))',

  GradientSuccessText = 'var(--alf-gradient-success-text, #ffffffff)',
  GradientSuccessTextFocus = 'var(--alf-gradient-success-text-focus, #ffffffff)',
  GradientSuccessTextDisabled = 'var(--alf-gradient-success-text-disabled, linear-gradient(135deg, rgba(16,185,129,0.5) 0%, rgba(5,150,105,0.5) 100%))',
  GradientSuccessTextActive = 'var(--alf-gradient-success-text-active, #ffffffff)',
  GradientSuccessTextHover = 'var(--alf-gradient-success-text-hover, #d1d1d1ff)',

  GradientSuccessBorder = 'var(--alf-gradient-success-border, #10b981)',
  GradientSuccessBorderHover = 'var(--alf-gradient-success-border-hover, #10b981)',
  GradientSuccessBorderFocus = 'var(--alf-gradient-success-border-focus, #10b981)',
  GradientSuccessBorderDisabled = 'var(--alf-gradient-success-border-disabled, linear-gradient(135deg, rgba(16,185,129,0.5) 0%, rgba(5,150,105,0.5) 100%))',
  GradientSuccessBorderActive = 'var(--alf-gradient-success-border-active, #10b981)',

  GradientWarning = 'var(--alf-gradient-warning, linear-gradient(135deg, #f59e0b 0%, #d97706 100%))',
  GradientWarningFocus = 'var(--alf-gradient-warning-focus, linear-gradient(135deg, #f59e0b 0%, #d97706 100%))',
  GradientWarningDisabled = 'var(--alf-gradient-warning-disabled, linear-gradient(135deg, rgba(245,158,11,0.5) 0%, rgba(217,119,6,0.5) 100%))',
  GradientWarningActive = 'var(--alf-gradient-warning-active, linear-gradient(135deg, #f59e0b 0%, #d97706 100%))',
  GradientWarningHover = 'var(--alf-gradient-warning-hover, linear-gradient(135deg, #f59e0b 0%, #d97706 100%))',

  GradientWarningBG = 'var(--alf-gradient-warning-bg, linear-gradient(135deg, #f59e0b 0%, #d97706 100%))',
  GradientWarningFocusBG = 'var(--alf-gradient-warning-focus-bg, linear-gradient(135deg, #f59e0b 0%, #d97706 100%))',
  GradientWarningDisabledBG = 'var(--alf-gradient-warning-disabled-bg, linear-gradient(135deg, rgba(245,158,11,0.5) 0%, rgba(217,119,6,0.5) 100%))',
  GradientWarningActiveBG = 'var(--alf-gradient-warning-active-bg, linear-gradient(135deg, #f59e0b 0%, #d97706 100%))',
  GradientWarningHoverBG = 'var(--alf-gradient-warning-hover-bg, linear-gradient(135deg, #f59e0b 0%, #d97706 100%))',

  GradientWarningText = 'var(--alf-gradient-warning-text, #000000ff)',
  GradientWarningTextFocus = 'var(--alf-gradient-warning-text-focus, #000000ff)',
  GradientWarningTextDisabled = 'var(--alf-gradient-warning-text-disabled, linear-gradient(135deg, rgba(245,158,11,0.5) 0%, rgba(217,119,6,0.5) 100%))',
  GradientWarningTextActive = 'var(--alf-gradient-warning-text-active, #000000ff)',
  GradientWarningTextHover = 'var(--alf-gradient-warning-text-hover, #1f1f1fff)',

  GradientWarningBorder = 'var(--alf-gradient-warning-border, #f59e0b)',
  GradientWarningBorderHover = 'var(--alf-gradient-warning-border-hover, #f59e0b)',
  GradientWarningBorderFocus = 'var(--alf-gradient-warning-border-focus, #f59e0b)',
  GradientWarningBorderDisabled = 'var(--alf-gradient-warning-border-disabled, linear-gradient(135deg, rgba(245,158,11,0.5) 0%, rgba(217,119,6,0.5) 100%))',
  GradientWarningBorderActive = 'var(--alf-gradient-warning-border-active, #f59e0b)',

  GradientInfo = 'var(--alf-gradient-info, linear-gradient(135deg, #39d9fa 0%, #0dcaf0 100%))',
  GradientInfoFocus = 'var(--alf-gradient-info-focus, linear-gradient(135deg, #0dcaf0 0%, #0aa2c0 100%))',
  GradientInfoDisabled = 'var(--alf-gradient-info-disabled, linear-gradient(135deg, rgba(57,217,250,0.5) 0%, rgba(13,202,240,0.5) 100%))',
  GradientInfoActive = 'var(--alf-gradient-info-active, linear-gradient(135deg, #0dcaf0 0%, #0aa2c0 100%))',
  GradientInfoHover = 'var(--alf-gradient-info-hover, linear-gradient(135deg, #0dcaf0 0%, #0aa2c0 100%))',

  GradientInfoBG = 'var(--alf-gradient-info-bg, linear-gradient(135deg, #39d9fa 0%, #0dcaf0 100%))',
  GradientInfoFocusBG = 'var(--alf-gradient-info-focus-bg, linear-gradient(135deg, #0dcaf0 0%, #0aa2c0 100%))',
  GradientInfoDisabledBG = 'var(--alf-gradient-info-disabled-bg, linear-gradient(135deg, rgba(57,217,250,0.5) 0%, rgba(13,202,240,0.5) 100%))',
  GradientInfoActiveBG = 'var(--alf-gradient-info-active-bg, linear-gradient(135deg, #0dcaf0 0%, #0aa2c0 100%))',
  GradientInfoHoverBG = 'var(--alf-gradient-info-hover-bg, linear-gradient(135deg, #0dcaf0 0%, #0aa2c0 100%))',

  GradientInfoText = 'var(--alf-gradient-info-text, #ffffffff)',
  GradientInfoTextFocus = 'var(--alf-gradient-info-text-focus, #ffffffff)',
  GradientInfoTextDisabled = 'var(--alf-gradient-info-text-disabled, linear-gradient(135deg, rgba(57,217,250,0.5) 0%, rgba(13,202,240,0.5) 100%))',
  GradientInfoTextActive = 'var(--alf-gradient-info-text-active, #ffffffff)',
  GradientInfoTextHover = 'var(--alf-gradient-info-text-hover, #d1d1d1ff)',

  GradientInfoBorder = 'var(--alf-gradient-info-border, #39d9fa)',
  GradientInfoBorderHover = 'var(--alf-gradient-info-border-hover, #0dcaf0)',
  GradientInfoBorderFocus = 'var(--alf-gradient-info-border-focus, #0dcaf0)',
  GradientInfoBorderDisabled = 'var(--alf-gradient-info-border-disabled, linear-gradient(135deg, rgba(57,217,250,0.5) 0%, rgba(13,202,240,0.5) 100%))',
  GradientInfoBorderActive = 'var(--alf-gradient-info-border-active, #0dcaf0)',

  // Beauty background
  GradientBeauty1 = 'var(--alf-gradient-beauty-1, linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 242, 245, 0.9) 100%))',
  CoolGray = 'var(--alf-cool-gray, #94a3b8)',

}
