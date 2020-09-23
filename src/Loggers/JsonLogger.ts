import { ILogger } from "./Interfaces/ILogger";
import { Logger } from "./Logger";

const fs = require('fs');

export class JsonLogger extends Logger implements ILogger {

    public constructor(path: string, createLogFolder: boolean = false) {
        super(path, createLogFolder);
    }

    public log(data: any, filenamePrefix: string = "generic"): void {
    
        data = JSON.stringify(data, null, 2);
        
        let fullpath = this.getFullpath(filenamePrefix); 

        fs.writeFile(fullpath, data, () => {
            console.log("Log created: " + fullpath);
        });
    } 

    protected getExtension(): string { 
        return 'json';
    }

}
