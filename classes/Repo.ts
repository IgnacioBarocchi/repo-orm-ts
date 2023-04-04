import Orm, { IDb } from "./Orm";

abstract class Repo<T extends IDb<T>> {
  protected readonly dbFileName: string;
  private ormInstance: Orm<T>;

  constructor(dbFileName: string) {
    this.dbFileName = dbFileName;
    this.ormInstance = Orm.getInstance(dbFileName);
  }

  protected async openDb(): Promise<IDb<T>> {
    const db = await this.ormInstance.openDb(this.dbFileName);
    // @ts-ignore
    return db;
  }

  protected async saveDb(db: IDb<T>): Promise<void> {
    await this.ormInstance.saveDb(this.dbFileName);
  }

  async getOne(id: number | string, key: string = "id"): Promise<T | null> {
    const db = await this.openDb();
    // @ts-ignore
    for (const obj of db[this.tableName]) {
      if (obj[key] === id) {
        return obj as T;
      }
    }
    return null;
  }

  async persists(id: number | string, key: string = "id"): Promise<boolean> {
    const db = await this.openDb();
    // @ts-ignore
    for (const obj of db) {
      // @ts-ignore
      if (obj[key] === id) {
        return true;
      }
    }
    return false;
  }

  async getAll(): Promise<T[]> {
    const db = await this.openDb();
    return db as unknown as T[];
  }

  async add(obj: T): Promise<void> {
    const db = await this.openDb();
    // @ts-ignore
    if (!obj?.id) this.generateId();
    // @ts-ignore
    if (db && !Object.keys(db).includes(this.tableName))
      // @ts-ignore
      db[this.tableName] = [];
    db.push(obj);

    await this.saveDb(db);
  }

  async update(obj: T, key: string = "id"): Promise<void> {
    const db = await this.openDb();
    // @ts-ignore
    for (let i = 0; i < db[this.tableName].length; i++) {
      // @ts-ignore
      if (db[this.tableName][i].id === obj[key]) {
        // @ts-ignore
        db[this.tableName][i] = obj;
        await this.saveDb(db);
        return;
      }
    }
    throw new Error(`Object not found`);
  }

  async delete(id: number | string, key: string = "id"): Promise<void> {
    const db = await this.openDb();
    console.log(`db ${JSON.stringify(db)}`);
    for (let i = 0; i < db.length; i++) {
      // @ts-ignore
      if (db[i][key] === id) {
        db.splice(i, 1);
        await this.saveDb(db);
        return;
      }
    }
    throw new Error(`Object with ${key} ${id} not found`);
  }

  protected abstract tableName: keyof IDb<T>;

  protected abstract generateId(): number;
}

export default Repo;
