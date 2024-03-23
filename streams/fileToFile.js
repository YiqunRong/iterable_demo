const { Transform } = require("stream");
const { createWriteStream } = require("fs");
const { pipeline } = require("stream").promises;
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

  const writable = createWriteStream("./results/male.jsonl");

  await pipeline(
    getItemsFromFile("./results/people.jsonl"),
    genderFilterTransform,
    transformToText,
    writable
  );
};

fileToFile();
