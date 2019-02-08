import { Db, Collection,InsertOneWriteOpResult,WriteOpResult,UpdateOneOptions, Cursor } from "mongodb";
import { MongoRepositoryInterface } from "../Interfaces/MongoRepositoryInterface";

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
    return this.getCollection().findOne<T>({_id:id})
  }
  getAll(query:any={},options:any={}):Cursor<T>  {
    return this.getCollection().find<T>(query,options)
  }
  async save(object: T): Promise<boolean> {
    const result: InsertOneWriteOpResult = await this.getCollection().insert(object);
    return !!result.result.ok;
  }
  async update(id: String, object: T,options?:UpdateOneOptions): Promise<WriteOpResult> {
    return await this.getCollection().update({_id:id},object,options);
  }
  async delete(id: String): Promise<WriteOpResult>{
    return await this.getCollection().remove({_id:id});
  }
}
