import * as childProcess from "child_process";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import fetch from "node-fetch";
import handler from "serve-handler";

describe("localhost http file server", () => {
    let server: http.Server;
    let serverUrl: string;

    beforeAll(async () => {
        server = http.createServer((request, response) => {
            return handler(request, response, {
                public: path.join(__dirname, "..")
            });
        });
    
        serverUrl = await new Promise((resolve, reject) => {
            server.listen(0, () => {
                resolve(`http://localhost:${(server.address() as any).port}`);
            });
        });
    });

    afterAll(() => {
        server.close();
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
