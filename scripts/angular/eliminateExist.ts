import { ensureDir, ensureFileSync } from 'fs-extra';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { spawnSync, execSync } from 'child_process';
import fs from 'fs-extra';
import { log } from '../logger.js';
import path from 'path';
import readlineSync from 'readline-sync';
import dotenv from 'dotenv';
import fsExtra from 'fs-extra';

export async function eliminateProyect(process, name, baseDir) {
  const windows = process.platform === 'win32';

  if (fs.existsSync(baseDir)) {
    const confirm = readlineSync.question(
      log.info(
        `⚠️  Project "${name}" already exists. Do you want to overwrite it? (Y/n): `,
      ),
    );

    if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === '') {
      log.warn('💀 Terminating processes that might be using the project...');

      if (windows) {
        try {
          const list = execSync(
            `wmic process where "CommandLine like '%\${baseDir.replace(/\/g, '\\')}%'" get ProcessId,CommandLine /FORMAT:LIST`,
            { encoding: 'utf-8' },
          );
          const pids = [...list.matchAll(/ProcessId=(d+)/g)].map((m) => m[1]);

          for (const pid of pids) {
            log.warn(`💥 Killing process PID ${pid}`);
            execSync(`taskkill /PID ${pid} /F`);
          }
        } catch {
          log.warn(
            '⚠️ Could not close processes. Make sure to close VS Code or terminals.',
          );
        }
      }

      log.info('⏳ Waiting 1 second to release resources...');
      await new Promise((res) => setTimeout(res, 1000));

      try {
        fs.rmSync(baseDir, { recursive: true, force: true });
        log.info(`🧨 Folder ${baseDir} deleted.`);
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

export async function createStructure(baseDir, name) {
  const folders = [
    join(baseDir, 'src'),
    join(baseDir, '.vscode'),
    join(baseDir, 'public'),
    join(baseDir, 'src', 'app'),
  ];

  for (const folder of folders) {
    ensureDir(folder);
    console.log(`📁 Folder created: ${folder}`);
  }

  return await createTsConfig(baseDir, name);
}

async function createTsConfig(basePath, name) {
  // Crear tsconfig.json si no existe
  const tsconfigPath = join(basePath, 'tsconfig.json');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    JSON.stringify(
      {
        extends: '../../../tsconfig.json',
        compilerOptions: {
          composite: true,
          outDir: './dist/' + name,
          module: 'esnext',
          moduleResolution: 'node',
          paths: {
            '@alfcomponents/*': ['../../../alfcomponents/*'],
          },
        },
        include: ['src/**/*.ts'],
      },
      null,
      2,
    ),
  );

  console.log(`✅ tsconfig.json created (con alias @alfcomponents)`);
  createReadme(basePath, name);
}

async function createReadme(basePath, name) {
  // Crear tsconfig.json si no existe
  const tsconfigPath = join(basePath, 'README.md');
  ensureFileSync(tsconfigPath);
  writeFileSync(tsconfigPath, JSON.stringify('', null, 2));

  console.log(`✅ README.md created`);
  creatPackageJson(basePath, name);
}

async function creatPackageJson(basePath, name) {
  const tsconfigPath = join(basePath, 'package.json');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    `{
  "name": "${name}",
  "version": "1.0.0",
  "description": "Frontend Angular standalone de la app ${name}",
  "private": true
}`,
  );

  console.log(`✅ package.json created`);
  addProyectToAngularJson(basePath, name);
}

async function addProyectToAngularJson(basePath, name) {
  const pathMain = path.join(basePath, '..', '..', '..');
  const ANGULAR_JSON_PATH = join(pathMain, 'angular.json');
  const APP_NAME = name;
  const appConfig = {
    projectType: 'application',
    schematics: {
      '@schematics/angular:component': {
        style: 'scss',
      },
    },
    root: `apps/front/${APP_NAME}`,
    sourceRoot: `apps/front/${APP_NAME}/src`,
    prefix: 'app',
    architect: {
      build: {
        builder: '@angular/build:application',
        options: {
          browser: `apps/front/${APP_NAME}/src/main.ts`,
          tsConfig: `apps/front/${APP_NAME}/tsconfig.json`,
          inlineStyleLanguage: 'scss',
          assets: [
            {
              glob: '**/*',
              input: `apps/front/${APP_NAME}/public`,
              output: '/',
            },
            {
              glob: '**/*',
              input: 'libs/angular/i18n',
              output: '/libs/angular/i18n/',
            },
          ],
          styles: [
            `apps/front/${APP_NAME}/src/styles.css`,
            `apps/front/${APP_NAME}/src/styles.scss`,
          ],
        },
        configurations: {
          production: {
            fileReplacements: [
              {
                replace: `libs/angular/environments/environment.ts`,
                with: `libs/angular/environments/environment.prod.ts`,
              },
            ],
            budgets: [
              {
                type: 'initial',
                maximumWarning: '500kB',
                maximumError: '1MB',
              },
              {
                type: 'anyComponentStyle',
                maximumWarning: '4kB',
                maximumError: '8kB',
              },
            ],
            outputHashing: 'all',
          },
          development: {
            fileReplacements: [
              {
                replace: `libs/angular/environments/environment.ts`,
                with: `libs/angular/environments/environment.dev.ts`,
              },
            ],
            optimization: false,
            extractLicenses: false,
            sourceMap: true,
          },
        },
        defaultConfiguration: 'production',
      },
      serve: {
        builder: '@angular/build:dev-server',
        configurations: {
          production: {
            buildTarget: `${APP_NAME}:build:production`,
          },
          development: {
            buildTarget: `${APP_NAME}:build:development`,
          },
        },
        defaultConfiguration: 'development',
      },
      'extract-i18n': {
        builder: '@angular/build:extract-i18n',
      },
      test: {
        builder: '@angular/build:karma',
        options: {
          tsConfig: `apps/front/${APP_NAME}/tsconfig.spec.json`,
          inlineStyleLanguage: 'scss',
          assets: [
            {
              glob: '**/*',
              input: `apps/front/${APP_NAME}/public`,
              output: '/',
            },
          ],
          styles: [`apps/front/${APP_NAME}/src/styles.scss`],
        },
      },
    },
  };

  const angularJson = JSON.parse(readFileSync(ANGULAR_JSON_PATH, 'utf-8'));
  angularJson.projects[APP_NAME] = appConfig;
  writeFileSync(ANGULAR_JSON_PATH, JSON.stringify(angularJson, null, 2));
  console.log(`✅ Proyecto Angular '${APP_NAME}' añadido a angular.json`);
  await createEditorConfig(basePath, name);
}

async function createEditorConfig(basePath, name) {
  const tsconfigPath = join(basePath, '.editorconfig');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    `root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false
`,
  );

  console.log(`✅ .editorconfig created`);

  return createScss(basePath, name);
}

async function createScss(basePath, name) {
  const app = path.join(basePath, 'src');
  const tsconfigPath = join(app, 'styles.scss');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    `@import '../../../libs/angular/styles/root.scss';\n@import '../../../libs/angular/styles/predefined.scss';\n`,
  );
  const tsconfigPath2 = join(app, 'styles.css');
  ensureFileSync(tsconfigPath);
  writeFileSync(tsconfigPath2, ``);

  createIndexHtml(basePath, name);
}

async function createIndexHtml(basePath, name) {
  const app = path.join(basePath, 'src');
  const tsconfigPath = join(app, 'index.html');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${name}</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
`,
  );

  createMainTs(basePath, name);
}

async function createMainTs(basePath, name) {
  const app = path.join(basePath, 'src');
  const tsconfigPath = join(app, 'main.ts');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
`,
  );
  createAppTs(basePath, name);
}

async function createAppTs(basePath, name) {
  basePath = path.join(basePath, 'src');
  const app = path.join(basePath, 'app');
  const tsconfigPath = join(app, 'app.ts');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    `import { Component, ChangeDetectionStrategy, AfterRenderPhase, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    afterNextRender(() => {
      initFlowbite();
    }, { phase: AfterRenderPhase.Write });
  }
}
`,
  );
  createAppScss(basePath, name);
}

async function createAppScss(basePath, name) {
  const app = path.join(basePath, 'app');
  const tsconfigPath = join(app, 'app.scss');
  ensureFileSync(tsconfigPath);
  writeFileSync(tsconfigPath, ``);
  createAppRoutes(basePath, name);
}

async function createAppRoutes(basePath, name) {
  const app = path.join(basePath, 'app');
  const tsconfigPath = join(app, 'app.routes.ts');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    `import { Routes } from '@angular/router';
export const routes: Routes = [];
`,
  );
  createAppHtml(basePath, name);
}

async function createAppHtml(basePath, name) {
  const app = path.join(basePath, 'app');
  const tsconfigPath = join(app, 'app.html');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    `
<button type="button" class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Red to Yellow</button>
<router-outlet></router-outlet>
`,
  );
  createAppConfig(basePath, name);
}

async function createAppConfig(basePath, name) {
  const app = path.join(basePath, 'app');
  const tsconfigPath = join(app, 'app.config.ts');
  ensureFileSync(tsconfigPath);
  writeFileSync(
    tsconfigPath,
    `import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding())
  ]
};
`,
  );
}

// export async function removeUnnecesaryFiles(name, baseDir) {
//   console.log('🧹 Cleaning Angular Content...');
//   await fs.remove(path.join(baseDir, 'package.json'));
//   await fs.remove(path.join(baseDir, 'tsconfig.app.json'));
//   await fs.remove(path.join(baseDir, 'tsconfig.json'));
//   await fs.remove(path.join(baseDir, 'readme.md'));
//   await fs.remove(path.join(baseDir, 'src', 'app', 'app.html'));
//   await createTsConfig(baseDir);
//   await createTsConfigApp(baseDir, name);
//   await createHtml(baseDir);
// }

// async function createHtml(baseDir) {
//   const tsConfigPath = path.join(baseDir, 'src', 'app', 'app.html');
//   await ensureFile(tsConfigPath);
//   await fs.writeFile(
//     tsConfigPath,
//     `<button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200">Haz clic aquí</button>
// <router-outlet></router-outlet>`,
//   );
// }

// async function createTsConfigApp(baseDir, name) {
//   const tsConfigPath = path.join(baseDir, 'tsconfig.app.json');
//   await ensureFile(tsConfigPath);
//   await fs.writeFile(
//     tsConfigPath,
//     `{
//   "extends": "./tsconfig.json",
//   "compilerOptions": {
//     "module": "ES2022",
//     "moduleResolution": "node"
//     "outDir": "../../../dist/angular/${name}",
//     "types": []
//   },
//   "include": [
//     "src/**/*.ts"
//   ],
//   "exclude": [
//     "src/**/*.spec.ts"
//   ]
// }`,
//   );
// }

// async function createTsConfig(baseDir) {
//   const tsConfigPath = path.join(baseDir, 'tsconfig.json');
//   await ensureFile(tsConfigPath);
//   await fs.writeFile(
//     tsConfigPath,
//     `{
//   "extends": "../../../tsconfig.json",
//   "compileOnSave": false,
//   "compilerOptions": {
//     "noImplicitOverride": true,
//     "noPropertyAccessFromIndexSignature": true,
//     "noImplicitReturns": true,
//     "noFallthroughCasesInSwitch": true,
//     "isolatedModules": true,

//     "importHelpers": true,
//     "module": "preserve"
//   },
//   "angularCompilerOptions": {
//     "enableI18nLegacyMessageIdFormat": false,
//     "strictInjectionParameters": true,
//     "strictInputAccessModifiers": true,
//     "typeCheckHostBindings": true,
//     "strictTemplates": true
//   },
//   "files": []
// }`,
//   );
// }

// export async function createEnvironmentDev(name, baseDir) {
//   const localEnvPath = path.join(baseDir, 'src', 'environments');
//   const localEnvFile = path.join(
//     baseDir,
//     'src',
//     'environments',
//     'environment.dev.ts',
//   );
//   await ensureDir(localEnvPath);
//   await ensureFile(localEnvFile);
//   await fs.writeFile(
//     localEnvFile,
//     `export const environment = {
//   aplicationName: '${name}',
//   type: 'dev',
//   production: false,
//   CONTROL: { mode: 'dev', message: 'DEVELOPMENT MODE' },
//   API_URL: 'http://127.0.0.1:3002/',
//   API_WEBSOCKET: 'ws://localhost:3002',

//   API_USERS_UPLOAD: 'api/users/upload',
// };
// `,
//   );
//   await createEnvironmentProd(name, baseDir);
// }

// async function createEnvironmentProd(name, baseDir) {
//   const localEnvFile = path.join(
//     baseDir,
//     'src',
//     'environments',
//     'environment.prod.ts',
//   );
//   await ensureFile(localEnvFile);
//   await fs.writeFile(
//     localEnvFile,
//     `export const environment = {
//   aplicationName: '${name}',
//   type: 'prod',
//   production: true,
//   CONTROL: { mode: 'prod', message: 'PRODUCTION MODE' },
//   API_URL: 'http://127.0.0.1:3002/',
//   API_WEBSOCKET: 'ws://localhost:3002',

//   API_USERS_UPLOAD: 'api/users/upload',
// };`,
//   );
//   await createEnvironment(name, baseDir);
// }

// async function createEnvironment(name, baseDir) {
//   const localEnvFile = path.join(
//     baseDir,
//     'src',
//     'environments',
//     'environment.ts',
//   );
//   await ensureFile(localEnvFile);
//   await fs.writeFile(
//     localEnvFile,
//     `export const environment = {
//   aplicationName: '${name}',
//   type: '',
//   production: false,
//   CONTROL: { mode: '', message: '' },
//   API_URL: '',
//   API_WEBSOCKET: '',

//   API_USERS_UPLOAD: '',
// };`,
//   );
// }

// export async function configurationFileReplacements(name, baseDir) {
//   // // Paso 5: Configurar fileReplacements
//   console.log('⚙️ Configuring fileReplacements...');
//   const angularJsonPath = path.join(baseDir, 'angular.json');
//   if (fs.existsSync(angularJsonPath)) {
//     const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));
//     const projectName = Object.keys(angularJson.projects)[0];
//     angularJson.projects[projectName].architect.build.configurations = {
//       production: {
//         fileReplacements: [
//           {
//             replace: `apps/front/${name}/src/environments/environment.ts`,
//             with: `./src/environments/environment.prod.ts`,
//           },
//         ],
//       },
//       development: {
//         fileReplacements: [
//           {
//             replace: `apps/front/${name}/src/environments/environment.ts`,
//             with: `./src/environments/environment.dev.ts`,
//           },
//         ],
//       },
//     };
//     const polyfills =
//       angularJson.projects[projectName].architect.build.options.polyfills;
//     if (Array.isArray(polyfills)) {
//       angularJson.projects[projectName].architect.build.options.polyfills =
//         polyfills.filter((entry) => !entry.includes('zone.js'));
//     }
//     fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
//     console.log(
//       '✅ fileReplacements configurados correctamente y zone.js eliminado (si estaba)',
//     );
//   }
// }

export async function addTailwind(name, baseDir) {
  const usarTailwind =
    readlineSync
      .question('¿Quieres instalar Tailwind CSS? (S/n): ')
      .toLowerCase() !== 'n';
  if (usarTailwind) {
    console.log('🎨 Installing Tailwind CSS...');
    fs.writeFileSync(
      path.join(baseDir, '.postcssrc.json'),
      JSON.stringify({ plugins: { '@tailwindcss/postcss': {} } }, null, 2),
    );

    fs.writeFileSync(
      path.join(baseDir, 'src', 'styles.css'),
      `@import "tailwindcss";
@plugin "flyonui";
@plugin "flowbite/plugin";
@source "../node_modules/flowbite";
`
    );
    console.log('all instaled type npm run dev:front:o;');

    // const angularJsonPath = path.join(baseDir, 'angular.json');
    // if (fs.existsSync(angularJsonPath)) {
    //   const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));
    //   const projectName = Object.keys(angularJson.projects)[0];
    //   const styles = angularJson.projects[projectName].architect.build.options.styles;
    //   const cssEntry = `src/styles.css`;
    //   const hasCss = styles?.some(
    //     (s) => typeof s === 'string' && s.includes('styles.css'),
    //   );
    //   if (!hasCss) {
    //     angularJson.projects[
    //       projectName
    //     ].architect.build.options.styles.unshift(cssEntry);
    //     fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
    //     console.log('🧩 styles.css added in angular.json');
    //   }
    // }
  }
}

export function addAliasToTsconfig(name: string) {
  const tsconfigPath = path.resolve('tsconfig.base.json');

  // 🛡️ Validación inicial
  if (!fs.existsSync(tsconfigPath)) {
   // console.error(`❌ No se encontró el archivo: ${tsconfigPath}`);
    return;
  }

  if (fs.statSync(tsconfigPath).isDirectory()) {
    console.error(
      `❌ La ruta apunta a un directorio, no a un archivo: ${tsconfigPath}`,
    );
    return;
  }

  try {
    // Limpiar el nombre en caso de que venga con rutas
    const cleanName = name.replace(/\\/g, '/').split('/').pop() || name;

    const alias = `@${cleanName}/*`;
    const basePath = `apps/front/${cleanName}`.replace(/\\/g, '/');
    const paths = [`${basePath}/*`, `./dist/${cleanName}/*`];

    const config = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

    if (!config.compilerOptions) config.compilerOptions = {};
    if (!config.compilerOptions.paths) config.compilerOptions.paths = {};

    if (!config.compilerOptions.paths[alias]) {
      config.compilerOptions.paths[alias] = paths;

      // Ordenar alfabéticamente
      config.compilerOptions.paths = Object.fromEntries(
        Object.entries(config.compilerOptions.paths).sort(),
      );

      fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2) + '\n');
      console.log(
        `✅ Alias "${alias}" añadido correctamente al tsconfig.base.json`,
      );
    } else {
      console.log(`ℹ️ El alias "${alias}" ya existe en tsconfig.base.json`);
    }
  } catch (err: any) {
    console.error(
   //   `❌ Error leyendo o modificando tsconfig.base.json: ${err.message}`,
    );
  }
}
