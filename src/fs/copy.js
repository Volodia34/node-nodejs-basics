import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const folderPath = path.join(__dirname, 'files');
    const folderCopyPath = path.join(__dirname, 'files_copy');
    console.log(folderPath)

    try {
        const folderStat = await fs.stat(folderPath);
        if (!folderStat.isDirectory()) {
            throw new Error('FS operation failed');
        }


        try {
            await fs.stat(folderCopyPath);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }

        await fs.mkdir(folderCopyPath, { recursive: true });


        const items = await fs.readdir(folderPath);

        for (const item of items) {
            const srcPath = path.join(folderPath, item);
            const destPath = path.join(folderCopyPath, item);

            const stat = await fs.stat(srcPath);

            if (stat.isDirectory()) {
                await copy(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
        console.log('directory copied')
    }catch (err) {
        console.error('Error during the copy operation:', err.message);
        throw err;
    }
};

await copy();
