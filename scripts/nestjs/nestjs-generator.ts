import 'module-alias/register.js';
import { log } from '../logger.js';
import {
  createEnvs,
  createComposeJson,
  configureAppService,
  createAuthModule,
  createExceotionFilter,
  eliminateProyect,
  checkIfDockerIsOn,
  createProyect,
  copyEnv,
  configureBootStrap,
  configureAppModule,
  createUser,
  addAliasToTsconfig,
  modifyNestCliJson,
} from './nestjs-project-manager';

import path from 'path';

const name = process.argv[2];
// **** //
if (!name) {
  log.error('❌ You must specify the NestJS project name');
  process.exit(1);
}

const baseDir = path.join('apps', 'back', name);
const mainPath = path.join(baseDir, 'src', 'main.ts');
const pathMain = path.join(__dirname, '..', '..');
(async () => {
  await eliminateProyect(process, name, baseDir);
  await checkIfDockerIsOn();
  await createProyect(name);
  copyEnv(baseDir);
  await configureBootStrap(mainPath);
  await configureAppModule(baseDir);
  await configureAppService(baseDir);
  await createUser(baseDir, name);
  createExceotionFilter(mainPath);
  createAuthModule(baseDir, name);
  createComposeJson(baseDir);
  createEnvs(baseDir);
  addAliasToTsconfig(name);
  modifyNestCliJson(baseDir, name);
})();
