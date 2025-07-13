// utils/indexedDb.ts
import { openDB } from 'idb';

export const initDb = async () => {
  return openDB('MyAppDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('userData')) {
        db.createObjectStore('userData');
      }
    },
  });
};

export const setItem = async (key: string, value: any) => {
  const db = await initDb();
  await db.put('userData', value, key);
};

export const getItem = async (key: string) => {
  const db = await initDb();
  return db.get('userData', key);
};
