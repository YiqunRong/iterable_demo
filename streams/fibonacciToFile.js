const { Readable, Transform, pipeline } = require("stream");
const { createWriteStream } = require("fs");
const { promisify } = require("util");
const pipelinePromise = promisify(pipeline);
const fibonacci = require("../generators/fibonacci").fibonacci;

const fibonacciToFile = async () => {
  const fib1000 = fibonacci(1000);
  const readable = Readable.from(fib1000);

  const transform = new Transform({
    objectMode: true,
    transform(item, encoding, callback) {
      this.push(item.toString());
      this.push("\n");
      callback();
    },
  });
  const writable = createWriteStream("./results/fib1000.txt");
  await pipelinePromise(readable, transform, writable);
};

fibonacciToFile();
