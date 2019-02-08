import { Collection,Cursor,WriteOpResult } from 'mongodb';

export interface MongoRepositoryInterface<T>{
   setId(id:String):void
   getCollection():Collection
   getOnlyOne(id:String):Promise<T>
   getAll():Cursor<T>
   save(object:T): Promise<boolean>
   update(id:String,object:T):Promise<WriteOpResult>
   delete(id:String):Promise<WriteOpResult>
}