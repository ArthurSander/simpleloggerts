const dateManager = require("date-and-time");
const fs = require('fs');

export abstract class Logger {

    private readonly _path: string;

    public constructor(path: string, createLogFolder: boolean = false) {
        if(createLogFolder)
            this._path = path + '\\logs';
        else
            this._path = path;
    }

    protected getFullpath(filenamePrefix: string): string {
        const now = new Date();
        let filename = `${filenamePrefix}-${dateManager.format(now, "YYYY-MM-DD_HH-mm-ss")}.${this.getExtension()}`;
        this.checkFolderExists();
        return this._path + "\\" + filename;
    }

    private checkFolderExists() { 
        if(!fs.existsSync(this._path)){
            fs.mkdirSync(this._path);
        }
    }

    protected abstract getExtension(): string;
}