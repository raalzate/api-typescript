import {Container} from "typedi";

import * as fs from 'fs';
import * as path from 'path';

export async function ContainerFirebase() {
    const repositoryFolder=path.dirname(fs.realpathSync(__filename)) + "/Repositories/Firebase/";
    const files=fs.readdirSync(repositoryFolder);
    files.forEach((element)=>{
        const name=element.split(".")[0]
        const Repository=require(repositoryFolder + name)
        Container.set(name,new Repository.default())   
    });
} 