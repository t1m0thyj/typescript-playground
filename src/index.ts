import * as fs from "fs";

export function readFile(filename: string): string {
    return fs.readFileSync(__dirname + "/../" + filename, "utf-8");
}

export function writeLine(line: string) {
    console.log(line);
}

if (require.main === module) {
    writeLine("Hello, world!");
}
