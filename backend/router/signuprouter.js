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
  