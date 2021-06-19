var express = require("express");
var router = express.Router();
let { add, findByUserid, findById, deleteById } = require("../dao/cart.js");

// 1. add an order into cart by '/cart' with POST
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

// 2. find user's all orders in cart by '/cart/user/:id' WITH GET
router.get("/user/:id", function (req, res, next) {
  let urlParam = req.params.id;
  findByUserid(urlParam, function (success) {
    if (JSON.stringify(success) === "[]") {
      res.json({
        status: "400",
        data: "购物车为空",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

// 3. find an order in cart by '/cart/:id' WITH GET
router.get("/:id", function (req, res, next) {
  let urlParam = req.params.id;
  findById(urlParam, function (success) {
    if (JSON.stringify(success) === "[]") {
      res.json({
        status: "400",
        data: "查找错误, 请重试!",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

// 4. delete an order in cart by '/cart/:id' with DELETE
router.delete("/:id", function (req, res, next) {
  let urlParam = req.params.id;
  // console.log(`urlParam:`, urlParam);
  deleteById(urlParam, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: "删除失败, 请重试!",
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
