// eslint-disable-next-line sonarjs/no-duplicate-string
import { spawnSync, execSync } from 'child_process';
import fs from 'fs-extra';
import { log } from '../logger.js';
import path from 'path';
import readlineSync from 'readline-sync';
import dotenv from 'dotenv';
import fsExtra from 'fs-extra';

export async function configureAppService(baseDir) {
  const appServicePath = path.join(baseDir, 'src', 'app.service.ts');
  //const appServiceJson = JSON.parse(fs.readFileSync(appServicePath, 'utf-8'));
  const content = `
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './mainEntities/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const user = await this.usersService.findAnyUser();

    if (!user) {
      this.logger.warn('No users found, creating default admin user...');

      const defaultUsername = 'admin';
      const defaultPassword = 'admin123';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      await this.usersService.createUser({
        username: defaultUsername,
        password: hashedPassword,
        role: 'admin',
      });

      this.logger.warn(
        \`Default admin user created: \${defaultUsername} / \${defaultPassword}\`,
      );
    } else {
      this.logger.log('Users already exist, skipping default admin creation.');
    }
  }
}
`;
  fs.writeFileSync(appServicePath, content);

  // creamos el AppController
  const appControllerPath = path.join(baseDir, 'src', 'app.controller.ts');
  const contentApp = `
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}`;
  fs.writeFileSync(appControllerPath, contentApp);
}

export async function eliminateProyect(process, name, baseDir) {
  const windows = process.platform === 'win32';

  if (fs.existsSync(baseDir)) {
    const confirm = readlineSync.question(log.info(`⚠️  Project "${name}" already exists. Do you want to overwrite it? (Y/n): `));

    if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === '') {
      log.warn('💀 Terminating processes that might be using the project...');

      if (windows) {
        try {
          const list = execSync(`wmic process where "CommandLine like '%\${baseDir.replace(/\/g, '\\')}%'" get ProcessId,CommandLine /FORMAT:LIST`, {
            encoding: 'utf-8',
          });
          const pids = [...list.matchAll(/ProcessId=(d+)/g)].map((m) => m[1]);

          for (const pid of pids) {
            log.warn(`💥 Killing process PID ${pid}`);
            execSync(`taskkill /PID ${pid} /F`);
          }
        } catch {
          log.warn('⚠️ Could not close processes. Make sure to close VS Code or terminals.');
        }
      }

      log.info('⏳ Waiting 1 second to release resources...');
      await new Promise((res) => setTimeout(res, 1000));

      try {
        fs.rmSync(baseDir, { recursive: true, force: true });
        log.info(`🧨 Folder ${baseDir} deleted.`);

        const composeFile = path.join(baseDir, 'docker-compose.yml');

        try {
          spawnSync('docker', ['compose', '-f', composeFile, 'down', '-v'], {
            stdio: 'inherit',
          });
        } catch (err) {}
      } catch (err) {
        log.error(`❌ Error deleting folder: ${err.message}`);
        process.exit(1);
      }
    } else {
      log.warn('❌ Operation cancelled by user.');
      process.exit(0);
    }
  }
}
const isDockerInstalled = () => {
  try {
    execSync('docker -v', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const isDockerRunning = () => {
  try {
    execSync('docker info', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

export async function checkIfDockerIsOn() {
  if (!isDockerInstalled()) {
    log.error(`
            ##############################################################
            #                                                            #
            #   🚨  DOCKER IS NOT INSTALLED ON YOUR SYSTEM!            #
            #                                                            #
            #   This generator needs Docker to create PostgreSQL.       #
            #                                                            #
            #   👉 Download and install from:                           #
            #      https://www.docker.com/products/docker-desktop       #
            #                                                            #
            #   ❌ The script will stop to avoid errors.                #
            #                                                            #
            ##############################################################
        `);

    process.exit(1);
  }

  if (!isDockerRunning()) {
    log.error(`
            ##############################################################
            #                                                            #
            #   🚨  DOCKER IS NOT RUNNING!                             #
            #                                                            #
            #   Please start Docker Desktop and try again.              #
            #                                                            #
            #   ❌ The script will stop to avoid errors.                #
            #                                                            #
            ##############################################################
        `);

    process.exit(1);
  }

  log.success('✅ Docker is installed and running');
}

export async function createProyect(name) {
  // log.info(`🚀 Creando proyecto NestJS con Fastify en ${baseDir}...`);
  // try {
  //   execSync(
  //     `npx @nestjs/cli new ${name} --directory=${baseDir} --skip-install --package-manager=npm`,
  //     { stdio: 'inherit' },
  //   );
  // } catch (error) {
  //   console.log(error);
  //   process.exit(1);
  // }

  //addToTsConfig(baseDir,name);
  //generatePackage(baseDir, name);
  const baseDir = path.join(process.cwd(), 'apps', 'back', name);
  console.log(`📦 Creando nuevo NestJS app en: ${baseDir}`);

  // 1️⃣ Crear estructura de carpetas
  fs.mkdirSync(path.join(baseDir, 'src', 'auth'), { recursive: true });
  fs.mkdirSync(path.join(baseDir, 'src', 'env'), {
    recursive: true,
  });

  // 2️⃣ Crear tsconfig.json independiente por app
  fs.writeFileSync(
    path.join(baseDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2023',
          lib: ['ES2023'],
          module: 'nodenext',
          moduleResolution: 'nodenext',
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          strict: true,
          skipLibCheck: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          forceConsistentCasingInFileNames: true,
          removeComments: true,
          sourceMap: true,
          outDir: './dist',
          baseUrl: './',
          incremental: true,
          noEmit: false,
          declaration: false,
          paths: {
            '@libs/shared/*': ['../../../dist/libs/shared/*'],
            '@libs/nestjs/*': ['../../../dist/libs/nestjs/*'],
          },
        },
        include: ['src/**/*'],
        exclude: ['node_modules', 'dist'],
      },
      null,
      2,
    ),
  );
  // 3️⃣ Crear main.ts ya PRO con el setGlobalPrefix
  fs.writeFileSync(
    path.join(baseDir, 'src', 'main.ts'),
    `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('${name}');
  await app.listen(3002);
}
bootstrap();`,
  );

  fs.writeFileSync(
    path.join(baseDir, 'src', 'app.service.ts'),
    `import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
}
`,
  );

  // 4️⃣ Crear app.module.ts mínimo
  fs.writeFileSync(
    path.join(baseDir, 'src', 'app.module.ts'),
    `import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}`,
  );

  fs.writeFileSync(
    path.join(baseDir, 'src', 'app.controller.ts'),
    `import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
`,
  );

  // 6️⃣ Instalar las dependencias necesarias globales (solo si quieres forzarlo desde la raíz)
  log.success('✅ Proyecto NestJS generado sin package.json local.');
}

function generatePackage(baseDir, name) {
  try {
    // Read the monorepo package.json as base
    // const monorepoPackagePath = path.join(
    //   baseDir,
    //   '..',
    //   '..',
    //   '..',
    //   'package.json',
    // );
    // const basePackageJson = JSON.parse(
    //   fs.readFileSync(monorepoPackagePath, 'utf-8'),
    // );

    // // Filter NestJS-specific dependencies
    // const nestjsDependencies = {};
    // const nestjsDevDependencies = {};

    // NestJS-specific dependencies
    // const nestjsDeps = [
    //   '@nestjs/common',
    //   '@nestjs/core',
    //   '@nestjs/config',
    //   '@nestjs/jwt',
    //   '@nestjs/mapped-types',
    //   '@nestjs/passport',
    //   '@nestjs/platform-fastify',
    //   '@nestjs/swagger',
    //   '@nestjs/typeorm',
    //   '@nestjs/cache-manager',
    //   '@fastify/compress',
    //   '@fastify/cookie',
    //   '@fastify/cors',
    //   '@fastify/csrf-protection',
    //   '@fastify/session',
    //   '@fastify/static',
    //   'bcrypt',
    //   'cache-manager',
    //   'class-transformer',
    //   'class-validator',
    //   'dotenv',
    //   'helmet',
    //   'joi',
    //   'module-alias',
    //   'nest-access-control',
    //   'nest-winston',
    //   "@types/passport-jwt",
    //   'passport',
    //   'passport-jwt',
    //   'passport-local',
    //   'pg',
    //   'readline-sync',
    //   'reflect-metadata',
    //   'swagger-ui-express',
    //   'typeorm',
    //   'uuid',
    //   'winston',
    // ];

    // // NestJS-specific dev dependencies
    // const nestjsDevDeps = [
    //   '@nestjs/cli',
    //   'eslint',
    //   'rimraf',
    //   'ts-node',
    //   'tsconfig-paths',
    //   'typescript',
    // ];

    // // Filter dependencies
    // Object.keys(basePackageJson.dependencies || {}).forEach((dep) => {
    //   if (nestjsDeps.includes(dep)) {
    //     nestjsDependencies[dep] = basePackageJson.dependencies[dep];
    //   }
    // });

    // // Filter dev dependencies
    // Object.keys(basePackageJson.devDependencies || {}).forEach((dep) => {
    //   if (nestjsDevDeps.includes(dep)) {
    //     nestjsDevDependencies[dep] = basePackageJson.devDependencies[dep];
    //   }
    // });

    // Create new package.json for the project
    const projectPackageJson = {
      name: name,
      version: '1.0.0',
      private: true,
      description: `NestJS project: ${name}`,
      // scripts: {
      //   build: 'nest build',
      //   format: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
      //   start: 'nest start',
      //   'start:dev': 'nest start --watch',
      //   'start:debug': 'nest start --debug --watch',
      //   'start:prod': 'node dist/main',
      //   lint: 'eslint "{src,apps,libs,test}/**/*.ts" --fix',
      //   test: 'jest',
      //   'test:watch': 'jest --watch',
      //   'test:cov': 'jest --coverage',
      //   'test:debug':
      //     'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
      //   'test:e2e': 'jest --config ./test/jest-e2e.json',
      // },
      // dependencies: nestjsDependencies,
      // devDependencies: nestjsDevDependencies,
    };

    const pathFile = path.join(baseDir, 'package.json');
    fs.writeFileSync(pathFile, JSON.stringify(projectPackageJson, null, 2));

    log.success(`✅ Package.json created for ${name} with NestJS-specific dependencies`);
  } catch (error) {
    log.error(`❌ Error creating package.json: ${error.message}`);
  }
}

function addToTsConfig(baseDir, proyectName) {
  try {
    // tsConfig
    const pathFile = path.join(baseDir, 'tsconfig.json');
    let content = `{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "composite": true,
    "rootDir": "./src",
    "target": "ES2023",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "strictNullChecks": true,
    "baseUrl": ".",
    "paths": {
      "@libs/shared/*": ["../../../libs/dist/shared/*"],
      "@libs/nestjs/*": ["../../../libs/dist/nestjs/*"],
      "@libs/angular/*": ["../../../libs/dist/angular/*"],
      "@${proyectName}/*" : ["./src/*"]
    }
  },
  "include": ["src/**/*"]
}`;

    fs.writeFileSync(pathFile, content);

    // readme
    const readmePath = path.join(baseDir, 'readme.md');
    fs.writeFileSync(readmePath, '');

    log.success('✅ tsconfig.json created with NestJS-specific configurations and library aliases');
  } catch (error) {
    console.log(error);
  }
}

export function copyEnv(baseDir) {
  const sharedEnvPath = path.join(baseDir, '..', '..', '..', 'libs', 'nestjs', 'configurations', 'env');

  const targetEnvPath = path.join(baseDir, 'src', 'env');

  fs.copySync(sharedEnvPath, targetEnvPath, { overwrite: true });
  log.success('✅ Copiados los archivos de entorno desde /configurations');
}

export async function configureBootStrap(mainPath) {
  const mainFileTemplate = `
import { customEnv, EnvEnum } from './global';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { execSync } from 'child_process';
import compress from '@fastify/compress';
import cookie from '@fastify/cookie';
import session from '@fastify/session';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from '@libs/nestjs/common/http-exception.filter';

// ✅ Inicializar una sola vez las variables

// swagger
function createSwaggerConfig(app: any) {
  const config = new DocumentBuilder()
    .setTitle('Milenium Modas api')
    .setDescription(
      'Esta es la documentación en el back de la aplicación milenium modas.',
    )
    .setVersion('1.0')
    // aqui igual, el nombre de la app
    .addServer('/api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  //aqui deberia poner en api, el nombre de la app
  SwaggerModule.setup('api', app, document);
}
// 🐘 Verificar e iniciar contenedor de PostgreSQL si hace falta
function ensurePostgresContainer() {
  
  if (customEnv(EnvEnum.STAGE)?.toLowerCase() !== 'dev') return;

  try {
    const result = execSync(
      \`docker ps --filter name=\${customEnv(EnvEnum.DB_NAME)} --format "{{.Names}}"\`
    ).toString().trim();

    if (!result) {
      console.log(\`🔄 PostgreSQL no está levantado. Iniciando...\`);

      execSync(\`docker compose up -d postgres\`, {
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

// 🚀 Bootstrap principal
async function bootstrap() {

  ensurePostgresContainer();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 50 * 1024 * 1024,
    }),
  );

  createSwaggerConfig(app);

  if (!customEnv(EnvEnum.JWT_SECRET)) {
    throw new Error('❌ JWT_SECRET_KEY no está definida en las variables de entorno');
  }

  await app.register(compress);
  await app.register(cookie, { secret: customEnv(EnvEnum.JWT_SECRET) });
  await app.register(session, {
    secret: customEnv(EnvEnum.JWT_SECRET),
    cookie: { secure: false },
  });

  app.setGlobalPrefix('api');

  if (!customEnv(EnvEnum.DATABASE_URL)) {
    console.warn('⚠️ DATABASE_URL no está definida. Comprueba tu archivo .env.*');
  }

  app.enableCors({
    origin: (origin, callback) => {
      const isAllowed =
        !origin ||
      customEnv(EnvEnum.ALLOWED_ORIGINS).includes(origin) ||
              /^https:\\/\\/localhost:\\d+$/.test(origin) ||
        /^https:\\/\\/127\\.0\\.0\\.1:\\d+$/.test(origin);


      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('❌ CORS bloqueado para origen'), false);
      }
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(customEnv(EnvEnum.PORT));
  console.log('🚀 Servidor corriendo en puerto ' + customEnv(EnvEnum.PORT));
}
bootstrap();
`.trim();

  fs.writeFileSync(mainPath, mainFileTemplate.trimStart());
  log.success('✅ Bootstrap modificado');
}

export async function configureAppModule(baseDir) {
  const appModulePath = path.join(baseDir, 'src', 'app.module.ts');

  const appModuleTemplate = `
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { customEnv, EnvEnum } from './global';
import { JwtService } from '@nestjs/jwt';
import { AppAccessControlModule } from './auth/access-control';
import { UserModule } from './mainEntities/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        'src/env/.env.' + ((customEnv(EnvEnum.STAGE) ?? process.env.STAGE) || 'dev'),
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        STAGE: Joi.string().valid('dev', 'prod').default('dev'),
        PORT: Joi.number().default(3002),
        JWT_SECRET: Joi.string().optional(),
      }),
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        driver: require('@mikro-orm/postgresql').PostgreSqlDriver,
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        user: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        dbName: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: config.get('STAGE') !== 'prod',
        ssl: config.get('STAGE') === 'prod' ? { rejectUnauthorized: false } : false,
        migrations: {
          path: './src/migrations',
          glob: '!(*.d).{js,ts}',
        },
      }),
    }),
    AppAccessControlModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    JwtService,
  ]
})
export class AppModule {}`.trim();
  fs.writeFileSync(appModulePath, appModuleTemplate);
}

export async function createUser(baseDir, name) {
  // Definimos la ruta de la carpeta
  const userDir = path.join(baseDir, 'src', 'mainEntities', 'users');

  // Aseguramos que la carpeta exista (crear recursivamente)
  await fs.ensureDir(userDir);

  // Definimos el path completo del archivo
  const entityFilePath = path.join(userDir, 'entities', 'user.entity.ts');

  // Contenido del entity - MikroORM
  const entityContent = `import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@Entity({ tableName: 'usuarios' })
export class User {
  @PrimaryKey()
  id!: number;

  @IsString()
  @Property({ unique: true })
  username!: string;

  @IsUUID()
  @Property()
  password!: string;

  @Property({ default: 'user' })
  role!: string;

  @Property({ type: 'date', onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt!: Date;

  // -----
  @ApiProperty({
    name: 'name',
    description: 'Ingreso del nombre del usuario que se esta registrando.',
    default: 'Usuario1',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  name!: string;
}
`;

  // Escribimos el archivo
  await fs.outputFile(entityFilePath, entityContent);

  await createUserDto(userDir, name);
}

async function createUserDto(userDir, name) {
  const userDirComposed = path.join(userDir, 'dto');

  // Aseguramos que la carpeta exista (crear recursivamente)
  await fs.ensureDir(userDirComposed);

  const entityContent = `
import { IsOptional, IsUUID, IsEmail, IsString } from 'class-validator';

export class GetUserDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}`;

  const createUserDtoFile = path.join(userDirComposed, 'GetUserDto.dto.ts');
  await fs.outputFile(createUserDtoFile, entityContent);
  await createUserService(userDir, name);
}

export async function createUserService(userDir, name) {
  await fs.outputFile(
    path.join(userDir, 'user.service.ts'),
    `
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.em.findOne(User, { username });
  }

  async countUsers(): Promise<number> {
    return await this.em.count(User);
  }

  async findAnyUser(): Promise<User | null> {
    return await this.em.findOne(User, {});
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.em.create(User, user as User);
    await this.em.persistAndFlush(newUser);
    return newUser;
  }
}
`,
  );
  await userController(userDir, name);
}

export async function userController(userDir, name) {
  await fs.outputFile(
    path.join(userDir, 'user.controller.ts'),
    `
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto } from './dto/GetUserDto.dto';
import { SwaggerDecor } from '../../auth/decorators/swagger.decorators';
import { AppResources, Auth } from '../../auth/access-control';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth({
    action: 'read',
    resource: AppResources.USER,
    possession: 'any',
  })
  @SwaggerDecor('User', 'Obtencion de usuario', 'Metodo para la obtencion del usuario' , GetUserDto)
  getOneById() {}
}`,
  );
  await userModule(userDir, name);
}

export async function userModule(userDir, name) {
  await fs.outputFile(
    path.join(userDir, 'user.module.ts'),
    `import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
  
@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}`,
  );
}

export async function createEnvs(baseDir) {
  const baseAux = path.join(baseDir, 'src');

  await fs.outputFile(
    path.join(baseAux, 'global.ts'),
    `
export enum EnvEnum {
  STAGE = 'STAGE',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  USERNAME = 'USERNAME',
  DATABASE = 'DATABASE',
  SYNCRONIZE = 'SYNCRONIZE',
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',
  JWT_SECRET = 'JWT_SECRET',
  PORT = 'PORT',
  HOST_API = 'HOST_API',
  API_URL = 'API_URL',
  DATABASE_URL = 'DATABASE_URL',
  DB_HOST = 'DB_HOST',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_NAME = 'DB_NAME',
  NODE_ENV = 'NODE_ENV',
  ALLOWED_ORIGINS = 'ALLOWED_ORIGINS',
}

// Tipo para los parsers
type EnvParser = (raw: string | undefined) => any;

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
};

// Función principal de acceso
export const customEnv = (env: EnvEnum) => {
  return customEnvAux[env] ?? createEnvironments(env);
}
`,
  );
}

export function createResponseInterface(baseDir) {
  const interfacePath = path.join(baseDir, 'src', 'common', 'interfaces');
  fs.mkdirSync(interfacePath, { recursive: true });

  const interfaceContent = `
export interface ResponseInterface {
  statusCode: number;
  message: string;
  Timestamps: string;
  path: string;
  error: any;
  data: any;
}
`.trim();

  fs.writeFileSync(path.join(interfacePath, 'response.interface.ts'), interfaceContent);
}

export async function createExceotionFilter(mainPath) {
  if (fs.existsSync(mainPath)) {
    let mainContent = fs.readFileSync(mainPath, 'utf-8');

    if (!mainContent.includes('AllExceptionFilter')) {
      mainContent = mainContent.replace(
        "from '@nestjs/core';",
        "from '@nestjs/core';import { AllExceptionFilter } from './common/filters/http-exception.filter';",
      );
    }

    if (!mainContent.includes('app.useGlobalFilters')) {
      mainContent = mainContent.replace('await app.listen', 'app.useGlobalFilters(new AllExceptionFilter());await app.listen');
    }

    fs.writeFileSync(mainPath, mainContent);
    log.success('✅ HttpExceptionFilter configurado en main.ts');
  } else {
    log.warn('⚠️ No se encontró main.ts en:');
  }
}

export async function createAuthModule(baseDir, name) {
  const authDir = path.join(baseDir, 'src', 'auth');
  fs.mkdirSync(authDir, { recursive: true });

  // // auth.module.ts
  fs.writeFileSync(
    path.join(authDir, 'auth.module.ts'),
    `import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../mainEntities/users/user.module';
import { customEnv, EnvEnum } from '../global';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: customEnv(EnvEnum.JWT_SECRET),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

`,
  );

  // ***********************************************************
  fs.writeFileSync(
    path.join(authDir, 'auth.service.ts'),
    `import { UserService } from '../mainEntities/users/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
`,
  );

  // **************************************************** //
  fs.writeFileSync(
    path.join(authDir, 'auth.controller.ts'),
    `import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiLoginRoute } from './decorators/swagger.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiLoginRoute('Auth', 'Login de usuario', 'login correcto')
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
`,
  );

  // **************************************************** //

  const dir = path.join(authDir, 'strategy');
  const filePath = path.join(dir, 'jwt.strategy.ts');

  await fsExtra.ensureDir(dir); // Asegura la carpeta

  let contentAuthJwt = `import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error(
        'JWT_SECRET no está definida en las variables de entorno',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
`;
  // Escribe el contenido (crea el archivo si no existe, lo sobreescribe si existe)
  await fs.writeFile(filePath, contentAuthJwt, { encoding: 'utf8' });

  // ******************************************************** //
  fs.writeFileSync(
    path.join(authDir, 'strategy', 'local.strategy.ts'),
    `import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username', // <-- Muy importante, porque tu payload usa "usuario" en vez de "username"
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}`,
  );

  // ************************************************************ //

  fs.mkdirSync(path.join(authDir, 'guard'), { recursive: true }); // Asegura la carpeta
  fs.mkdirSync(path.join(authDir, 'dto'), { recursive: true }); // Asegura la carpeta
  fs.mkdirSync(path.join(authDir, 'decorators'), { recursive: true }); // Asegura la carpeta

  fs.writeFileSync(
    path.join(authDir, 'decorators', 'swagger.decorators.ts'),
    `import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';

export function ApiLoginRoute(tag: string, summary: string, description: string) {
  return applyDecorators(
    ApiTags(tag),
    ApiBearerAuth('access-token'),
    ApiOperation({ summary }),
    ApiResponse({ status: 200, description }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 500, description: 'Server problems' }),
    ApiBody({ type: LoginDto }),
    UseGuards(LocalAuthGuard),
  );
}

export function SwaggerDecor(tag: string, summary: string, description: string, decorator: any) {
  return applyDecorators(
    ApiTags(tag),
    ApiBearerAuth('access-token'),
    ApiOperation({ summary }),
    ApiResponse({ status: 200, description }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 500, description: 'Server problems' }),
    ApiBody({ type: decorator }),
    UseGuards(LocalAuthGuard),
  );
}`,
  );

  fs.writeFileSync(
    path.join(authDir, 'decorators', 'current-user.decorator.ts'),
    `import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);`,
  );

  fs.writeFileSync(
    path.join(authDir, 'guard', 'local-auth.guard.ts'),
    `import { Injectable } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';

  @Injectable()
  export class LocalAuthGuard extends AuthGuard('local') {}`,
  );

  fs.writeFileSync(
    path.join(authDir, 'guard', 'jwt-auth.guard.ts'),
    `import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}`,
  );

  fs.writeFileSync(
    path.join(authDir, 'dto', 'login.dto.ts'),
    `import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    name: "username",
    description: 'Ingreso del usuario para el ingreso del login.',
    example: 'admin' ,
    default: 'admin'
  })
  username!: string;

  @ApiProperty(
    { 
      name: 'password' ,
      description: 'Ingreso del password el login.',
      example: 'admin123',
      default: 'admin123',
    },
  )
  password!: string;
}`,
  );

  // ************************************************************ //
  fs.mkdirSync(path.join(authDir, 'access-control'), { recursive: true }); // Asegura la carpeta

  fs.writeFileSync(
    path.join(authDir, 'access-control', 'roles.enum.ts'),
    `import { RolesBuilder } from 'nest-access-control';
import { AppResources } from './appresources.enum';

export enum AppRoles {
  ADMIN = 'ADMIN',
  ADMINISTRATIVO = 'ADMINISTRATIVO',
  JEFE = 'JEFE',
  PERSONAL = 'PERSONAL',
  SUPERADMIN = 'SUPERADMIN',
  USER = 'USER',
  DEPENDIENTA = 'DEPENDIENTA',
  ALMACEN = 'ALMACEN',
  COORDINADORA = 'COORDINADORA',
  INVITADO = 'INVITADO',
  VENTAONLINE = 'VENTAONLINE',
  FRANQUICIA = 'FRANQUICIA',
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(AppRoles.VENTAONLINE);

roles.grant(AppRoles.DEPENDIENTA)
.createAny([AppResources.FACTURAVENTA, AppResources.FACTURADEVOLUCION])
.readAny([AppResources.FACTURAVENTA, AppResources.FACTURADEVOLUCION])


roles.grant(AppRoles.SUPERADMIN)
.extend([AppRoles.DEPENDIENTA]);`,
  );

  fs.writeFileSync(
    path.join(authDir, 'access-control', 'index.ts'),
    `export * from './access-control.module';
export * from './appresources.enum';
export * from './auth.decorator';
export * from './roles.enum';`,
  );

  fs.writeFileSync(
    path.join(authDir, 'access-control', 'auth.decorator.ts'),
    `/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role, ACGuard, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

export const Auth = (...roles: Role[]) => {
    
  return applyDecorators(
   UseGuards(JwtAuthGuard, ACGuard),
   UseRoles(...roles),
  )
}`,
  );

  fs.writeFileSync(
    path.join(authDir, 'access-control', 'access-control.module.ts'),
    `import { Module } from '@nestjs/common';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './roles.enum';

@Module({
  imports: [AccessControlModule.forRoles(roles)],
  exports: [AccessControlModule],
})
export class AppAccessControlModule {}
`,
  );

  fs.writeFileSync(
    path.join(authDir, 'access-control', 'appresources.enum.ts'),
    `export enum AppResources {
  ARTICULO = 'ARTICULO',
  CIUDAD = 'CIUDAD',
  COLOR = 'COLOR',
  DIRECCION = 'DIRECCION',
  EMPRESA = 'EMPRESA',
  FAMILIA = 'FAMILIA',
  FACTURAVENTA = 'FACTURAVENTA',
  FACTURADEVOLUCION = 'FACTURADEVOLUCION',
  FOTOS = 'FOTO',
  GRUPO = 'GRUPO',
  HISTORIALTAGS = 'HISTORIALTAGS',
  HISTORIALINVENTARIOS = 'HISTORIALINVENTARIOS',
  INSTALACIONES = 'INSTALACIONES',
  INVENTARIO = 'INVENTARIO',
  PAIS = 'PAIS',
  PRODUCT = 'PRODUCT',
  PROVINCIA = 'PROVINCIA',
  MODELO = 'MODELO',
  MODELOTEMPORAL = 'MODELOTEMPORAL',
  TALLA = 'TALLA',
  TEMPORADA = 'TEMPORADA',
  TIPO = 'TIPO',
  USER = 'USER',
  VERSION = 'VERSION',
  RFID = 'RFID',
  PROVEEDOR = 'PROVEEDOR',
  RUTAS = 'RUTAS',
  EMPLEADO = 'EMPLEADO',
  TIENDA = 'TIENDA',
  TAG = 'TAG',
  TRASLADO = 'TRASLADO',
  VALE = 'VALE',
  TARJETAREGALO = 'TARJETAREGALO',
  CUADRODECUENTAS = 'CUADRODECUENTAS',
  CONCEPTOCUADRODECUENTAS = 'CONCEPTOCUADRODECUENTAS',
  INGRESOSDIARIOENTIENDA = 'INGRESOSDIARIOENTIENDA',
  GASTOSDIARIOENTIENDA = 'GASTOSDIARIOENTIENDA',
  ARQUEODIARIO = 'ARQUEODIARIO',
  ARTICULOTIENDA = 'ARTICULOTIENDA',
  HISTORIALVALE = 'HISTORIALVALE',
}`,
  );

  // ************************************************************ //

  const userServicePath = path.join(baseDir, 'src', 'mainEntities', 'users', 'user.service.ts');
  let userServiceContent = fs.readFileSync(userServicePath, 'utf-8');
  if (!userServiceContent.includes('findByName')) {
    userServiceContent = userServiceContent.replace(
      'async findAll(): Promise<User[]> {',
      `async findByName(name: string): Promise<User | null> {
return this.userRepo.findOneBy({ name });
}
async findAll(): Promise<User[]> {`,
    );
    fs.writeFileSync(userServicePath, userServiceContent);
  }
}

export async function startServer(baseDir) {
  // log.info("✅ Proyecto listo. Esperando liberación de recursos...");
  // await new Promise((res) => setTimeout(res, 3000));
  // log.info("🚀 Levantando servidor NestJS...");
  // execSync("npm run start:dev", { cwd: baseDir, stdio: "inherit" });
  // log.success("Exito, Espero que te vaya bien todo, de tu gran amigo antonio alfonseca");
}

export function updateTsConfig(baseDir) {
  const tsconfigPath = path.join(baseDir, 'tsconfig.json');
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.esModuleInterop = true;

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
}

export function downloadDocker(baseDir) {
  log.info('🐳 Descargando imagen de PostgreSQL...');
  try {
    const confirm = readlineSync.question(log.info(`⚠️  Instalamos docker? (s/N): `));
    if (confirm) {
      execSync(`docker pull postgres`, { stdio: 'inherit' });

      log.success('✅ Contenedores Docker iniciados correctamente.');
    }
  } catch (error) {
    log.warn('❌ Error al levantar Docker. ¿Está encendido Docker Desktop?');
    log.error(error.message);
    process.exit(1);
  }
}

function parseEnv(filePath) {
  const env = dotenv.parse(fs.readFileSync(filePath));
  return {
    DB_USERNAME: env.DB_USERNAME || 'postgres',
    DB_PASSWORD: env.DB_PASSWORD || 'admin',
    DB_NAME: env.DB_NAME || 'milenium',
  };
}

export function createComposeJson(baseDir) {
  const composerPath = path.join(baseDir, 'docker-compose.yml');
  // const envDev = parseEnv(
  //   path.join(baseDir, 'configurations', 'env', '.env.dev'),
  // );
  const dockerComposeContent = `
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: postgres_container_${Date.now()}
    restart: unless-stopped
    ports:
      - '\${DB_PORT:-5432}:5432'
    environment:
      POSTGRES_DB: \${DB_NAME}
      POSTGRES_USER: \${DB_USERNAME}
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data_${Date.now()}
    networks:
      - milenium_net

volumes:
  postgres_data:

networks:
  milenium_net:
`.trim();

  fs.writeFileSync(composerPath, dockerComposeContent, 'utf8');
  log.success('✅ docker-compose.yml regenerado con los datos de .env.dev');
}

async function createJwtStrategyFile(authDir, contentAuthJwt) {
  const dir = path.join(authDir, 'strategy');
  const filePath = path.join(dir, 'jwt.strategy.ts');

  await fsExtra.ensureDir(dir); // Asegura la carpeta
  await fsExtra.ensureFile(filePath); // Asegura el archivo

  console.log('Writing to:', filePath); // Verifica la ruta
  await fs.writeFile(filePath, contentAuthJwt);
}

export function addAliasToTsconfig(name: string) {
  const tsconfigPath = path.resolve('tsconfig.base.json');

  // 🛡️ Validación inicial
  if (!fs.existsSync(tsconfigPath)) {
    // console.error(`❌ No se encontró el archivo: ${tsconfigPath}`);
    return;
  }

  if (fs.statSync(tsconfigPath).isDirectory()) {
    console.error(`❌ La ruta apunta a un directorio, no a un archivo: ${tsconfigPath}`);
    return;
  }

  try {
    // Limpiar el nombre en caso de que venga con rutas
    const cleanName = name.replace(/\\/g, '/').split('/').pop() || name;

    const alias = `@${cleanName}/*`;
    const basePath = `apps/back/${cleanName}`.replace(/\\/g, '/');
    const paths = [`${basePath}/*`, `${basePath}/dist/*`];

    const config = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

    if (!config.compilerOptions) config.compilerOptions = {};
    if (!config.compilerOptions.paths) config.compilerOptions.paths = {};

    if (!config.compilerOptions.paths[alias]) {
      config.compilerOptions.paths[alias] = paths;

      // Ordenar alfabéticamente
      config.compilerOptions.paths = Object.fromEntries(Object.entries(config.compilerOptions.paths).sort());

      fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2) + '\n');
      console.log(`✅ Alias "${alias}" añadido correctamente al tsconfig.base.json`);
    } else {
      console.log(`ℹ️ El alias "${alias}" ya existe en tsconfig.base.json`);
    }
  } catch (err: any) {
    console.error(`❌ Error leyendo o modificando tsconfig.base.json: ${err.message}`);
  }
}

export function modifyNestCliJson(baseDir: string, name: string): void {
  const nestCliPath = path.join(baseDir, '..', '..', '..', 'nest-cli.json');

  if (fs.existsSync(nestCliPath)) {
    const nestCliContent = JSON.parse(fs.readFileSync(nestCliPath, 'utf8'));

    if (!nestCliContent.projects) {
      nestCliContent.projects = {};
    }

    nestCliContent.projects[name] = {
      type: 'application',
      root: `apps/back/${name}`,
      entryFile: 'main',
      sourceRoot: `apps/back/${name}/src`,
      compilerOptions: {
        tsConfigPath: `apps/back/${name}/tsconfig.json`,
      },
    };

    fs.writeFileSync(nestCliPath, JSON.stringify(nestCliContent, null, 2));
    console.log(`✅ Updated nest-cli.json with ${name} configuration`);
  } else {
    console.error('❌ nest-cli.json not found');
  }
}
