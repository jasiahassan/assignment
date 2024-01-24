const http = require("http");
const fs = require("fs");

const readFilessync = (req, res) => {
  try {
    const data = fs.readFileSync("data.json", "utf-8");
    res.end(data);
  } catch (err) {
    res.end("error reading file");
  }
};

const readFilesAsync = (req, res) => {
  fs.readFile("newdata.json", (err, data) => {
    if (err) {
      res.end("error reading file");
    } else {
      res.end(data);
    }
  });
};

const createfileSync = (req, res) => {
  try {
    req.on("data", (data) => {
      fs.writeFileSync("newdata.json", data);
      res.end("data written ");
    });
  } catch (err) {
    console.log("error wriring file");
  }
};

const createfileAsync = (req, res) => {
  req.on("data", (data) => {
    fs.writeFile("newdata.json", data, (err) => {
      if (err) {
        console.log("error in writing file");
      } else {
        res.end("data written successfully");
      }
    });
  });
};

const updatefiles = (req, res) => {};

const deletefilessync = (req, res) => {
  try {
    fs.unlink("newdata.json");
    res.end("error file deleting");
  } catch (err) {
    res.end("file deleted");
  }
};

const deletefilesAsync = (req, res) => {
  fs.unlink("newdata.json", (err) => {
    if (err) {
      res.end("error file deleting");
    } else {
      res.end("file deleted");
    }
  });
};

const server = http.createServer((req, res) => {
  const pathname = req.url;
  const method = req.method;

  if (method === "GET" && pathname === "/read-file-sync") {
    readFilessync(req, res);
  }
  if (method === "GET" && pathname === "/read-file-async") {
    readFilesAsync(req, res);
  }
  if (method === "POST" && pathname === "/create-file-sync") {
    createfileSync(req, res);
  }
  if (method === "POST" && pathname === "/create-file-async") {
    createfileAsync(req, res);
  }
  if (method === "PATCH" && pathname === "/update-file/id") {
    res.end("hi");
    updatefiles(req, res);
  }
  if (method === "DELETE" && pathname === "/delete-file-sync") {
    deletefilessync(req, res);
  }
  if (method === "DELETE" && pathname === "/delete-file-Async") {
    deletefilesAsync(req, res);
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`server runs on port ${port}`);
});
