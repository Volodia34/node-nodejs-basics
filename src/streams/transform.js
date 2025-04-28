import { Transform } from 'stream';


const reverseTransform = new  Transform({
    transform(chunk, encoding, cb) {
        const reversed = chunk.toString().split('').reverse().join('');
        this.push(reversed);
        cb();
    }
})

const transform = async () => {
    process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();
