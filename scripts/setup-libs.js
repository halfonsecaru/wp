const fs = require('fs');
const path = require('path');

function createSymlinks() {
  const libs = ['shared', 'nestjs'];
  const apiDistPath = path.join(__dirname, '..', 'dist', 'apps', 'back', 'api');
  const libsDistPath = path.join(__dirname, '..', 'dist', 'libs');

  // Crear directorio dist si no existe
  if (!fs.existsSync(apiDistPath)) {
    fs.mkdirSync(apiDistPath, { recursive: true });
  }

  libs.forEach((lib) => {
    const libPath = path.join(libsDistPath, lib);
    const symlinkPath = path.join(apiDistPath, 'libs', lib);

    if (fs.existsSync(libPath)) {
      // Crear directorio para symlinks
      fs.mkdirSync(path.dirname(symlinkPath), { recursive: true });

      // Eliminar symlink existente si hay
      if (fs.existsSync(symlinkPath)) {
        fs.unlinkSync(symlinkPath);
      }

      // Crear symlink
      fs.symlinkSync(libPath, symlinkPath, 'junction');
      console.log(`✅ Symlink creado: ${symlinkPath} -> ${libPath}`);
    }
  });
}

createSymlinks();
