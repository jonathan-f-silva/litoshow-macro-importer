const fs = require('fs');

const initSqlJs = require('sql.js');

async function getDB(dbPath) {
  const [SQL, fileBuffer] = await Promise.all(
    [initSqlJs(), fs.promises.readFile(dbPath)],
  );
  
  return new SQL.Database(fileBuffer);
}

async function getMacros(db) {
  const [{ values: [[data]] }] = db.exec(`
    SELECT value FROM ItemTable
    WHERE key = "FernandoPalacios.litoshow";
  `);
  const parsed = JSON.parse(data);
  return parsed['litoshow.macros'];
}

async function exportMacros(dbPath, macrosPath) {
  const db = await getDB(dbPath);
  const macros = await getMacros(db);
  
  fs.promises.writeFile(macrosPath, JSON.stringify(macros));
}

async function importMacros(dbPath, macrosPath) {
  const db = await getDB(dbPath);
  const [newMacros, oldMacros] = await Promise.all([
    fs.promises.readFile(macrosPath, 'utf-8'),
    getMacros(db),
  ]);
  
  const macros = JSON.stringify([...oldMacros, ...JSON.parse(newMacros)]);
  const value = `{"litoshow.macros":${macros}}`;

  db.run(`
    INSERT INTO "main"."ItemTable" ("key", "value")
    VALUES ('FernandoPalacios.litoshow', :value)
  `, { ':value': value });

  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
} 

module.exports = {
  getDB,
  getMacros,
  importMacros,
  exportMacros,
};
