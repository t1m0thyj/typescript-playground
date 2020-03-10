export function writeLine(line: string) {
    console.log(line);
}

if (require.main === module) {
    writeLine("Hello, world!");
}
