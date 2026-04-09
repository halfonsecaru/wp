export enum vatTypeEnum {
    superreduced = 0.04,
    reduced = 0.1,
    standard = 0.21,
    actual = 0.21
  }
  
/*   export const vatTypeRecord: Record<number, string> = {
    0.04: "Superreduced",
    0.1: "Reduced",
    0.21: "Standard",
  }; */

  // Enum de tipos de pago - Payment types enum
export enum PaymentTypesEnum {
  CASH = 0,                        // Efectivo
  VOUCHER = 1,                     // Vale
  CREDIT_CARD = 2,                 // Tarjeta de crédito
  GIFT_CARD = 3,                   // Tarjeta regalo
  MIXED_CASH_CREDIT_CARD = 4,      // Mixto efectivo/tarjeta crédito
  MULTIPLE_METHODS = 5,            // Varios métodos
}

// Enum de tipos de IVA - VAT types enum
export enum VatTypesEnum {
  SUPER_REDUCED = 0.04,            // Superreducido (4%)
  REDUCED = 0.10,                  // Reducido (10%)
  NORMAL = 0.21,                   // Normal (21%)
  CURRENT = 0.21,                  // Actual (21%)
}

// Constante de IVA actual - Current VAT constant
export const currentVat = VatTypesEnum.NORMAL;