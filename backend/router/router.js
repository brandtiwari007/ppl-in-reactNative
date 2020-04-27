let express = require("express");

let router = express.Router();
let apiuser = require("../api");
var multer = require("multer");

var upload = multer({ dest: "/home/com15/pplproject/backend/public/uploads" });

var schema2 = require("../schema/uploadpostschema");
var catschema = require("../schema/addcategoryschema");

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

router.post("/signup", async (req, res) => {
  try {
    console.log("signup", req.body);
    console.log(req.body, "body of signup");
    let result = await apiuser.userFind(req.body);
    console.log("printing coming result from api ", result);
    if (result.length === 0) {
      console.log("result length", result.length);
      let createUser = await apiuser.createNew(req.body);
      console.log("user created in router", createUser);
      res.send("user created");

      // res.send(createUser)
    } else {
      console.log("user exists in else");
      res.send("user exists");
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    // console.log("router log in for username",req.body)
    let log = await apiuser.checkLogin(req.body);
    console.log("in login", log);
    res.send(log);
  } catch (err) {
    console.log("data error coming", err);
    res.send(err);
  }
});

router.post("/getImage", (req, res) => {
  let data = schema2.find({}, (result, err) => {
    if (err) res.send(err);
    else {
      console.log("sending image", result);
      res.send(result);
    }
  });
});
router.post("/addcats", upload.single("image"), (req, res) => {
  let obj = req.body;
  obj.image = req.file.filename;
  catschema.create(obj, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
router.get("/getcats", (req, res) => {
  catschema.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
router.post("/comment", upload.none(), (req, res) => {
  console.log("cc body", req.body);

  console.log("++__;'++", req.body._id);

  schema2.findOneAndUpdate(
    { _id: req.body._id },
    {
      $push: {
        comment: { comment: req.body.comment, username: req.body.username }
      }
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("serch and up", result);
        res.send(result);
      }
    }
  );
});
router.post("/getComment", (req, res) => {
  console.log("get cmt", req.body);
  schema2.find({ _id: req.body._id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("+++", result);
      res.send(result);
    }
  });
});

router.post("/likes", upload.none(), (req, res) => {
  console.log("likes coming", req.body._userid);
  console.log("++==+=", req.body);
  console.log("l", req.body._id);
  schema2.findOne(
    {
      $and: [{ _id: req.body._id, likes: req.body._userid }]
    },
    (err, result) => {
      console.log("console result of ", result);
      if (result) {
        schema2.findOneAndUpdate(
          { _id: req.body._id },
          { $pull: { likes: req.body._userid } },
          { new: true },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("like inserted +++++", result);
              res.send(result);
            }
          }
        );
      } else {
        schema2.findOneAndUpdate(
          { _id: req.body._id },
          { $push: { likes: req.body._userid } },
          { new: true },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("like inserted +++++", result);
              res.send(result);
            }
          }
        );
      }
    }
  );
});
router.get("/getLikes", (req, res) => {
  schema2.find({ _id: req.body._id }, (err, result));
  if (err) {
    console.log(err);
  } else {
    res.send(result);
  }
});
module.exports = router;
