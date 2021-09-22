import * as childProcess from "child_process";
import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";

describe("localhost http file server", () => {
    let pServer: any;
    let serverUrl: string;

    beforeAll(async () => {
        pServer = childProcess.spawn(process.platform === "win32" ? "npx.cmd" : "npx",
            ["serve", path.join(__dirname, "..")]);

        serverUrl = await new Promise((resolve, reject) => {
            pServer.stdout.on("data", (data: Buffer) => {
                resolve(data.toString().trim().split(" ").pop());
            });
        });
    });

    afterAll(() => {
        pServer.kill("SIGINT");
        pServer.unref();
        pServer.stdin.unref();
        pServer.stdout.unref();
        pServer.stderr.unref();
    });

    it("should be able to fetch package.json using API", async () => {
        const response = await fetch(`${serverUrl}/package.json`);
        expect(response.ok).toBe(true);

        const responseText = await response.text();
        const expectedText = fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8");
        expect(responseText).toBe(expectedText);
    });

    it("should be able to fetch package.json using CLI", async () => {
        const response = childProcess.spawnSync("curl", [`${serverUrl}/package.json`]);
        expect(response.status).toBe(0);

        const responseText = response.stdout.toString();
        const expectedText = fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8");
        expect(responseText).toBe(expectedText);
    });
});
