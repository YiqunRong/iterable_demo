const split2 = require("split2");
const { Readable } = require("stream");
const { pipeline } = require("stream").promises;
const { createReadStream, createWriteStream } = require("fs");
const lineLimit = 100000; // 100000 lines per file

const checkGenerator = async function* (lineStream) {
  // convert the stream to a generator
  for await (const line of lineStream) {
    yield line;
  }
};

const splitFiles = async () => {
  const readStream = createReadStream(`${__dirname}/data.jsonl`);
  // simulate a huge check stream using data.jsonl file
  const lineStream = readStream.pipe(split2());
  const generator = checkGenerator(lineStream); // convert the stream to a generator

  let isFinished = 0;
  let fileCounter = 0;

  const localCheckGenerator = async function* () {
    let counter = 0;
    while (counter < lineLimit) {
      // only save 100000 lines per file
      const { value, done } = await generator.next();
      if (done) {
        isFinished = true;
        break;
      }
      yield value;
      counter += 1;
    }
  };

  while (!isFinished) {
    // save the results in multiple files
    fileCounter += 1;
    const writeStream = createWriteStream(
      `${__dirname}/data_split_${fileCounter}.jsonl`
    );
    // save as data_split_1.jsonl, data_split_2.jsonl, etc
    await pipeline(Readable.from(localCheckGenerator()), writeStream);
  }
};

splitFiles();
