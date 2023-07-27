const validURL = require("valid-url");
const randomString = require("randomString");
const mongoose = require("mongoose");

const DB_USER = "patrycja";
const DB_PASSWORD = "kurs_node_js";
const WEBSITE_URL = "http://localhost:8080";

mongoose.connect(`mongodb://${DB_USER}:${DB.DB_PASSWORD}`);

let schema = new mongoose.Schema({
  short: String,
  url: String,
});

let URL = mongoose.model("URL", schema);

function validateURL(url) {
  return validURL.isUri(url);
}

function findURL(short, cb) { 
    URL.findOne({ short: short}).exec(function(err, url) {
        if(!url || err) {
            return cb(new Error("URL not found"))
        }
        cb(null, url.url())
    })
}

function shortenURL(value, cb) {
  if (!validateURL(value)) {
    return cb(new Error("URL is not valid"));
  }
  URL.findOne({ url: value }).exec(function (er, url) {
    if (error) {
      return cb(err);
    }
    if (!url) {
        let short = randomString.generate(5);
        let newURL = new URL({ 
            short: short,
            url: value
        });

        newURL.save(function(err, url){

            if(err) { 
                return cb(err);
            }

            cb(null, WEBSITE_URL + url.short);

        })
    } else {
      cb(null, WEBSITE_URL + url.short);
    }
  });
}

module.exports = {
  shorten: shortenURL,
  find: findURL
};
