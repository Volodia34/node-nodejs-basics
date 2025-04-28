import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, 'fileToRemove.txt');

    try {
        await fs.stat(filePath);

        await fs.unlink(filePath);
        console.log(`File deleted: ${filePath}`);
    }catch (err) {
        console.error('Error deleting file:', err.message);
        throw new Error('FS operation failed');
    }

};

await remove();
