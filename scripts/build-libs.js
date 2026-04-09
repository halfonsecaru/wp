const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function buildLibs(watchMode = false) {
  const libsPath = path.join(__dirname, '..', 'libs');
  const libs = fs.readdirSync(libsPath);

  if (watchMode) {
    console.log('🔨 Building libraries in watch mode...');
    
    // Build all libraries first
    libs.forEach((lib) => {
      const libPath = path.join(libsPath, lib);
      const tsconfigPath = path.join(libPath, 'tsconfig.json');

      if (fs.existsSync(tsconfigPath)) {
        try {
          console.log(`📦 Initial build of ${lib}...`);
          execSync(`npx.cmd tsc -b ${tsconfigPath} --force`, {
            stdio: 'inherit',
            cwd: path.dirname(tsconfigPath),
            shell: true,
          });
          console.log(`✅ ${lib} built successfully`);
        } catch (error) {
          console.error(`❌ Error building ${lib}:`, error.message);
        }
      }
    });

    // Start watch mode for all libraries
    libs.forEach((lib) => {
      const libPath = path.join(libsPath, lib);
      const tsconfigPath = path.join(libPath, 'tsconfig.json');

      if (fs.existsSync(tsconfigPath)) {
        console.log(`👀 Watching ${lib}...`);
        const watchProcess = spawn('npx.cmd', ['tsc', '-b', tsconfigPath, '--watch'], {
          stdio: 'inherit',
          cwd: path.dirname(tsconfigPath),
          shell: true,
        });

        watchProcess.on('error', (error) => {
          console.error(`❌ Error watching ${lib}:`, error.message);
        });
      }
    });

    console.log('🎉 All libraries are being watched!');
  } else {
    console.log('🔨 Building libraries...');

    libs.forEach((lib) => {
      const libPath = path.join(libsPath, lib);
      const tsconfigPath = path.join(libPath, 'tsconfig.json');

      if (fs.existsSync(tsconfigPath)) {
        try {
          console.log(`📦 Building ${lib}...`);
          execSync(`npx.cmd tsc -b ${tsconfigPath} --force`, {
            stdio: 'inherit',
            cwd: path.dirname(tsconfigPath),
            shell: true,
          });
          console.log(`✅ ${lib} built successfully`);
        } catch (error) {
          console.error(`❌ Error building ${lib}:`, error.message);
          process.exit(1);
        }
      }
    });

    console.log('🎉 All libraries built successfully!');
  }
}

// Check if --watch flag is passed
const watchMode = process.argv.includes('--watch');
buildLibs(watchMode);
