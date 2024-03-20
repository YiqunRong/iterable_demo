const { Readable, Transform } = require("stream");
const { createWriteStream } = require("fs");
const { pipeline } = require("stream").promises;
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
  await pipeline(readable, transform, writable);
};

fibonacciToFile();
