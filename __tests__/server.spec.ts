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

    it("should be able to fetch package.json", async () => {
        const response = await fetch(`${serverUrl}/package.json`);
        expect(response.ok).toBe(true);

        const responseText = await response.text();
        const expectedText = fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8");
        expect(responseText).toBe(expectedText);
    })
});
