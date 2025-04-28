import { writeFile,stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, 'fresh.txt');
    try {
        await stat(filePath);
        console.error('File already exists.');
        throw new Error('FS operation failed');
    }catch (err) {
        if(err.code === 'ENOENT') {
            await writeFile(filePath,'I am fresh and young')
            console.log('create file')
        }else {
            throw new Error('FS operation failed');
        }
    }
};

await create();
