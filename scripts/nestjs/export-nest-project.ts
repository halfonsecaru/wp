// scripts/nestjs/export-nest-project.ts
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

// ========== DETECTAR DEPENDENCIAS USADAS ==========
const detectUsedDependencies = async (projectSrcPath: any) => {
  const allTsFiles = glob.sync(`${projectSrcPath}/**/*.ts`);
  const deps = new Set();

  const importRegex = /from\s+['"]([^'"]+)['"]/g;

  for (const file of allTsFiles) {
    const content = await fs.readFile(file, 'utf-8');
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const pkg = match[1];

      // Ignorar rutas relativas o alias del monorepo
      if (
        pkg.startsWith('.') ||
        pkg.startsWith('/') ||
        pkg.startsWith('@libs/') ||
        pkg.startsWith('src/')
      ) {
        continue;
      }

      // Si el import es de tipo @nestjs/common o passport-jwt
      const basePkg = pkg.split('/')[0].startsWith('@')
        ? pkg.split('/').slice(0, 2).join('/')
        : pkg.split('/')[0];
      deps.add(basePkg);
    }
  }

  return Array.from(deps).sort();
};

const appName = process.argv[2];

if (!appName) {
  console.error(
    '❌ Debes especificar el nombre del proyecto. Ej: npm run export:nest api',
  );
  process.exit(1);
}

const rootDir = process.cwd();
const sourceAppPath = path.join(rootDir, 'apps', 'back', appName);
const targetPath = path.join(rootDir, 'exported', appName);

// 1. Verificar que el proyecto existe
if (!fs.existsSync(sourceAppPath)) {
  console.error(`❌ El proyecto apps/back/${appName} no existe.`);
  process.exit(1);
}

(async () => {
  try {
    console.log(`📦 Exportando proyecto "${appName}"...`);

    // 2. Limpiar destino si existe
    await fs.remove(targetPath);

    // 3. Copiar carpeta src
    await fs.copy(
      path.join(sourceAppPath, 'src'),
      path.join(targetPath, 'src'),
    );
    console.log('✅ Copiado src');

    // 4. Copiar main.ts
    const mainFile = path.join(sourceAppPath, 'main.ts');
    if (fs.existsSync(mainFile)) {
      await fs.copy(mainFile, path.join(targetPath, 'main.ts'));
      console.log('✅ Copiado main.ts');
    }

    // 5. Copiar .env si existe
    const envFile = path.join(sourceAppPath, '.env');
    if (fs.existsSync(envFile)) {
      await fs.copy(envFile, path.join(targetPath, '.env'));
      console.log('✅ Copiado .env');
    }

    console.log('🎉 Proyecto exportado a: exported/' + appName);
  } catch (error) {
    console.error('❌ Error exportando:', error);
  }

  const requiredLibs = ['shared', 'nestjs'];

  console.log('📁 Copiando librerías completas: shared, nestjs y angular...');

  // Copiar a libs/
  for (const lib of requiredLibs) {
    const srcLibPath = path.join(rootDir, 'libs', lib);
    const destLibPath = path.join(targetPath, 'src', 'libs', lib);

    await fs.copy(srcLibPath, destLibPath, {
      filter: (src) => {
        const ignoredFiles = [
          'tsconfig.json',
          'tsconfig.lib.json',
          'tsconfig.build.json',
          '.eslintrc.js',
          '.prettierrc',
          '.prettierrc.json',
          'package.json',
        ];
        const fileName = path.basename(src);
        return !ignoredFiles.includes(fileName);
      },
    });
  }

  // ========== GENERAR nest-cli.json ==========
  const nestCliJson = {
    collection: '@nestjs/schematics',
    sourceRoot: 'src',
    compilerOptions: {
      deleteOutDir: true,
      assets: ['**/*.hbs', '**/*.html', '**/*.json', '**/*.env'],
      watchAssets: true,
    },
  };

  await fs.writeJson(path.join(targetPath, 'nest-cli.json'), nestCliJson, {
    spaces: 2,
  });
  console.log('✅ Generado nest-cli.json');
  // ********************************************************* //
  // ========== GENERAR tsconfig.json ==========
  const tsConfigJson = {
    compilerOptions: {
      module: 'commonjs',
      moduleResolution: 'node',
      target: 'ES2023',
      sourceMap: true,
      rootDir: 'src',
      outDir: 'dist',
      declaration: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      strictNullChecks: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      removeComments: true,
      allowSyntheticDefaultImports: true,
      baseUrl: './',
      noImplicitAny: false,
      strictBindCallApply: false,
      noFallthroughCasesInSwitch: false,
      paths: {
        // Property assignment expected.
        [`@${appName}/*`]: ['./*'],
        '@libs/*': ['src/libs/*'],
      },
    },
    include: ['src/**/*'],
  };

  await fs.writeJson(path.join(targetPath, 'tsconfig.json'), tsConfigJson, {
    spaces: 2,
  });
  console.log('✅ Generado tsconfig.json');
  // ********************************************************** //
  const tsConfigBuildJson = {
    extends: './tsconfig.json',
    exclude: ['node_modules', 'test', 'dist', '**/*spec.ts'],
  };

  await fs.writeJson(
    path.join(targetPath, 'tsconfig.build.json'),
    tsConfigBuildJson,
    { spaces: 2 },
  );
  console.log('✅ Generado tsconfig.build.json');
  // ========== GENERAR README.md ==========
  const readmeContent = `# ${appName}

  # Proyecto NestJS exportado automáticamente desde el monorepo.
  
  `;

  await fs.writeFile(path.join(targetPath, 'README.md'), readmeContent);
  console.log('✅ Generado README.md');

  // ========== GENERAR eslint.config.mjs ==========
  const eslintConfig = `
// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn'
    },
  },
);
`;

  await fs.writeFile(
    path.join(targetPath, 'eslint.config.mjs'),
    eslintConfig.trimStart(),
  );
  console.log('✅ Generado eslint.config.mjs moderno');

  // ========== GENERAR .prettierrc ==========
  const prettierConfig = {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 2,
    semi: true,
    endOfLine: 'lf',
  };

  await fs.writeJson(path.join(targetPath, '.prettierrc'), prettierConfig, {
    spaces: 2,
  });
  console.log('✅ Generado .prettierrc');

  // ========== GENERAR .gitignore ==========
  const gitignoreContent = `
# compiled output
/dist
/node_modules
/build

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# temp directory
.temp
.tmp

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json
`;

  await fs.writeFile(
    path.join(targetPath, '.gitignore'),
    gitignoreContent.trimStart(),
  );
  console.log('✅ Generado .gitignore');

  const usedDeps = await detectUsedDependencies(path.join(targetPath, 'src'));
  console.log('📦 Dependencias detectadas:', usedDeps);

  //* ************************************************************ //
  // ========== GENERAR package.json REAL con dependencias detectadas ==========
  const rootPackageJson = await fs.readJson(path.join(rootDir, 'package.json'));

  const allDepsUsed = await detectUsedDependencies(
    path.join(targetPath, 'src'),
  );

  const fullPackageJson = {
    name: appName,
    version: '1.0.0',
    description: `Proyecto exportado de NestJS: ${appName}`,
    main: 'dist/main.js',
    scripts: {
      start: 'node dist/main.js',
      'start:dev': 'nest start --watch',
      build: 'tsc -p tsconfig.build.json',
      lint: 'eslint . --ext .ts',
      format: 'prettier --write .',
    },
    dependencies: {} as Record<string, string>,
    devDependencies: {
      '@eslint/js': '^8.56.0',
      '@nestjs/cli': '^11.0.7',
      '@types/passport-local': '^1.0.38',
      '@typescript-eslint/eslint-plugin': '^7.18.0',
      '@typescript-eslint/parser': '^7.18.0',
      eslint: '^8.56.0',
      'eslint-plugin-prettier': '^5.0.1',
      globals: '^13.24.0',
      prettier: '^3.2.5',
      rimraf: '^6.0.1',
      'ts-node': '^10.9.2',
      'tsconfig-paths': '^4.2.0',
      typescript: '^5.8.3',
    },
  };
  // ========== DEPENDENCIAS EXTRAS BASE OBLIGATORIAS ==========
  const extraDeps = [
    'reflect-metadata',
    'class-transformer',
    '@fastify/compress',
    '@fastify/cookie',
    '@fastify/cors',
    '@fastify/csrf-protection',
    '@fastify/session',
    '@fastify/static',
    '@nestjs/cache-manager',
    '@nestjs/common',
    '@nestjs/config',
    '@nestjs/core',
    '@nestjs/jwt',
    '@nestjs/passport',
    '@nestjs/platform-fastify',
    '@nestjs/swagger',
    '@nestjs/typeorm',
    'bcrypt',
    'cache-manager',
    'class-validator',
    'dotenv',
    'helmet',
    'joi',
    'nest-access-control',
    'passport',
    'passport-jwt',
    'passport-local',
    'pg',
    'swagger-ui-express',
    'typeorm',
    'uuid',
    'winston',
    'reflect-metadata',
    'class-transformer',
  ];

  for (const extra of extraDeps) {
    if (!allDepsUsed.includes(extra)) {
      allDepsUsed.push(extra);
    }
  }

  // Convertimos a Set para evitar duplicados
  const uniqueDeps = [...new Set(allDepsUsed)];

  for (const dep of uniqueDeps) {
    const version =
      rootPackageJson.dependencies?.[dep as string] ||
      rootPackageJson.devDependencies?.[dep as string];

    if (version) {
      fullPackageJson.dependencies[dep as string] = version;
    }
  }

  await fs.writeJson(path.join(targetPath, 'package.json'), fullPackageJson, {
    spaces: 2,
  });
  console.log('✅ Generado package.json limpio con solo dependencias usadas');

  console.log("El root dir:", rootDir);
  const sourceDockerCompose = path.join(rootDir, 'apps', 'back', appName, 'docker-compose.yml');
  const targetDockerCompose = path.join(targetPath, 'docker-compose.yml');

  if (await fs.pathExists(sourceDockerCompose)) {
    await fs.copy(sourceDockerCompose, targetDockerCompose);
    console.log('🐳 docker-compose.yml copiado correctamente');
  } else {
    console.warn('⚠️ No se encontró docker-compose.yml en el monorepo');
  }
})();
