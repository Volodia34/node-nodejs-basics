import fs from 'fs';
import {fileURLToPath} from "url";
import path from "path";
import zlib from 'zlib';


const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');


    const readable = fs.createReadStream(filePath);

    const gzip =  zlib.createGzip();

    const writable = fs.createWriteStream(compressedFilePath);

    readable.pipe(gzip).pipe(writable);

    writable.on('finish', () => {
        console.log('File has been compressed and saved as archive.gz');
    });

    writable.on('error', (err) => {
        console.error('Error while writing the compressed file:', err);
    });
};

await compress();
