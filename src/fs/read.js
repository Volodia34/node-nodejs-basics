import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, 'fileToRead.txt');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(data)
    }catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            console.error('Error reading file:', err.message);
            throw err;
        }
    }
};

await read();
