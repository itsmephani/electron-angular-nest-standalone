const fs = require("fs");
const path = require("path");

exports.log = async (message) => {
  console.log(message);

  fs.appendFileSync(
    path.join(__dirname, "./logs/log.txt"),
    `${new Date()}: ${message}`
  );
};
