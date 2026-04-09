
import { spawn } from 'child_process';
import * as readline from 'readline';
import * as kill from 'tree-kill';

let proc: ReturnType<typeof spawn> | null = null;

const args = process.argv.slice(2);
const target = args[0]; // 'api2' si hiciste npm run dev -- api2

console.log('🔧 Target recibido:', target);

function startProcess() {
  if (proc) {
    console.log('⛔ Matando proceso anterior...');
    kill(proc.pid!, 'SIGKILL', () => {
      launch();
    });
  } else {
    launch();
  }
}

function launch() {
  // CAMBIO: Ejecutar el script directamente, no como build:<target>
  // proc = spawn('cmd', ['/c', `npm run build:${target}`], {
  proc = spawn('powershell', ['-Command', `npm run ${target}`], {
    stdio: 'inherit',
    shell: true,
  });
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

console.log(
  '🚀 Servidor lanzado. Pulsa "tab+tab" para cerrar "tab+q" para recargar. Ctrl+2 para salir.\n',
);
startProcess();

let restartkey: string = '';

process.stdin.on('keypress', (_str, key) => {
  if (key.name === 'q' || key.name === 'tab') {
    if (key.name === 'q' && restartkey === 'tab') {
      console.log('🔁 Reiniciando...\n');
      restartkey = '';
      startProcess();
      return undefined;
    } else if (key.name.toLowerCase() === 'tab' && restartkey === 'tab') {
      console.log('Paralizando el server.');
      restartkey = '';
      if (proc) kill(proc.pid!, 'SIGKILL', () => process.exit());
      else process.exit();
      return undefined;
    }

    restartkey = key.name.toLowerCase();
    console.warn('Esperando para parar ejecucion');
  }
});
