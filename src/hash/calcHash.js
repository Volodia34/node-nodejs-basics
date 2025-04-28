import * as crypto from "node:crypto";
import fs from 'fs';
import path from "path";
import {fileURLToPath} from "url";

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(filePath);

    input.on('data', (chunk) => {
        hash.update(chunk);
    });

    input.on('end', () => {
        const result = hash.digest('hex');
        console.log(result);
    });

    input.on('error', (err) => {
        console.error('Error reading file:', err);
    });
};

await calculateHash();
