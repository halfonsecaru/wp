import { log } from '../logger.js';
import {
  eliminateProyect,
  createStructure,
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
  await addAliasToTsconfig(name);
})();
