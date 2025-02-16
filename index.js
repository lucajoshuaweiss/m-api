const express = require("express");
const app = express();
const PORT = 8080;

const fs = require("fs");

const dataManagement = require("./lib/manageData.js");

app.use(express.json());

app.listen(
  PORT,
  () => console.log(`Running on http://localhost:${PORT}`)
)

app.get("/status", (req, res) => {
  const data = dataManagement.loadData("logs/logs.json");

	const buf = Buffer.from(JSON.stringify({
		messageCount: Object.keys(data).reduce((acc, user) => {
      if (user === "init") return acc;
      return acc + (data[user].messages || []).length;
    }, 0),
    userCount: Object.keys(data).length-1,
    serverUptime: parseInt(require("os").uptime()/60)+"min"
  }) + "\n");

  res.status(200).send(buf);
});

app.get("/chat", (req, res) => {
	fs.readFile("logs/chat.txt", "utf8", (err, data) => {
		if (err) {
			console.error(err);
      return;
    }
        
   	const chatlog = data.split("\n").slice(1).join("\n");
    res.status(200).send(chatlog);
  });
});


app.post("/chat", (req, res) => {
	const { user, message } = req.body;

  const data = dataManagement.loadData("logs/logs.json");

  if (!data[user]) {
    data[user] = {};
  }

  if (!data[user].messages) {
    data[user].messages = [];
  }

  data[user].messages.push(message);

  dataManagement.saveData("logs/logs.json", data);

  fs.appendFile("logs/chat.txt", `${user}: ${message}\n`, function(err) {
    if (err) {
      return console.log(err);
    }
  });

  console.log(`Logged message: '${message}' from user: '${user}'`);
  res.status(200).send();
});

