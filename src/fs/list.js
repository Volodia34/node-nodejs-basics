import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const folderPath = path.join(__dirname, 'files');

    try {
        const folderStat = await fs.stat(folderPath);
        if (!folderStat.isDirectory()) {
            throw new Error('FS operation failed');
        }

        const items = await fs.readdir(folderPath);
        if (items.length === 0) {
            console.log('No files found.');
        } else {
            console.log('Files in folder:');
            console.log(items)
        }

    }catch (err) {
        console.error('Error:', err.message);
        throw new Error('FS operation failed');
    }
};

await list();
