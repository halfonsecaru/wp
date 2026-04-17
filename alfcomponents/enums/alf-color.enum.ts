/**
 * Enum de colores (Omni-Reactive System - FULL PALETTE)
 * Restauración total de todos los niveles cromáticos originales vinculados al sistema de tokens.
 */
export enum AlfColorEnum {
  // ===== BASE COLORS =====
  White = 'var(--alf-sys-white, #ffffff)',
  Black = 'var(--alf-sys-black, #000000)',
  Transparent = 'transparent',

  // ===== THEME ROLES =====
  Primary = 'var(--alf-sys-primary, #0d6efd)',
  PrimaryHover = 'var(--alf-sys-primary-hover, #0b5ed7)',
  Secondary = 'var(--alf-sys-secondary, #6c757d)',
  SecondaryHover = 'var(--alf-sys-secondary-hover, #5c636a)',
  Success = 'var(--alf-sys-success, #198754)',
  SuccessHover = 'var(--alf-sys-success-hover, #157347)',
  Danger = 'var(--alf-sys-danger, #dc3545)',
  DangerHover = 'var(--alf-sys-danger-hover, #bb2d3b)',
  Warning = 'var(--alf-sys-warning, #ffc107)',
  WarningHover = 'var(--alf-sys-warning-hover, #ffca2c)',
  Info = 'var(--alf-sys-info, #0dcaf0)',
  InfoHover = 'var(--alf-sys-info-hover, #31d2f2)',

  // ===== GRAY SCALE (Complete 050-999) =====
  Gray050 = 'var(--alf-sys-gray-050, #fafafa)',
  Gray100 = 'var(--alf-sys-gray-100, #f8f9fa)',
  Gray150 = 'var(--alf-sys-gray-150, #f0f0f0)',
  Gray200 = 'var(--alf-sys-gray-200, #e9ecef)',
  Gray250 = 'var(--alf-sys-gray-250, #dbdbdb)',
  Gray300 = 'var(--alf-sys-gray-300, #dee2e6)',
  Gray350 = 'var(--alf-sys-gray-350, #c9c9c9)',
  Gray400 = 'var(--alf-sys-gray-400, #ced4da)',
  Gray450 = 'var(--alf-sys-gray-450, #8f8f8f)',
  Gray500 = 'var(--alf-sys-gray-500, #adb5bd)',
  Gray550 = 'var(--alf-sys-gray-550, #676767)',
  Gray600 = 'var(--alf-sys-gray-600, #6c757d)',
  Gray650 = 'var(--alf-sys-gray-650, #464646)',
  Gray700 = 'var(--alf-sys-gray-700, #495057)',
  Gray750 = 'var(--alf-sys-gray-750, #353535)',
  Gray800 = 'var(--alf-sys-gray-800, #343a40)',
  Gray850 = 'var(--alf-sys-gray-850, #1f1f1f)',
  Gray900 = 'var(--alf-sys-gray-900, #212529)',
  Gray950 = 'var(--alf-sys-gray-950, #0f0f0f)',
  Gray999 = 'var(--alf-sys-black, #000000)',

  // ===== RED (Complete 050-999) =====
  Red050 = 'var(--alf-sys-red-050, #fef2f2)', Red100 = 'var(--alf-sys-red-100, #fee2e2)', Red150 = 'var(--alf-sys-red-150, #fdd5d5)', Red200 = 'var(--alf-sys-red-200, #fecaca)',
  Red250 = 'var(--alf-sys-red-250, #fdb8b8)', Red300 = 'var(--alf-sys-red-300, #fca5a5)', Red350 = 'var(--alf-sys-red-350, #fb9191)', Red400 = 'var(--alf-sys-red-400, #f87171)',
  Red450 = 'var(--alf-sys-red-450, #f65858)', Red500 = 'var(--alf-sys-red-500, #ef4444)', Red550 = 'var(--alf-sys-red-550, #e73838)', Red600 = 'var(--alf-sys-red-600, #dc2626)',
  Red650 = 'var(--alf-sys-red-650, #d01f1f)', Red700 = 'var(--alf-sys-red-700, #b91c1c)', Red750 = 'var(--alf-sys-red-750, #a51919)', Red800 = 'var(--alf-sys-red-800, #991b1b)',
  Red850 = 'var(--alf-sys-red-850, #851818)', Red900 = 'var(--alf-sys-red-900, #7f1d1d)', Red950 = 'var(--alf-sys-red-950, #6d1818)', Red999 = 'var(--alf-sys-red-999, #450a0a)',

  // ===== BLUE (Complete 050-999) =====
  Blue050 = 'var(--alf-sys-blue-050, #eff6ff)', Blue100 = 'var(--alf-sys-blue-100, #dbeafe)', Blue150 = 'var(--alf-sys-blue-150, #cfe3fe)', Blue200 = 'var(--alf-sys-blue-200, #bfdbfe)',
  Blue250 = 'var(--alf-sys-blue-250, #b1d4fe)', Blue300 = 'var(--alf-sys-blue-300, #93c5fd)', Blue350 = 'var(--alf-sys-blue-350, #7ebcfc)', Blue400 = 'var(--alf-sys-blue-400, #60a5fa)',
  Blue450 = 'var(--alf-sys-blue-450, #4a97f9)', Blue500 = 'var(--alf-sys-blue-500, #3b82f6)', Blue550 = 'var(--alf-sys-blue-550, #3575e6)', Blue600 = 'var(--alf-sys-blue-600, #2563eb)',
  Blue650 = 'var(--alf-sys-blue-650, #2158d8)', Blue700 = 'var(--alf-sys-blue-700, #1d4ed8)', Blue750 = 'var(--alf-sys-blue-750, #1a46c2)', Blue800 = 'var(--alf-sys-blue-800, #1e40af)',
  Blue850 = 'var(--alf-sys-blue-850, #1a389a)', Blue900 = 'var(--alf-sys-blue-900, #1e3a8a)', Blue950 = 'var(--alf-sys-blue-950, #193174)', Blue999 = 'var(--alf-sys-blue-999, #172554)',

  // ===== GREEN (Complete 050-999) =====
  Green050 = 'var(--alf-sys-green-050, #f0fdf4)', Green100 = 'var(--alf-sys-green-100, #dcfce7)', Green150 = 'var(--alf-sys-green-150, #d1fbe0)', Green200 = 'var(--alf-sys-green-200, #bbf7d0)',
  Green250 = 'var(--alf-sys-green-250, #adf5c5)', Green300 = 'var(--alf-sys-green-300, #86efac)', Green350 = 'var(--alf-sys-green-350, #6fec9c)', Green400 = 'var(--alf-sys-green-400, #4ade80)',
  Green450 = 'var(--alf-sys-green-450, #31d66e)', Green500 = 'var(--alf-sys-green-500, #22c55e)', Green550 = 'var(--alf-sys-green-550, #1eb854)', Green600 = 'var(--alf-sys-green-600, #16a34a)',
  Green650 = 'var(--alf-sys-green-650, #139143)', Green700 = 'var(--alf-sys-green-700, #15803d)', Green750 = 'var(--alf-sys-green-750, #127236)', Green800 = 'var(--alf-sys-green-800, #166534)',
  Green850 = 'var(--alf-sys-green-850, #13562d)', Green900 = 'var(--alf-sys-green-900, #14532d)', Green950 = 'var(--alf-sys-green-950, #104525)', Green999 = 'var(--alf-sys-green-999, #052e16)',

  // ===== ORANGE =====
  Orange050 = 'var(--alf-sys-orange-050, #fff7ed)', Orange100 = 'var(--alf-sys-orange-100, #ffedd5)', Orange150 = 'var(--alf-sys-orange-150, #ffe4c4)', Orange200 = 'var(--alf-sys-orange-200, #fed7aa)',
  Orange250 = 'var(--alf-sys-orange-250, #fecf99)', Orange300 = 'var(--alf-sys-orange-300, #fdba74)', Orange350 = 'var(--alf-sys-orange-350, #fcaa5e)', Orange400 = 'var(--alf-sys-orange-400, #fb923c)',
  Orange450 = 'var(--alf-sys-orange-450, #fa7e25)', Orange500 = 'var(--alf-sys-orange-500, #f97316)', Orange550 = 'var(--alf-sys-orange-550, #f06410)', Orange600 = 'var(--alf-sys-orange-600, #ea580c)',
  Orange650 = 'var(--alf-sys-orange-650, #dc500b)', Orange700 = 'var(--alf-sys-orange-700, #c2410c)', Orange750 = 'var(--alf-sys-orange-750, #ad3a0b)', Orange800 = 'var(--alf-sys-orange-800, #9a3412)',
  Orange850 = 'var(--alf-sys-orange-850, #872e10)', Orange900 = 'var(--alf-sys-orange-900, #7c2d12)', Orange950 = 'var(--alf-sys-orange-950, #6b250f)', Orange999 = 'var(--alf-sys-orange-999, #431407)',

  // ===== YELLOW =====
  Yellow050 = 'var(--alf-sys-yellow-050, #fefce8)', Yellow100 = 'var(--alf-sys-yellow-100, #fef9c3)', Yellow150 = 'var(--alf-sys-yellow-150, #fef7af)', Yellow200 = 'var(--alf-sys-yellow-200, #fef08a)',
  Yellow250 = 'var(--alf-sys-yellow-250, #feec75)', Yellow300 = 'var(--alf-sys-yellow-300, #fde047)', Yellow350 = 'var(--alf-sys-yellow-350, #fddb32)', Yellow400 = 'var(--alf-sys-yellow-400, #facc15)',
  Yellow450 = 'var(--alf-sys-yellow-450, #f7bf07)', Yellow500 = 'var(--alf-sys-yellow-500, #eab308)', Yellow550 = 'var(--alf-sys-yellow-550, #daa507)', Yellow600 = 'var(--alf-sys-yellow-600, #ca8a04)',
  Yellow650 = 'var(--alf-sys-yellow-650, #b97d04)', Yellow700 = 'var(--alf-sys-yellow-700, #a16207)', Yellow750 = 'var(--alf-sys-yellow-750, #8e5606)', Yellow800 = 'var(--alf-sys-yellow-800, #854d0e)',
  Yellow850 = 'var(--alf-sys-yellow-850, #72420c)', Yellow900 = 'var(--alf-sys-yellow-900, #713f12)', Yellow950 = 'var(--alf-sys-yellow-950, #5f350f)', Yellow999 = 'var(--alf-sys-yellow-999, #422006)',

  // ===== LIME =====
  Lime050 = 'var(--alf-sys-lime-050, #f7fee7)', Lime100 = 'var(--alf-sys-lime-100, #ecfccb)', Lime150 = 'var(--alf-sys-lime-150, #e4fbb8)', Lime200 = 'var(--alf-sys-lime-200, #d9f99d)',
  Lime250 = 'var(--alf-sys-lime-250, #d0f889)', Lime300 = 'var(--alf-sys-lime-300, #bef264)', Lime350 = 'var(--alf-sys-lime-350, #b3ee4f)', Lime400 = 'var(--alf-sys-lime-400, #a3e635)',
  Lime450 = 'var(--alf-sys-lime-450, #96df23)', Lime500 = 'var(--alf-sys-lime-500, #84cc16)', Lime550 = 'var(--alf-sys-lime-550, #77b914)', Lime600 = 'var(--alf-sys-lime-600, #65a30d)',
  Lime650 = 'var(--alf-sys-lime-650, #5a910b)', Lime700 = 'var(--alf-sys-lime-700, #4d7c0f)', Lime750 = 'var(--alf-sys-lime-750, #446d0d)', Lime800 = 'var(--alf-sys-lime-800, #3f6212)',
  Lime850 = 'var(--alf-sys-lime-850, #365410)', Lime900 = 'var(--alf-sys-lime-900, #365314)', Lime950 = 'var(--alf-sys-lime-950, #2d4410)', Lime999 = 'var(--alf-sys-lime-999, #1a2e05)',

  // ===== EMERALD =====
  Emerald050 = 'var(--alf-sys-emerald-050, #ecfdf5)', Emerald100 = 'var(--alf-sys-emerald-100, #d1fae5)', Emerald150 = 'var(--alf-sys-emerald-150, #c3f9dd)', Emerald200 = 'var(--alf-sys-emerald-200, #a7f3d0)',
  Emerald250 = 'var(--alf-sys-emerald-250, #95f0c6)', Emerald300 = 'var(--alf-sys-emerald-300, #6ee7b7)', Emerald350 = 'var(--alf-sys-emerald-350, #59e3ab)', Emerald400 = 'var(--alf-sys-emerald-400, #34d399)',
  Emerald450 = 'var(--alf-sys-emerald-450, #21ca8a)', Emerald500 = 'var(--alf-sys-emerald-500, #10b981)', Emerald550 = 'var(--alf-sys-emerald-550, #0ea973)', Emerald600 = 'var(--alf-sys-emerald-600, #059669)',
  Emerald650 = 'var(--alf-sys-emerald-650, #04855d)', Emerald700 = 'var(--alf-sys-emerald-700, #047857)', Emerald750 = 'var(--alf-sys-emerald-750, #046a4d)', Emerald800 = 'var(--alf-sys-emerald-800, #065f46)',
  Emerald850 = 'var(--alf-sys-emerald-850, #05523c)', Emerald900 = 'var(--alf-sys-emerald-900, #064e3b)', Emerald950 = 'var(--alf-sys-emerald-950, #054132)', Emerald999 = 'var(--alf-sys-emerald-999, #022c22)',

  // ===== TEAL =====
  Teal050 = 'var(--alf-sys-teal-050, #f0fdfa)', Teal100 = 'var(--alf-sys-teal-100, #ccfbf1)', Teal150 = 'var(--alf-sys-teal-150, #b8fae9)', Teal200 = 'var(--alf-sys-teal-200, #99f6e4)',
  Teal250 = 'var(--alf-sys-teal-250, #85f3dd)', Teal300 = 'var(--alf-sys-teal-300, #5eead4)', Teal350 = 'var(--alf-sys-teal-350, #48e6cc)', Teal400 = 'var(--alf-sys-teal-400, #2dd4bf)',
  Teal450 = 'var(--alf-sys-teal-450, #1ecdb5)', Teal500 = 'var(--alf-sys-teal-500, #14b8a6)', Teal550 = 'var(--alf-sys-teal-550, #12a897)', Teal600 = 'var(--alf-sys-teal-600, #0d9488)',
  Teal650 = 'var(--alf-sys-teal-650, #0b847a)', Teal700 = 'var(--alf-sys-teal-700, #0f766e)', Teal750 = 'var(--alf-sys-teal-750, #0d6861)', Teal800 = 'var(--alf-sys-teal-800, #115e59)',
  Teal850 = 'var(--alf-sys-teal-850, #0f524d)', Teal900 = 'var(--alf-sys-teal-900, #134e4a)', Teal950 = 'var(--alf-sys-teal-950, #0f423e)', Teal999 = 'var(--alf-sys-teal-999, #042f2e)',

  // ===== CYAN =====
  Cyan050 = 'var(--alf-sys-cyan-050, #ecfeff)', Cyan100 = 'var(--alf-sys-cyan-100, #cffafe)', Cyan150 = 'var(--alf-sys-cyan-150, #baf8fe)', Cyan200 = 'var(--alf-sys-cyan-200, #a5f3fc)',
  Cyan250 = 'var(--alf-sys-cyan-250, #92f0fb)', Cyan300 = 'var(--alf-sys-cyan-300, #67e8f9)', Cyan350 = 'var(--alf-sys-cyan-350, #51e4f8)', Cyan400 = 'var(--alf-sys-cyan-400, #22d3ee)',
  Cyan450 = 'var(--alf-sys-cyan-450, #0fcdea)', Cyan500 = 'var(--alf-sys-cyan-500, #06b6d4)', Cyan550 = 'var(--alf-sys-cyan-550, #05a6c1)', Cyan600 = 'var(--alf-sys-cyan-600, #0891b2)',
  Cyan650 = 'var(--alf-sys-cyan-650, #07829e)', Cyan700 = 'var(--alf-sys-cyan-700, #0e7490)', Cyan750 = 'var(--alf-sys-cyan-750, #0c6780)', Cyan800 = 'var(--alf-sys-cyan-800, #155e75)',
  Cyan850 = 'var(--alf-sys-cyan-850, #125265)', Cyan900 = 'var(--alf-sys-cyan-900, #164e63)', Cyan950 = 'var(--alf-sys-cyan-950, #124253)', Cyan999 = 'var(--alf-sys-cyan-999, #083344)',

  // ===== SKY =====
  Sky050 = 'var(--alf-sys-sky-050, #f0f9ff)', Sky100 = 'var(--alf-sys-sky-100, #e0f2fe)', Sky150 = 'var(--alf-sys-sky-150, #d5edfe)', Sky200 = 'var(--alf-sys-sky-200, #bae6fd)',
  Sky250 = 'var(--alf-sys-sky-250, #abe0fd)', Sky300 = 'var(--alf-sys-sky-300, #7dd3fc)', Sky350 = 'var(--alf-sys-sky-350, #67ccfb)', Sky400 = 'var(--alf-sys-sky-400, #38bdf8)',
  Sky450 = 'var(--alf-sys-sky-450, #22b3f6)', Sky500 = 'var(--alf-sys-sky-500, #0ea5e9)', Sky550 = 'var(--alf-sys-sky-550, #0d96d6)', Sky600 = 'var(--alf-sys-sky-600, #0284c7)',
  Sky650 = 'var(--alf-sys-sky-650, #0276b3)', Sky700 = 'var(--alf-sys-sky-700, #0369a1)', Sky750 = 'var(--alf-sys-sky-750, #025d8e)', Sky800 = 'var(--alf-sys-sky-800, #075985)',
  Sky850 = 'var(--alf-sys-sky-850, #064d73)', Sky900 = 'var(--alf-sys-sky-900, #0c4a6e)', Sky950 = 'var(--alf-sys-sky-950, #0a3e5c)', Sky999 = 'var(--alf-sys-sky-999, #082f45)',

  // ===== VIOLET =====
  Violet050 = 'var(--alf-sys-violet-050, #f5f3ff)', Violet100 = 'var(--alf-sys-violet-100, #ede9fe)', Violet150 = 'var(--alf-sys-violet-150, #e6e1fe)', Violet200 = 'var(--alf-sys-violet-200, #ddd6fe)',
  Violet250 = 'var(--alf-sys-violet-250, #d5ccfe)', Violet300 = 'var(--alf-sys-violet-300, #c4b5fd)', Violet350 = 'var(--alf-sys-violet-350, #b8a8fc)', Violet400 = 'var(--alf-sys-violet-400, #a78bfa)',
  Violet450 = 'var(--alf-sys-violet-450, #9a78f9)', Violet500 = 'var(--alf-sys-violet-500, #8b5cf6)', Violet550 = 'var(--alf-sys-violet-550, #7f52e6)', Violet600 = 'var(--alf-sys-violet-600, #7c3aed)',
  Violet650 = 'var(--alf-sys-violet-650, #7031da)', Violet700 = 'var(--alf-sys-violet-700, #6d28d9)', Violet750 = 'var(--alf-sys-violet-750, #6224c4)', Violet800 = 'var(--alf-sys-violet-800, #5b21b6)',
  Violet850 = 'var(--alf-sys-violet-850, #501da1)', Violet900 = 'var(--alf-sys-violet-900, #4c1d95)', Violet950 = 'var(--alf-sys-violet-950, #41197f)', Violet999 = 'var(--alf-sys-violet-999, #2e1065)',

  // ===== PURPLE =====
  Purple050 = 'var(--alf-sys-purple-050, #faf5ff)', Purple100 = 'var(--alf-sys-purple-100, #f3e8ff)', Purple150 = 'var(--alf-sys-purple-150, #eedffe)', Purple200 = 'var(--alf-sys-purple-200, #e9d5ff)',
  Purple250 = 'var(--alf-sys-purple-250, #e4cbff)', Purple300 = 'var(--alf-sys-purple-300, #d8b4fe)', Purple350 = 'var(--alf-sys-purple-350, #d0a5fe)', Purple400 = 'var(--alf-sys-purple-400, #c084fc)',
  Purple450 = 'var(--alf-sys-purple-450, #b570fb)', Purple500 = 'var(--alf-sys-purple-500, #a855f7)', Purple550 = 'var(--alf-sys-purple-550, #9c4ae7)', Purple600 = 'var(--alf-sys-purple-600, #9333ea)',
  Purple650 = 'var(--alf-sys-purple-650, #862bd7)', Purple700 = 'var(--alf-sys-purple-700, #7e22ce)', Purple750 = 'var(--alf-sys-purple-750, #711eb8)', Purple800 = 'var(--alf-sys-purple-800, #6b21a8)',
  Purple850 = 'var(--alf-sys-purple-850, #5e1d93)', Purple900 = 'var(--alf-sys-purple-900, #581c87)', Purple950 = 'var(--alf-sys-purple-950, #4b1872)', Purple999 = 'var(--alf-sys-purple-999, #3b0764)',

  // ===== FUCHSIA =====
  Fuchsia050 = 'var(--alf-sys-fuchsia-050, #fdf4ff)', Fuchsia100 = 'var(--alf-sys-fuchsia-100, #fae8ff)', Fuchsia150 = 'var(--alf-sys-fuchsia-150, #f8dfff)', Fuchsia200 = 'var(--alf-sys-fuchsia-200, #f5d0fe)',
  Fuchsia250 = 'var(--alf-sys-fuchsia-250, #f2c5fe)', Fuchsia300 = 'var(--alf-sys-fuchsia-300, #f0abfc)', Fuchsia350 = 'var(--alf-sys-fuchsia-350, #ed9cfb)', Fuchsia400 = 'var(--alf-sys-fuchsia-400, #e879f9)',
  Fuchsia450 = 'var(--alf-sys-fuchsia-450, #e565f7)', Fuchsia500 = 'var(--alf-sys-fuchsia-500, #d946ef)', Fuchsia550 = 'var(--alf-sys-fuchsia-550, #cd3de6)', Fuchsia600 = 'var(--alf-sys-fuchsia-600, #c026d3)',
  Fuchsia650 = 'var(--alf-sys-fuchsia-650, #b21ec4)', Fuchsia700 = 'var(--alf-sys-fuchsia-700, #a21caf)', Fuchsia750 = 'var(--alf-sys-fuchsia-750, #92199c)', Fuchsia800 = 'var(--alf-sys-fuchsia-800, #86198f)',
  Fuchsia850 = 'var(--alf-sys-fuchsia-850, #76167e)', Fuchsia900 = 'var(--alf-sys-fuchsia-900, #701a75)', Fuchsia950 = 'var(--alf-sys-fuchsia-950, #601663)', Fuchsia999 = 'var(--alf-sys-fuchsia-999, #4a044e)',

  // ===== PINK =====
  Pink050 = 'var(--alf-sys-pink-050, #fdf2f8)', Pink100 = 'var(--alf-sys-pink-100, #fce7f3)', Pink150 = 'var(--alf-sys-pink-150, #fbdfe9)', Pink200 = 'var(--alf-sys-pink-200, #fbcfe8)',
  Pink250 = 'var(--alf-sys-pink-250, #fac4e3)', Pink300 = 'var(--alf-sys-pink-300, #f9a8d4)', Pink350 = 'var(--alf-sys-pink-350, #f896ca)', Pink400 = 'var(--alf-sys-pink-400, #f472b6)',
  Pink450 = 'var(--alf-sys-pink-450, #f15da7)', Pink500 = 'var(--alf-sys-pink-500, #ec4899)', Pink550 = 'var(--alf-sys-pink-550, #e73f8c)', Pink600 = 'var(--alf-sys-pink-600, #db2777)',
  Pink650 = 'var(--alf-sys-pink-650, #cf216a)', Pink700 = 'var(--alf-sys-pink-700, #be185d)', Pink750 = 'var(--alf-sys-pink-750, #ac1653)', Pink800 = 'var(--alf-sys-pink-800, #9f1239)',
  Pink850 = 'var(--alf-sys-pink-850, #8d1032)', Pink900 = 'var(--alf-sys-pink-900, #831843)', Pink950 = 'var(--alf-sys-pink-950, #701438)', Pink999 = 'var(--alf-sys-pink-999, #500724)',

  // ===== ROSE =====
  Rose050 = 'var(--alf-sys-rose-050, #fff1f2)', Rose100 = 'var(--alf-sys-rose-100, #ffe4e6)', Rose150 = 'var(--alf-sys-rose-150, #ffd9dc)', Rose200 = 'var(--alf-sys-rose-200, #fecdd3)',
  Rose250 = 'var(--alf-sys-rose-250, #fec0c7)', Rose300 = 'var(--alf-sys-rose-300, #fda4af)', Rose350 = 'var(--alf-sys-rose-350, #fc91a0)', Rose400 = 'var(--alf-sys-rose-400, #fb7185)',
  Rose450 = 'var(--alf-sys-rose-450, #fa5d73)', Rose500 = 'var(--alf-sys-rose-500, #f43f5e)', Rose600 = 'var(--alf-sys-rose-600, #e11d48)', Rose650 = 'var(--alf-sys-rose-650, #d3193f)',
  Rose700 = 'var(--alf-sys-rose-700, #be123c)', Rose750 = 'var(--alf-sys-rose-750, #ab1036)', Rose800 = 'var(--alf-sys-rose-800, #9f1239)', Rose850 = 'var(--alf-sys-rose-850, #8d1032)',
  Rose900 = 'var(--alf-sys-rose-900, #881337)', Rose950 = 'var(--alf-sys-rose-950, #74102e)', Rose999 = 'var(--alf-sys-rose-999, #4c0519)',
}
