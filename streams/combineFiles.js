const { Transform, Readable } = require("stream");
const { createWriteStream, createReadStream } = require("fs");
const { pipeline } = require("stream").promises;
const split2 = require("split2");

async function* concatStreamsGenerator(readables) {
  for (const readable of readables) {
    for await (const chunk of readable) {
      yield chunk;
    }
  }
}
const concatStreams = (readables) =>
  Readable.from(concatStreamsGenerator(readables));

const combineFiles = async () => {
  const readableMale = createReadStream("./results/male.json");
  const readableFemale = createReadStream("./results/female.json");
  const writable = createWriteStream("./results/combined.json");
  const readable = concatStreams([readableMale, readableFemale]);

  const lineToObjectTransform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      const item = JSON.parse(chunk.toString());
      this.push(item);
      callback();
    },
  });

  const addTimestampTransform = new Transform({
    objectMode: true,
    transform(item, encoding, callback) {
      item.timestamp = Date.now();
      this.push(item);
      callback();
    },
  });

  const transformToText = new Transform({
    objectMode: true,
    transform(item, encoding, callback) {
      this.push(JSON.stringify(item));
      this.push("\n");
      callback();
    },
  });

  await pipeline(
    readable,
    split2(),
    lineToObjectTransform,
    addTimestampTransform,
    transformToText,
    writable
  );
};

combineFiles();
