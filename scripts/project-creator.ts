import 'module-alias/register.js';
import { execSync } from 'child_process';
import path, { dirname } from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import * as ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const args = process.argv.slice(2);

if (args.length < 2) {
  process.exit(1);
}

const [type, name] = args;
const baseDir = __dirname;

const validTypes = {
  angular: './angular/generate.angular.ts',
  nestjs: './nestjs/nestjs-generator.ts',
};

if (!validTypes[type]) {
  process.exit(1);
}

const scriptPath = path.join(baseDir, validTypes[type]);

// Ejecutar el script correspondiente y atrapar errores
try {
  // execSync('npm install --legacy-peer-deps', {
  //   cwd: baseDir,
  //   stdio: 'inherit',
  // });

  addScriptsToPackage(name, args[0]);
  addToTsConfig(baseDir, name, args[0]);

  execSync(`npx tsx ${scriptPath} ${name}`, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}

function addScriptsToPackage(projectName, folder) {
  const baseDir = process.cwd();
  const rootPackagePath = path.join(baseDir, 'package.json');

  // Read root package.json
  const rootPackageJson = JSON.parse(fs.readFileSync(rootPackagePath, 'utf-8'));

  // If scripts section doesn't exist, create it
  if (!rootPackageJson.scripts) {
    rootPackageJson.scripts = {};
  }

  let projectType = 'front';

  if (folder.toLowerCase() === 'nestjs') {
    projectType = 'back';
    modifyNestCliJson(baseDir, projectName);
  }

  //rootPackageJson._moduleAliases[`@${name}`] = `./apps/back/${name}/dist/src`;

  if (folder.toLowerCase() === 'nestjs') {
    // NestJS scripts following the specified pattern
    const nestjsScripts = {
      [`dev:${projectName}`]: `npm run build:libs && cd apps/${projectType}/${projectName} && nest build && nest start --watch`,
      [`start:${projectName}`]: `npm run build:libs && cd apps/${projectType}/${projectName} && nest build && nest start`,
      [`build:${projectName}`]: `npm run build:libs && cd apps/${projectType}/${projectName} && nest build`,
      [`build:${projectName}:prod`]: `npm run build:libs && cd apps/${projectType}/${projectName} && nest build --configuration production`,
      [`dev:${projectName}:reload`]: `npm run reload dev:${projectName}`,
    };

    // Add all NestJS scripts
    Object.entries(nestjsScripts).forEach(([scriptName, command]) => {
      if (!rootPackageJson.scripts[scriptName]) {
        rootPackageJson.scripts[scriptName] = command;
      }
    });
  } else {
    // Angular scripts (existing logic)
    const scriptKeys = ['dev', 'start', 'build'];

    scriptKeys.forEach((key) => {
      if (!rootPackageJson.scripts[`${key}:${projectName}`]) {
        let command;

        if (key === 'dev') {
          command = `ng serve --project=${projectName} --configuration development`;
        } else if (key === 'build') {
          command = `ng build --project=${projectName} --configuration production`;
        } else {
          command = `ng serve --project=${projectName}`;
        }

        rootPackageJson.scripts[`${key}:${projectName}`] = command;
      }
    });
  }

  // Save updated package.json
  fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackageJson, null, 2));

  console.log(`✅ Scripts dev:${projectName}, start:${projectName} and build:${projectName} added to root package.json`);
}

function modifyNestCliJson(baseDir, proyectName) {
  try {
    const dirNestCliJson = path.join(baseDir, 'nest-cli.json');

    const content = JSON.parse(fs.readFileSync(dirNestCliJson, 'utf-8'));

    if (!content.projects) {
      content.projects = {};
    }

    if (!content.projects[proyectName]) {
      content.projects[`${proyectName}`] = {
        type: 'application',
        root: `apps/back/${proyectName}`,
        entryFile: 'main',
        sourceRoot: `apps/back/${proyectName}/src`,
        compilerOptions: {
          tsConfigPath: `apps/back/${proyectName}/tsconfig.json`,
        },
      };
      fs.writeFileSync(dirNestCliJson, JSON.stringify(content, null, 2));
    }
  } catch (error) {
    console.log(error);
  }
}

function addToTsConfig(baseDir, projectName, folder) {
  try {
    const pathFile = path.join(__dirname, '..', 'tsconfig.json');
    const configFile = ts.readConfigFile(pathFile, ts.sys.readFile);
    const content = configFile.config;

    // Map folder type to apps directory
    if (folder === 'nestjs') {
      folder = 'back';
    } else if (folder === 'angular') {
      folder = 'front';
    }

    // Add reference to the new project
    if (!content.references) {
      content.references = [];
    }

    const newReference = { path: `apps/${folder}/${projectName}` };

    // Check if reference already exists
    const referenceExists = content.references.some((ref) => ref.path === newReference.path);

    if (!referenceExists) {
      content.references.push(newReference);
    }

    // Save updated tsconfig.json
    fs.writeFileSync(pathFile, JSON.stringify(content, null, 2));

    console.log(`✅ Reference to apps/${folder}/${projectName} added to root tsconfig.json`);
  } catch (error) {
    console.log('Error adding to tsconfig:', error);
  }
}
/**
 * Genera un alias limpio y sus rutas para tsconfig
 */
function generateTsconfigAlias(pathFile: any, name: string) {
  const alias = `@${name}/*`;
  const basePath = path.posix.normalize(`apps/$back/${name}`);
  const paths = [`${basePath}/*`, `${basePath}/dist/*`];
  return { alias, paths };
}

/**
 * Añade el alias generado a tsconfig.base.json
 */
export function addAliasToTsconfig(pathFile: any, name: string) {
  const tsconfigPath = path.join(pathFile, 'tsconfig.base.json');

  // Verificación de existencia y que no sea un directorio
  if (!fs.existsSync(tsconfigPath)) {
    //console.error(`❌ No se encontró el archivo: ${tsconfigPath}`);
    return;
  }

  if (fs.statSync(tsconfigPath).isDirectory()) {
    console.error(`❌ La ruta apunta a un directorio, no a un archivo: ${tsconfigPath}`);
    return;
  }

  const { alias, paths } = generateTsconfigAlias(name, 'back');

  try {
    const config = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

    if (!config.compilerOptions) config.compilerOptions = {};
    if (!config.compilerOptions.paths) config.compilerOptions.paths = {};

    if (!config.compilerOptions.paths[alias]) {
      config.compilerOptions.paths[alias] = paths;

      // Ordenar alfabéticamente por clave
      config.compilerOptions.paths = Object.fromEntries(Object.entries(config.compilerOptions.paths).sort());

      fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2) + '\n');
      // console.log(`✅ Alias "${alias}" añadido a tsconfig.base.json`);
    } else {
      //console.log(`ℹ️ Alias "${alias}" ya existe en tsconfig.base.json`);
    }
  } catch (err: any) {
    // console.error('❌ Error leyendo o modificando tsconfig.base.json:', err.message);
  }
}
