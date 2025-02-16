const fs = require("fs");

function loadData(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function saveData(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data));
}

module.exports = { loadData, saveData }
