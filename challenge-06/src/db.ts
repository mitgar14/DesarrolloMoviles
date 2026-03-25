import Dexie from "dexie";

const db = new Dexie("Challenge06DB");

db.version(1).stores({
  frutas: "++id, nombre, cantidad, createdAt",
});

export default db;
