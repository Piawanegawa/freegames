import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const installerPath = resolve(
  process.cwd(),
  process.env.WINDOWS_INSTALLER_PATH ?? 'src-tauri/target/release/bundle/nsis/steam-free-games_0.1.0_x64-setup.exe',
);

try {
  const installer = await stat(installerPath);
  if (!installer.isFile() || installer.size === 0) {
    throw new Error(`Windows installer is empty or not a file: ${installerPath}`);
  }
  console.log(`Installer smoke check passed (${installer.size} bytes): ${installerPath}`);
} catch (error) {
  console.error(error instanceof Error && error.message.includes('empty or not a file')
    ? error.message
    : `Windows installer not found: ${installerPath}`);
  process.exitCode = 1;
}
