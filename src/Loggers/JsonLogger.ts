import { ILogger } from "./Interfaces/ILogger";

const dateManager = require("date-and-time");
const fs = require('fs');

export class JsonLogger implements ILogger {

    private readonly _path: string;

    public constructor(path: string, createLogFolder: boolean = false) {
        if(createLogFolder)
            this._path = path + '\\logs';
        else
            this._path = path;
    }

    public log(data: any, filenamePrefix: string = "generic"): void {
    
        data = JSON.stringify(data, null, 2);
        
        let fullpath = this.getFullpath(filenamePrefix); 

        if(!fs.existsSync(this._path)){
            fs.mkdirSync(this._path);
        }

        fs.writeFile(fullpath, data, () => {
            console.log("Log created: " + fullpath);
        });
    } 

    private getFullpath(filenamePrefix: string): string {
        const now = new Date();
        let filename = `${filenamePrefix}-${dateManager.format(now, "YYYY-MM-DD_HH-mm-ss")}.json`;
        return this._path + "\\" + filename;
    }

}
