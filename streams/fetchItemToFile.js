const { Readable, Transform, pipeline } = require("stream");
const { createWriteStream } = require("fs");
const { promisify } = require("util");
const pipelinePromise = promisify(pipeline);
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
  const writable = createWriteStream("./results/people.json");
  await pipelinePromise(readable, transformToText, writable);
};

fetchItemToFile();
