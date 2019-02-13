import { Collection,Cursor,WriteOpResult,InsertOneWriteOpResult } from 'mongodb';

export interface MongoRepositoryInterface<T>{
   setId(id:String):void
   getCollection():Collection
   getOnlyOne(id:String):Promise<T>
   getAll():Cursor<T>
   saveMassive(arrayData:Array<T>):Promise<any>
   save(object: T):Promise<InsertOneWriteOpResult>
   update(id:String,object:T):Promise<WriteOpResult>
   delete(id:String):Promise<WriteOpResult>
}