const axios = require("axios");

async function* fetchItemGenerator() {
  let currentNextToken = null;
  do {
    const {
      data: { data, nextToken },
    } = await axios.get(
      currentNextToken
        ? `http://localhost:3000?nextToken=${currentNextToken}`
        : "http://localhost:3000"
    );
    for (const item of data) {
      yield item;
    }
    currentNextToken = nextToken;
  } while (!!currentNextToken);
}

// (async () => {
//   const fetchItem = fetchItemGenerator();
//   for await (const item of fetchItem) {
//     console.log(item);
//   }
// })();

module.exports = {
  fetchItemGenerator,
};
