import { EnvEnum } from "./enums";

// Tipo para los parsers
type EnvParser = (raw: string | undefined) => any;

export const globalPrefix = 'appMilenium';

// Definición de parsers para cada variable de entorno
const parsers: Record<EnvEnum, EnvParser> = {
  [EnvEnum.STAGE]: (v) => v ?? '',
  [EnvEnum.DB_PORT]: (v) => Number(v) || 5432,
  [EnvEnum.DB_USERNAME]: (v) => v ?? '',
  [EnvEnum.USERNAME]: (v) => v ?? '',
  [EnvEnum.DATABASE]: (v) => v ?? '',
  [EnvEnum.SYNCRONIZE]: (v) => v === 'true',
  [EnvEnum.JWT_SECRET_KEY]: (v) => v ?? '',
  [EnvEnum.JWT_SECRET]: (v) => v ?? '',
  [EnvEnum.PORT]: (v) => Number(v) || 3002,
  [EnvEnum.HOST_API]: (v) => v ?? '',
  [EnvEnum.API_URL]: (v) => v ?? '',
  [EnvEnum.DATABASE_URL]: (v) => v ?? '',
  [EnvEnum.DB_HOST]: (v) => v ?? '',
  [EnvEnum.DB_PASSWORD]: (v) => v ?? '',
  [EnvEnum.DB_NAME]: (v) => v ?? '',
  [EnvEnum.NODE_ENV]: (v) => v ?? '',
  [EnvEnum.ALLOWED_ORIGINS]: (v) => v ?? '',
  [EnvEnum.TZ]: (v) => v ?? '',
};

// Función que crea el valor parseado desde las envs
export function createEnvironments(option: EnvEnum) {
  const parser = parsers[option];
  return parser ? parser(process.env[option]) : undefined;
}

// Cache auxiliar con valores ya leídos (o undefined inicialmente)
const customEnvAux: Partial<Record<EnvEnum, any>> = {
  [EnvEnum.STAGE]: undefined,
  [EnvEnum.PORT]: undefined,
  [EnvEnum.DB_HOST]: undefined,
  [EnvEnum.DB_PORT]: undefined,
  [EnvEnum.DB_USERNAME]: undefined,
  [EnvEnum.DB_PASSWORD]: undefined,
  [EnvEnum.DB_NAME]: undefined,
  [EnvEnum.JWT_SECRET]: undefined,
  [EnvEnum.JWT_SECRET_KEY]: undefined,
  [EnvEnum.DATABASE_URL]: undefined,
  [EnvEnum.ALLOWED_ORIGINS]: undefined,
  [EnvEnum.USERNAME]: undefined,
  [EnvEnum.DATABASE]: undefined,
  [EnvEnum.SYNCRONIZE]: undefined,
  [EnvEnum.HOST_API]: undefined,
  [EnvEnum.API_URL]: undefined,
  [EnvEnum.NODE_ENV]: undefined,
  [EnvEnum.TZ]: undefined,
};

// Función principal de acceso
export const customEnv = (env: EnvEnum) => {
  return customEnvAux[env] ?? createEnvironments(env);
}

