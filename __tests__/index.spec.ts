import { spawnSync } from "child_process";
import * as fs from "fs";
import { readFile, writeLine } from "../src/index";

const testLine = "The quick brown fox jumped over the lazy dog.";

describe("Main program", () => {
    it("readFile calls fs.readFileSync", () => {
        const readFileSpy = jest.spyOn(fs, "readFileSync");
        const fileContents = readFile("package.json");
        expect(readFileSpy).toHaveBeenCalledTimes(1);
        expect(fileContents.length).toBeGreaterThan(0);
        readFileSpy.mockReset();
    });

    it("writeLine calls console.log", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation();
        writeLine(testLine);
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenLastCalledWith(testLine);
        logSpy.mockReset();
    });

    it("prints hello world when run", () => {
        const output: string = spawnSync("node", ["dist/index.js"]).stdout.toString();
        expect(output.trim()).toBe("Hello, world!");
    });
});
