import { spawnSync } from "child_process";
import { writeLine } from "../src/index";

const testLine = "The quick brown fox jumped over the lazy dog.";

describe("Main program", () => {
    it("writeLine calls console.log", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation();
        writeLine(testLine);
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenLastCalledWith(testLine);
        logSpy.mockReset();
    }),
    it("prints hello world when run", () => {
        const output: string = spawnSync("node", ["dist/index.js"]).stdout.toString();
        expect(output.trim()).toBe("Hello, world!");
    });
});
