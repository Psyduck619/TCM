var express = require("express");
var router = express.Router();
let {
  add,
  findByUserid,
  updateById,
  findById,
  updateDefaultById,
  deleteById,
} = require("../dao/address.js");

// 1. add an address by '/address' with POST
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

// 2. find user's all addresses by '/address/user/:id' WITH GET
router.get("/user/:id", function (req, res, next) {
  let urlParam = req.params.id;
  findByUserid(urlParam, function (success) {
    if (JSON.stringify(success) === "[null]") {
      res.json({
        status: "400",
        data: "地址为空",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

// 3. find an address by '/address/:id' WITH GET
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

// 4. update new default by '/address/default' WITH PUT
router.put("/default", function (req, res, next) {
  let urlParam = req.body;
  updateDefaultById(urlParam, function (success) {
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

// 5. update an address by '/address' with PUT
router.put("/", function (req, res, next) {
  let urlParam = req.body;
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

// 6. delete an address by '/address/:id' with DELETE
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
