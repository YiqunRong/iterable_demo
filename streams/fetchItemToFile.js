const { Readable, Transform } = require("stream");
const { createWriteStream } = require("fs");
const { pipeline } = require("stream").promises;
const fetchItemGenerator =
  require("../generators/fetchItemGenerator").fetchItemGenerator;

const fetchItemToFile = async () => {
  const fetchItem = fetchItemGenerator();
  const readable = Readable.from(fetchItem);

  const transformToText = new Transform({
    objectMode: true,
    transform(item, encoding, callback) {
      this.push(JSON.stringify(item));
      this.push("\n");
      callback();
    },
  });
  const writable = createWriteStream("./results/people.jsonl");
  await pipeline(readable, transformToText, writable);
};

fetchItemToFile();
