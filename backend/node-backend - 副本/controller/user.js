var express = require("express");
var router = express.Router();
let { add, query, findByAccount, findOne, update } = require("../dao/user.js"); // 数据库操作

// 1. add a user by '/user' with POST
router.post("/", function (req, res, next) {
  let urlParam = req.body;
  console.log(urlParam);
  findByAccount(urlParam, function (success) {
    if (success != null) {
      res.json({
        status: `400`,
        data: `该账号已存在!`,
      });
    } else {
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
    }
  });
});

// 2. find a user by '/user/:account' WITH GET
router.get("/:account", function (req, res, next) {
  let urlParam = req.params.account;
  findOne(urlParam, function (success) {
    if (JSON.stringify(success) === "[]") {
      res.json({
        status: "400",
        data: "该用户不存在!",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

// 3. match user's account and password by '/user/login' with POST (POST is safer than GET)
router.post("/login", function (req, res, next) {
  let urlParam = req.body;
  query(urlParam, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: "账号或者密码错误!",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

// 4. update a user by '/user/:id' with PUT
router.put("/:id", function (req, res, next) {
  let urlParam = req.body;
  urlParam.id = req.params.id;
  findByAccount(urlParam, function (success) {
    if (success != null && success.id != urlParam.id) {
      res.json({
        status: "400",
        data: "该账号已存在, 换一个吧!",
      });
    } else {
      update(urlParam, function (success) {
        if (success == null) {
          res.json({
            status: "400",
            data: "更新失败, 请重试!",
          });
        } else {
          res.json({
            status: "200",
            data: success,
          });
        }
      });
    }
  });
});

module.exports = router;
