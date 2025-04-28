import {Worker} from 'worker_threads';
import os from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
    const coresCount = os.cpus().length;
    const promises = [];

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);


    for (let i = 0; i < coresCount; i++) {
        const worker = new Worker(join(__dirname, 'worker.js'));

        const promise = new Promise((resolve) => {
            worker.once('message', (result) => {
                resolve({ status: 'resolved', data: result });
            });
            worker.once('error', () => {
                resolve({ status: 'error', data: null });
            });
        });

        worker.postMessage(10 + i);

        promises.push(promise);
    }

    const results = await Promise.all(promises);
    console.log(results);

};

await performCalculations();
