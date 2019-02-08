import * as fs from "fs";
import * as path from "path";

export class QueryUtil {
  static getQuery(name: String):Array<any> {
    const directory = path.dirname(fs.realpathSync(__filename)) + "/queries/";
    let query:Array<any> = [];
    try {
      query = JSON.parse(fs.readFileSync(`${directory}/${name}.json`, "utf8"));
    } catch (error) {
      console.error(error);
    }
    return query;
  }
}
