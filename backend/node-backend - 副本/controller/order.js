var express = require("express");
var router = express.Router();
let {
  add,
  findByUserid,
  findById,
  updateStatusById,
} = require("../dao/order.js");

// 1. add an order by '/order' with POST
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

// 2. find user's all orders by '/address/user/:id' WITH GET
router.get("/user/:id", function (req, res, next) {
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

// 3. update the status of an order by '/address/status' WITH PUT
router.put("/status", function (req, res, next) {
  let urlParam = req.body;
  updateStatusById(urlParam, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: "更新失败",
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
