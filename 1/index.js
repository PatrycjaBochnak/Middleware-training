const express = require("express");
const serveIndex = require("serve-index")
const app = express();

const USER = "admin";
const PASSWORD = "1234";

app.use("/files", express.static("public"))
app.use("/files", serveIndex("public"))

app.use(function (req, res, next) {
  res.locals.data = "Dane dodane wcześniej";
  res.removeHeader("X-Powered-By");
  next();
});

app.use("/admin", function (req, res, next) {
  if (req.query.user === USER && req.query.password === PASSWORD) {
    return next();
  }

  res.redirect("/");
});

app.get("/", function (req, res) {
  res.send(`
  Strona główna
  ${res.locals.data}`);
});

app.get("/admin", function (req, res) {
  res.send(`
   Zaplecze administratora`);
});

app.listen(8080, function () {
  console.log("Serwer jest nasłuchiwany na porcie 8080");
});
