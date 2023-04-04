import jsonfile from "jsonfile";
import { IPost } from "../models/Post";

export interface IDb<T> extends Array<T> {
  posts: IPost[];
  //* Add your models here
  db: {
    [key: string]: T[];
  };
}

class Orm<T> extends Array<T> {
  db: IDb<T>;

  private static instance: Orm<any>;

  private constructor(dbFileName: string) {
    super();
    // @ts-ignore
    this.db = {
      [dbFileName]: [],
    };
    // this.db[dbFileName] = [];
    const filePath = this.getFilePath(dbFileName);
    this.openDb(filePath);
  }

  public static getInstance(dbFileName: string): Orm<any> {
    if (!Orm.instance) {
      Orm.instance = new Orm(dbFileName);
    }
    return Orm.instance;
  }

  private getFilePath(dbFileName: string) {
    return `${__dirname}/${dbFileName}`;
  }

  public async openDb(filePath: string): Promise<void> {
    try {
      const data = await jsonfile.readFile(filePath);
      Object.assign(this, data);
    } catch (err) {
      console.error(`Error reading database: ${err}`);
    }
  }

  public async saveDb(dbFileName: string): Promise<void> {
    try {
      const filePath = this.getFilePath(dbFileName);
      await jsonfile.writeFile(filePath, this);
    } catch (err) {
      console.error(`Error writing database: ${err}`);
    }
  }
}

export default Orm;
