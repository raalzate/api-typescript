import {
  Db,
  Collection,
  InsertOneWriteOpResult,
  WriteOpResult,
  UpdateOneOptions,
  Cursor
} from "mongodb";
import { MongoRepositoryInterface } from "../Interfaces/MongoRepositoryInterface";


const erorrCodes={
  11000:"EXIST_ITEM"
}

export abstract class BaseMongoRepository<T>
  implements MongoRepositoryInterface<T> {
  public id: String;
  public nameCollection: String;
  db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  setId(id: String): void {
    this.id = id;
  }
  getCollection(): Collection {
    return this.db.collection(`${this.nameCollection}_${this.id}`);
  }
  getOnlyOne(id: String): Promise<T> {
    return this.getCollection().findOne<T>({ _id: id });
  }
  getAll(query: any = {}, options: any = {}): Cursor<T> {
    return this.getCollection().find<T>(query, options);
  }
  saveMassive(arrayData: Array<T>): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.getCollection()
        .insertMany(arrayData, { w: 1, ordered: false })
        .then(data => {
          resolve(data && data.result ? data.result : data);
        })
        .catch(err => {
          reject(err.result ? err.result : err);
        });
    });
  }
  save(object: T): Promise<InsertOneWriteOpResult> {
    return this.getCollection().insert(object);
  }

  update(
    id: String,
    object: T,
    options?: UpdateOneOptions
  ): Promise<WriteOpResult> {
    return this.getCollection().update({ _id: id }, object, options);
  }
  delete(id: String): Promise<WriteOpResult> {
    return this.getCollection().remove({ _id: id });
  }
  updateMany(query:any,data:any):Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.getCollection()
        .update(query,data,{multi:true})
        .then(data => {
          resolve(data.result);
        })
        .catch(err => {
          reject(err.error);
        });
    });
  }
  getCode(code:number){
   return erorrCodes[code]?erorrCodes[code]:"UNKNOW_ERROR";
  }
}
