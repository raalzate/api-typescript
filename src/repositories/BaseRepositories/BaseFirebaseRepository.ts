import { FirebaseRepositoryInterface } from "../Interfaces/FirebaseRepositoryInterface";
import * as admin from "firebase-admin";

import { contants } from "../../contants";

const serviceAccount = contants.FB_CONFIG;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: contants.DATABASE_URL
});
const database = admin.database();

export abstract class BaseFirebaseRepository<T>
  implements FirebaseRepositoryInterface<T> {
  public id: String;
  public nameCollection: String;
  setId(id: String): void {
    this.id = id;
  }
  getRef(): admin.database.Reference {
    return database.ref(`${this.nameCollection}/${this.id}`);
  }
  getOnlyOne(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.getRef()
        .once("value")
        .then(snapshot => {
          resolve(snapshot.val());
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  save(object: T): Promise<void> {
    return this.getRef().set(object);
  }
  update(object: T): Promise<void> {
    return this.getRef().update(object);
  }
  delete(id: string): Promise<void> {
    return this.getRef()
      .child(id)
      .remove();
  }
}
