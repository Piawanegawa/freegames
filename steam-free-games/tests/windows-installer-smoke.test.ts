import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = process.cwd();
const smokeCheck = join(projectRoot, 'scripts', 'check-windows-installer.mjs');

describe('Windows installer smoke check', () => {
  it('passes when the built Windows installer is present and non-empty', () => {
    const result = spawnSync(process.execPath, [smokeCheck], { cwd: projectRoot, encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Installer smoke check passed');
  });

  it('fails when the expected installer is absent', () => {
    const root = mkdtempSync(join(tmpdir(), 'steam-free-games-installer-'));

    try {
      const result = spawnSync(process.execPath, [smokeCheck], { cwd: root, encoding: 'utf8' });
      expect(result.status).not.toBe(0);
      expect(result.stderr).toContain('Windows installer not found');
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('passes only when a non-empty expected installer exists', () => {
    const root = mkdtempSync(join(tmpdir(), 'steam-free-games-installer-'));
    const installer = join(root, 'src-tauri', 'target', 'release', 'bundle', 'nsis');
    mkdirSync(installer, { recursive: true });
    writeFileSync(join(installer, 'steam-free-games_0.1.0_x64-setup.exe'), 'installer');

    try {
      const result = spawnSync(process.execPath, [smokeCheck], {
        cwd: root,
        encoding: 'utf8',
        env: { ...process.env, WINDOWS_INSTALLER_PATH: 'src-tauri/target/release/bundle/nsis/steam-free-games_0.1.0_x64-setup.exe' },
      });
      expect(result.status).toBe(0);
      expect(result.stdout).toContain('Installer smoke check passed');
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('fails when the expected installer exists but is empty', () => {
    const root = mkdtempSync(join(tmpdir(), 'steam-free-games-installer-'));
    const installer = join(root, 'src-tauri', 'target', 'release', 'bundle', 'nsis');
    mkdirSync(installer, { recursive: true });
    writeFileSync(join(installer, 'steam-free-games_0.1.0_x64-setup.exe'), '');

    try {
      const result = spawnSync(process.execPath, [smokeCheck], {
        cwd: root,
        encoding: 'utf8',
        env: { ...process.env, WINDOWS_INSTALLER_PATH: 'src-tauri/target/release/bundle/nsis/steam-free-games_0.1.0_x64-setup.exe' },
      });
      expect(result.status).not.toBe(0);
      expect(result.stderr).toContain('installer is empty');
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
