const { Transform } = require("stream");
const { createReadStream } = require("fs");
const split2 = require("split2");

const getItemsFromFile = (fileName) => {
  const readable = createReadStream(fileName);

  const lineToObjectTransform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      const item = JSON.parse(chunk.toString());
      this.push(item);
      callback();
    },
  });

  const stream = readable.pipe(split2()).pipe(lineToObjectTransform);

  return stream;
};

module.exports = {
  getItemsFromFile,
};

// (async () => {
//   const stream = getItemsFromFile("./results/people.json");
//   for await (const item of stream) {
//     console.log(item);
//     break;
//   }
// })();
