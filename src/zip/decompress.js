import fs from 'fs';
import {fileURLToPath} from "url";
import path from "path";
import zlib from 'zlib';



const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'archive.gz');
    const decompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

    const readable = fs.createReadStream(filePath);

    const gunzip = zlib.createGunzip()

    const writable = fs.createWriteStream(decompressedFilePath);

    readable.pipe(gunzip).pipe(writable);

    writable.on('finish', () => {
        console.log('File has been decompressed and saved as fileToCompress.txt');
    });

    writable.on('error', (err) => {
        console.error('Error while writing the decompressed file:', err);
    });

};

await decompress();
