import { log } from '../logger.js';
import {
  eliminateProyect,
  createStructure,
  addTailwind,
  addAliasToTsconfig,
} from './eliminateExist.js';
import path from 'path';

const name = process.argv[2];
// **** //
if (!name) {
  log.error('❌ You must specify the Angular project name');
  process.exit(1);
}

const baseDir = path.join('apps', 'front', name);

(async () => {
  await eliminateProyect(process, name, baseDir);
  await createStructure(baseDir, name);
  await addTailwind(name, baseDir);
  await addAliasToTsconfig(name);
})();

// await createAngularProyject(name, baseDir);
//await removeUnnecesaryFiles(name, baseDir);
//await createEnvironmentDev(name, baseDir);
// await configurationFileReplacements(name, baseDir);









// // Paso 9: Angular Material
// console.log(`🎉 Proyecto Angular "${name}" creado con éxito en ${baseDir}`);
