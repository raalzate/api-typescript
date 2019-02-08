import {Container} from "typedi";
import { MongoClient, Db } from "mongodb";

import * as fs from 'fs';
import * as path from 'path';

const HOST_DB = process.env.HOST_DB || "localhost";
const PORT_DB = process.env.PORT_DB || "27017";
const NAME_DB = process.env.NAME_DB || "test";

const url = `mongodb://${HOST_DB}:${PORT_DB}`;
let db: Db = null;


const startConexion=async ()=>{
    if (db === null) {
        const connection = await MongoClient.connect(url);
        db = connection.db(NAME_DB);
    }
}


export async function containerMongo() {
    await startConexion();
    const repositoryFolder=path.dirname(fs.realpathSync(__filename)) + "/Repositories/Mongo/";
    const files=fs.readdirSync(repositoryFolder);
    files.forEach((element)=>{
        const name=element.split(".")[0]
        const Repository=require(repositoryFolder + name)
        Container.set(name,new Repository.default(db))   
    });
} 