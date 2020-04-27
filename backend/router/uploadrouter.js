let express = require("express");

let router = express.Router();
let apiuser = require("../api");
var multer = require("multer");



var upload = multer({ dest: "/home/com15/node api/public/uploads" });

var schema2 = require("./uploadpostschema");
var catschema = require("./addcategoryschema");

router.post("/upload", upload.single("image"), (req, res) => {
  console.log("coming from axios", req.body);
  const obj = req.body;
  obj.date = new Date().toString().slice(4, 16);
  obj.time = new Date().toString().slice(16, 21);
  obj.image = req.file.filename;
  console.log("+++++++++++++", req.file.filename);
  schema2.create(obj, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data inserted", data);
    }
  });
  let data1 = schema2.find({}, (err, result) => {
    if (err) res.send(err);
    else {
      console.log("sending image", result);
      res.send(result);
    }
  });

  
});