import * as admin from "firebase-admin";

export interface FirebaseRepositoryInterface<T>{
   setId(id:String):void
   getRef():admin.database.Reference
   getOnlyOne(id:String):Promise<admin.database.DataSnapshot>
   save(object: T):Promise<void>
   update(object:T):Promise<void>
   delete(id:String):Promise<void>
}