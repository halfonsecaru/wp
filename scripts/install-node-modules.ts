import { execSync } from 'child_process';

try {
  console.log('📦 Instalando dependencias con --legacy-peer-deps...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  console.log('✅ Dependencias instaladas correctamente');
} catch (error) {
  console.error('❌ Error al instalar dependencias:', error);
}