import fs from 'fs';
import {fileURLToPath} from "url";
import path from "path";

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
    const writeable = fs.createWriteStream(filePath);

    process.stdin.on('data', (chunk) => {
        writeable.write(chunk.toString());
    })

    process.stdin.on('end', () => {
        writeable.end();
    });
};

await write();
