#!/usr/bin/env node
const os = require('os');
const path = require('path');

const VSCODE_DATA_FILE_PATH = {
  darwin: `${process.env.HOME}/Library/Application Support/Code/User/globalStorage/state.vscdb`,
  linux: `${process.env.HOME}/.config/Code/User/globalStorage/state.vscdb`,
  win32: `${process.env.APPDATA}/Code/User/globalStorage/state.vscdb`,
};

const DB_PATH = VSCODE_DATA_FILE_PATH[os.platform()];
const MACROS_PATH = 'macros.json';

const { exportMacros, importMacros } = require('./macros');

async function load(dbPath = DB_PATH, macrosPath = MACROS_PATH) {
  const dbResolvedPath = path.resolve(dbPath);
  const macrosResolvedPath = path.resolve(macrosPath);
  console.log(`Importando macros de ${macrosResolvedPath} em ${dbResolvedPath}`);
  importMacros(dbResolvedPath, macrosResolvedPath);
}

async function save(dbPath = DB_PATH, macrosPath = MACROS_PATH) {
  const dbResolvedPath = path.resolve(dbPath);
  const macrosResolvedPath = path.resolve(macrosPath);
  console.log(`Exportando macros de ${dbResolvedPath} em ${macrosResolvedPath}`);
  exportMacros(dbResolvedPath, macrosResolvedPath);
}

async function main() {
  const [, , command, macrosPath, dbPath] = process.argv;

  switch (command) {
    case 'import':
      load(dbPath, macrosPath);
      break;
      case 'export':
      save(dbPath, macrosPath);
      break;
    default:
      console.error('use import ou export');
  } 
}

main();
