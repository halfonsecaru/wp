import { EnvEnum } from "./enums";
import { customEnv } from "./global";
import { execSync } from 'child_process';


export const ensurePostgresContainer = () => {
  if (customEnv(EnvEnum.STAGE)?.toLowerCase() !== 'dev') return;

  try {
    const result = execSync(`docker ps --filter name=${customEnv(EnvEnum.DB_NAME)} --format "{{.Names}}"`)
      .toString()
      .trim();

    if (!result) {
      console.log(`🔄 PostgreSQL no está levantado. Iniciando...`);

      execSync(`docker compose up -d postgres`, {
        stdio: 'inherit',
        env: {
          ...process.env,
          DB_HOST: customEnv(EnvEnum.DB_HOST),
          DB_PORT: String(customEnv(EnvEnum.DB_PORT)),
          DB_USERNAME: customEnv(EnvEnum.DB_USERNAME),
          DB_PASSWORD: customEnv(EnvEnum.DB_PASSWORD),
          DB_NAME: customEnv(EnvEnum.DB_NAME),
          DATABASE: customEnv(EnvEnum.DB_NAME),
        },
      });
    } else {
      console.log('✅ Contenedor de PostgreSQL ya está activo.');
    }
  } catch (error: any) {
    console.error('❌ Error al iniciar PostgreSQL:', error.message);
    process.exit(1);
  }
}
