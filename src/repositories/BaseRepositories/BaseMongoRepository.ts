import {
  Db,
  Collection,
  InsertOneWriteOpResult,
  WriteOpResult,
  UpdateOneOptions,
  WriteError,
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
  save(object: T): Promise<InsertOneWriteOpResult> {
    return this.getCollection().insert(object);
  }
  async saveMassive(arrayData: Array<T>): Promise<any[]> {
    let resultMongo: Array<any> = [];
    try {
      await this.insertMany(arrayData);
      arrayData.forEach((element:any) => {
        resultMongo.push({
          id: element.id,
          insert: "OK",
          err: null
        });
      });
    } catch (error) {
      if (error && error.result) {
        resultMongo=resultMongo.concat(this.getRegisterData(error,arrayData));
        resultMongo=resultMongo.concat(this.getNotRegisterData(error,arrayData));
      }
    }
    return resultMongo;
  }
  private getRegisterData(error:any,arrayData: Array<any>){
    const resDataArray:Array<any>=[];
    if (error.result.nInserted > 0) {
      arrayData.forEach((data: any) => {
        const resError: any = error.result.writeErrors.find(
          (element: WriteError) =>
          arrayData[element.index].id === data.id
        );
        if (!resError) {
          resDataArray.push({
            id: data.id,
            insert: "OK",
            err: null
          });
        }
      });
    }
    return resDataArray;
  }
  private getNotRegisterData(error:any,arrayData: Array<any>){
    const resultMongo:Array<any>=[];
    error.result.writeErrors.forEach((element: WriteError) => {
      const index = element.index;
      resultMongo.push({
        id: arrayData[index].id,
        insert: "FAIL",
        err: this.getCode(element.code)
      });
    });
    return resultMongo;
  }
  private insertMany(arrayData: Array<T>){
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
  getCode(code:number){
   return erorrCodes[code]?erorrCodes[code]:"UNKNOW_ERROR";
  }
}
