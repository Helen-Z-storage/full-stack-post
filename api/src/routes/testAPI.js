const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working properly" + JSON.stringify(req.body));
});

module.exports = router;