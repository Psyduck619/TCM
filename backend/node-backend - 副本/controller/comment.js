var express = require("express");
var router = express.Router();
let { add, findByUserid } = require("../dao/comment.js");

// 1. add a comment by '/comment' with POST
router.post("/", function (req, res, next) {
  let urlParam = req.body;
  add(urlParam, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: `操作失败, 请重试!`,
      });
    } else {
      res.json({
        status: `200`,
        data: success,
      });
    }
  });
});

// 2. find the book's all comments by '/comment/book/:id' WITH GET
router.get("/book/:id", function (req, res, next) {
  let urlParam = req.params.id;
  findByUserid(urlParam, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: "订单为空",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

module.exports = router;
