const { Transform, pipeline } = require("stream");
const { createWriteStream } = require("fs");
const { promisify } = require("util");
const pipelinePromise = promisify(pipeline);
const { getItemsFromFile } = require("./getItemsFromFile");

const fileToFile = async () => {
  const genderFilterTransform = new Transform({
    objectMode: true,
    transform(item, encoding, callback) {
      if (item.gender === "Male") {
        this.push(item);
      }
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

  const writable = createWriteStream("./results/male.json");

  await pipelinePromise(
    getItemsFromFile("./results/people.json"),
    genderFilterTransform,
    transformToText,
    writable
  );
};

fileToFile();
