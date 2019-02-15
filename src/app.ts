import "reflect-metadata"; // this shim is required
import {createExpressServer,useContainer} from "routing-controllers";
import {Container} from "typedi";
import * as fs from 'fs';
import * as path from 'path';
import { containerMongo } from "./repositories/ContainerMongo";
import { ContainerFirebase } from "./repositories/ContainerFirebase";

const portServer:any=process.env.PORT || 8385;

const  runServer=async ()=>{
    await containerMongo()
    ContainerFirebase();
    useContainer(Container);
    const app = createExpressServer({
        routePrefix: "/api",
        controllers: [
            path.dirname(fs.realpathSync(__filename)) + "/controllers/*.ts"
          ]
    });
    app.listen(portServer,
        function() : void {
            console.log("Application listening on port "+portServer);
    });
}

runServer();

