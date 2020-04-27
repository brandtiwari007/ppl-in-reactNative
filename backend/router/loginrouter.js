router.post("/login", async (req, res) => {
    try {
      // console.log("router log in for username",req.body)
      let log = await apiuser.checkLogin(req.body);
      console.log("in login", log);
      res.send(log);
    } catch (err) {
      console.log("data error coming",err);
      res.send(err);
      
    }
  });
  