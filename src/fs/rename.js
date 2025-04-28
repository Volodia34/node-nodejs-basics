import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const folderPath = path.join(__dirname, 'files');
    const oldFilePath = path.join(folderPath, 'wrongFilename.txt');
    const newFilePath = path.join(folderPath, 'properFilename.md');

    try {
        await fs.stat(oldFilePath);

        try {
            await fs.stat(newFilePath);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }

        await fs.rename(oldFilePath, newFilePath);
        console.log(`File renamed from ${oldFilePath} to ${newFilePath}`);
    }catch (err) {
        console.error('Error renaming file:', err.message);
        throw new Error('FS operation failed');
    }
};

await rename();
