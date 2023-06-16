const express = require("express");
const app = express();
const fs = require("fs");
const { setTimeout } = require("node:timers/promises");

app.get("/", async function (req, res) {
  await setTimeout(1000);
  const nextToken = req.query.nextToken;
  if (!nextToken) {
    const list = require(`${__dirname}/mock_data/MOCK_DATA1.json`);
    res.json({
      data: list,
      nextToken: "MOCK_DATA2",
    });
  } else {
    const fileName = `${__dirname}/mock_data/${nextToken}.json`;
    if (fs.existsSync(fileName)) {
      const list = require(fileName);
      if (list) {
        const index = Number(nextToken.at(-1));
        if (index > 0 && index < 6) {
          const newNextToken = `${nextToken.slice(0, -1)}${index + 1}`;
          res.json({ data: list, nextToken: newNextToken });
          return;
        } else {
          res.json({ data: list });
          return;
        }
      }
    }
    res.status(500).send("Something broke!");
  }
});

app.listen(3000);
