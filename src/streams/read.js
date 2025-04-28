import fs from 'fs';
import {fileURLToPath} from "url";
import path from "path";


const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    const readable = fs.createReadStream(filePath);

    readable.on('data', (chunk) => {
        process.stdout.write(chunk.toString());
    })



};

await read();
